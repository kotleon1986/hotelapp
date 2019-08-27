import jwt_decode from "jwt-decode";

const StorageHelper = {
    getToken() {
        return localStorage.getItem("token");
    },

    setToken(token) {
        localStorage.setItem("token", token);
    },

    removeToken() {
        localStorage.removeItem("token");
    },

    getUserFromToken() {
        const token = this.getToken();
        if(!token) return false;

        const decoded = jwt_decode(token);
        const { first_name, last_name, email, role, address, city, country, phone, fax } = decoded;
        return { first_name, last_name, email, role, address, city, country, phone, fax };
    },

    tokenExpired() {
        const token = this.getToken();
        const decoded = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        return (decoded.exp < currentTime)
    },

    userHasRole(roles) {
        if (!roles || !roles.length) return true;
        const user = this.getUserFromToken();
        if (!user) return false;
        return (roles.indexOf(user.role) > -1);
    }

};

export default StorageHelper;
