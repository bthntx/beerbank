import React from 'react'

function SimilarBeer(props) {
    return(
        <div className=" col-xs-12 col-md-6 col-lg-4 p-3" style={{maxWidth:'9.5rem'}}>
        <div className="suggestedBeer text-center pt-2">
            <img className="align-self-center" src={props.beer.image_url} style={{height: '100px'}}
                 alt={props.beer.name}/>
            <h5 className="mt-2 text-muted">{props.beer.name}</h5>
        </div>
        </div>
    )
}

export default SimilarBeer
