import { expressjwt } from 'express-jwt';
import util from 'util';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req, res) {
    const middleware = expressjwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] }).unless({
        path: [ '/api/users/authenticate', '/api/users/register', '/api/horaires', '/api/occasions', '/api/commentaires', '/api/prestations', '/api/contacts' ],
    });

    return util.promisify(middleware)(req, res);
}