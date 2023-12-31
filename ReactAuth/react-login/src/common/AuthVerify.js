import React from "react";
import { withRouter } from "react-router-dom";
// import Cookies from "js-cookie";
const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

const AuthVerify = (props) => {
    props.history.listen(() => {
        var user = JSON.parse(sessionStorage.getItem('user'));

        if (user) {
            const decodedJwt = parseJwt(user.accessToken);

            if (decodedJwt.exp * 1000 < Date.now()) {
                props.logOut();
            }
        }
    });

    return <div></div>;
};

export default withRouter(AuthVerify);