import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import { withRouter } from "react-router";
import * as ReactDOM from 'react-dom';
import pr_1 from "../../../assets/images/package/pr-1.png"
import sidebarBannar from "../../../assets/images/sidebar-banner.png";
import { SRLWrapper } from "simple-react-lightbox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postData } from "../../../assets/js/postFetch.js"
import {getWeatherData} from "../../../assets/js/weather.js"
import { Rating } from 'react-simple-star-rating'
import Pagination from "react-js-pagination";
import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {addRestaurantToPlan} from"../../../assets/js/addToPlan.js"

class RestaurantDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            review_date: new Date(),
            date: new Date(),
            weatherDate:new Date(),
            review_title: null,
            review_text: null,
            star_value: 1,
            restaurantData: null,
            activePage: 1,
            city:null,
            weatherList:[],
            WeatherHtmlArray:[],
            weatherError:null,
            trip_type: "Solo",
            restaurant_reviews_HTML: [],
            restaurant_reviews_pagination: [],
            restaurantReviewsData: [],
            totalItems: null,
            newNoOfReviews: null,
            restaurant_icon_class: null,
            restaurant_icon_title: null,
            planObj: null,
            popularRestaurants:null,
            popularArray_HTML:[],
            recommandedSection:[],
            auth_state: null,
            review_span: [],
            user: null
        };
        this.handelTypeOfTrip = this.handelTypeOfTrip.bind(this);
    }
    
    changereviewDate = (date) => {
        this.setState({ review_date: date });
    }

    getData(route) {
        fetch("http://localhost:8000/backend/" + route)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    restaurantData: data.restaurantPostedData[0],
                    popularRestaurants:data.popular
                })
                console.table(this.state.popularRestaurants)

            });
    }

    async componentDidMount() {
        this.fetchAuthState()
        this.getProfileInfo()
        this.scrollTop();
        postData(this.props.match.params,"restaurants")
        setTimeout(() => {
            this.getData("restaurants")
        }, 1100);
        const {city} = this.props.match.params
        this.setState({city: city})
         var weatherErr=await getWeatherData(city,this.state.weatherList,this.state.WeatherHtmlArray,this.state.weatherDate)
        this.setState({
            weatherError: weatherErr
        })
       /* console.table(this.state.weatherError) */
    }

    scrollTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    ShowMoreAppearance() {
        var main_div = document.querySelector(".showMore-div")
        var overlay = document.querySelector("#hotel-overlay")
        overlay.classList.add("appear");
        main_div.classList.add("appear");
    }

    showMoreExit() {
        var main_div = document.querySelector(".showMore-div")
        var overlay = document.querySelector("#hotel-overlay")
        overlay.classList.remove("appear");
        main_div.classList.remove("appear");
    }


    allArray(type, array_HTML1) {
        if (type === "None") {
            array_HTML1.push()
        }
        else {
            for (let i = 0; i < type.length; i++) {
                array_HTML1.push(
                    <div className="more-details"><i className="bx bx-check" /> {type[i]} </div>
                )
            }
        }
    }

    handelTypeOfTrip(value){
        this.state.trip_type = value
        console.table(this.state.trip_type)
    }

    async handlePageChange(array,pageNumber) {
        this.setState({activePage: await pageNumber});
        this.reviewspagination(array,this.state.activePage)
    }

    reviewspagination(array,index)
    {
        var restaurant_review_show = []
        this.state.restaurant_reviews_HTML = []
        var size = 5*index;
        var items = array.slice((index-1)*5, size)
        for (let i = 0; i < items.length; i++) {
            var review_01 = (items[i].review).slice(0, 400);
            var review_02 = (items[i].review).slice(400);
            if (review_02 == "") {
                restaurant_review_show.push(
                    <p>{review_01} </p>
                )
            } else {
                restaurant_review_show.push(
                    <div>
                        <input type="checkbox" class="read-more-state" id={i} />
                        <p className="read-more-wrap">{review_01}<span class="read-more-target">{review_02}</span></p>
                        <label for={i} class="read-more-trigger"></label>
                    </div>
                )
            }
            this.state.restaurant_reviews_HTML.push(
                <li className="p-review-card">
                    <div className="p-review-info">
                        <div className="p-reviewr-img">
                            <img src={pr_1} alt="" />
                        </div>
                        <div className="p-reviewer-info">
                            <strong>{items[i].profileName}</strong>
                            <p className="review-date">{items[i].date_of_review}</p>
                            <Rating initialValue={items[i].rate} fillColor={'#ea965d'} size={20} style={React.CSSProperties = { top: '-5px' }} readonly />
                        </div>
                    </div>
                    <div className="p-review-texts">
                        <p className="review-title">{items[i].title}</p>
                        {restaurant_review_show}
                        <p className="review-dateofstay">{items[i].date_of_visit}</p>
                    </div>
                    <a href={`#`} className="r-reply-btn"><i className="bx bx-reply" /> Reply</a>
                </li>
            )
            restaurant_review_show = [] 

        }
    }

    handelRviewRate(rate){
        if(rate == 20){
            var num = 1
        }else if(rate == 40){
            num = 2
        }else if(rate == 60){
            num = 3
        }else if(rate == 80){
            num = 4
        }else if (rate == 100){
            num = 5
        }
        this.setState({star_value: num})
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    async fetchAuthState() {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        if (localStorage.getItem("token")) {
            myHeaders.append('Authorization', `Bearer ${localStorage.getItem("token")}`);
        }
        fetch('http://localhost:8000/backend/plan', {
            method: 'GET',
            headers: myHeaders
        }).then(response => response.json())
            .then(data => {
                this.setState({
                    auth_state: data
                });
                console.table("++++++++++++")
                console.table(data)
            });
    }

    async getProfileInfo() {
        await fetch('http://localhost:8000/backend/profile', {
          method: "POST",
          body: JSON.stringify({
          token: localStorage.getItem("token")
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then(response => response.json())
          .then(data => {
            this.setState({
              user: data.user[0]
            });
            console.table(this.state.user)
          });
      }
    
    async fetchReview(){
        var review_span = document.querySelector(".review-span")
        var review_title = document.querySelector(".reviews-title")
        var review_body = document.querySelector(".reviews-body")
        this.state.restaurant_reviews_HTML = []
        if(this.state.auth_state == "signedIn"){
        if(this.state.trip_type == null || this.state.review_text == null || this.state.review_text == "" || this.state.review_title == null || this.state.review_title == ""){
            review_span.classList.add("error-review-span") 
            review_span.textContent = "Please fill all fields!!"
            console.table("!!!!")
        }else{
            review_span.classList.remove("error-review-span")
            review_span.classList.add("added-review-span")
            review_span.textContent = "Your review has been added"
            var review = {
                profilename: this.state.user.username,
                date_of_review: this.state.date.toDateString(),
                rate: (this.state.star_value).toString(),
                title: this.state.review_title,
                review: this.state.review_text,
                date_of_visit: this.state.review_date.toDateString(),
            }
            const restaurant_Details = this.state.restaurantData
            this.state.newNoOfReviews = ((this.state.newNoOfReviews)+1)
            await fetch('http://localhost:8000/backend/restaurants/add-reviews', {
                method: "POST",
                body: JSON.stringify({
                    city: restaurant_Details.city,
                    name: restaurant_Details.name,
                    review: review,
                    reviewsnum: this.state.newNoOfReviews
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.state.restaurantReviewsData = []
                    this.state.restaurantReviewsData = data.review
                    this.state.activePage = Math.ceil((this.state.totalItems+1)/5)
                    this.state.newNoOfReviews = data.reviewsnum
                    this.forceUpdate()
                    review_span.classList.remove("added-review-span")
                    review_span.textContent = " "
                    review_title.value = ""
                    review_body.value = ""
                    this.handelResetStar()
                });
        } }
        else{
            this.state.review_span=[]
            this.state.review_span.push( <span className="review-span error-review-span">Please <a href={`${process.env.PUBLIC_URL}/registeration`}>SignIn</a> First!!</span>)
            this.forceUpdate()
        }
        
    }

    handelResetStar(){
        this.setState({star_value: 1})
    }

    checkArray(type, array, array_HTML1, index) {
        var array_HTML2 = []
        var array_HTML3
        if (array === "None") {
            array_HTML1.push()
        } else {
            if (array.length > index) {
                for (let i = 0; i < index; i++) {
                    array_HTML2.push(
                        <li><i className="bx bx-check" /> {array[i]} </li>
                    )
                }
                array_HTML3 = <a className="hotel-see-more" href="javascript:void(0)" onClick={this.ShowMoreAppearance}>Show more</a>
            } else {
                for (let i = 0; i < array.length; i++) {
                    array_HTML2.push(
                        <li><i className="bx bx-check" /> {array[i]} </li>
                    )
                }
            }
            array_HTML1.push(
                <tr>
                    <td className="table-border">{type}</td>
                    <td className="td-position table-border">
                        <ul className="table-list-allow">{array_HTML2}</ul>
                        {array_HTML3}
                    </td>
                </tr>
            )
            array_HTML2 = []
            array_HTML3 = ''
        }
    }



    fillrestaurantData(restaurant,restaurant_img_HTML,restaurant_address_HTML,
        restaurant_rate_HTML,restaurant_workinghours_HTML,restaurant_telephone_HTML,
        restaurant_about_HTML,restaurant_menulink_HTML,restaurant_pricerange_HTML,restaurant_images_Html,restaurant_ratediv_Html,restaurant_cuisines_HTML,restaurant_meals_HTML,restaurant_features_HTML,restaurant_specialdiets_HTML){
        // images
        if (restaurant.images == "None") {
            restaurant_img_HTML.push(<img className="hotel-base-img main-gallary" src="https://www.hopkinsmedicine.org/sebin/o/m/noimageavailable.png" alt="" />)
        }
        else {
            restaurant_img_HTML.push(<img className="hotel-base-img main-gallary" src={restaurant.images[0]} alt="" />)
        }
        // address
        if (restaurant.address == "None") {
            restaurant_address_HTML.push()
        }
        else {
            restaurant_address_HTML.push(<p><i className="flaticon-arrival" />{" " + restaurant.address}</p>)
        }
        // rate
        if (restaurant.rate == "None") {
            restaurant_rate_HTML.push(<Rating initialValue={0} fillColor={'#ea965d'} size={20} style={React.CSSProperties = { top: '-5px' }} readonly />)
        }
        else {
            restaurant_rate_HTML.push(<Rating initialValue={restaurant.rate} fillColor={'#ea965d'} size={20} style={React.CSSProperties = { top: '-5px' }} readonly />)
        }
        // working hours
        if (restaurant.workinghours == "None") {
            restaurant_workinghours_HTML.push(<p>not provided</p>)
        }
        else {
            restaurant_workinghours_HTML.push(<p>{restaurant.workinghours}</p>)
        }
        // telephone
        if (restaurant.telephone == "None") {
            restaurant_telephone_HTML.push(<p>not provided</p>)
        }
        else {
            restaurant_telephone_HTML.push(<p>{restaurant.telephone}</p>)
        }
        // menu link
        if (restaurant.menulink == "None") {
            restaurant_menulink_HTML.push()
        }
        else {
            restaurant_menulink_HTML.push(
            <div className="single-info short-info-first">
                <i className="bx bx-food-menu" />
                <div className="info-texts">
                <strong>Menu</strong>
                    <a href={restaurant.menulink}><p>visit our page</p> </a>
                </div>
            </div>)
        }
        // price Range
        if (restaurant.pricerange == "None") {
            restaurant_pricerange_HTML.push()
        }
        else {
            restaurant_pricerange_HTML.push(
            <tr>
                <td className="table-border">price Range</td>
                <td className="table-border">{restaurant.pricerange}</td>
            </tr>)
               
        }
        // about
        if (restaurant.about == "None") {
            restaurant_about_HTML.push(<p>{restaurant.name + ", " + restaurant.city}</p>)
        }
        else {
            var about_01 = (restaurant.about).slice(0, 400);
            var about_02 = (restaurant.about).slice(400);
            if (about_02 == "") {
                restaurant_about_HTML.push(<div><p className="p-about">{about_01} </p></div>)
            } else {
                restaurant_about_HTML.push(
                    <div>
                        <input type="checkbox" class="read-more-state" id="about" />
                        <p className="read-more-wrap">{about_01}<span class="read-more-target">{about_02}</span></p>
                        <label for="about" class="read-more-trigger"></label>
                    </div>
                )
            }
        }
        // cuisines
         this.checkArray("Cuisines", restaurant.cuisines,restaurant_cuisines_HTML,6)
        //meals
        this.checkArray("Meals", restaurant.meals,restaurant_meals_HTML,6)
        //features
        this.checkArray("Features", restaurant.features,restaurant_features_HTML,6)
        //specialdiets
        this.checkArray("Sepical Diets", restaurant.specialdiets,restaurant_specialdiets_HTML,6)

        // All images
        var restaurant_images_Html_temp = []
        if (restaurant.images == "None") {
            restaurant_images_Html.push(<p className="no-image-p"> No Images Provided</p>)
        } else {
            (restaurant.images).forEach(img => {
                restaurant_images_Html_temp.push(
                    <a href={img} className="main-gallary">
                        <img src={img} />
                    </a>
                )
            });
            restaurant_images_Html.push(
                <div class="wrapper">
                    {restaurant_images_Html_temp}
                </div>
            )
        }
        // rate div 
        if(restaurant.rate == "None"){
            restaurant_ratediv_Html.push()
        }else{
            restaurant_ratediv_Html.push(
                <div className="col-lg-12 col-md-6">
                    <div className="p-sidebar-form rating-div">
                        <h5 className="package-d-head rating-title">Rating
                            <p className="rating-p">
                            <span className="attr-rate-span">{restaurant.rate}</span>
                            <Rating initialValue={restaurant.rate} fillColor={'#ea965d'} size={20} style={React.CSSProperties = { top: '-5px' }} readonly /> 
                            </p>
                        </h5>
                    </div>
                </div>
            )
        }
        // //edit no of reviews 
        if(this.state.newNoOfReviews==null)
        {
            this.state.newNoOfReviews = restaurant.reviewsnum
        }
        // reviews 
        if(this.state.restaurantReviewsData.length===0)
        {       
            this.state.restaurantReviewsData = restaurant.attractionreview
        }
        this.addReviews(this.state.restaurantReviewsData)
        // icon
        this.state.planObj={
            name: restaurant.name,
            city: restaurant.city,
            image: restaurant.images[0],
        }  
    }

    addReviews(review){
          // reviews 
        
        if (review == "None") {
            this.state.restaurant_reviews_HTML.push(<p className="no-review-p">Be the first to review</p>)
            this.state.restaurant_reviews_HTML = []
            this.state.totalItems = 0
        }
        else {
            this.state.totalItems = (review).length 
            this.reviewspagination(review,this.state.activePage)
            this.state.restaurant_reviews_pagination.push(
            <div className="row">
                <div className="col-lg-12">
                    <div className="custom-pagination mt-40">
                            <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={5}
                            totalItemsCount={this.state.totalItems}
                            pageRangeDisplayed={3}
                            onChange={this.handlePageChange.bind(this,review)}
                            innerClass={"inner-pagination"}
                            />
                    </div>
                </div>
            </div>
            )
            this.state.restaurant_reviews_pagination = []
            
        }
    }

  checkRestaurantInLoacalStorage(item){
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
    fillPopularPackages(array){
        this.state.popularArray_HTML=[]
        this.state.recommandedSection=[]
        if(array.length>0){
            array.forEach(item=>{
                var Image=[]
                if(item.images=="None")
                { Image.push(
                        <a href={`${process.env.PUBLIC_URL}/restaurant/${item.city}/${item.name}`}>
                        <img src="https://www.hopkinsmedicine.org/sebin/o/m/noimageavailable.png" alt=""style={{height: "90px",minWidth:"110px"}}/>
                        </a> )
                }
                else {
                    Image.push( <a href={`${process.env.PUBLIC_URL}/restaurant/${item.city}/${item.name}`}>
                     <img src={item.images[0]} alt="" style={{height: "90px",minWidth:"110px"}} />
                    </a>
                   )
                }
                this.state.popularArray_HTML.push(
                    <li className="package-card-sm">
                    <div className="p-sm-img">
                    {Image}
                    </div>
                    <div className="package-info">
                        <a href={`${process.env.PUBLIC_URL}/restaurant/${item.city}/${item.name}`}>
                            <div className="package-date-sm">
                                <h3><strong>{item.name}</strong></h3>
                            </div>
                        </a>
                        <a href={`${process.env.PUBLIC_URL}/aboutCity/${item.city}`}>
                            <p><i className="flaticon-arrival" />
                                {item.city}
                            </p>
                        </a>
                        <h5><span>{item.reviewsnum}</span> Reviews</h5>
                    </div>
                </li>)
        })
        this.state.recommandedSection.push( 
        <div className="col-lg-12 col-md-6">
            <div className="p-sidebar-cards mt-40 popular-div">
                <h5 className="package-d-head">Recommanded Restaurants</h5>
                <ul className="package-cards">
                    {this.state.popularArray_HTML}
                </ul>
              </div>
        </div>)
        }
    
    }
    render() {
        const destinationsOptions = {
            stagePadding: 1,
            items: 3,
            loop: true,
            margin:25,
            smartSpeed: 1500,
            autoplay: false,
            dots: false,
            nav: false,
            //loop: true,
            navText : [''],
            responsive:{
                0:{
                    items:1,
                    nav:false,
                    dots : false
                },
                600:{
                    items:1,
                    nav:false,
                    dots : false,
                },
                1000:{
                    items:1,
                    dots: true,
                    nav:false,
                    loop:true
                }
            }
        };
        
        const review_date = this.state.review_date;
        
        if (!this.state.restaurantData) {
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
                    </div></div>;
        }
        //console.table(this.state.attractionData)
        const restaurant_Details = this.state.restaurantData
        var restaurant_img_HTML = []
        var restaurant_address_HTML = []
        var restaurant_rate_HTML = []
        var restaurant_workinghours_HTML = []
        var restaurant_telephone_HTML = []
        var restaurant_about_HTML = []
        var restaurant_pricerange_HTML = []
        var restaurant_images_Html = []
        var restaurant_ratediv_Html = []
        var restaurant_menulink_HTML=[]
        var restaurant_cuisines_HTML=[]
        var restaurant_meals_HTML=[]
        var restaurant_features_HTML=[]
        var restaurant_specialdiets_HTML=[]
        this.fillrestaurantData(restaurant_Details,restaurant_img_HTML,restaurant_address_HTML,restaurant_rate_HTML,
            restaurant_workinghours_HTML,restaurant_telephone_HTML,restaurant_about_HTML,restaurant_menulink_HTML,restaurant_pricerange_HTML,
            restaurant_images_Html,restaurant_ratediv_Html,restaurant_cuisines_HTML,restaurant_meals_HTML,restaurant_features_HTML,restaurant_specialdiets_HTML)
        var all_restaurant_cuisines_HTML = []
        var all_restaurant_meals_HTML = []
        var all_restaurant_features_HTML=[]
        var all_restaurant_specialDiets_HTML=[]
        this.allArray(restaurant_Details.cuisines, all_restaurant_cuisines_HTML)
        this.allArray(restaurant_Details.meals, all_restaurant_meals_HTML)
        this.allArray(restaurant_Details.features, all_restaurant_features_HTML)
        this.allArray(restaurant_Details.specialdiets, all_restaurant_specialDiets_HTML)
        this.checkRestaurantInLoacalStorage(this.state.planObj)
        this.fillPopularPackages(this.state.popularRestaurants)
        const tooltipArray = [
            '1','2','3','4','5'
        ]
        var Weather=[]
        //weather
        if(this.state.weatherError!=="Not Found City")
        {
         Weather.push(
            <div className="col-lg-12 col-md-6">
                <div className="p-sidebar-organizer mt-40 weather-div">
                    <h5 className="package-d-head">{this.state.city} Weather </h5>
                    <OwlCarousel  className="offer-slider dark-nav owl-carousel "  {...destinationsOptions}>
                        {this.state.WeatherHtmlArray} 
                    </OwlCarousel>

                </div>
            </div>
         )
        }
        
        return (
            
            <>
                <div id="hotel-overlay" className="overlay"></div>
                {/* ===============  breadcrumb area end =============== */}
                <div className="package-details-wrapper pt-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="package-details">
                                    <div className="package-thumb parentDetails">
                                        <SRLWrapper>
                                            {restaurant_img_HTML}
                                        </SRLWrapper>
                                        <i id={restaurant_Details.name} className={"fa "+this.state.restaurant_icon_class+" pageDetails"} title={this.state.restaurant_icon_title} 
                                        onClick={() => addRestaurantToPlan(this.state.planObj)}
                                        />
                                    </div>
                                    <div className="package-header">
                                        <div className="package-title">
                                            <h3>{restaurant_Details.name}</h3>
                                            {restaurant_address_HTML}
                                        </div>
                                        <div className="pd-review">
                                             {restaurant_rate_HTML}
                                            <p>{restaurant_Details.city}</p>
                                            <p>{this.state.newNoOfReviews  + " reviews"} </p>
                                        </div>
                                    </div>
                                    <div>
                                    <div className="p-short-info short-info-div">
                                        <div className="single-info short-info-first">
                                        <i className="flaticon-clock"/>
                                            <div className="info-texts">
                                                <strong>Working Hours</strong>
                                                {restaurant_workinghours_HTML}
                                            </div>
                                        </div>
                                        <div className="single-info short-info-first">
                                            <i className="bx bx-phone-call" />
                                            <div className="info-texts">
                                                <strong>Telephone</strong>
                                                {restaurant_telephone_HTML}
                                            </div>
                                        </div>
                                        {restaurant_menulink_HTML}
                                        
                                    </div>
                                    </div>
                                    <div className="showMore-div">
                                        <div className="package-tab">
                                        <h3>Details</h3>
                                            <span class="exit" onClick={this.showMoreExit}>X</span>
                                            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                                <li className="nav-item XX" role="presentation">
                                                    <button className="nav-link active" id="pills-cuisine-tab" data-bs-toggle="pill" data-bs-target="#pills-cuisine" type="button" role="tab" aria-controls="pills-cuisine" aria-selected="true"><i className="bx bx-food-menu"/>
                                                        Cuisines</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="pills-meals-tab" data-bs-toggle="pill" data-bs-target="#pills-meals" type="button" role="tab" aria-controls="pills-meals" aria-selected="false"><i class="bx bx-dish"/>
                                                       Meals</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="pills-features-tab" data-bs-toggle="pill" data-bs-target="#pills-features" type="button" role="tab" aria-controls="pills-features" aria-selected="false"><i class="bx bx-detail"/>
                                                       Features</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="pills-specialDiets-tab" data-bs-toggle="pill" data-bs-target="#pills-specialDiets" type="button" role="tab" aria-controls="pills-specialDiets" aria-selected="false"><i class=" bx bx-restaurant"/>
                                                       Special Diets </button>
                                                </li>
                                               
                                            </ul>
                                            <div className="tab-content p-tab-content" id="pills-tabContent">
                                                <div className="tab-pane fade show active" id="pills-cuisine" role="tabpanel" aria-labelledby="pills-cuisine-tab">
                                                    {all_restaurant_cuisines_HTML}
                                                </div>
                                           
                                                <div className="tab-pane fade show " id="pills-meals" role="tabpanel" aria-labelledby="pills-meals-tab">
                                                    {all_restaurant_meals_HTML}
                                                </div>

                                                <div className="tab-pane fade show " id="pills-features" role="tabpanel" aria-labelledby="pills-features-tab">
                                                    {all_restaurant_features_HTML}
                                                </div>
                                                <div className="tab-pane fade show " id="pills-specialDiets" role="tabpanel" aria-labelledby="pills-specialDiets-tab">
                                                    {all_restaurant_specialDiets_HTML}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="package-tab">
                                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"><i className="flaticon-info" />
                                                    Information</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false"> <i className="flaticon-gallery" />
                                                    Our Gallary</button>
                                            </li>
                                        </ul>
                                        <div className="tab-content p-tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="tab-content-1">
                                                            <div className="p-overview">
                                                                <h5>About</h5>
                                                                {restaurant_about_HTML}
                                                            </div>
                                                            <div className="p-details-table">
                                                                <table className="table caption-top cust-table">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="table-border">City</td>
                                                                            <td className="table-border">{restaurant_Details.city}</td>
                                                                        </tr>
                                                                        {/*attraction_type_HTML*/}
                                                                        {restaurant_cuisines_HTML}
                                                                        {restaurant_meals_HTML}
                                                                        {restaurant_features_HTML}
                                                                        {restaurant_specialdiets_HTML}
                                                                        {restaurant_pricerange_HTML}
                                                                        
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="p-review review-div-section">
                                                                <h5>Reviews</h5>
                                                                <ul id="reviews-list">
                                                                    {this.state.restaurant_reviews_HTML}
                                                                </ul>
                                                                {this.state.restaurant_reviews_pagination}
                                                            </div>
                                                            <div className="p-review-input">
                                                                <form onSubmit={this.handleSubmit}>
                                                                    <h5>Add Review</h5>
                                                                    <div className="row">
                                                                        <div className="col-lg-6">
                                                                            <h6>Title</h6>
                                                                            <input className="reviews-title" type="text" placeholder="Write Your Title" onChange={(e) => this.setState({ review_title: e.target.value })}/>
                                                                        </div>
                                                                        <div class="col-lg-6">
                                                                            <h6>Date of Visit</h6>
                                                                            <div className="calendar-input" id="packageCalenderMainDiv">
                                                                                <DatePicker selected={review_date} onChange={(date) => this.changereviewDate(date)} className="input-field check-in" placeholderText="dd-mm-yy" />
                                                                                <i className="flaticon-calendar" id="packageCalenderIcon" />
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-lg-12">
                                                                            <h6>Review</h6>
                                                                            <textarea className="reviews-body" cols={30} rows={7} placeholder="Write Your Review" defaultValue={""} onChange={(e) => this.setState({ review_text: e.target.value })} />
                                                                        </div>
                                                                        <div className="col-lg-12">
                                                                            <Rating ratingValue={this.state.star_value} tooltipArray={tooltipArray} onClick={(rate)=> this.handelRviewRate(rate)} fillColor={'#ea965d'} size={30} style={React.CSSProperties = { top: '-5px', marginBottom: '30px' }}/>
                                                                        </div>
                                                                        <div className="col-lg-12">
                                                                            <input type="submit" defaultValue="Submit Now" onClick={() => this.fetchReview()}/>
                                                                            <span className="review-span"></span>
                                                                            {this.state.review_span}
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                                <div className="tab-contant-3">
                                                    <SRLWrapper>
                                                        {restaurant_images_Html}
                                                    </SRLWrapper>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="package-d-sidebar">
                                    <div className="row">
                                        {restaurant_ratediv_Html}
                                        {Weather}                       
                                        {this.state.recommandedSection}
                                        <div className="col-lg-12 col-md-6">
                                            <div className="p-sidebar-banner mt-40">
                                                <img src={sidebarBannar} alt="" className="img-fluid" />
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
            </>
        );
    }
}

export default withRouter(RestaurantDetails);
