import React, {Component} from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Listing from "./Components/Listing/Listing";
import NavMenu from "./Components/Header/NavMenu";
import BeerInfoBox from "./Components/BeerInfoBox/BeerInfoBox";
import {findElementIndex} from "./Utils/findElementIndex";
import {API_BEERLIST_URL,API_BEERFAV_URL,API_BEERSEARCHNAME_URL} from "./Utils/UrlAPI";

class App extends Component {

    showBeer = beer => {
        this.setState(({beerInfo: beer}))
    };

    hideBeer = () => {
        this.setState(({beerInfo: null}))
    };

    findBeer = str => {
        let url_template =  (str.length>0)?API_BEERSEARCHNAME_URL.replace('#name#', str):API_BEERLIST_URL;
        this.setState(({fetchUrl: url_template}))
    };

    showFavs = () => {
        let url_template =  API_BEERFAV_URL.replace('#ids#', this.state.favourites.join('|'));
        this.setState(({currentPage: 'FAVOURITES', fetchUrl: url_template}))
    };

    showHome = () =>{
        this.setState(({currentPage: 'HOME', fetchUrl: API_BEERLIST_URL}))
    };

    favClick = (id)=>
    {
        const searchIndex = findElementIndex(id,this.state.favourites);
        if (searchIndex>=0) this.setState(prevState=>{
            let newlist = [...prevState.favourites];
            newlist.splice(searchIndex,1);
            return ({favourites: newlist})
        });
        else this.setState(prevState=> ({favourites: [...prevState.favourites,id]}));
    };

    state = {
        beerInfo: null,
        favourites: [],
        fetchUrl: API_BEERLIST_URL,
        currentPage: 'HOME'
    };

    render() {
        return (
            <div className="App">
                <NavMenu clickHandlers={[this.showHome,this.showFavs]}/>
                <Header clickHandler={this.findBeer}/>
                <Listing url={this.state.fetchUrl} clickHandler={this.showBeer} favHandler={this.favClick} favList={this.state.favourites} favFilter={(this.state.currentPage==='FAVOURITES')?this.state.favourites:false}/>
                <BeerInfoBox beer={this.state.beerInfo} closeHandler = {this.hideBeer}/>
            </div>
        );
    }
}

export default App;
