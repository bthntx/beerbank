import React from 'react'
import closeIcon from "../../close.svg";
import SimilarBeer from './SimilarBeer';
import InfiniteList from "../InfiniteList/InfiniteList";
import {API_BEERSEARCHIBU_URL} from "../../Utils/UrlAPI";


function BeerInfoBox(props) {
    if (!props.beer) {
        document.body.style.overflow = "auto";
        return (
            <div className="hide"/>
        )
    }
    const SuggestedList = InfiniteList(SimilarBeer);
    const dataParams = {
        noInfinite: true,
        selectorClass: 'suggestedBeerList',
        url: API_BEERSEARCHIBU_URL.replace('#ebc_lt#', parseInt(props.beer.ebc + 1))
            .replace('#ebc_gt#', Math.max(parseInt(props.beer.ebc - 1), 0))
            .replace('#abv_lt#', parseInt(props.beer.abv + 1))
            .replace('#abv_gt#', Math.max(parseInt(props.beer.abv - 1), 0))
            .replace('#ibu_lt#', parseInt(props.beer.ibu + 5))
            .replace('#ibu_gt#', Math.max(parseInt(props.beer.ibu - 5), 0))
    };
    document.body.style.overflow = "hidden";
    return (
        <div className="d-flex justify-content-center App-ovelay"
             onClick={props.closeHandler}
        >
            <div className="card col-xs-12 col-sm-12 col-md-8 m-md-5  "
                 style={{maxWidth: '600px', maxHeight: '900px'}}>
                <div className="w-100 mt-2 text-right">
                    <img src={closeIcon} className="close" alt="close" onClick={props.closeHandler}/>
                </div>
                <div className="card border-0 mt-3 mb-3 overflow-auto" onClick={(e) => {
                    e.stopPropagation();
                }}>
                    <div className="p-3 mt-3">
                        <div className="ml-5 mr-5 float-left" style={{minHeight: '320px'}}>
                            <img src={props.beer.image_url}
                                 style={{width: '100px'}}
                                 alt={props.beer.name}/>
                        </div>

                        <div className="" style={{minHeight: '320px'}}>
                            <h4 className="mt-0 orange">{props.beer.name}</h4>
                            <p className="mt-0   text-muted">{props.beer.tagline}</p>
                            <div className="progress"
                                 style={{
                                     width: props.beer.abv + '%',
                                     height: '5px',
                                     backgroundColor: '#b33e9a'
                                 }}>
                            </div>
                            <div className="d-flex justify-content-between w-50">
                                <p>IBU: <span
                                    className="font-weight-light text-muted">{props.beer.ibu}</span></p>
                                <p>ABV: <span
                                    className="font-weight-light text-muted">{props.beer.abv}</span></p>
                                <p>EBC: <span
                                    className="font-weight-light text-muted">{props.beer.ebc}</span></p>
                            </div>
                            <div className="small">{props.beer.description}</div>
                            <div className="mt-0 small font-weight-bold">Best served with:
                                <ul>
                                    {props.beer.food_pairing.map(item => (
                                        <li key={Math.random()} className="small text-muted"
                                            style={{listStylePosition: 'inside'}}>{item}</li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="pl-3 pr-3">
                        <h4 className="mt-0 orange">You might also like:</h4>
                        <SuggestedList params={dataParams}/>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default BeerInfoBox
