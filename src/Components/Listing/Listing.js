import React from 'react'
import ListingItem from "./ListingItem";
import InfiniteList from "../InfiniteList/InfiniteList";

class Listing extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.MyList = InfiniteList(ListingItem);

    }

    render () {
        let dataParams = {
            selectorClass: 'beerList',
            url: this.props.url,
        };
    return (
        <div className="d-flex justify-content-center mb-5">
            <this.MyList params={dataParams} clickHandler={this.props.clickHandler} favHandler={this.props.favHandler} favList={this.props.favList} favFilter={this.props.favFilter}/>
        </div>
    )
}}

export default Listing
