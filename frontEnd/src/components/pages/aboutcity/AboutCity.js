import React, { Component } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import { Rating } from 'react-simple-star-rating'
//Import Images
import destinations1Img from "../../../assets/images/destination/d-1.png"

import destinations6Img from "../../../assets/images/destination/d-6.png"

import destinations2Img from "../../../assets/images/destination/d-2.png"
import destinations3Img from "../../../assets/images/destination/d-3.png"
import { withRouter } from "react-router";
import { SRLWrapper } from "simple-react-lightbox";
import NoPhoto from "../../../assets/images/NoPhoto.jpeg"

class AboutCity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cityName: (this.props.match.params).string,
            place: null,
            placeHTML: [],
            hotels: null,
            hotelsHTML_div: [],
            attractions: null,
            attractionHTML_div: [],
            restaurants: null,
            restaurantHTML_div: []
        };
    }


    fetchData() {
        fetch('http://localhost:8000/backend/aboutCity', {
            method: "POST",
            body: JSON.stringify({
                search: this.state.cityName
            }),
            headers: {

                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    place: data.place,
                    hotels: data.hotels,
                    attractions: data.attractions,
                    restaurants: data.restaurants
                });
                console.table(data)
            });
    }

    componentDidMount() {
        this.fetchData()
    }

    checkHotelData(hotel, hotelImg, hotel_Price_HTML, hotel_starnum_HTML) {
        //images
        if (hotel.images == "None") {
            hotelImg.push(<img src={NoPhoto} alt="" className="img-card" />)
        } else {
            hotelImg.push(<img src={hotel.images[0]} alt="" className="img-card" />)
        }
        // price
        if (hotel.price == null) {
            hotel_Price_HTML.push()
        }
        else {
            hotel_Price_HTML.push(<p class="aboutcity-price">{hotel.price} EGP</p>)
        }

        // starnum
        if (hotel.starnum == "None") {
            hotel_starnum_HTML.push()
        }
        else if(hotel.starnum == null){
            hotel_starnum_HTML.push()   
        }
        else {
            hotel_starnum_HTML.push(<Rating initialValue={hotel.starnum} fillColor={'#ea965d'} size={20} style={React.CSSProperties = { top: '-5px' }} readonly />)
        }


    }

    fillHotelHTML(hotelsArray,destinationsOptions) {
        var hotelsHTML = []
        hotelsArray.forEach(hotel => {
            var hotelImg = []
            var hotel_Price_HTML = []
            var hotel_starnum_HTML = []
            this.checkHotelData(hotel, hotelImg, hotel_Price_HTML, hotel_starnum_HTML)
            hotelsHTML.push(
                <div className="offer-card">
                    <div className="offer-thumb">
                        <Link to={`${process.env.PUBLIC_URL}/hotel/${hotel.city}/${hotel.name}`}>
                            {hotelImg}
                        </Link>    
                    </div>
                    <div className="offer-details">
                        <div className="offer-info">
                            <h5><i className="flaticon-comment" />{hotel.reviewsnum} reviews</h5>
                            {hotel_starnum_HTML}
                        </div>
                        <Link to={`${process.env.PUBLIC_URL}/hotel/${hotel.city}/${hotel.name}`}>
                            <h3><i className="flaticon-arrival icon-beside-word" />{hotel.name}</h3>
                        </Link>
                        <p class="city"><i className="flaticon-arrival icon-beside-word"></i>{hotel.city}</p>
                        {hotel_Price_HTML}
                    </div>
                </div>
            )
        });
        this.state.hotelsHTML_div.push(
            <div className="row">
                <div className="col-lg-3 col-md-3">
                    <div className="package-slider-wrap">
                        <img src={destinations1Img} alt="" className="img-fluid" />
                        <div className="pakage-overlay">
                            <p><strong>Stay</strong></p>
                        </div>

                    </div>
                </div>

                <div className="col-lg-9 col-md-9">
                    <OwlCarousel className="row owl-carousel destinations-1"  {...destinationsOptions}>
                        {hotelsHTML}
                    </OwlCarousel>
                </div>
            </div>
        )
        this.state.hotelsHTML_div = []
    }

    checkPlaceData(place, placeImages, placeAbout) {
        // images
        for (let i = 0; i < 3; i++) {
            placeImages.push(
                <div className="img-border">
                    <img width="595px" height="350px" className="" src={place.images[i]} alt="" />
                </div>
            )
        }
        // about
        var about_01 = (place.about).slice(0, 400);
        var about_02 = (place.about).slice(400);
        if (about_02 == "") {
            placeAbout.push(
                <p style={React.CSSProperties = { margin: "7px" }}> {about_01} </p>
            )
        } else {
            placeAbout.push(
                <div>
                    <input type="checkbox" class="read-more-state" id="about" />
                    <p className="read-more-wrap" style={React.CSSProperties = { margin: "7px" }}>{about_01}<span class="read-more-target">{about_02}</span></p>
                    <label for="about" class="read-more-trigger"></label>
                </div>
            )
        }



    }

    fillPlaceHTML(placeArray) {
        const ImageOptions = {
            stagePadding: 1,
            items: 1,
            margin: 2,
            smartSpeed: 1500,
            autoplay: false,
            dots: false,
            nav: false,
            loop: true,
            navText: [''],
            responsive: {
                0: {
                    items: 1,
                    nav: false,
                    dots: false
                },
                600: {
                    items: 1,
                    nav: false,
                    dots: false,
                },
                1000: {
                    items: 1,
                    dots: true,
                    nav: false,
                    loop: true
                }
            }
        };
        placeArray.forEach(place => {
            var placeImages = []
            var placeAbout = []
            this.checkPlaceData(place, placeImages, placeAbout)
            this.state.placeHTML = []
            this.state.placeHTML.push(
                <div>
                    <div className="col-lg-12 col-md-12">
                        <h2 align="center" >Explore <span style={React.CSSProperties = { color: "#ea965d" }}>{placeArray[0].name}</span>
                        </h2>
                    </div>
                    <div className="row about-info">
                        <div className="col-lg-6 col-md-12">
                            <div className="img-div">
                                <OwlCarousel {...ImageOptions}>
                                    {placeImages}
                                </OwlCarousel>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <div className="about-wrapper-right section-head head-left">
                                <h2 style={React.CSSProperties = { margin: "7px", "margin-bottom":"15px"}}>About <span style={React.CSSProperties = { color: "#ea965d" }}>{placeArray[0].name}</span></h2>
                                {placeAbout}
                                <h6 className="aboutcity-type"><i className="flaticon-footprints icon-beside-word" />{placeArray[0].type}</h6>
                            </div>
                        </div>
                    </div>
                </div>

            )

        });

    }

    checkattractionData(attraction,attractionImg,attraction_Rate_HTML,attraction_type_HTML){
        //images
        if(attraction.images == "None"){
            attractionImg.push(<img src={NoPhoto} alt="" className="img-card" />) 
        }else{
            attractionImg.push(<img src={attraction.images[0]} alt="" className="img-card" />)
        }
        // rate
        if (attraction.rate == "None") {
            attraction_Rate_HTML.push()
        }
        else {
            attraction_Rate_HTML.push(<Rating initialValue={attraction.rate} fillColor={'#ea965d'} size={20} style={React.CSSProperties = { top: '-5px' }} readonly />)
        }
        //typeofattraction
        if (attraction.typeofattraction == "None") {
            attraction_type_HTML.push()
        }
        else {
            var typeofattraction_1 = (attraction.typeofattraction).slice(0, 40);
            var typeofattraction_2 = (attraction.typeofattraction).slice(40);
            if (typeofattraction_2 == "") {
                attraction_type_HTML.push(<p class="city aboutcity-atr-type"><i class="flaticon-traveller icon-beside-word"></i>{typeofattraction_1}</p>)
            } else {
                attraction_type_HTML.push(<p class="city aboutcity-atr-type"><i class="flaticon-traveller icon-beside-word"></i>{typeofattraction_1 + "..."}</p>)
            }
            
        }

    }

    fillAttractionHTML(attractionsArray,destinationsOptions){
        var attractionHTML = []
        attractionsArray.forEach(attraction =>{
            var attractionImg = []
            var attraction_Rate_HTML = []
            var attraction_type_HTML = []
            this.checkattractionData(attraction,attractionImg,attraction_Rate_HTML,attraction_type_HTML)
            attractionHTML.push(
                    <div className="offer-card">
                        <div className="offer-thumb">
                            <Link to={`${process.env.PUBLIC_URL}/attraction/${attraction.city}/${attraction.name}`}>
                                {attractionImg}
                            </Link>
                        </div>
                        <div className="offer-details">
                            <div className="offer-info">
                                <h5><i className="flaticon-comment" />{attraction.reviewsnum} reviews</h5>
                                {attraction_Rate_HTML}
                            </div>
                            <Link to={`${process.env.PUBLIC_URL}/attraction/${attraction.city}/${attraction.name}`}>
                                <h3><i className="flaticon-arrival icon-beside-word" />{attraction.name}</h3>
                            </Link>
                            <p class="city"><i className="flaticon-footprints icon-beside-word"></i>{attraction.city}</p>
                            {attraction_type_HTML}
                        </div>
                    </div>
            )
        })
        this.state.attractionHTML_div.push(
            <div className="row">
            <div className="col-lg-3 col-md-3">
                <div className="package-slider-wrap">
                    <img src={destinations3Img} alt="" className="img-fluid" />
                    <div className="pakage-overlay">
                        <strong>Do</strong>
                    </div>
                </div>
            </div>
            <div className="col-lg-9 col-md-9">
                <OwlCarousel className="row owl-carousel destinations-1"  {...destinationsOptions}>
                    {attractionHTML}
                </OwlCarousel>
            </div>
        </div> 
        )
        this.state.attractionHTML_div = []
    }

    checkRestaurantData(restaurant,restaurantImg,restaurant_cuisines_HTML,restaurant_rate_HTML){
        //images
        if(restaurant.images == "None"){
            restaurantImg.push(<img src={NoPhoto} alt="" className="img-card" />) 
        }else{
            restaurantImg.push(<img src={restaurant.images[0]} alt="" className="img-card" />)
        }
        // meals
        if(restaurant.cuisines == "None"){
            restaurant_cuisines_HTML.push() 
        }else{
            var cuisines_1 = (restaurant.cuisines).slice(0, 40);
            var cuisines_2 = (restaurant.cuisines).slice(40);
            if (cuisines_2 == "") {
                restaurant_cuisines_HTML.push(<p class="city aboutcity-atr-type"><i class='bx bx-food-menu icon-beside-word'></i>{cuisines_1}</p>)
            } else {
                restaurant_cuisines_HTML.push(<p class="city aboutcity-atr-type"><i class='bx bx-food-menu icon-beside-word'></i>{cuisines_1 + "..."}</p>)
            }
        }
        //rate
        if(restaurant.rate == "None"){
            restaurant_rate_HTML.push() 
        }else{
            restaurant_rate_HTML.push( <Rating initialValue={restaurant.rate} fillColor={'#ea965d'} size={20} style={React.CSSProperties = { top: '-5px' }} readonly />)
        }
    }

    fillRestaurantHTML(restaurantsArray,destinationsOptions){
        var restaurantHTML = []
        restaurantsArray.forEach(restaurant => {
            var restaurantImg = []
            var restaurant_cuisines_HTML = []
            var restaurant_rate_HTML = []
            this.checkRestaurantData(restaurant,restaurantImg,restaurant_cuisines_HTML,restaurant_rate_HTML)
            restaurantHTML.push(
                <div className="offer-card">
                    <a href={`${process.env.PUBLIC_URL}/restaurant/${restaurant.city}/${restaurant.name}`}>
                    <div className="offer-thumb">
                        {restaurantImg}
                    </div>
                    </a>
                    <div className="offer-details">
                        <div className="offer-info">
                            <h5><i className="flaticon-comment" />{restaurant.reviewsnum} reviews</h5>
                           {restaurant_rate_HTML}
                        </div>
                        <a href={`${process.env.PUBLIC_URL}/restaurant/${restaurant.city}/${restaurant.name}`}>
                        <h3>
                            <i className="flaticon-arrival icon-beside-word" />
                            {restaurant.name}
                        </h3>
                        </a>
                        <p class="city"><i className="flaticon-footprints icon-beside-word"></i>{restaurant.city}</p>
                        {restaurant_cuisines_HTML}
                    </div>
                </div>
            )
        });
        this.state.restaurantHTML_div.push(
            <div className="row">
                <div className="col-lg-3 col-md-3">
                    <div className="package-slider-wrap">
                        <img src={destinations2Img} alt="" className="img-fluid" />
                        <div className="pakage-overlay">
                            <strong>Eat</strong>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9 col-md-9">
                    <OwlCarousel className="row owl-carousel destinations-1"  {...destinationsOptions}>
                        {restaurantHTML}
                    </OwlCarousel>
                </div>
            </div>
        )
        this.state.restaurantHTML_div = []
    }


    render() {

        const destinationsOptions = {
            stagePadding: 1,
            items: 3,
            loop: false,
            margin: 20,
            smartSpeed: 1500,
            autoplay: false,
            dots: false,
            nav: true,
            navText: ["<i class='bx bx-chevron-left' ></i>", "<i class='bx bx-chevron-right'></i>"],
            responsive: {
                0: {
                    items: 1,
                    nav: false,
                    dots: false
                },
                600: {
                    items: 2,
                    nav: false,
                    dost: false,
                },
                1000: {
                    items: 2,
                    nav: true,
                    loop: false
                }
            }
        };

        if (!this.state.place || !this.state.attractions || !this.state.hotels || !this.state.restaurants) {
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

        var restaurantsHTML = []

        // place
        var placeArray = this.state.place
        this.fillPlaceHTML(placeArray)

        // hotels
        var hotelsArray = this.state.hotels
        if(hotelsArray.length !== 0){
            this.fillHotelHTML(hotelsArray,destinationsOptions)
        }
        

        // attraction
        var attractionsArray = this.state.attractions
        if(attractionsArray.length !== 0){
            this.fillAttractionHTML(attractionsArray,destinationsOptions)
        }
        

        // restaurants
        var restaurantsArray = this.state.restaurants
        if(restaurantsArray.length !== 0){
            this.fillRestaurantHTML(restaurantsArray,destinationsOptions)
        }

        return (
            <>
                {/* =============== Destinations area start =============== */}
                <div></div>
                <div className="destinations-area pt-105">
                    <div className="container">
                        {this.state.placeHTML}

                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="section-head pb-40">
                                    <h5>Enjoy your Trip</h5>
                                    <h2>Explore a lot in the city</h2>
                                </div>
                            </div>
                        </div>
                        {this.state.hotelsHTML_div}
                        {this.state.restaurantHTML_div}
                        {this.state.attractionHTML_div}
                    </div>
                </div>
                {/* =============== Destinations area end =============== */}
            </>
        );
    }
}

export default withRouter(AboutCity);
