import axios from "axios";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";

export default function Search(){
    
    //hooks
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.get(`/products/search/${values?.keyword}`);
            console.log(data);
            setValues({...values, results: data});
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="d-flex" onSubmit={handleSubmit}>
            <input
             type="search"
             style={{borderRadius: "0px", height: "49px", width:"190px", marginTop: "8px"}}
             placeholder="Recherche"
             className="form-control"
             onChange={(e) => setValues({...values, keyword: e.target.value})}
             value={values.keyword}
            />
            <button style={{
                height: "49px", marginTop: "8px", borderRadius: "0px"
            }} className="btn btn-outline-primary" type="submit">Recherche</button>

        </form>

    )
}