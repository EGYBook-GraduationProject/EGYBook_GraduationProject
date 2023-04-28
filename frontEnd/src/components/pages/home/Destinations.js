import React, { Component } from "react";
import {Link} from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Rating } from 'react-simple-star-rating'
import {addHotelToPlan,addAttractionToPlan,addRestaurantToPlan} from"../../../assets/js/addToPlan.js"
import MainBanner from "./MainBanner";
import $ from "jquery";

//import { Svg } from 'react-native-svg';


class Destinations extends Component {
  

    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            places: null,
            hotels: null,
            attractions: null,
            restaurants: null,
            hotel_icon_class: null,
            attraction_icon_class: null,
            restaurant_icon_class: null,
            hotel_icon_title: null,
            attraction_icon_title: null,
            restaurant_icon_title: null

        };
    }

    fillColor() {
        document.getElementById('btn1').setAttribute('fill', '#ff00ff');
    }
    fetchData() {
        fetch('http://localhost:8000/backend')
          .then(response => response.json())
          .then(data => {
            this.setState({ places: data.placeData,
            hotels: data.hotelData,
           attractions: data.attractionData,
            restaurants: data.restaurantData });
        });
    }

    componentDidMount(){
        this.fetchData()
    }
  
    HotelsPlan(name,city,image,price){
        const item = {
            name:name,
            city: city,
            image: image,
            price:price
        };
        addHotelToPlan(item)
       console.table("added-react")
        
    }
    attractionPlan(name,city,image){
        const item = {
            name:name,
            city: city,
            image: image,
        };
       addAttractionToPlan(item)
       console.table("added-react")
        
    }
    restaurantsPlan(name,city,image){
        const item = {
            name:name,
            city: city,
            image: image,
        };
        addRestaurantToPlan(item)
       console.table("added-react")
        
    }
   checkHotelsInLoacalStorage(name,city,image,price){
        console.table("start")
        //var button = document.getElementById(item.name)
        const item = {
            name:name,
            city: city,
            image: image,
            price:price
        };
        console.table(item)
        if(localStorage.getItem("Hotels")){
            var data = localStorage.getItem("Hotels")
            console.table(data)
            if(data.includes(JSON.stringify(item))){
                this.state.hotel_icon_class = "fa-minus-circle"
                this.state.hotel_icon_title = "Remove from plan"
            }
            else{
                this.state.hotel_icon_class = "fa-plus-circle"
                this.state.hotel_icon_title = "Add to plan"
            }
        }else{
            this.state.hotel_icon_class = "fa-plus-circle"
            this.state.hotel_icon_title = "Add to plan"
        }
    } 
    checkAttractionInLoacalStorage(name,city,image){
        console.table("start")
        //var button = document.getElementById(item.name)
        const item = {
            name:name,
            city: city,
            image: image,
        };
        console.table(item)
        if(localStorage.getItem("Attractions")){
            var data = localStorage.getItem("Attractions")
            console.table(data)
            if(data.includes(JSON.stringify(item))){
                this.state.attraction_icon_class = "fa-minus-circle"
                this.state.attraction_icon_title = "Remove from plan"
            }
            else{
                this.state.attraction_icon_class = "fa-plus-circle"
                this.state.attraction_icon_title = "Add to plan"
            }
        }else{
            this.state.attraction_icon_class = "fa-plus-circle"
            this.state.attraction_icon_title = "Add to plan"
        }
    }
    checkRestaurantInLoacalStorage(name,city,image){
        console.table("start")
        //var button = document.getElementById(item.name)
        const item = {
            name:name,
            city: city,
            image: image,
        };
        console.table(item)
        if(localStorage.getItem("Restaurants")){
            var data = localStorage.getItem("Restaurants")
            console.table(data)
            if(data.includes(JSON.stringify(item))){
                this.state.restaurant_icon_class = "fa-minus-circle"
                this.state.restaurant_icon_title = "Remove from plan"
            }
            else{
                this.state.restaurant_icon_class = "fa-plus-circle"
                this.state.restaurant_icon_title = "Add to plan"
            }
        }else{
            this.state.restaurant_icon_class = "fa-plus-circle"
            this.state.restaurant_icon_title = "Add to plan"
        }
    }
    render() {

        const destinationsOptions = {
            stagePadding: 1,
            items: 3,
            loop: false,
            margin:25,
            smartSpeed: 1500,
            autoplay: false,
            dots: false,
            nav: false,
            //loop: true,
            navText : ["<i class='bx bx-chevron-left' ></i>","<i class='bx bx-chevron-right'></i>"],
            responsive:{
                0:{
                    items:1,
                    nav:false,
                    dots : false
                },
                600:{
                    items:2,
                    nav:false,
                    dots : false,
                },
                1000:{
                    items:3,
                    dots: false,
                    nav:false,
                    loop:false
                }
            }
        };
        const placesHTML = []
        const hotelsHTML = []
        const attractionsHTML = []
        const restaurantsHTML =[]
        var addLine =[]
        if (!this.state.places || !this.state.attractions || !this.state.hotels || !this.state.restaurants ) {
            // resource is not yet loaded
  
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
                    </div></div>
            
                    ;
            

        }
        else {
            // places
            const placesArray1 = this.state.places
            
            
         
            for (let i = 0; i < placesArray1.length; i++) {
                placesHTML.push(
                    <div className="offer-card">
                        <Link to={`${process.env.PUBLIC_URL}/aboutCity/${placesArray1[i].name}`}>
                            <div className="offer-thumb">
                                <img src={placesArray1[i].images[1]} alt="" className="img-card" />
                            </div>
                        </Link>
                        <div className="offer-details2">
                            <Link to={`${process.env.PUBLIC_URL}/aboutCity/${placesArray1[i].name}`}>
                                <h3>
                                    <i className="flaticon-arrival icon-beside-word" />
                                    {placesArray1[i].name}
                                </h3>
                            </Link>
                            <i className="flaticon-footprints icon-beside-word"/>
                            <strong>{placesArray1[i].type}</strong>
                        </div>
                    </div>)
            }
            // hotels
            const hotelsArray1 = this.state.hotels
            for (let i = 0; i < hotelsArray1.length; i++) {
                if (hotelsArray1[i].name.length < 30) {
                    console.table(hotelsArray1[i].name.length);
                    addLine.push(<p>&nbsp;</p>  )
                }
                hotelsHTML.push(
                    <div className="offer-card">
                        {this.checkHotelsInLoacalStorage(hotelsArray1[i].name,hotelsArray1[i].city,hotelsArray1[i].images[0],
                            hotelsArray1[i].price)}
                        <Link to={`${process.env.PUBLIC_URL}/hotel/${hotelsArray1[i].city}/${hotelsArray1[i].name}`}>
                            <div className="offer-thumb">
                                <img src={hotelsArray1[i].images[1]} alt="" className="img-card" />
                            </div>
                        </Link> 
                        <div className="offer-details">
                            <i id={hotelsArray1[i].name} className={"fa " +this.state.hotel_icon_class} title={this.state.hotel_icon_title}
                             onClick={
                                () => this.HotelsPlan(hotelsArray1[i].name,hotelsArray1[i].city,hotelsArray1[i].images[0],hotelsArray1[i].price)}>
                            </i>
                            <div className="offer-info">
                                <h5><i className="flaticon-comment" />{hotelsArray1[i].reviewsnum} reviews</h5>
                                <Rating initialValue={hotelsArray1[i].starnum} fillColor={'#ea965d'} size={20} style={React.CSSProperties = { top: '-5px' }} readonly />
                            </div>
                            <Link to={`${process.env.PUBLIC_URL}/hotel/${hotelsArray1[i].city}/${hotelsArray1[i].name}`}>
                                <h3>
                                    <i className="flaticon-arrival icon-beside-word" ></i>
                                    {hotelsArray1[i].name}
                                </h3>
                            </Link>
                            {addLine}
                            
                            <Link to={`${process.env.PUBLIC_URL}/aboutCity/${hotelsArray1[i].city}`}>
                                <p class="city"><i className="flaticon-arrival icon-beside-word"></i>{hotelsArray1[i].city}</p>
                            </Link>
                            {/* <i  id={hotelsArray1[i].name} class= {this.state.icon_class} 
                            onClick={() => this.HotelsPlan(hotelsArray1[i].name,hotelsArray1[i].city,hotelsArray1[i].images[0],hotelsArray1[i].price)} 
                            size="lg"/> */}
                            <p class="aboutcity-price">{hotelsArray1[i].price} EGP</p>
                            
                            
                        </div>
                    </div>)
                addLine=[]
            }
            // attraction
            const attractionsArray1 = this.state.attractions
      
            for (let i = 0; i < attractionsArray1.length; i++) {
                if (attractionsArray1[i].name.length < 30) {
                    console.table(attractionsArray1[i].name.length);
                    addLine.push(<p>&nbsp;</p>  )
                }
                var attraction_type_HTML = []
                if (attractionsArray1[i].typeofattraction == "None") {
                    attraction_type_HTML.push()
                }
                else {
                    var typeofattraction_1 = (attractionsArray1[i].typeofattraction).slice(0, 30);
                    var typeofattraction_2 = (attractionsArray1[i].typeofattraction).slice(30);
                    if (typeofattraction_2 == "") {
                        attraction_type_HTML.push(<p class="city aboutcity-atr-type"><i class="flaticon-traveller icon-beside-word"></i>{typeofattraction_1}</p>)
                    } else {
                        attraction_type_HTML.push(<p class="city aboutcity-atr-type"><i class="flaticon-traveller icon-beside-word"></i>{typeofattraction_1 + "..."}</p>)
                    }
                    
                }
                attractionsHTML.push(
                    <div className="offer-card">
                        {this.checkAttractionInLoacalStorage(attractionsArray1[i].name,attractionsArray1[i].city,attractionsArray1[i].images[0])}
                        <Link to={`${process.env.PUBLIC_URL}/attraction/${attractionsArray1[i].city}/${attractionsArray1[i].name}`}>
                            <div className="offer-thumb">
                                <img src={attractionsArray1[i].images[1]} alt="" className="img-card" />
                            </div>
                        </Link>
                        <div className="offer-details">
                            <i id={attractionsArray1[i].name} className={"fa " +this.state.attraction_icon_class} title={this.state.attraction_icon_title} 
                            onClick={
                                () => this.attractionPlan(attractionsArray1[i].name,attractionsArray1[i].city,attractionsArray1[i].images[0])}>
                            </i>
                            <div className="offer-info">
                                <h5><i className="flaticon-comment" />{attractionsArray1[i].reviewsnum} reviews</h5>
                                <Rating initialValue={attractionsArray1[i].rate} fillColor={'#ea965d'} size={20} style={React.CSSProperties = { top: '-5px' }} readonly />
                            </div>
                            <Link to={`${process.env.PUBLIC_URL}/attraction/${attractionsArray1[i].city}/${attractionsArray1[i].name}`}>
                                <h3><i className="flaticon-arrival icon-beside-word" />
                                    {attractionsArray1[i].name}
                                </h3>
                            </Link>
                            {addLine}
                            <Link to={`${process.env.PUBLIC_URL}/aboutCity/${attractionsArray1[i].city}`}>
                                <p class="city"><i className="flaticon-footprints icon-beside-word"></i>{attractionsArray1[i].city}</p>
                            </Link>
                            {attraction_type_HTML}
                        </div>
                    </div>)
                addLine=[]
            }
            // restaurants
            const restaurantsArray1 = this.state.restaurants
  
            for (let i = 0; i < restaurantsArray1.length; i++) {
                if (restaurantsArray1[i].name.length < 30) {
                    console.table(restaurantsArray1[i].name.length);
                    addLine.push(<p>&nbsp;</p>  )
                }
                var restaurant_cuisines_HTML = []
                if(restaurantsArray1[i].cuisines == "None"){
                    restaurant_cuisines_HTML.push() 
                }else{
                    var cuisines_1 = (restaurantsArray1[i].cuisines).slice(0, 30);
                    var cuisines_2 = (restaurantsArray1[i].cuisines).slice(30);
                    if (cuisines_2 == "") {
                        restaurant_cuisines_HTML.push(<p class="city aboutcity-atr-type"><i class='bx bx-food-menu icon-beside-word'></i>{cuisines_1}</p>)
                    } else {
                        restaurant_cuisines_HTML.push(<p class="city aboutcity-atr-type"><i class='bx bx-food-menu icon-beside-word'></i>{cuisines_1 + "..."}</p>)
                    }
                }
                restaurantsHTML.push(
                    <div className="offer-card">
                        {this.checkRestaurantInLoacalStorage(restaurantsArray1[i].name,restaurantsArray1[i].city,restaurantsArray1[i].images[0])}
                        <Link to={`${process.env.PUBLIC_URL}/restaurant/${restaurantsArray1[i].city}/${restaurantsArray1[i].name}`}>
                            <div className="offer-thumb">
                                <img src={restaurantsArray1[i].images[1]} alt="" className="img-card" />
                            </div>
                        </Link>
                        <div className="offer-details">
                            <i id={restaurantsArray1[i].name} className={"fa " +this.state.restaurant_icon_class} title={this.state.restaurant_icon_title} 
                            onClick={
                                () => this.restaurantsPlan(restaurantsArray1[i].name,restaurantsArray1[i].city,restaurantsArray1[i].images[0])}>
                            </i>
                            <div className="offer-info">
                                <h5><i className="flaticon-comment" />{restaurantsArray1[i].reviewsnum} reviews</h5>
                                <Rating initialValue={restaurantsArray1[i].rate} fillColor={'#ea965d'} size={20} style={React.CSSProperties = { top: '-5px' }} readonly />
                            </div>
                            <Link to={`${process.env.PUBLIC_URL}/restaurant/${restaurantsArray1[i].city}/${restaurantsArray1[i].name}`}>
                            <h3>
                                <i className="flaticon-arrival icon-beside-word" />
                                {restaurantsArray1[i].name} 
                            </h3>
                            </Link>
                            {addLine}
                            <Link to={`${process.env.PUBLIC_URL}/aboutCity/${restaurantsArray1[i].city}`}>
                                <p class="city"><i className="flaticon-footprints icon-beside-word"></i>{restaurantsArray1[i].city}</p>
                            </Link>
                            {restaurant_cuisines_HTML}
                        </div>
                    </div>)
                addLine = [];
            }
        }
                
       
        return (
            <>
                {/* =============== city area start =============== */}

                {/* <div class="ff">mennnnnnna</div> */}
           <div></div>
                <div className="offer-area pt-120" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                        <div align="center" class="section-style">
                                <h5>Your Guide to Egypt</h5>
                                    <h3>Explore tourist destinations </h3>
                                </div>
                        </div>
                    </div>
                    <OwlCarousel  className="offer-slider dark-nav owl-carousel "  {...destinationsOptions}>
                        {placesHTML} 
                        </OwlCarousel>
                        <div align="right">
                            <h6><Link class="see-more" to={`${process.env.PUBLIC_URL}/MoreCities`}>Explore More Cities..</Link></h6>
                        </div>
                </div>
            </div>
            {/* most popular hotels */}
            <div className="offer-area pt-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                        <div align="center" class="section-style">
                                    <h3>Most Popular</h3>
                                </div>
                        <div class="section-style">
                                <h5>Enjoy your stay with our</h5>
                                <h3>Hotel</h3>
                                </div>
                        </div>
                    </div>
                    <OwlCarousel  className="offer-slider dark-nav owl-carousel "  {...destinationsOptions}>
                        {hotelsHTML} 
                    </OwlCarousel>
                </div>
            </div>
            {/* most popular attractions */}
            <div className="offer-area pt-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                        <div class="section-style">
                                <h5>visit famous places by choosing our</h5>
                                    <h3>Attractions</h3>
                                </div>
                        </div>
                    </div>
                    <OwlCarousel  className="offer-slider dark-nav owl-carousel "  {...destinationsOptions}>
                        {attractionsHTML} 
                    </OwlCarousel>
                </div>
            </div>
            {/* most popular restaurants */}
            <div className="offer-area pt-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                        <div class="section-style">
                                <h5>Enjoy your meal with our</h5>
                                <h3>Restaurants</h3>
                                </div>
                        </div>
                    </div>
                    <OwlCarousel  className="offer-slider dark-nav owl-carousel "  {...destinationsOptions}>
                        {restaurantsHTML} 
                    </OwlCarousel>
                </div>
            </div>
            </>
        );
      
    } 
}

 
export default Destinations;