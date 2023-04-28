import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import NoPhoto from "../../../assets/images/NoPhoto.jpeg"
import sidebarBanner from "../../../assets/images/sidebar-banner.png"
import $ from "jquery";
import * as ReactDOM from 'react-dom';
import Pagination from "react-js-pagination";
import Slider from 'react-rangeslider';

// To include the default styles
import 'react-rangeslider/lib/index.css';




class restaurantsAllResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchString: (this.props.match.params).string,
            manageState: '',
            rateValue: null,
            TurkishFlag: false,
            ThaiFlag: false,
            AmericanFlag: false,
            EuropeanFlag: false,
            JapaneseFlag: false,
            AsianFlag: false,
            MediterraneanFlag: false,
            servesAlcoholFlag:false,
            parkingAvailableFlag:false,
            seatingFlag:false,
            deliveryFlag:false,
            wheelchairFlag:false,
            FilterArray: [],
            restaurants: null,
            restaurantsHTML: [],
            restaurantFlag: false,
            activePage: 1,
            paginationArray: [],
            onLoadPagniation: [],
            allOnLoadPagniation: [],
            totalItems: null,
            unCheckedFlag: false
        }
        this.handelCheckbox = this.handelCheckbox.bind(this);
        this.handelCheckboxFeatures = this.handelCheckboxFeatures.bind(this)
        this.onLoadCheckbox = this.onLoadCheckbox.bind(this);
        this.pagination = this.pagination.bind(this);
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

                    restaurants: data.restaurant
                });
                //console.table(data) 
            });
    }


    handleChangeStart = () => {
        console.log('Change event started')
    };

    handleRateChange = (value, restaurantsArray) => {
        // var slider = document.getElementById("rateValue");
        this.setState({ rateValue: value })
        console.table(this.state.rateValue)
        this.restaurantSlider()
        this.state.activePage = 1
        this.pagination(this.state.paginationArray)
        if (this.state.paginationArray.length == 0) {
            this.state.totalItems = this.state.paginationArray.length
        }
        else {
            this.state.totalItems = this.state.paginationArray.length
        }
        console.table("pagination length: " + this.state.paginationArray.length)
        this.forceUpdate();
    };
    restaurantSlider = () => {
        this.state.restaurantsHTML = []
        this.fillRestaurantsHTMLFilter(this.state.restaurantsHTML)
        this.state.paginationArray = this.state.restaurantsHTML
    }
    handleChangeComplete = () => {
        console.log('Change event completed')
    };

    componentDidMount() {
        this.fetchData()

    }

    renderDataInsideDiv(div, restaurantsHTML) {
        ReactDOM.unmountComponentAtNode(div);
        ReactDOM.render(restaurantsHTML, div)
    }

    pagination(array) {
        var placeDiv = document.getElementById('data-div')
        var size = 10 * this.state.activePage;
        var items = array.slice((this.state.activePage - 1) * 10, size)
        this.renderDataInsideDiv(placeDiv, items)
    }
    async handlePageChange(restaurantCheckArray, pageNumber) {
        this.setState({ activePage: await pageNumber });
        this.checkSelectedData(restaurantCheckArray)
        this.checkSelectedFeatures(restaurantCheckArray)
        this.restaurantSlider()
        this.pagination(this.state.paginationArray)
        this.forceUpdate();
    }

    checkSelectedData(restaurantCheckArray) {
        this.state.paginationArray = []
        var MediterraneanCheck = document.getElementById("Mediterranean")
        var AsianCheck = document.getElementById("Asian")
        var AmericanCheck = document.getElementById("American")
        var JapaneseCheck = document.getElementById("Japanese")
        var EuropeanCheck = document.getElementById("European")
        var ThaiCheck = document.getElementById("Thai")
        var TurkishCheck = document.getElementById("Turkish")
        this.state.restaurantsHTML = []
        if (MediterraneanCheck.checked) {
            this.state.MediterraneanFlag = true
        } else {
            this.state.MediterraneanFlag = false
            this.state.restaurantsHTML = []
        }

        if (AsianCheck.checked) {
            this.state.AsianFlag = true

        } else {
            this.state.AsianFlag = false
            this.state.restaurantsHTML = []
        }
        if (AmericanCheck.checked) {
            this.state.AmericanFlag = true
        } else {
            this.state.AmericanFlag = false
            this.state.restaurantsHTML = []
        }

        if (JapaneseCheck.checked) {
            this.state.JapaneseFlag = true
        } else {
            this.state.JapaneseFlag = false
            this.state.restaurantsHTML = []
        }
        if (EuropeanCheck.checked) {
            this.state.EuropeanFlag = true
        } else {
            this.state.EuropeanFlag = false
            this.state.restaurantsHTML = []
        }
        if (ThaiCheck.checked) {
            this.state.ThaiFlag = true
        } else {
            this.state.ThaiFlag = false
            this.state.restaurantsHTML = []
        }
        if (TurkishCheck.checked) {
            this.state.TurkishFlag = true
        } else {
            this.state.TurkishFlag = false
            this.state.restaurantsHTML = []
        }
        this.fillRestaurantsHTMLFilter( this.state.restaurantsHTML)
        this.state.paginationArray =  this.state.restaurantsHTML
        if ((!MediterraneanCheck.checked) && (!AsianCheck.checked) && (!AmericanCheck.checked) && (!EuropeanCheck.checked) && (!JapaneseCheck.checked) && (!ThaiCheck.checked) && (!TurkishCheck.checked)) {
            this.state.unCheckedFlag = true
        }
    }


    handelCheckbox(restaurantCheckArray) {
        this.checkSelectedData(restaurantCheckArray)
        this.state.activePage = 1
        this.pagination(this.state.paginationArray)
        if (this.state.paginationArray.length == 0) {
            this.state.totalItems = this.state.paginationArray.length
        }
        else {
            this.state.totalItems = this.state.paginationArray.length
        }
        console.table(this.state.paginationArray.length)
        this.forceUpdate();
    }
    handelCheckboxFeatures(restaurantCheckArray) {
        this.checkSelectedFeatures(restaurantCheckArray)
        this.state.activePage = 1
        this.pagination(this.state.paginationArray)
        if (this.state.paginationArray.length == 0) {
            this.state.totalItems = this.state.paginationArray.length
        }
        else {
            this.state.totalItems = this.state.paginationArray.length
        }
        console.table(this.state.paginationArray.length)
        this.forceUpdate();
    }
    onLoadCheckbox(restaurantsArray) {

        //restaurant
        this.state.FilterArray = restaurantsArray;
        this.state.restaurantsHTML = []
        this.fillRestaurantHTML( this.state.restaurantsHTML)

        this.state.allOnLoadPagniation = this.state.restaurantsHTML
        this.state.onLoadPagniation = this.state.allOnLoadPagniation.slice(0, 10)

        if ((this.state.paginationArray.length == 0) && (this.state.unCheckedFlag == false)) {
            this.state.totalItems = this.state.allOnLoadPagniation.length
        }
        else if ((this.state.paginationArray.length != 0) || ((this.state.paginationArray.length == 0) && (this.state.unCheckedFlag == true))) {
            this.state.totalItems = this.state.paginationArray.length
        }

    }
    checkRestaurantData(restaurant, restaurantImg, restaurant_meals_HTML, restaurant_rate_HTML) {
        //images
        if (restaurant.images == "None") {
            restaurantImg.push(<img src={NoPhoto} alt="" className="img-fluid" />)
        } else {
            restaurantImg.push(<img src={restaurant.images[0]} alt="" className="img-fluid" />)
        }
        // meals
        if (restaurant.meals == "None") {
            restaurant_meals_HTML.push()
        } else {
            restaurant_meals_HTML.push(<h5><i className="flaticon-footprints icon-beside-word" />{restaurant.meals}</h5>)
        }
        //rate
        if (restaurant.rate == "None") {
            restaurant_rate_HTML.push()
        } else {
            restaurant_rate_HTML.push(<strong><i className="bx bxs-star" /><span>{restaurant.rate}</span> Rating</strong>)
        }
    }


    fillRestaurantHTML(restaurantsArray) {
        this.state.FilterArray.forEach(restaurant => {
            var restaurantImg = []
            var restaurant_meals_HTML = []
            var restaurant_rate_HTML = []
            this.checkRestaurantData(restaurant, restaurantImg, restaurant_meals_HTML, restaurant_rate_HTML)
            this.state.restaurantsHTML.push(
                <div className="col-lg-12 col-md-12">
                    <div className="package-card-xl">
                        <div className="package-thumb-xl">
                        <a href={`${process.env.PUBLIC_URL}/restaurant/${restaurant.city}/${restaurant.name}`}>
                                {restaurantImg}
                            </a>
                        </div>
                        <div className="package-details-xl package-details-xl-edit">
                            <div className="package-info">
                            <a href={`${process.env.PUBLIC_URL}/restaurant/${restaurant.city}/${restaurant.name}`}>

                                <h5 className="search-card-h5" ><span className="search-card-title">{restaurant.name}</span></h5>
                                </a>
                                <h3 className="place-type"><span>Restaurant</span></h3>
                            </div>
                            <div className="package-info package-info-edit">
                                <a href={`${process.env.PUBLIC_URL}/aboutcity`}>
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
                                <strong className="rev-element"><i className="flaticon-comment" /><span>{restaurant.reviewsnum}</span> Reviews</strong>
                                {restaurant_rate_HTML}
                            </div>
                        </div>
                    </div>
                </div>
            )
        });

    }
    fillRestaurantsHTMLFilter(restaurantsArray) {
        var arrRate = []
        var arrCusine = []
        var arrFeatures=[]
        this.state.FilterArray.forEach(restaurant => {
            if (this.state.rateValue != null && this.state.rateValue == restaurant.rate) {
                arrRate = arrRate.concat(restaurant)
            }
        })
        if (arrRate.length == 0 && (this.state.rateValue == null || this.state.rateValue == 0)) {
            arrRate = this.state.FilterArray
        }
        if (this.state.AmericanFlag == true || this.state.JapaneseFlag == true || this.state.AsianFlag == true || this.state.EuropeanFlag == true || this.state.TurkishFlag == true || this.state.ThaiFlag == true || this.state.MediterraneanFlag == true) {
            arrCusine = this.fillArrayType(arrRate)
            console.table("before")
            console.table(arrCusine)
            console.table(this.state.AmericanFlag)
        }
        console.table("after")
        console.table(arrCusine)
        if (arrCusine.length == 0 && (this.state.AmericanFlag == false && this.state.JapaneseFlag == false && this.state.AsianFlag == false && this.state.EuropeanFlag == false && this.state.TurkishFlag == false && this.state.ThaiFlag == false && this.state.MediterraneanFlag == false)) {
            arrCusine = arrRate
        }
        if (this.state.servesAlcoholFlag == true || this.state.parkingAvailableFlag == true || this.state.seatingFlag == true || this.state.deliveryFlag == true || this.state.wheelchairFlag == true) {
            arrFeatures = this.fillArrayFeatures(arrRate)
            console.table("before")
            console.table(arrFeatures)
            
        }
        console.table("after")
        console.table(arrFeatures)
        if (arrFeatures.length == 0 && (this.state.servesAlcoholFlag == false && this.state.parkingAvailableFlag == false && this.state.deliveryFlag == false && this.state.wheelchairFlag == false)) {
            arrFeatures = arrCusine
        }
        console.table("final")
        console.table(arrFeatures)
        arrFeatures.forEach(restaurant => {
            var restaurantImg = []
            var restaurant_meals_HTML = []
            var restaurant_rate_HTML = []
            this.checkRestaurantData(restaurant,restaurantImg,restaurant_meals_HTML,restaurant_rate_HTML)
            this.state.restaurantsHTML.push(
                <div className="col-lg-12 col-md-12">
                    <div className="package-card-xl">
                        <div className="package-thumb-xl">
                            <a href={`${process.env.PUBLIC_URL}/restaurant/${restaurant.city}/${restaurant.name}`}>
                                {restaurantImg}
                            </a>
                        </div>
                        <div className="package-details-xl package-details-xl-edit">
                            <div className="package-info">
                            <a href={`${process.env.PUBLIC_URL}/restaurant/${restaurant.city}/${restaurant.name}`}>

                                <h5 className="search-card-h5" ><span className="search-card-title">{restaurant.name}</span></h5>
                                </a>
                                <h3 className="place-type"><span>Restaurant</span></h3>
                            </div>
                            <div className="package-info package-info-edit">
                                <a href={`${process.env.PUBLIC_URL}/aboutcity`}>
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
    fillArrayType(restaurantsArray) {

        var arrType = []
        var TypeArrAll = []
        var Types = []
        var MediterraneanArr = []
        var EuropeanArr = []
        var JapaneseArr = []
        var AsianArr = []
        var TurkishArr = []
        var ThaiArr = []
        var AmericanArr = []

        restaurantsArray.forEach(restaurant => {
            if (restaurant.cuisines != "None") {
                Types = restaurant.cuisines

                if (this.state.JapaneseFlag == true && Types.indexOf("Japanese") > -1) {
                    JapaneseArr = JapaneseArr.concat(restaurant)
                }
                if (this.state.MediterraneanFlag == true && Types.indexOf("Mediterranean") > -1) {
                    MediterraneanArr = MediterraneanArr.concat(restaurant)
                }
                if (this.state.AmericanFlag == true && Types.indexOf("American") > -1) {
                    AmericanArr = AmericanArr.concat(restaurant)
                }
                if (this.state.EuropeanFlag == true && Types.indexOf("European") > -1) {
                    EuropeanArr = EuropeanArr.concat(restaurant)
                }
                if (this.state.AsianFlag == true && Types.indexOf("Asian") > -1) {
                    AsianArr = AsianArr.concat(restaurant)
                }
                if (this.state.TurkishFlag == true && Types.indexOf("Turkish") > -1) {
                    TurkishArr = TurkishArr.concat(restaurant)
                }
                if (this.state.ThaiFlag == true && Types.indexOf("Thai") > -1) {
                    ThaiArr = ThaiArr.concat(restaurant)
                }
            }
        })
        if (this.state.MediterraneanFlag == true) {
            arrType = arrType.concat(MediterraneanArr)
        }
        if (this.state.JapaneseFlag == true) {
            arrType = arrType.concat(JapaneseArr)
        }
        if (this.state.ThaiFlag == true) {
            arrType = arrType.concat(ThaiArr)
        }
        if (this.state.TurkishFlag == true) {
            arrType = arrType.concat(TurkishArr)
        }
        if (this.state.EuropeanFlag == true) {
            arrType = arrType.concat(EuropeanArr)
        }
        if (this.state.AsianFlag == true) {
            arrType = arrType.concat(AsianArr)
        }
        if (this.state.AmericanFlag == true) {
            arrType = arrType.concat(AmericanArr)
        }
        arrType.forEach(item => {
            if (TypeArrAll.indexOf(item) == -1)
                TypeArrAll.push(item);
        });
        // console.table("in fill function")
        // console.table(TypeArrAll)
        return TypeArrAll
    }

    showResult(paginationArrayLen) {
        if (paginationArrayLen <= 10) {
            if (paginationArrayLen == 0) {
                this.state.start = 0
            }
            else { this.state.start = 1 }
            this.state.end = paginationArrayLen
        }
        else if (paginationArrayLen > 10) {
            this.state.start = (this.state.activePage * 10) - 9
            var remaining = paginationArrayLen - ((this.state.activePage - 1) * 10)
            if (remaining < 10) {
                this.state.end = paginationArrayLen
            }
            else { this.state.end = this.state.start + 9 }
        }
    }
    checkSelectedFeatures(restaurantCheckArray)
    {
        this.state.paginationArray = []
        var servesAlcohol = document.getElementById("Serves Alcohol")
        var parkingAvailable = document.getElementById("Parking Available")
        var seating = document.getElementById("Seating")
        var Wheelchair = document.getElementById("Wheelchair Accessible")
        var delivery = document.getElementById("Delivery")
        this.state.restaurantsHTML = []
        if (servesAlcohol.checked) {
            this.state.servesAlcoholFlag = true
        } else {
            this.state.servesAlcoholFlag = false
            this.state.restaurantsHTML = []
        }
        if (parkingAvailable.checked) {
            this.state.parkingAvailableFlag = true
        } else {
            this.state.parkingAvailableFlag = false
            this.state.restaurantsHTML = []
        }
        if (seating.checked) {
            this.state.seatingFlag = true

        } else {
            this.state.seatingFlag = false
            this.state.restaurantFlag= []
        }
        if (Wheelchair.checked) {
            this.state.wheelchairFlag = true

        } else {
            this.state.wheelchairFlag = false
            this.state.restaurantsHTML = []
        }
        if (delivery.checked) {
            this.state.deliveryFlag = true

        } else {
            this.state.deliveryFlag = false
            this.state.restaurantsHTML = []
        }
        this.fillRestaurantsHTMLFilter(this.state.restaurantsHTML)
        this.state.paginationArray = this.state.restaurantsHTML
        if ((!servesAlcohol.checked) && (!parkingAvailable.checked) && (!seating.checked) && (!Wheelchair.checked)) {
            this.state.unCheckedFlag = true
        }
  }
  fillArrayFeatures(restaurantsArray) {

    var arrType =[]
    var TypeArrAll=[]
    var Types = []
    var servesAlcoholArr =[]
    var parkingAvailableArr = []
    var seatingArr = []
    var deliveryArr = []
    var wheelchairArr = []
  

    restaurantsArray.forEach(restaurant => {
        if (restaurant.features != "None") {
           Types = restaurant.features
           
            if(this.state.servesAlcoholFlag== true && Types.indexOf("Serves Alcohol") > -1){
                servesAlcoholArr = servesAlcoholArr.concat(restaurant)
            }
            if(this.state.parkingAvailableFlag == true && Types.indexOf("Parking Available") > -1){
                parkingAvailableArr = parkingAvailableArr.concat(restaurant)
            }
            if(this.state.seatingFlag == true && Types.indexOf("Seating") > -1){
                seatingArr = seatingArr.concat(restaurant)
            }
            if(this.state.deliveryFlag == true && Types.indexOf("Delivery") > -1){
                deliveryArr= deliveryArr.concat(restaurant)
            }
            if(this.state.wheelchairFlag == true && Types.indexOf(" Wheelchair Accessible") > -1){
                wheelchairArr = wheelchairArr.concat(restaurant)
            }
           
        }})
        if(this.state.servesAlcoholFlag == true){
            arrType = arrType.concat(servesAlcoholArr)
        }
        if(this.state.parkingAvailableFlag == true){
            arrType = arrType.concat(parkingAvailableArr) 
        }
        if(this.state.seatingFlag == true){
            arrType = arrType.concat(seatingArr)  
        }
        if(this.state.deliveryFlag== true){
            arrType = arrType.concat(deliveryArr)
        }
        if(this.state.wheelchairFlag == true){
            arrType = arrType.concat(wheelchairArr)
        }
       
        arrType.forEach(item =>{
                if (TypeArrAll.indexOf(item) == -1) 
                TypeArrAll.push(item); 
             });

        return TypeArrAll
}


    render() {

        if (!this.state.restaurants) {
            return <div class="preloader">
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

        var restaurantsArray = this.state.restaurants
        const { rateValue } = this.state;
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
                                            {this.onLoadCheckbox(restaurantsArray)}
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
                                                onChange={this.handlePageChange.bind(this, restaurantsArray)}
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
                                                <h5 className="categorie-head">Cuisine</h5>
                                                <div className="durations-option durations-option-edit radio-box">
                                                    

                                                    <div className="single-option">
                                                        <input type="checkbox" name="Cuisine" id="Mediterranean" defaultChecked={this.state.MediterraneanFlag} onChange={() => this.handelCheckbox(restaurantsArray)} />
                                                        <label htmlFor="restaurants">Mediterranean</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="Cuisine" id="Asian" defaultChecked={this.state.AsianFlag} onChange={() => this.handelCheckbox(restaurantsArray)} />
                                                        <label htmlFor="restaurants">Asian</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="Cuisine" id="European" defaultChecked={this.state.EuropeanFlag} onChange={() => this.handelCheckbox(restaurantsArray)} />
                                                        <label htmlFor="restaurants">European</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="Cuisine" id="Japanese" defaultChecked={this.state.JapaneseFlag} onChange={() => this.handelCheckbox(restaurantsArray)} />
                                                        <label htmlFor="restaurants">Japanese</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="Cuisine" id="Thai" defaultChecked={this.state.ThaiFlag} onChange={() => this.handelCheckbox(restaurantsArray)} />
                                                        <label htmlFor="restaurants">Thai</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="Cuisine" id="Turkish" defaultChecked={this.state.TurkishFlag} onChange={() => this.handelCheckbox(restaurantsArray)} />
                                                        <label htmlFor="restaurants">Turkish</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="Cuisine" id="American" defaultChecked={this.state.AmericanFlag} onChange={() => this.handelCheckbox(restaurantsArray)} />
                                                        <label htmlFor="restaurants">American</label>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                        <div className="col-lg-12 col-md-12">
                                            <div className="sidebar-range mt-40">
                                                <h5 className="categorie-head">Rate</h5>
                                                <div className='slider'>
                                                    <Slider
                                                        min={0}
                                                        max={5}
                                                        step={0.5}
                                                        defaultValue={5}
                                                        id="rateValue"
                                                        value={rateValue}
                                                        onChangeStart={this.handleChangeStart}
                                                        onChange={(e) => this.handleRateChange(e, restaurantsArray)}
                                                        onChangeComplete={this.handleChangeComplete}
                                                    />
                                                    <div className='value'>{rateValue}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sidebar-categorie sidebar-style-edit mt-40">
                                            <h5 className="categorie-head">Popular Features</h5>
                                            <div className="durations-option durations-option-edit radio-box">
                                                

                                                <div className="single-option">
                                                    <input type="checkbox" name="Popular Features" id="Serves Alcohol" defaultChecked={this.state.servesAlcoholFlag} onChange={() => this.handelCheckboxFeatures(restaurantsArray)} />
                                                    <label htmlFor="restaurants">Serves Alcohol</label>
                                                </div>
                                                <div className="single-option">
                                                    <input type="checkbox" name="Popular Features" id="Parking Available" defaultChecked={this.state.parkingAvailableFlag} onChange={() => this.handelCheckboxFeatures(restaurantsArray)} />
                                                    <label htmlFor="restaurants">Parking Available</label>
                                                </div>
                                                <div className="single-option">
                                                    <input type="checkbox" name="Popular Features" id="Seating" defaultChecked={this.state.seatingFlag} onChange={() => this.handelCheckboxFeatures(restaurantsArray)} />
                                                    <label htmlFor="restaurants">Seating</label>
                                                </div>
                                                <div className="single-option">
                                                    <input type="checkbox" name="Popular Features" id="Delivery" defaultChecked={this.state.deliveryFlag} onChange={() => this.handelCheckboxFeatures(restaurantsArray)} />
                                                    <label htmlFor="restaurants">Delivery</label>
                                                </div>
                                                <div className="single-option">
                                                    <input type="checkbox" name="Popular Features" id="Wheelchair Accessible" defaultChecked={this.state.wheelchairFlag} onChange={() => this.handelCheckboxFeatures(restaurantsArray)} />
                                                    <label htmlFor="restaurants">Wheelchair Accessible</label>
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

export default withRouter(restaurantsAllResults);
