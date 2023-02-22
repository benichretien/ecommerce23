import { token } from "morgan";
import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const[auth, setAuth] = useState({
        user: null,
        token: "",
    })
    useEffect(()=>{
      const data = window.localStorage.getItem("auth");
      if(data){
        //on parse le data
        const parsed = JSON.parse(data);
        setAuth({...auth, user: parsed.user, token: parsed.token});
      }

    }, [])

    return (
       <AuthContext.Provider value={[auth, setAuth]}>
         {children}
       </AuthContext.Provider>
    )

}

const useAuth = () => useContext(AuthContext);

export {useAuth, AuthProvider};