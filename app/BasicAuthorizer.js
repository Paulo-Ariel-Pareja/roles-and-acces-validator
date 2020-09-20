class BasicAuthorizer {
    constructor(req, enforcer) {
        this.req = req;
        this.enforcer = enforcer;
    }
    getUserRole() {
        return this.req.allow.role;
    }
    getUserAccess() {
        return this.req.allow.access;
    }
    getMethod() {
        return this.req.allow.method;
    }
    getPath() {
        return this.req.allow.path;
    }
    async checkPermission() {
        const { enforcer } = this;
        const pathSend = this.getPath();
        const method = this.getMethod();
        const userRole = this.getUserRole();
        const hasRole = await iteraEnElementos(enforcer, userRole, pathSend, method);
        if (hasRole === true) return true;
        const userAccess = this.getUserAccess();
        return await iteraEnElementos(enforcer, userAccess, pathSend, method);
    }
}
exports.BasicAuthorizer = BasicAuthorizer;

const iteraEnElementos = async (enforcer, sub, obj, act) => {
    let encontrado = false;
    let promesas = [];
    sub.forEach(element => {
        promesas.push(enforcer.enforce(element, obj, act));
    });
    await Promise.all(promesas).then(values => {
        const canAccess = values.filter(resp => {
            return resp === true;
        })
        if (canAccess.length > 0) encontrado = true;
    }, reason => {
        encontrado = false;
    });
    return encontrado;
}