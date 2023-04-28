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
import {addAttractionToPlan} from"../../../assets/js/addToPlan.js"

class AttractionDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            review_date: new Date(),
            date: new Date(),
            weatherDate:new Date(),
            review_title: null,
            review_text: null,
            star_value: 1,
            attractionData: null,
            popularAttractions:null,
            activePage: 1,
            city:null,
            weatherList:[],
            WeatherHtmlArray:[],
            weatherError:null,
            trip_type: "Solo",
            attraction_reviews_HTML: [],
            attraction_reviews_pagination: [],
            attractionReviewsData: [],
            totalItems: null,
            newNoOfReviews: null,
            attraction_icon_class: null,
            attraction_icon_title: null,
            planObj: null,
            popularArray_HTML:[],
            RecommandedSection:[],
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
                    attractionData: data.attractionPostedData[0],
                    popularAttractions:data.popular
                })
            });
    }

    async componentDidMount() {
        this.fetchAuthState()
        this.getProfileInfo()
        this.scrollTop();
        postData(this.props.match.params, "attractions")
        setTimeout(() => {
            this.getData("attractions")
        }, 1100);
        const {city} = this.props.match.params
        this.setState({city: city})
         var weatherErr=await getWeatherData(city,this.state.weatherList,this.state.WeatherHtmlArray,this.state.weatherDate)
        this.setState({
            weatherError: weatherErr
        })
        /*console.table(this.state.weatherError) */
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
        var attraction_review_show = []
        this.state.attraction_reviews_HTML = []
        var size = 5*index;
        var items = array.slice((index-1)*5, size)
        for (let i = 0; i < items.length; i++) {
            var review_01 = (items[i].review).slice(0, 400);
            var review_02 = (items[i].review).slice(400);
            if (review_02 == "") {
                attraction_review_show.push(
                    <p>{review_01} </p>
                )
            } else {
                attraction_review_show.push(
                    <div>
                        <input type="checkbox" class="read-more-state" id={i} />
                        <p className="read-more-wrap">{review_01}<span class="read-more-target">{review_02}</span></p>
                        <label for={i} class="read-more-trigger"></label>
                    </div>
                )
            }
            this.state.attraction_reviews_HTML.push(
                <li className="p-review-card">
                    <div className="p-review-info">
                        <div className="p-reviewr-img">
                            <img src={pr_1} alt="" />
                        </div>
                        <div className="p-reviewer-info">
                            <strong>{items[i].profileName}</strong>
                            <p className="review-date">{items[i].date}</p>
                            <Rating initialValue={items[i].rate} fillColor={'#ea965d'} size={20} style={React.CSSProperties = { top: '-5px' }} readonly />
                        </div>
                    </div>
                    <div className="p-review-texts">
                        <p className="review-title">{items[i].title}</p>
                        {attraction_review_show}
                        <p className="review-dateofstay">{items[i].time}</p>
                    </div>
                    <a href={`#`} className="r-reply-btn"><i className="bx bx-reply" /> Reply</a>
                </li>
            )
            attraction_review_show = [] 

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
        this.state.attraction_reviews_HTML = []
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
                date: "Written" + this.state.date.toDateString(),
                rate: (this.state.star_value).toString(),
                title: this.state.review_title,
                review: this.state.review_text,
                time_typeoftrip: this.state.review_date.toDateString() + " • " + this.state.trip_type,
            }
            const attraction_Details = this.state.attractionData
            this.state.newNoOfReviews = ((this.state.newNoOfReviews)+1)
            await fetch('http://localhost:8000/backend/attractions/add-reviews', {
                method: "POST",
                body: JSON.stringify({
                    city: attraction_Details.city,
                    name: attraction_Details.name,
                    review: review,
                    reviewsnum: this.state.newNoOfReviews
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.state.attractionReviewsData = []
                    this.state.attractionReviewsData = data.review
                    this.state.activePage = Math.ceil((this.state.totalItems+1)/5)
                    this.state.newNoOfReviews = data.reviewsnum
                    this.forceUpdate()
                    review_span.classList.remove("added-review-span")
                    review_span.textContent = " "
                    review_title.value = ""
                    review_body.value = ""
                    this.handelResetStar()
                });
        }  }
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



    fillAttractionData(attraction,attraction_img_HTML,attraction_address_HTML,
        attraction_rate_HTML,attraction_workinghours_HTML,attraction_suggestedduration_HTML,
        attraction_about_HTML,attraction_type_HTML,attraction_images_Html,attraction_ratediv_Html){
        // images
        if (attraction.images == "None") {
            attraction_img_HTML.push(<img className="hotel-base-img main-gallary" src="https://www.hopkinsmedicine.org/sebin/o/m/noimageavailable.png" alt="" />)
        }
        else {
            attraction_img_HTML.push(<img className="hotel-base-img main-gallary" src={attraction.images[0]} alt="" />)
        }
        // address
        if (attraction.address == "None") {
            attraction_address_HTML.push()
        }
        else {
            attraction_address_HTML.push(<p><i className="flaticon-arrival" />{" " + attraction.address}</p>)
        }
        // rate
        if (attraction.rate == "None") {
            attraction_rate_HTML.push(<Rating initialValue={0} fillColor={'#ea965d'} size={20} style={React.CSSProperties = { top: '-5px' }} readonly />)
        }
        else {
            attraction_rate_HTML.push(<Rating initialValue={attraction.rate} fillColor={'#ea965d'} size={20} style={React.CSSProperties = { top: '-5px' }} readonly />)
        }
        // working hours
        if (attraction.workinghours == "None") {
            attraction_workinghours_HTML.push(<p>not provided</p>)
        }
        else {
            attraction_workinghours_HTML.push(<p>{attraction.workinghours}</p>)
        }
        // suggested duration
        if (attraction.suggestedduration == "None") {
            attraction_suggestedduration_HTML.push(<p>not provided</p>)
        }
        else {
            attraction_suggestedduration_HTML.push(<p>{attraction.suggestedduration}</p>)
        }
        // about
        if (attraction.about == "None") {
            attraction_about_HTML.push(<p>{attraction.name + ", " + attraction.city}</p>)
        }
        else {
            var about_01 = (attraction.about).slice(0, 400);
            var about_02 = (attraction.about).slice(400);
            if (about_02 == "") {
                attraction_about_HTML.push(<div><p className="p-about">{about_01} </p></div>)
            } else {
                attraction_about_HTML.push(
                    <div>
                        <input type="checkbox" class="read-more-state" id="about" />
                        <p className="read-more-wrap">{about_01}<span class="read-more-target">{about_02}</span></p>
                        <label for="about" class="read-more-trigger"></label>
                    </div>
                )
            }
        }
        // typeofattraction
        this.checkArray("Type",attraction.typeofattraction,attraction_type_HTML,5)
        // All images
        var attraction_images_Html_temp = []
        if (attraction.images == "None") {
            attraction_images_Html.push(<p className="no-image-p"> No Images Provided</p>)
        } else {
            (attraction.images).forEach(img => {
                attraction_images_Html_temp.push(
                    <a href={img} className="main-gallary">
                        <img src={img} />
                    </a>
                )
            });
            attraction_images_Html.push(
                <div class="wrapper">
                    {attraction_images_Html_temp}
                </div>
            )
        }
        // rate div 
        if(attraction.rate == "None"){
            attraction_ratediv_Html.push()
        }else{
            attraction_ratediv_Html.push(
                <div className="col-lg-12 col-md-6">
                    <div className="p-sidebar-form rating-div">
                        <h5 className="package-d-head rating-title">Rating
                            <p className="rating-p">
                            <span className="attr-rate-span">{attraction.rate}</span>
                            <Rating initialValue={attraction.rate} fillColor={'#ea965d'} size={20} style={React.CSSProperties = { top: '-5px' }} readonly /> 
                            </p>
                        </h5>
                    </div>
                </div>
            )
        }
        //edit no of reviews 
        if(this.state.newNoOfReviews==null)
        {
            this.state.newNoOfReviews = attraction.reviewsnum
        }
        // reviews 
        if(this.state.attractionReviewsData.length===0)
        {       
            this.state.attractionReviewsData = attraction.attractionreview
        }
        this.addReviews(this.state.attractionReviewsData)
        // icon
        this.state.planObj={
            name: attraction.name,
            city: attraction.city,
            image: attraction.images[0],
        }  
    }

    addReviews(review){
          // reviews 
        
        if (review == "None") {
            this.state.attraction_reviews_HTML.push(<p className="no-review-p">Be the first to review</p>)
            this.state.attraction_reviews_HTML = []
            this.state.totalItems = 0
        }
        else {
            this.state.totalItems = (review).length 
            this.reviewspagination(review,this.state.activePage)
            this.state.attraction_reviews_pagination.push(
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
            this.state.attraction_reviews_pagination = []
            
        }
    }

    checkAttractionInLoacalStorage(item){
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
    
    fillPopularPackages(array){
        this.state.popularArray_HTML=[]
        this.state.RecommandedSection=[]
        if(array.length>0){
            array.forEach(item=>{
                var Image=[]
                if(item.images=="None")
                {Image.push( <a href={`${process.env.PUBLIC_URL}/attraction/${item.city}/${item.name}`}>
                        <img src="https://www.hopkinsmedicine.org/sebin/o/m/noimageavailable.png" alt=""style={{height: "90px",minWidth:"110px"}}/>
                        </a> )
                }
                else {
                    Image.push( <a href={`${process.env.PUBLIC_URL}/attraction/${item.city}/${item.name}`}>
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
        this.state.RecommandedSection.push(
            <div className="col-lg-12 col-md-6">
                <div className="p-sidebar-cards mt-40 popular-div">
                    <h5 className="package-d-head">Recommanded Attractions</h5>
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
        
        if (!this.state.attractionData) {
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
        const attraction_Details = this.state.attractionData
        var attraction_img_HTML = []
        var attraction_address_HTML = []
        var attraction_rate_HTML = []
        var attraction_workinghours_HTML = []
        var attraction_suggestedduration_HTML = []
        var attraction_about_HTML = []
        var attraction_type_HTML = []
        var attraction_images_Html = []
        var attraction_ratediv_Html = []
        this.fillAttractionData(attraction_Details,attraction_img_HTML,attraction_address_HTML,attraction_rate_HTML,
            attraction_workinghours_HTML,attraction_suggestedduration_HTML,attraction_about_HTML,attraction_type_HTML,
            attraction_images_Html,attraction_ratediv_Html)
        var all_attraction_type_HTML = []
        this.allArray(attraction_Details.typeofattraction, all_attraction_type_HTML)
        this.checkAttractionInLoacalStorage(this.state.planObj)
        this.fillPopularPackages(this.state.popularAttractions)

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
                                            {attraction_img_HTML}
                                        </SRLWrapper>
                                        <i id={attraction_Details.name} className={"fa "+this.state.attraction_icon_class+" pageDetails"} title={this.state.attraction_icon_title} 
                                        onClick={() => addAttractionToPlan(this.state.planObj)}
                                        > </i> 
                                    </div>
                                    <div className="package-header">
                                        <div className="package-title">
                                            <h3>{attraction_Details.name}</h3>
                                            {attraction_address_HTML}
                                        </div>
                                        <div className="pd-review">
                                             {attraction_rate_HTML}
                                            <p>{attraction_Details.city}</p>
                                            <p>{this.state.newNoOfReviews  + " reviews"} </p>
                                        </div>
                                    </div>
                                    <div>
                                    <div className="p-short-info short-info-div">
                                        <div className="single-info short-info-first">
                                            <i className='bx bx-hotel' />
                                            <div className="info-texts">
                                                <strong>Working Hours</strong>
                                                {attraction_workinghours_HTML}
                                            </div>
                                        </div>
                                        <div className="single-info">
                                            <i className="flaticon-translate" />
                                            <div className="info-texts">
                                                <strong>Suggested Duration for Visiting</strong>
                                                {attraction_suggestedduration_HTML}
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="showMore-div">
                                        <div className="package-tab">
                                            <h3>Details</h3>
                                            <span class="exit" onClick={this.showMoreExit}>X</span>
                                            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                                <li className="nav-item XX" role="presentation">
                                                    <button className="nav-link active" id="pills-amenities-tab" data-bs-toggle="pill" data-bs-target="#pills-amenities" type="button" role="tab" aria-controls="pills-amenities" aria-selected="true"><i className="flaticon-info" />
                                                        Type</button>
                                                </li>
                                            </ul>
                                            <div className="tab-content p-tab-content" id="pills-tabContent">
                                                <div className="tab-pane fade show active" id="pills-amenities" role="tabpanel" aria-labelledby="pills-amenities-tab">
                                                    {all_attraction_type_HTML}
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
                                                                {attraction_about_HTML}
                                                            </div>
                                                            <div className="p-details-table">
                                                                <table className="table caption-top cust-table">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="table-border">City</td>
                                                                            <td className="table-border">{attraction_Details.city}</td>
                                                                        </tr>
                                                                        {attraction_type_HTML}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="p-review review-div-section">
                                                                <h5>Reviews</h5>
                                                                <ul id="reviews-list">
                                                                    {this.state.attraction_reviews_HTML}
                                                                </ul>
                                                                {this.state.attraction_reviews_pagination}
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
                                                                            <h6>Date of Stay</h6>
                                                                            <div className="calendar-input" id="packageCalenderMainDiv">
                                                                                <DatePicker selected={review_date} onChange={(date) => this.changereviewDate(date)} className="input-field check-in" placeholderText="dd-mm-yy" />
                                                                                <i className="flaticon-calendar" id="packageCalenderIcon" />
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-6">
                                                                            <h6>Type of Trip</h6>
                                                                            <select className="select-review-trip" name="Solo" value={this.state.trip_type} onChange={(e) =>this.setState({trip_type: e.target.value})} aria-label="Default select example">
                                                                                <option value={"Solo"} selected>Solo</option>
                                                                                <option value={"Family"}>Family</option>
                                                                                <option value={"Couples"}>Couples</option>
                                                                                <option value={"Friends"}>Friends</option> 
                                                                                <option value={"Business"}>Business</option>
                                                                            </select>
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
                                                        {attraction_images_Html}
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
                                        {attraction_ratediv_Html}
                                        {Weather}                       
                                        {this.state.RecommandedSection}

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

export default withRouter(AttractionDetails);
