require("dotenv").config()

import express from "express"
import crypto from "crypto"

import neo4j from "neo4j-driver"

import { graphqlHTTP } from "express-graphql" // ES6

import { connect_data, User } from "@hexhive/types"

import { stitchSchemas } from "@graphql-tools/stitch"
import { mergeSchemas } from "@graphql-tools/merge"

import SubSchema from "./schema"
import { REMOTE_SCHEMA } from "./remotes"
import { DefaultRouter } from "./routes"
import { isValidObjectId } from "mongoose"

import { createServer } from "http"
// import WebSocket, { Server as WebSocketServer } from 'ws';
// import { CollaborationServer } from './collaboration';
import { Account } from "./Account"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import hiveSchema from "./schema/hive"
import printerSchema from "./schema/3d"

import { auth, ConfigParams, requiresAuth} from "express-openid-connect"
import { TaskRegistry } from "./task-registry"

const greenlock = require("greenlock-express")

const app = express()

const server = createServer(app)
// const wss = new WebSocketServer({ server, perMessageDeflate: false });

const {NODE_ENV} = process.env

const { PORT = (NODE_ENV == "production" ? 80 : 7000), AUTH_SITE = "https://next.hexhive.io", ISSUER = `http://localhost:${PORT}` } = process.env

// const jwks = require('./jwks/jwks.json');


const config : ConfigParams = {
	authRequired: false,
	auth0Logout: false,
	authorizationParams: {
		response_type: "code",
		scope: process.env.SCOPE || "openid email name groups offline_access",
		redirect_uri: process.env.REDIRECT_URI || "https://staging-api.hexhive.io/callback" || "http://localhost:7000/callback" || `https://${NODE_ENV != "production" ? "dashboard": "next"}.hexhive.io/dashboard`
	},
	clientAuthMethod: "client_secret_basic",
	baseURL: process.env.BASE_URL || "https://staging-api.hexhive.io" || "http://localhost:7000" || `https://${NODE_ENV != "production" ? "dashboard": "next"}.hexhive.io`,
	afterCallback: (req, res, session, decodedState) => {
		// res.redirect(process.env.UI_URL || 'https://next.hexhive.io/dashboard')
		(req as any).openidState.returnTo = (req as any).openidState.returnTo || process.env.UI_URL || "https://next.hexhive.io/dashboard"
		return session
	},
	routes: {
		login: false
	},
	clientID: process.env.CLIENT_ID || "test" || `${NODE_ENV != "production" ? "staging-" : ""}hexhive.io`,
	issuerBaseURL: process.env.AUTH_SERVER || "https://auth.hexhive.io",
	secret: "JWT_SECRET",
	clientSecret: process.env.CLIENT_SECRET || `${NODE_ENV != "production" ? "staging-" : ""}hexhive_secret`
};

  
(async () => {

	const taskRegistry = new TaskRegistry()

	const driver = neo4j.driver(
		process.env.NEO4J_URI || "localhost",
		neo4j.auth.basic(process.env.NEO4J_USER || "neo4j", process.env.NEO4J_PASSWORD || "test")
	)
    

	// const collaborationServer = new CollaborationServer();
         
	await connect_data()

	const subschemas = await SubSchema(REMOTE_SCHEMA)
	const schema = stitchSchemas({
		subschemas: subschemas
	})

	// wss.on('connection', (socket) => {
	//     collaborationServer.handleConnection(socket)
	// })
	// server.on('upgrade', (request, socket, head) => {
	//     wss.handleUpgrade(request, socket , head, (ws) => {
	//         wss.emit('connection', ws, request, {})
	//     })
	// })

	// const oidc = new Provider(ISSUER, {
	//     pkce: {
	//         methods: ['S256'],
	//         required: () => false
	//     },
	//     jwks,
	//     clients: [
	//         {
	//         client_id: 'foo',
	//         client_secret: 'bar',
	//         redirect_uris: ['https://jwt.io'], // using jwt.io as redirect_uri to show the ID Token contents
	//         response_types: ['id_token'],
	//         grant_types: ['implicit'],
	//         token_endpoint_auth_method: 'none',
	//         },
	//         {
	//             client_id: 'matrix',
	//             client_secret: 'matrix_secret',
	//             redirect_uris: ['https://matrix.hexhive.io/_synapse/client/oidc/callback'],
	//             response_types: ['id_token', 'code'],
	//             scopes: ['email', 'openid', 'profile', 'id'],
	//             grant_types: ['implicit', 'authorization_code', 'refresh_token'],
	//             token_endpoint_auth_method: 'client_secret_post'
	//         },
	//         {
	//             client_id: 'hexhive.io',
	//             client_secret: 'hexhive_secret',
	//             redirect_uris: ['https://next.hexhive.io/dashboard'],
	//             response_types: [ 'code'],
	//             scopes: ['email', 'openid', 'profile', 'id'],
	//             grant_types: ['implicit', 'authorization_code', 'refresh_token'],
	//             token_endpoint_auth_method: 'client_secret_post'
	//         }
	//     ],
        
	//     findAccount: Account.findAccount,
	//     claims: {
	//         openid: ['sub'],
	//         email: ['email', 'userinfo', 'name', 'email_verified', 'login'],
	//         name: ['name'],
	//         address: ['address'],
	//         phone: ['phone_number', 'phone_number_verified'],
	//         profile: ['birthdate', 'family_name', 'gender', 'given_name', 'locale', 'middle_name', 'name',
	//   'nickname', 'picture', 'preferred_username', 'profile', 'updated_at', 'website', 'zoneinfo'],
	//         id: ['name', 'email', 'login'] 
	//     },
	//     interactions: {
	//         url(ctx, interaction) {
	//           return `${AUTH_SITE}?token=${interaction.uid}`;
	//         },
	//     },
	//     features: {
	//         // disable the packaged interactions
	//         devInteractions: { enabled: false },
	//         introspection: { enabled: true },
	//         revocation: { enabled: true },
	//         userinfo: { enabled: true },
	//       jwtUserinfo: { enabled: false },

	//     },
	//     cookies: {
	//         keys: (process.env.SECURE_KEY || 'test,old-test').split(','),
	//     },
	// });

	app.set("trust proxy", true)
    
	app.use(cookieParser())
	app.use(helmet())

	app.use(auth(config))

	app.use(DefaultRouter(driver, taskRegistry)) 

	app.get("/profile", requiresAuth(), async (req, res) => {
		const userInfo = await req.oidc.fetchUserInfo()

		res.send({user: req.oidc.user, info: userInfo})
	})  
	/*AuthServer, {
        findUser: async (auth_blob: any) => {
            console.log("AUTH BLOB", auth_blob)
            if(!auth_blob) return;
            if (auth_blob.user && isValidObjectId(auth_blob.user)) {
                return await User.findById(auth_blob.user).populate('organisation');
            } else {
                const pass_hash = crypto.createHash('sha256').update(auth_blob.password).digest('hex')

                return await User.findOne({
                    username: auth_blob.username,
                    password: pass_hash
                }).populate('organisation')
            }
        }
    }))*/
	// const { constructor: { errors: { SessionNotFound } } } = oidc as any;

	if (process.env.NODE_ENV == "production" || process.env.NODE_ENV == "local-auth") {

		app.use("/graphql", requiresAuth(), async (req, res, next) => {
			if(!req.oidc.accessToken) return next("No access token present");
			try{
				const { isExpired, refresh } = req.oidc.accessToken

				if(isExpired()){
					await refresh();
				}
			}catch(e){
				next("No user info found")
			}

			try {
				if(!(req as any).user){
					const user = await req.oidc.fetchUserInfo(); 

					(req as any).user = {
						_id: user.sub,
						...user
					};

					(req as any).jwt = {
						iat: 1516239022,
						roles: ["admin"],
						...user
					};
				}

				next()
			}catch(e){
				next("No user info found")
			}
		})
	}


	hiveSchema(driver, taskRegistry).then((hive) => {
		app.use("/graphql", graphqlHTTP({
			schema: mergeSchemas({schemas: [printerSchema, hive, schema]}),
			graphiql: true,
		}))
	})
 

	// app.use(oidc.callback())

	if(process.env.NODE_ENV == "production"){
		const httpsWorker = (glx: any)  => {
			const server = glx.httpsServer()
			// var ws = new WebSocketServer({ server: server, perMessageDeflate: false});
			// ws.on("connection", function(ws: WebSocket, req: any) {
			//     // inspect req.headers.authorization (or cookies) for session info
			//     collaborationServer.handleConnection(ws)
			// });
        
			// servers a node app that proxies requests to a localhost
			glx.serveApp(app)
		}

		if(!process.env.MAINTAINER_EMAIL) throw new Error("Provide a maintainer email through MAINTAINER_EMAIL environment variable")
		greenlock.init({
			packageRoot: __dirname + "/../",
			configDir: "./greenlock.d",
     
			// contact for security and critical bug notices
			maintainerEmail: process.env.MAINTAINER_EMAIL,
     
			// whether or not to run at cloudscale
			cluster: false
		}).ready(httpsWorker)
	}else{
		server.listen(PORT, () => {
			console.log(`🚀 Server ready at :${PORT}`)
		})
	}
})()