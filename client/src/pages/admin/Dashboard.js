import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";

export default function AdminDashboard (){
    const [auth, setAuth]= useAuth();
    return <>
       <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle="Admin Dashboard"/>
       <pre>{JSON.stringify(auth, null, 4)}</pre>
    </>
}