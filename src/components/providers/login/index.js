import React, { useState } from 'react';

export const LoginContext = React.createContext();

function LoginProvider({ children }) {
    let [user, setUser] = useState(null);
    let [isLogin, setLogin] = useState(false);

    return (
        <LoginContext.Provider value={{ user, setUser, isLogin, setLogin }}>
            {
                children
            }
        </LoginContext.Provider>
    );
}

export default LoginProvider;