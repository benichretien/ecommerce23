import "../cards/jumbotron.css";
import logo from "../cards/logo.png";

export default function Jumbotron({title, subtitle="L'endroit prefere d'article animalier"}){
    return <div className="container-fluid bg-couleur">
        <div className="row">
            <div className="col text-center p-5 bg-coral">
                <div className="milieu">
                  <h1>{title}</h1>
                  <p className="lead">{subtitle}</p>
                </div>
            </div>
        </div>
    </div>
}