import "../cards/jumbotron.css";

export default function Jumbotron({title, subtitle="L'endroit prefere d'article animalier"}){
    return <div className="container-fluid jumbotron">
        <div className="row">
            <div className="col text-center p-5">
                <div className="milieu">
                  <h1>{title}</h1>
                  <p className="lead">{subtitle}</p>
                </div>
            </div>
        </div>
    </div>
}