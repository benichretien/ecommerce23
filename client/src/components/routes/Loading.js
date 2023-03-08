import { useState , useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingGIF from "../../images/loadingpic.gif";


export default function Loading({path = "login"}){
    //state
    const[count, setCount]= useState(5);
    //hook
    const navigate = useNavigate();
    const location = useLocation();
    //effect
    useEffect(()=>{
        const interval = setInterval(() => {
            setCount((currentCount)=> --currentCount);
        }, 1000);
        //rediriger apres
        count === 0 && navigate(`/${path}`, {
            state: location.pathname,
        });
        //cleanup
        return ()=> clearInterval(interval);
    }, [count])
    return <div className="d-flex justify-content-center align-items-center" style={{height: "80vh"}}>
        <img src={LoadingGIF} alt="loading-gif" style={{width: "450px"}}/>
    </div>
}