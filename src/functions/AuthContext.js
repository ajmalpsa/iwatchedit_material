import React, { useEffect, useState } from "react";
import app from "./FirebaseInitialize";
import myIcon from "../resources/icon.png";
import { motion } from "framer";



export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    const spinTransition = {
        loop: Infinity,
        ease: "linear",
        duration: 1
    };
    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        });
    }, []);
    if (pending) {
        return (<div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            marginTop: "-50px",
            marginLeft: "-20px",
        }}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    repeat: "Infinity",
                    duration: 2
                }}
            >
                <img src={myIcon} style={{width: "50px"}}/>
            </motion.div>

        </div>)
    }
    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};