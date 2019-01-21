import React from 'react'
import star from "../../star.svg";
import starFilled from "../../star-filled.svg";
import {findElementIndex} from "../../Utils/findElementIndex";


function ListingItem(props) {

    if (props.favFilter  && findElementIndex(props.beer.id,props.favList)<0) return (<div/>);
    return (
        <div className="d-flex col-12 col-xs-12 col-sm-6 col-md-4  " onClick={()=>props.clickHandler(props.beer)}>
            <div className="card card-for-list scaled text-center" style={{width:'18rem'}}>
                <div className="card-body  mb-3 mt-3">
                    <img src={(findElementIndex(props.beer.id,props.favList)>-1)? starFilled: star} className="star"
                         alt="X" onClick={(e)=>{props.favHandler(props.beer.id);e.stopPropagation();}} />
                    <img src={props.beer.image_url}  style={{height:'10rem'}} alt={props.beer.name}/>
                    <h5 className="card-title orange mt-3">{props.beer.name}</h5>
                    <p className="small mb-2 text-muted">{props.beer.tagline}</p>
                </div>
            </div>
        </div>
    )
}

export default ListingItem
