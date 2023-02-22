import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import LoadingGIF from "../../images/loadingpic.gif";


export default function Loading(){
    //state
    const[count, setCount]= useState(5);
    //hook
    const navigate = useNavigate();
    //effect
    useEffect(()=>{
        const interval = setInterval(() => {
            setCount((currentCount)=> --currentCount);
        }, 1000);
        //rediriger apres
        count === 0 && navigate("/login");
        //cleanup
        return ()=> clearInterval(interval);
    }, [count])
    return <div className="d-flex justify-content-center align-items-center" style={{height: "80vh"}}>
        <img src={LoadingGIF} alt="loading-gif" style={{width: "450px"}}/>
    </div>
}