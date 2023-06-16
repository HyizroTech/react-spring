import React, { useState, useEffect } from "react";
import UserService from '../AuthServices/user.service'
const Home = () => {
    const [content, setContent] = useState("");
    useEffect(() => {
        setContent("Welcome to Rockware Resume-Builder")

    }, []);
    return (
        <div className="container">
            <header className="jumbotron">
                <h3 style={{ 'textAlign': 'center' }}>{content}</h3>
            </header>
        </div>
    );
};
export default Home;