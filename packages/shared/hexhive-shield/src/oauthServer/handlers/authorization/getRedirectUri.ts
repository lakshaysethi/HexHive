export const getRedirectUri = (req: { body: { redirect_uri: any; }; query: { redirect_uri: any; }; }, client: { redirectUris: any[]; }) => req.body.redirect_uri || req.query.redirect_uri || client.redirectUris[0]