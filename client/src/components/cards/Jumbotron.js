export default function Jumbotron({title, subtitle="L'endroit prefere d'article animalier"}){
    return <div className="conatiner-fluid bg-warning">
        <div className="row">
            <div className="col text-center p-5 bg-coral">
                <h1>{title}</h1>
                <p className="lead">{subtitle}</p>
            </div>
        </div>
    </div>
}