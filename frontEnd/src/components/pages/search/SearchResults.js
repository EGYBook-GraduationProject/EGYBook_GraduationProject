import React, { Component } from "react";
import {Link} from "react-router-dom";
import { withRouter } from "react-router";

import NoPhoto from  "../../../assets/images/NoPhoto.jpeg"
import sidebarBanner from "../../../assets/images/sidebar-banner.png"
import $ from "jquery";
import * as ReactDOM from 'react-dom';
import Pagination from "react-js-pagination";



// To include the default styles
import 'react-rangeslider/lib/index.css';

class SearchResults extends Component {
    constructor (props) {
        super(props)
        this.state = {
            searchString: (this.props.match.params).string,
            value: 10,
            manageState:'',
            places: null,
            placesHTML:[],
            hotels: null,
            hotelsHTML: [],
            attractions: null,
            attractionsHTML: [],
            restaurants: null,
            restaurantsHTML:[],
            hotelFlag: false,
            placeFlag: false,
            restaurantFlag: false,
            attractionFlag: false,
            activePage: 1,
            paginationArray:[],
            onLoadPagniation:[],
            allOnLoadPagniation:[],
            totalItems:null,
            unCheckedFlag:false
        }
        this.handelCheckbox = this.handelCheckbox.bind(this);
        this.onLoadCheckbox = this.onLoadCheckbox.bind(this);
        this.pagination=this.pagination.bind(this);
    }

    fetchData() {
        fetch('http://localhost:8000/search/all-result', {
            method: "POST",
            body: JSON.stringify({
                search: this.state.searchString
            }),
            headers: {

                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
              places: data.places,
              hotels: data.hotels,
              attractions: data.attraction,
              restaurants: data.restaurant });
              //console.table(data) 
            });
    }


    handleChangeStart = () => {
        console.log('Change event started')
    };

    handleChange = value => {
        this.setState({
            value: value
        })
    };

    handleChangeComplete = () => {
        console.log('Change event completed')
    };

    componentDidMount() {
        this.fetchData()
   
    }

    renderDataInsideDiv(div,hotelsHTML){
        ReactDOM.unmountComponentAtNode(div);
        ReactDOM.render(hotelsHTML,div) 
    }

    pagination(array){
        var placeDiv = document.getElementById('data-div')
        var size = 10*this.state.activePage;
        var items = array.slice((this.state.activePage-1)*10, size)
        this.renderDataInsideDiv(placeDiv,items)
    }
    async handlePageChange(hotelCheckArray,placeCheckArray,attractionCheckArray,restaurantCheckArray,pageNumber) {
        this.setState({activePage: await pageNumber});
        this.checkSelectedData(hotelCheckArray,placeCheckArray,attractionCheckArray,restaurantCheckArray)
        this.pagination(this.state.paginationArray)
        this.forceUpdate();
    }

    checkSelectedData(hotelCheckArray,placeCheckArray,attractionCheckArray,restaurantCheckArray)
    {
        this.state.paginationArray=[]
        var placeCheck=document.getElementById("places")
        var hotelCheck=document.getElementById("hotels")
        var attractionCheck=document.getElementById("attractions")
        var restaurantCheck=document.getElementById("restaurants")
    
        if(placeCheck.checked){
            this.state.placesHTML=[]
            this.state.placeFlag = true
            this.fillPlacesHTML(placeCheckArray,this.state.placesHTML)
        }else{
            this.state.placeFlag = false
            this.state.placesHTML = []
        }

        if(hotelCheck.checked){
            this.state.hotelsHTML=[]
            this.state.hotelFlag = true
            this.fillHotelHTML(hotelCheckArray,this.state.hotelsHTML)
                        
        }else{
            this.state.hotelFlag = false
            this.state.hotelsHTML = []
        }
        if(attractionCheck.checked){
            this.state.attractionsHTML=[]
            this.state.attractionFlag = true
            this.fillAttractionHTML(attractionCheckArray,this.state.attractionsHTML)
        }else{
            this.state.attractionFlag = false
            this.state.attractionsHTML = []
        }

        if(restaurantCheck.checked){
            this.state.restaurantsHTML=[]
            this.state.restaurantFlag = true
            this.fillRestaurantHTML(restaurantCheckArray,this.state.restaurantsHTML)
        }else{
            this.state.restaurantFlag = false
            this.state.restaurantsHTML = []
        }
        this.state.paginationArray = this.state.placesHTML.concat(this.state.hotelsHTML,this.state.attractionsHTML,this.state.restaurantsHTML)
        if((!hotelCheck.checked)&&(!placeCheck.checked)&&(!attractionCheck.checked)&&(!restaurantCheck.checked))
        {
            this.state.unCheckedFlag=true
        }
    }


    handelCheckbox(hotelCheckArray,placeCheckArray,attractionCheckArray,restaurantCheckArray){
        this.checkSelectedData(hotelCheckArray,placeCheckArray,attractionCheckArray,restaurantCheckArray)
        this.state.activePage=1
        this.pagination(this.state.paginationArray)
        if(this.state.paginationArray.length==0)
        {
            this.state.totalItems = this.state.paginationArray.length
        }
        else{
            this.state.totalItems = this.state.paginationArray.length
        }
        console.table(this.state.paginationArray.length)
        this.forceUpdate();
    }

    onLoadCheckbox(hotelsArray,placesArray,attractionsArray,restaurantsArray){
        // hotels
        if(hotelsArray.length > 0){
            this.state.hotelsHTML = []
            this.state.hotelFlag = true
            this.fillHotelHTML(hotelsArray,this.state.hotelsHTML)
        }else{
            this.state.hotelFlag = false
            this.state.hotelsHTML = []
        }
        //places
        if(placesArray.length > 0){
            this.state.placesHTML = []
            this.state.placeFlag = true
            this.fillPlacesHTML(placesArray,this.state.placesHTML)
            
        }else{
            this.state.placeFlag = false
            this.state.placesHTML = []
        }
        //attractions
        if(attractionsArray.length > 0){
            this.state.attractionsHTML = []
            this.state.attractionFlag = true
            this.fillAttractionHTML(attractionsArray,this.state.attractionsHTML)
           
        }else{
            this.state.attractionFlag = false
            this.state.attractionsHTML = []
        }
      
        //restaurant
        if(restaurantsArray.length > 0){
            this.state.restaurantsHTML = []
            this.state.restaurantFlag = true
            this.fillRestaurantHTML(restaurantsArray,this.state.restaurantsHTML)
        
        }else{
            this.state.restaurantFlag = false
            this.state.restaurantsHTML = []
        }

        this.state.allOnLoadPagniation = this.state.placesHTML.concat(this.state.hotelsHTML,this.state.attractionsHTML,this.state.restaurantsHTML)
        this.state.onLoadPagniation = this.state.allOnLoadPagniation.slice(0, 10)

        if((this.state.paginationArray.length==0)&&(this.state.unCheckedFlag==false))
        {
            this.state.totalItems=this.state.allOnLoadPagniation.length
        }
        else if((this.state.paginationArray.length!=0)||((this.state.paginationArray.length==0)&&(this.state.unCheckedFlag==true)))
        {this.state.totalItems=this.state.paginationArray.length
        }

    }

    checkHotelData(hotel,hotelImg,hotel_Price_HTML,hotel_Rate_HTML){
        //images
        if(hotel.images == "None"){
            hotelImg.push(<img src={NoPhoto} alt="" className="img-fluid" />) 
        }else{
            hotelImg.push(<img src={hotel.images[0]} alt="" className="img-fluid" />)
        }
        // price
        if (hotel.price == null) {
            hotel_Price_HTML.push()
        }
        else {
            hotel_Price_HTML.push(<span>{hotel.price + " EGP"}</span>)
        }
        // rate
        if (hotel.rating == "None") {
            hotel_Rate_HTML.push()
        }
        else {
            hotel_Rate_HTML.push(<span>{hotel.rating}</span>)
        }

    }
    fillHotelHTML(hotelsArray){
        hotelsArray.forEach(hotel => {
            var hotelImg = []
            var hotel_Price_HTML = []
            var hotel_Rate_HTML = []
            this.checkHotelData(hotel,hotelImg,hotel_Price_HTML,hotel_Rate_HTML)
            this.state.hotelsHTML.push(
                <div className="col-lg-12 col-md-12" id="hotel-result">
                    <div className="package-card-xl">
                        <div className="package-thumb-xl">
                            <a href={`${process.env.PUBLIC_URL}/hotel/${hotel.city}/${hotel.name}`}>
                                {hotelImg}
                            </a>
                        </div>
                        <div className="package-details-xl package-details-xl-edit">
                            <div className="package-info">
                                <a href={`${process.env.PUBLIC_URL}/hotel/${hotel.city}/${hotel.name}`}>
                                    <h5 className="search-card-h5"><span className="search-card-title">{hotel.name}</span></h5>
                                </a>
                                <h3 className="place-type"><span>Hotel</span></h3>
                            </div>
                            <div className="package-info package-info-edit">
                                <a href={`${process.env.PUBLIC_URL}/aboutCity/${hotel.city}`}>
                                    <h3 className="h3-city">
                                        <i className="flaticon-arrival" />
                                        <span>{hotel.city}</span>
                                    </h3>
                                </a>
                            </div>
                            <div className="package-info package-info-edit address-div">    
                                <h3 className="h3-address">
                                    <i className="flaticon-arrival" />
                                    {hotel.address}
                                </h3>
                            </div>
                            <div className="package-info package-info-price">
                                <h5><i className=""/>{hotel_Price_HTML}</h5>
                            </div>
                            
                            <div className="package-rating package-rating-edit">
                                <strong className="rev-element"><i className="flaticon-comment"/><span>{hotel.reviewsnum}</span> Reviews</strong>
                                <strong><i className="bx bxs-star"/>{hotel_Rate_HTML} Rating</strong>
                            </div>
                            
                        </div>
                    </div>
                </div>
            )
        }); 
    }
    
    checkPlacesData(place,placeImg,place_about_HTML){
        //img
        if(place.images == "None"){
            placeImg.push(<img src={NoPhoto} alt="" className="img-fluid" />) 
        }else{
            placeImg.push(<img src={place.images[0]} alt="" className="img-fluid" />)
        }
        // About
        if (place.about == "None") {
            place_about_HTML.push()
        } else {
            var about_01 = (place.about).slice(0, 100);
            place_about_HTML.push(<p>{about_01 + "..."}</p>)
        }
    }

    fillPlacesHTML(placesArray){
        placesArray.forEach(place => {
            var placeImg = []
            var place_about_HTML = []
            this.checkPlacesData(place,placeImg,place_about_HTML)
            this.state.placesHTML.push(
                <div className="col-lg-12 col-md-12">
                    <div className="package-card-xl">
                        <div className="package-thumb-xl">
                            <a href={`${process.env.PUBLIC_URL}/aboutCity/${place.name}`}>
                                {placeImg}
                            </a>
                        </div>
                        <div className="package-details-xl">
                            <a href={`${process.env.PUBLIC_URL}/aboutCity/${place.name}`}>
                                <div className="package-info">
                                    <h5><span>{place.name}</span></h5>
                                </div>
                            </a>
                            <h3><i className="flaticon-arrival" />
                                {place.type}
                            </h3>
                            <div className="package-rating">
                                {place_about_HTML}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }); 

    }

    checkattractionData(attraction,attractionImg,attraction_address,attraction_Rate_HTML,attraction_type_HTML){
        //images
        if(attraction.images == "None"){
            attractionImg.push(<img src={NoPhoto} alt="" className="img-fluid" />) 
        }else{
            attractionImg.push(<img src={attraction.images[0]} alt="" className="img-fluid" />)
        }
        //address
        if(attraction.address == "None"){
            attraction_address.push() 
        }else{
            attraction_address.push(<h3 className="h3-address"><i className="flaticon-arrival" />{attraction.address}</h3>)
        }
        // rate
        if (attraction.rate == "None") {
            attraction_Rate_HTML.push()
        }
        else {
            attraction_Rate_HTML.push(<strong><i className="bx bxs-star"/><span>{attraction.rate}</span> Rating</strong>)
        }
        //typeofattraction
        if (attraction.typeofattraction == "None") {
            attraction_type_HTML.push()
        }
        else {
            var typeofattraction_1 = (attraction.typeofattraction).slice(0, 50);
            var typeofattraction_2 = (attraction.typeofattraction).slice(50);
            if (typeofattraction_2 == "") {
                attraction_type_HTML.push(<h5><i className="flaticon-footprints icon-beside-word"/>{typeofattraction_1}</h5>)
            } else {
                attraction_type_HTML.push(<h5><i className="flaticon-footprints icon-beside-word"/>{typeofattraction_1 + "..."}</h5>)
            }
            
        }

    }

    fillAttractionHTML(attractionsArray){
        attractionsArray.forEach(attraction => {
            var attractionImg = []
            var attraction_address = []
            var attraction_Rate_HTML = []
            var attraction_type_HTML = []
            this.checkattractionData(attraction,attractionImg,attraction_address,attraction_Rate_HTML,attraction_type_HTML)
            this.state.attractionsHTML.push(
                <div className="col-lg-12 col-md-12">
                    <div className="package-card-xl">
                        <div className="package-thumb-xl">
                            <a  href={`${process.env.PUBLIC_URL}/attraction/${attraction.city}/${attraction.name}`}>
                                {attractionImg}
                            </a>
                        </div>
                        <div className="package-details-xl package-details-xl-edit">
                            <div className="package-info">
                                <a  href={`${process.env.PUBLIC_URL}/attraction/${attraction.city}/${attraction.name}`}>
                                    <h5 className="search-card-h5"><span className="search-card-title">{attraction.name}</span></h5>
                                </a>
                                <h3 className="place-type"><span>Attraction</span></h3>
                            </div>
                            <div className="package-info package-info-edit">
                                <a  href={`${process.env.PUBLIC_URL}/aboutCity/${attraction.city}`}>
                                    <h3 className="h3-city">
                                        <i className="flaticon-arrival" />
                                        <span>{attraction.city}</span>
                                    </h3>
                                </a>
                            </div>
                            <div className="package-info package-info-edit address-div">    
                                {attraction_address}
                            </div>
                            <div className="package-info attraction-type-div">
                                {attraction_type_HTML}
                            </div>
                            <div className="package-rating package-rating-edit-attraction">
                                <strong className="rev-element"><i className="flaticon-comment"/><span>{attraction.reviewsnum}</span> Reviews</strong>
                                {attraction_Rate_HTML}
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
    }

    checkRestaurantData(restaurant,restaurantImg,restaurant_meals_HTML,restaurant_rate_HTML){
        //images
        if(restaurant.images == "None"){
            restaurantImg.push(<img src={NoPhoto} alt="" className="img-fluid" />) 
        }else{
            restaurantImg.push(<img src={restaurant.images[0]} alt="" className="img-fluid" />)
        }
        // meals
        if(restaurant.meals == "None"){
            restaurant_meals_HTML.push() 
        }else{
            restaurant_meals_HTML.push(<h5><i className="flaticon-footprints icon-beside-word"/>{restaurant.meals}</h5>)
        }
        //rate
        if(restaurant.rate == "None"){
            restaurant_rate_HTML.push() 
        }else{
            restaurant_rate_HTML.push(<strong><i className="bx bxs-star"/><span>{restaurant.rate}</span> Rating</strong>)
        }
    }

    fillRestaurantHTML(restaurantsArray){
        restaurantsArray.forEach(restaurant => {
            var restaurantImg = []
            var restaurant_meals_HTML = []
            var restaurant_rate_HTML = []
            this.checkRestaurantData(restaurant,restaurantImg,restaurant_meals_HTML,restaurant_rate_HTML)
            this.state.restaurantsHTML.push(
                <div className="col-lg-12 col-md-12">
                    <div className="package-card-xl">
                        <a href={`${process.env.PUBLIC_URL}/restaurant/${restaurant.city}/${restaurant.name}`}>
                        <div className="package-thumb-xl">
                                {restaurantImg}
                        </div>
                        </a>
                        <div className="package-details-xl package-details-xl-edit">
                            <div className="package-info">
                            <a href={`${process.env.PUBLIC_URL}/restaurant/${restaurant.city}/${restaurant.name}`}>
                                <h5 className="search-card-h5" ><span className="search-card-title">{restaurant.name}</span></h5>
                            </a>
                                <h3 className="place-type"><span>Restaurant</span></h3>
                            </div>
                            <div className="package-info package-info-edit">
                                <a href={`${process.env.PUBLIC_URL}/aboutCity/${restaurant.city}`}>
                                    <h3 className="h3-city">
                                        <i className="flaticon-arrival" />
                                        <span>{restaurant.city}</span>
                                    </h3>
                                </a>
                            </div>
                            <div className="package-info package-info-edit address-div">    
                                <h3 className="h3-address">
                                    <i className="flaticon-arrival" />
                                    {restaurant.address}
                                </h3>
                            </div>
                            <div className="package-info restaurant-type-div">
                                {restaurant_meals_HTML}
                            </div>
                            <div className="package-rating package-rating-edit-restaurant">
                                <strong className="rev-element"><i className="flaticon-comment"/><span>{restaurant.reviewsnum}</span> Reviews</strong>
                                {restaurant_rate_HTML}
                            </div>
                        </div>
                    </div>
                </div>
            )
        });

    }

    showResult(paginationArrayLen){
        if(paginationArrayLen<=10)
        {  
            if(paginationArrayLen==0){
                this.state.start=0
            } 
            else{this.state.start=1}
            this.state.end=paginationArrayLen
        }
        else if(paginationArrayLen>10)
        {
            this.state.start=(this.state.activePage*10)-9
            var remaining=paginationArrayLen-((this.state.activePage-1)*10)
            if(remaining<10)
            {
                this.state.end=paginationArrayLen
            }
            else{this.state.end=this.state.start+9}
        }
    }
     
  
  render() {
      
      if (!this.state.places || !this.state.attractions || !this.state.hotels || !this.state.restaurants) {
        return<div class="preloader">
            <div className="loader loader1">
                        <span style={{ '--i': 1 }} />
                        <span style={{ '--i': 2 }} />
                        <span style={{ '--i': 3 }} />
                        <span style={{ '--i': 4 }} />
                        <span style={{ '--i': 5 }} />
                        <span style={{ '--i': 6 }} />
                        <span style={{ '--i': 7 }} />
                        <span style={{ '--i': 8 }} />
                        <span style={{ '--i': 9 }} />
                        <span style={{ '--i': 10 }} />
                        <span style={{ '--i': 11 }} />
                        <span style={{ '--i': 12 }} />
                        <span style={{ '--i': 13 }} />
                        <span style={{ '--i': 14 }} />
                        <span style={{ '--i': 15 }} />
                        <span style={{ '--i': 16 }} />
                        <span style={{ '--i': 17 }} />
                        <span style={{ '--i': 18 }} />
                        <span style={{ '--i': 19 }} />
                        <span style={{ '--i': 20 }} />
                        <div className="rocket" />
                    </div></div>;
    }
    var hotelsArray = this.state.hotels
    var placesArray = this.state.places
    var attractionsArray = this.state.attractions
    var restaurantsArray = this.state.restaurants
    return (
        <>
            {/* ===============  breadcrumb area start =============== */}
            <div></div>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="breadcrumb-wrap">
                                <h2>Search Results</h2>
                                <ul className="breadcrumb-links">
                                    <li>
                                        <Link to={`${process.env.PUBLIC_URL}/`}>Home</Link>
                                        <i className="bx bx-chevron-right" />
                                    </li>
                                    <li>Search Results</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ===============  breadcrumb area end =============== */}
            {/* ===============  Package  area start =============== */}
            <div className="package-standard-wrapper pt-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                        <div className="row mb-30">
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="package-filter">
                                    {this.onLoadCheckbox(hotelsArray,placesArray,attractionsArray,restaurantsArray)}
                                    {this.showResult(this.state.totalItems)}
                                        <h5>Showing {this.state.start}-{this.state.end} of {this.state.totalItems} Result</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row" id="search-result">
                                <div id="data-div" >
                                {this.state.onLoadPagniation}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="custom-pagination mt-40">
                                    <Pagination
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={10}
                                    totalItemsCount={this.state.totalItems}
                                    pageRangeDisplayed={3}
                                    onChange={this.handlePageChange.bind(this,hotelsArray,placesArray,attractionsArray,restaurantsArray)}  
                                    innerClass={"inner-pagination"}
                                    />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="package-sidebar">
                                <div className="row">
                                    <div className="col-lg-12 col-md-6">
                                        <div className="sidebar-categorie sidebar-categorie-edit mt-40">
                                            <h5 className="categorie-head">Categories</h5>
                                            <div className="durations-option durations-option-edit radio-box">
                                                {/*this.onLoadCheckbox(hotelsArray,placesArray,attractionsArray,restaurantsArray)*/}
                                                <div className="single-option">
                                                    <input type="checkbox" name="categorie" id="hotels" defaultChecked={this.state.hotelFlag} onChange={()=>this.handelCheckbox(hotelsArray,placesArray,attractionsArray,restaurantsArray)}/>
                                                    <label htmlFor="hotels">Hotels</label>
                                                </div>
                                                <div className="single-option">
                                                    <input type="checkbox" name="categorie" id="restaurants" defaultChecked={this.state.restaurantFlag} onChange={()=>this.handelCheckbox(hotelsArray,placesArray,attractionsArray,restaurantsArray)}/>
                                                    <label htmlFor="restaurants">Restaurants</label>
                                                </div>
                                                <div className="single-option">
                                                    <input type="checkbox" name="categorie" id="places" defaultChecked={this.state.placeFlag} onChange={()=>this.handelCheckbox(hotelsArray,placesArray,attractionsArray,restaurantsArray)}/>
                                                    <label htmlFor="places">Places</label>
                                                </div>
                                                <div className="single-option">
                                                    <input type="checkbox" name="categorie" id="attractions" defaultChecked={this.state.attractionFlag} onChange={()=>this.handelCheckbox(hotelsArray,placesArray,attractionsArray,restaurantsArray)}/>
                                                    <label htmlFor="attractions">Attractions</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-6">
                                        <div className="sidebar-banner mt-40">
                                            <img src={sidebarBanner} alt="" className="img-fluid" />
                                            <div className="sidebar-banner-overlay">
                                                    <div className="overlay-content">
                                                        <h3>Enjoy Your trip to Egypt with Us</h3>
                                                        <div className="sidebar-banner-btn">
                                                            <Link to={`${process.env.PUBLIC_URL}/PlanGenerator`}>Generate Your Plan</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ===============  Package  area end =============== */}
        </>
    );
  }
}

export default withRouter(SearchResults);
