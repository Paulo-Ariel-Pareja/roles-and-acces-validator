const { BasicAuthorizer } = require('../BasicAuthorizer')
const casbin = require('casbin');

function authz(newEnforcer) {
    return async (req, res, next) => {
        try {
            const enforcer = await newEnforcer();
            if (!(enforcer instanceof casbin.Enforcer)) {
                let error = new Error('Enforcer invalid')
                error.status = 500;
                throw error;
            }
            const authorizer = new BasicAuthorizer(req, enforcer);
            if (!await authorizer.checkPermission()) {
                let error = new Error('Invalid access')
                error.status = 403;
                throw error;
            }
            next();
        } catch (error) {
            res.status(error.status).json({ message: error.message });
            return;
        }
    };
}
exports.authz = authz;