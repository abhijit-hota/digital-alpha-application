const types = {
    isloggedin: "ECELL_E21_ADMIN_LOGGED_IN",
    authtoken: "ECELL_E21_ADMIN_AUTH_TOKEN",
};

const getLocalToken = (type = "isloggedin") => {
    const token = window.localStorage.getItem(types[type]);

    if (!token) return null;
    return token;
};

export default getLocalToken;
