import express from 'express'
import crypto from 'crypto';

import {Provider} from 'oidc-provider';


import { connect_data, User } from '@hexhive/types'

import { DefaultRouter } from './routes';
import { isValidObjectId, mongo } from 'mongoose';

import { createServer } from 'http';
import { Account } from './Account';
import helmet from 'helmet';

import { MongoAdapter } from './adapters/mongodb';

import generateKeys from './generateKeys';
import path from 'path';
import { getGraphDriver, getGraphSession } from '@hexhive/data-core';
const greenlock = require('greenlock-express')

const app = express();

const server = createServer(app);

const {NODE_ENV} = process.env

const { PORT = (NODE_ENV == 'production' ? 80 : 7000), AUTH_SITE = 'https://next.hexhive.io', ISSUER = `http://localhost:${PORT}` } = process.env;

generateKeys('./jwks', './jwks.json').then(() => {

const jwks = require('./jwks/jwks.json');

(async () => {

    // const mongoAdapter = new MongoAdapter('oidc-auth-provider')
    await MongoAdapter.connect(process.env.MONGO_URL || 'mongodb://localhost', process.env.MONGO_DB || 'oidc-provider')

    await connect_data()

    // server.on('upgrade', (request, socket, head) => {
    //     wss.handleUpgrade(request, socket , head, (ws) => {
    //         wss.emit('connection', ws, request, {})
    //     })
    // })

    const driver = await getGraphDriver({
        uri: process.env.NEO4J_URI,
        user: process.env.NEO4J_USER,
        password: process.env.NEO4J_PASSWORD
    })

    const session = getGraphSession(driver);
    if(!session) throw new Error("Couldn't get graph session");

    const accountant = new Account()

    const oidc = new Provider(ISSUER, {
        adapter: MongoAdapter,
        pkce: {
            methods: ['S256'],
            required: () => false
        },
        ttl: {
            Interaction: 24 * 60 * 60 * 1000,
            Session: 24 * 60 * 60 * 1000
        },
        jwks,
        clients: [
            {
            client_id: 'foo',
            client_secret: 'bar',
            redirect_uris: ['https://jwt.io'], // using jwt.io as redirect_uri to show the ID Token contents
            response_types: ['id_token'],
            grant_types: ['implicit'],
            scopes: ['openid'],
            token_endpoint_auth_method: 'none',
            },
            {
                client_id: 'matrix',
                client_secret: 'matrix_secret',
                redirect_uris: ['https://matrix.hexhive.io/_synapse/client/oidc/callback'],
                response_types: ['id_token', 'code'],
                scopes: ['email', 'openid', 'groups', 'name', 'profile', 'id'],
                grant_types: ['implicit', 'authorization_code', 'refresh_token'],
                token_endpoint_auth_method: 'client_secret_post'
            },
            {
                client_id: 'hexhive.io',
                client_secret: 'hexhive_secret',
                redirect_uris: ['https://dashboard.hexhive.io/callback', 'https://next.hexhive.io/dashboard'],
                response_types: [ 'code'],
                scopes: ['email', 'openid', 'groups', 'name', 'profile', 'id'],
                grant_types: ['implicit', 'authorization_code', 'refresh_token'],
                token_endpoint_auth_method: 'client_secret_post'
            },
            {
                client_id: 'staging-hexhive.io',
                client_secret: 'staging-hexhive_secret',
                redirect_uris: ['https://next.hexhive.io/callback'],
                response_types: [ 'code'],
                scopes: ['email', 'openid', 'groups', 'name', 'profile', 'id'],
                grant_types: ['implicit', 'authorization_code', 'refresh_token'],
                token_endpoint_auth_method: 'client_secret_post'
            }
        ],
        findAccount: accountant.findAccount,
        claims: {
            openid: ['sub', 'applications'],
            email: ['email', 'email_verified'],
            groups: ['organisation'],
            name: ['name'],
            address: ['address'],
            phone: ['phone_number', 'phone_number_verified'],
            profile: ['birthdate', 'family_name', 'gender', 'given_name', 'locale', 'middle_name', 'name',
      'nickname', 'picture', 'preferred_username', 'profile', 'updated_at', 'website', 'zoneinfo'],
            id: ['name', 'email', 'login'] 
        },
        features: {
            // disable the packaged interactions
            devInteractions: { enabled: false },
            introspection: { enabled: true },
            revocation: { enabled: true },
            userinfo: { enabled: true },
            jwtUserinfo: { enabled: false },

        },
        cookies: {
            keys: (process.env.SECURE_KEY || 'test,old-test').split(','),
        },
    });

    app.set('trust proxy', true);

    app.set('view engine', 'ejs');
    app.set('views', path.resolve(__dirname, './views'));


    const helmetOptions = {
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                'frame-ancestors': ["'self'", "next.hexhive.io", "go.hexhive.io", "hexhive.io"]
            }
        }
    }

    app.use(helmet(helmetOptions))


    app.use(DefaultRouter(oidc, accountant, session)) 

    const { constructor: { errors: { SessionNotFound } } } = oidc as any;




    app.use(oidc.callback())

    if(process.env.NODE_ENV == 'production'){
        const httpsWorker = (glx: any)  => {
            var server = glx.httpsServer();
      
            // servers a node app that proxies requests to a localhost
            glx.serveApp(app);
        }

        if(!process.env.MAINTAINER_EMAIL) throw new Error("Provide a maintainer email through MAINTAINER_EMAIL environment variable")
        greenlock.init({
            packageRoot: __dirname + '/../',
            configDir: "./greenlock.d",
     
            // contact for security and critical bug notices
            maintainerEmail: process.env.MAINTAINER_EMAIL,
     
            // whether or not to run at cloudscale
            cluster: false
        }).ready(httpsWorker)
    }else{
        server.listen(PORT, () => {
            console.log(`🚀 Server ready at :${PORT}`);
        })
    }
})()

})