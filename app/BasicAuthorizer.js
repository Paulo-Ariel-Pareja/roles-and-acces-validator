class BasicAuthorizer {
    constructor(req, enforcer) {
        this.req = req;
        this.enforcer = enforcer;
    }
    getUserRole() {
        return this.req.body.role;
    }
    getUserAccess() {
        return this.req.body.access;
    }
    getDomain(){
        return this.req.body.hostname;
    }
    async checkPermission() {
        const { req, enforcer } = this;
        const { path, method } = req;
        const domain = this.getDomain();
        const userRole = this.getUserRole();
        const userAccess = this.getUserAccess();
        const hasRole = await enforcer.enforce(domain, userRole, path, method);
        const hasAccess = await enforcer.enforce(domain, userAccess, path, method);
        const canDo = hasRole || hasAccess ? true : false
        return canDo
    }
}
exports.BasicAuthorizer = BasicAuthorizer;