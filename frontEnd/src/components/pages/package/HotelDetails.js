import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import { withRouter } from "react-router";
import pr_1 from "../../../assets/images/package/pr-1.png"
import sidebarBannar from "../../../assets/images/sidebar-banner.png";
import { SRLWrapper } from "simple-react-lightbox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postData } from "../../../assets/js/postFetch.js"
import { getWeatherData } from "../../../assets/js/weather.js"
import { Rating } from 'react-simple-star-rating'
import Pagination from "react-js-pagination";
import { TopologyDescriptionChangedEvent } from "mongodb";
import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { addHotelToPlan } from "../../../assets/js/addToPlan.js"

class PackageDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chick_in_date: new Date(),
            chick_out_date: new Date(),
            review_date: new Date(),
            date: new Date(),
            weatherDate: new Date(),
            review_title: null,
            review_text: null,
            hotel_reviews_HTML: [],
            hotel_reviews_pagination: [],
            hotelReviewsData: [],
            newNoOfReviews: null,
            totalItems: null,
            star_value: 1,
            hotelData: null,
            activePage: 1,
            city: null,
            weatherList: [],
            WeatherHtmlArray: [],
            weatherError: null,
            noRoom: null,
            adult: null,
            child: null,
            isEnabled: false,
            isEnabledAdult: false,
            totalPrice: null,
            planObj: null,
            hotel_icon_class: null,
            hotel_icon_title: null,
            popularHotels: null,
            popularArray_HTML: [],
            recommandedSection: [],
            noRoom: null,
            adult: null,
            child: null,
            fields: {},
            errors: {},
            auth_state: null,
            review_span: [],
            user: null,
            BookState:[]
        };
        let fields = this.state.fields;
        fields["adult"] = null;
        fields["noRoom"] = null;
        fields["child"] = null;
    }
    changeCheckInDate = (date) => {
        this.setState({ chick_in_date: date });
    }
    changeCheckOutDate = (date) => {
        this.setState({ chick_out_date: date });
    }
    comparison = (value) => {
        if (value <= this.state.hotelData.Numofrooms) {
            this.setState({ noRoom: value })
            this.setState({ isEnabled: false })
            if (value > this.state.adult) {
                this.setState({ adult: value })
                alert('Oops! each room must have at least 1 adult .');

            }
        }
        else {
            this.setState({ isEnabled: true })
            console.table(this.state.isEnabled);
        }
    }
    roomAdult = (value) => {
        if (this.state.noRoom > value) {
            this.setState({ adult: this.state.noRoom })
            this.setState({ isEnabledAdult: false })
            alert('Oops! each room must have at least 1 adult .');
        }
        else if ((value - this.state.noRoom) >= 2) {
            this.setState({ adult: null })
            this.setState({ isEnabledAdult: true })
            alert('Oops! no more than 2 adults in one room. Please try again!');
        }
        else {
            this.setState({ adult: value })
            this.setState({ isEnabledAdult: false })

        }
        console.table(this.state.adult)
    }

    changereviewDate = (date) => {
        this.setState({ review_date: date });
    }

    requiredFields() {
        if (!this.state.chick_in_date || !this.state.chick_out_date || !this.state.noRoom || !this.state.adult) {
            alert("enter all fields")
        }
    }
    fetchData() {
        fetch("http://localhost:8000/hotelReservationDetails",
            {
                method: "POST",
                body: JSON.stringify({
                    check_in: this.state.chick_in_date.toLocaleDateString(),
                    noOfRooms: this.state.fields["noRoom"],
                    check_out: this.state.chick_out_date.toLocaleDateString(),
                    adult: this.state.fields["adult"],
                    child: this.state.fields["child"],
                    hotelName: this.state.hotelData.name,
                    price: this.state.hotelData.price,
                    user_id: "1234",
                    totalNumofrooms: this.state.hotelData.Numofrooms

                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
        // toLocaleDateString(),
        //console.table(noOfRooms);


        // diffInMs=diffInMs / (1000 * 60 * 60 * 24);        
        // var totalPrice = this.state.hotelData.price * diffInMs * this.state.fields["noRoom"];
        //alert("your is "+parseInt(totalPrice));
        //this.setState()
        //window.location.replace("./components/pages/package/PackageDetails");
        // console.table(parseInt(totalPrice));
        // console.table(this.state.chick_in_date);
        //  console.table(this.state.fields["noRoom"]);

    }

    handle(e) {
        e.preventDefault();
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    getData(route) {
        fetch("http://localhost:8000/backend/" + route)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    hotelData: data.hotelPostedData[0],
                    popularHotels: data.popular
                })
            });
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

    async componentDidMount() {
        this.fetchAuthState()
        this.getProfileInfo()
        this.scrollTop();
        postData(this.props.match.params, "hotels")
        setTimeout(() => {
            this.getData("hotels")
        }, 1100);
        const { city } = this.props.match.params
        this.setState({ city: city })
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

    async handlePageChange(array, pageNumber) {
        this.setState({ activePage: await pageNumber });
        this.reviewspagination(array, this.state.activePage)
    }

    reviewspagination(array, index) {
        var hotel_review_show = []
        this.state.hotel_reviews_HTML = []
        var size = 5 * index;
        var items = array.slice((index - 1) * 5, size)
        for (let i = 0; i < items.length; i++) {
            var review_01 = (items[i].review).slice(0, 400);
            var review_02 = (items[i].review).slice(400);
            if (review_02 == "") {
                hotel_review_show.push(
                    <p>{review_01} </p>
                )
            } else {
                hotel_review_show.push(
                    <div>
                        <input type="checkbox" class="read-more-state" id={i} />
                        <p className="read-more-wrap">{review_01}<span class="read-more-target">{review_02}</span></p>
                        <label for={i} class="read-more-trigger"></label>
                    </div>
                )
            }
            this.state.hotel_reviews_HTML.push(
                <li className="p-review-card">
                    <div className="p-review-info">
                        <div className="p-reviewr-img">
                            <img src={pr_1} alt="" />
                        </div>
                        <div className="p-reviewer-info">
                            <strong>{items[i].profileName}</strong>
                            <p className="review-date">{items[i].date}</p>
                            <Rating initialValue={items[i].rate[0]} fillColor={'#ea965d'} size={20} style={React.CSSProperties = { top: '-5px' }} readonly />
                        </div>
                    </div>
                    <div className="p-review-texts">
                        <p className="review-title">{items[i].title}</p>
                        {hotel_review_show}
                        <p className="review-dateofstay">{items[i].dateOfStay}</p>
                    </div>
                    <Link to={`#`} className="r-reply-btn"><i className="bx bx-reply" /> Reply</Link>
                </li>
            )
            hotel_review_show = []

        }

    }

    handelRviewRate(rate) {
        if (rate == 20) {
            var num = 1
        } else if (rate == 40) {
            num = 2
        } else if (rate == 60) {
            num = 3
        } else if (rate == 80) {
            num = 4
        } else if (rate == 100) {
            num = 5
        }
        this.setState({ star_value: num })
    }

    async fetchReview() {
        var review_span = document.querySelector(".review-span")
        var review_title = document.querySelector(".reviews-title")
        var review_body = document.querySelector(".reviews-body")
        if(this.state.auth_state == "signedIn"){
        if (this.state.review_text == null || this.state.review_text == "" || this.state.review_title == null || this.state.review_title == "") {
            review_span.classList.add("error-review-span")
            review_span.textContent = "Please fill all fields!!"
        } else {
            review_span.classList.remove("error-review-span")
            review_span.classList.add("added-review-span")
            review_span.textContent = "Your review has been added"
            var review = {
                profilename: this.state.user.username,
                date: " wrote a review " + this.state.date.toDateString(),
                rate: (this.state.star_value).toString(),
                title: this.state.review_title,
                review: this.state.review_text,
                dateofsaty: "Date of stay: " + this.state.review_date.toDateString(),
            }
            const hotel_Details = this.state.hotelData
            this.state.newNoOfReviews = ((this.state.newNoOfReviews) + 1)
            await fetch("http://localhost:8000/backend/hotels/add-reviews", {
                method: "POST",
                body: JSON.stringify({
                    city: hotel_Details.city,
                    name: hotel_Details.name,
                    review: review,
                    reviewsnum: this.state.newNoOfReviews
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.state.hotelReviewsData = []
                    this.state.hotelReviewsData = data.review
                    this.state.activePage = Math.ceil((this.state.totalItems + 1) / 5)
                    this.state.newNoOfReviews = data.reviewsnum
                    this.forceUpdate()
                    review_span.classList.remove("added-review-span")
                    review_span.textContent = " "
                    review_title.value = ""
                    review_body.value = ""
                    this.handelResetStar()
                });
        }
    }else{
        console.table("not signeddd")
        this.state.review_span=[]
        this.state.review_span.push( <span className="review-span error-review-span">Please <a href={`${process.env.PUBLIC_URL}/registeration`}>SignIn</a> First!!</span>)
        this.forceUpdate()
    }
    
    }

    handelResetStar() {
        this.setState({ star_value: 1 })
    }

    addReview(hotel_reviews) {
        console.table(hotel_reviews)
        if (hotel_reviews == "None") {
            this.state.hotel_reviews_HTML.push(<p className="no-review-p">Be the first to review</p>)
            this.state.hotel_reviews_HTML = []
            this.state.totalItems = 0
        }
        else {
            this.state.totalItems = (hotel_reviews).length
            this.reviewspagination(hotel_reviews, this.state.activePage)
            this.state.hotel_reviews_pagination.push(
                <div className="row">
                    <div className="col-lg-12">
                        <div className="custom-pagination mt-40">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={5}
                                totalItemsCount={this.state.totalItems}
                                pageRangeDisplayed={3}
                                onChange={this.handlePageChange.bind(this, hotel_reviews)}
                                innerClass={"inner-pagination"}
                            />
                        </div>
                    </div>
                </div>
            )
            this.state.hotel_reviews_pagination = []
        }
    }

    fillHotelData(hotel_Details, hotel_img_HTML, hotel_Price_HTML, hotel_Rooms_HTML, hotel_languages_HTML, hotel_telephone_HTML,
        hotel_description_HTML, hotel_Propertyamenities_HTML, hotel_roomfeatures_HTML, hotel_roomtypes_HTML, hotel_hotelstyle_HTML,
        all_Hotel_Propertyamenities, all_Hotel_Features, all_Hotel_Types, hotel_rate_HTML_div, hotel_images_Html, hotel_starnum_HTML) {
        // image
        if (hotel_Details.images == "None") {
            hotel_img_HTML.push(<img className="hotel-base-img main-gallary" src="https://www.hopkinsmedicine.org/sebin/o/m/noimageavailable.png" alt="" />)
        }
        else {
            hotel_img_HTML.push(<img className="hotel-base-img main-gallary" src={hotel_Details.images[0]} alt="" />)
        }
        // price
        if (hotel_Details.price == null) {
            hotel_Price_HTML.push(<p>not provided by hotel administration</p>)
        }
        else {
            hotel_Price_HTML.push(<p className="marign-price book-p" >{hotel_Details.price + " EGP"}</p>)
        }
        // number of rooms
        if (hotel_Details.Numofrooms == null) {
            hotel_Rooms_HTML.push(<p>not provided</p>)
        }
        else {
            hotel_Rooms_HTML.push(<p>{hotel_Details.Numofrooms}</p>)
        }
        // languages
        if (hotel_Details.languagespoken == "None") {
            hotel_languages_HTML.push(<p>not provided</p>)
        }
        else {
            hotel_languages_HTML.push(<p>{hotel_Details.languagespoken}</p>)
        }
        // telephone
        if (hotel_Details.telephone == "None") {
            hotel_telephone_HTML.push(<p>not provided</p>)
        }
        else {
            hotel_telephone_HTML.push(<p>{hotel_Details.telephone}</p>)
        }
        // About
        if (hotel_Details.description == "None") {
            hotel_description_HTML.push(<p>{hotel_Details.name + ", " + hotel_Details.city}</p>)
        } else {
            var about_01 = (hotel_Details.description).slice(0, 400);
            var about_02 = (hotel_Details.description).slice(400);
            if (about_02 == "") {
                hotel_description_HTML.push(
                    <div>
                        <p className="p-about">{about_01} </p>
                    </div>
                )
            } else {
                hotel_description_HTML.push(
                    <div>
                        <input type="checkbox" class="read-more-state" id="about" />
                        <p className="read-more-wrap">{about_01}<span class="read-more-target">{about_02}</span></p>
                        <label for="about" class="read-more-trigger"></label>
                    </div>
                )
            }
        }
        // Propertyamenities
        this.checkArray("Property Amenities", hotel_Details.Propertyamenities, hotel_Propertyamenities_HTML, 6)
        this.allArray(hotel_Details.Propertyamenities, all_Hotel_Propertyamenities)
        // room features 
        this.checkArray("Room Features", hotel_Details.roomfeatures, hotel_roomfeatures_HTML, 6)
        this.allArray(hotel_Details.roomfeatures, all_Hotel_Features)
        // room types
        this.checkArray("Room Types", hotel_Details.roomtypes, hotel_roomtypes_HTML, 6)
        this.allArray(hotel_Details.roomtypes, all_Hotel_Types)
        // hotel style
        this.checkArray("Room Style", hotel_Details.hotelstyle, hotel_hotelstyle_HTML, 6)
        // rate
        if (hotel_Details.rating !== "None" && hotel_Details.state !== "None") {
            hotel_rate_HTML_div.push(
                <div className="p-rationg hotel-rating-section">
                    <h5>Rating</h5>
                    <div className="rating-card">
                        <div className="r-card-avarag">
                            <h2>{hotel_Details.rating}</h2>
                            <h5>{hotel_Details.state}</h5>
                        </div>
                        <div className="r-card-info">
                            <ul>
                                <li>
                                    <strong>Accommodation</strong>
                                    <ul className="r-rating">
                                        <li>
                                            <i className="bx bxs-star" />
                                            <i className="bx bxs-star" />
                                            <i className="bx bxs-star" />
                                            <i className="bx bxs-star" />
                                            <i className="bx bxs-star" />
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Transport</strong>
                                    <ul className="r-rating">
                                        <li>
                                            <i className="bx bxs-star" />
                                            <i className="bx bxs-star" />
                                            <i className="bx bxs-star" />
                                            <i className="bx bx-star" />
                                            <i className="bx bx-star" />
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Comfort</strong>
                                    <ul className="r-rating">
                                        <li>
                                            <i className="bx bxs-star" />
                                            <i className="bx bxs-star" />
                                            <i className="bx bxs-star" />
                                            <i className="bx bxs-star" />
                                            <i className="bx bx-star" />
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Hospitality</strong>
                                    <ul className="r-rating">
                                        <li>
                                            <i className="bx bxs-star" />
                                            <i className="bx bxs-star" />
                                            <i className="bx bxs-star" />
                                            <i className="bx bxs-star" />
                                            <i className="bx bx-star" />
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Food</strong>
                                    <ul className="r-rating">
                                        <li>
                                            <i className="bx bxs-star" />
                                            <i className="bx bxs-star" />
                                            <i className="bx bx-star" />
                                            <i className="bx bx-star" />
                                            <i className="bx bx-star" />
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }
        // images 
        var hotel_images_Html_temp = []
        if (hotel_Details.images == "None") {
            hotel_images_Html.push(<p className="no-image-p"> No Images Provided</p>)
        } else {
            (hotel_Details.images).forEach(img => {
                hotel_images_Html_temp.push(
                    <a href={img} className="main-gallary">
                        <img src={img} />
                    </a>
                )
            });
            hotel_images_Html.push(
                <div class="wrapper">
                    {hotel_images_Html_temp}
                </div>
            )
        }
        // starnum
        if (hotel_Details.starnum == "None") {
            hotel_starnum_HTML.push(<Rating initialValue={0} fillColor={'#ea965d'} size={20} style={React.CSSProperties = { top: '-5px' }} readonly />)
        }
        else {
            hotel_starnum_HTML.push(<Rating initialValue={hotel_Details.starnum} fillColor={'#ea965d'} size={20} style={React.CSSProperties = { top: '-5px' }} readonly />)
        }
        //edit no of reviews 
        if (this.state.newNoOfReviews == null) {
            this.state.newNoOfReviews = hotel_Details.reviewsnum
        }
        // reviews 
        if (this.state.hotelReviewsData.length === 0) {
            this.state.hotelReviewsData = hotel_Details.hotelreviews
        }
        this.addReview(this.state.hotelReviewsData)
        // icon
        this.state.planObj = {
            name: hotel_Details.name,
            city: hotel_Details.city,
            image: hotel_Details.images[0],
            price: hotel_Details.price
        }

    }
    checkHotelsInLoacalStorage(item) {
        if (localStorage.getItem("Hotels")) {
            var data = localStorage.getItem("Hotels")
            console.table(data)
            if (data.includes(JSON.stringify(item))) {
                this.state.hotel_icon_class = "fa-minus-circle"
                this.state.hotel_icon_title = "Remove from plan"
            }
            else {
                this.state.hotel_icon_class = "fa-plus-circle"
                this.state.hotel_icon_title = "Add to plan"
            }
        } else {
            this.state.hotel_icon_class = "fa-plus-circle"
            this.state.hotel_icon_title = "Add to plan"
        }
    }
    fillPopularPackages(array) {
        this.state.popularArray_HTML = []
        this.state.recommandedSection = []
        if (array.length > 0) {
            array.forEach(item => {
                var Image = []
                var price = []
                if (item.images == "None") {
                    Image.push(
                        <a href={`${process.env.PUBLIC_URL}/hotel/${item.city}/${item.name}`}>
                            <img src="https://www.hopkinsmedicine.org/sebin/o/m/noimageavailable.png" alt="" style={{ height: "90px", minWidth: "110px" }} />
                        </a>)
                }
                else {
                    Image.push(<a href={`${process.env.PUBLIC_URL}/hotel/${item.city}/${item.name}`}>
                        <img src={item.images[0]} alt="" style={{ height: "90px", minWidth: "110px" }} />
                    </a>
                    )
                }
                if (item.price != null) {
                    price.push(<p className="marign-price book-p Rprice " >{item.price + " EGP"}</p>)
                }

                this.state.popularArray_HTML.push(
                    <li className="package-card-sm">
                        <div className="p-sm-img">
                            {Image}
                        </div>
                        <div className="package-info">
                            <a href={`${process.env.PUBLIC_URL}/hotel/${item.city}/${item.name}`}>
                                <div className="package-date-sm">
                                    <h3><strong>{item.name}</strong></h3>
                                </div>
                            </a>
                            <a href={`${process.env.PUBLIC_URL}/aboutCity/${item.city}`}>
                                <p><i className="flaticon-arrival" />
                                    {item.city}
                                </p>
                            </a>
                            <h5><span>{item.reviewsnum}</span> Reviews

                            </h5>
                            {price}

                        </div>
                    </li>)
            })
            this.state.recommandedSection.push(
                <div className="col-lg-12 col-md-6">
                    <div className="p-sidebar-cards mt-40 popular-div">
                        <h5 className="package-d-head">Recommanded Hotels</h5>
                        <ul className="package-cards">
                            {this.state.popularArray_HTML}
                        </ul>
                    </div>
                </div>)
        }

    }
    contactSubmit(e) {
        e.preventDefault();
        if (this.handleValidation()) {
            if(this.state.auth_state == "signedIn"){
                this.fetchData();
                window.location.assign(`${process.env.PUBLIC_URL}/reservation`);
            }else{
                console.table("not signeddd")
                this.state.BookState=[]
                this.state.BookState.push( <span className="review-span error-review-span" style={{ marginLeft: "5px" }}>Please <a href={`${process.env.PUBLIC_URL}/registeration`}>SignIn</a> First!!</span>)
                this.forceUpdate()
            }
        }
     
      
    }

    handleChange(field, e) {

        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        console.table(fields["adult"])
        //no of room field validation
        if (fields["noRoom"] == null || fields["noRoom"] == "No of Rooms") {
            errors["noRoom1"] = "please choose number of rooms";
            formIsValid = false;
        }
        else {
            if (fields["noRoom"] > this.state.hotelData.Numofrooms) {
                errors["noRoom1"] = "sorry,No enough rooms in the hotel";
                formIsValid = false;
            }

            else if (fields["noRoom"] > fields["adult"]) {
                //fields["adult"] = fields["noRoom"];
                errors["noRoom1"] = "sorry, each room must have at least 1 adult .";
                formIsValid = false;
            }
        }
        //adult field  validation
        if (fields["adult"] == null || fields["adult"] == "adult") {
            errors["adult"] = "please choose number of adults";
            formIsValid = false;
        }
        else {
            if ((fields["adult"] - fields["noRoom"]) >= 2) {
                fields["adult"] = null;
                formIsValid = false;
                errors["adult"] = 'sorry, no more than 2 adults in one room.';
            }
        }

        //child field validation
        if (fields["child"] == null || fields["child"] == "Child") {
            errors["child"] = "please choose num of childs";
            formIsValid = false;
        }


        this.setState({ errors: errors });
        return formIsValid;
    }
    render() {
        const destinationsOptions = {
            stagePadding: 1,
            items: 3,
            loop: true,
            margin: 25,
            smartSpeed: 1500,
            autoplay: false,
            dots: false,
            nav: false,
            //loop: true,
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

        const chick_in_date = this.state.chick_in_date;
        const chick_out_date = this.state.chick_out_date;
        const review_date = this.state.review_date;
        const isEnabled = this.state.isEnabled;
        const isEnabledAdult = this.state.isEnabledAdult;

        if (!this.state.hotelData) {
            // resource is not yet loaded
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

        const hotel_Details = this.state.hotelData
        console.table(hotel_Details)
        var hotel_img_HTML = []
        var hotel_Price_HTML = []
        var hotel_Rooms_HTML = []
        var hotel_languages_HTML = []
        var hotel_telephone_HTML = []
        var hotel_description_HTML = []
        var hotel_Propertyamenities_HTML = []
        var hotel_roomfeatures_HTML = []
        var hotel_roomtypes_HTML = []
        var hotel_hotelstyle_HTML = []
        var all_Hotel_Propertyamenities = []
        var all_Hotel_Features = []
        var all_Hotel_Types = []
        var hotel_rate_HTML_div = []
        var hotel_images_Html = []
        var hotel_starnum_HTML = []
        this.fillHotelData(hotel_Details, hotel_img_HTML, hotel_Price_HTML, hotel_Rooms_HTML, hotel_languages_HTML,
            hotel_telephone_HTML, hotel_description_HTML, hotel_Propertyamenities_HTML, hotel_roomfeatures_HTML,
            hotel_roomtypes_HTML, hotel_hotelstyle_HTML, all_Hotel_Propertyamenities, all_Hotel_Features, all_Hotel_Types,
            hotel_rate_HTML_div, hotel_images_Html, hotel_starnum_HTML)
        this.checkHotelsInLoacalStorage(this.state.planObj)
        this.fillPopularPackages(this.state.popularHotels)
        const tooltipArray = [
            '1', '2', '3', '4', '5'
        ]
        var Weather = []
        //weather
        if (this.state.weatherError !== "Not Found City") {
            Weather.push(
                <div className="col-lg-12 col-md-6">
                    <div className="p-sidebar-organizer mt-40" style={{ marginBottom: "40px" }}>
                        <h5 className="package-d-head">{this.state.city} Weather </h5>
                        <OwlCarousel className="offer-slider dark-nav owl-carousel "  {...destinationsOptions}>
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
                                            {hotel_img_HTML}
                                        </SRLWrapper>
                                        <i id={hotel_Details.name} className={"fa " + this.state.hotel_icon_class + " pageDetails"} title={this.state.hotel_icon_title}
                                            onClick={() => addHotelToPlan(this.state.planObj)}
                                        > </i>
                                    </div>
                                    <div className="package-header">
                                        <div className="package-title">
                                            <h3>{hotel_Details.name}</h3>
                                            <p>
                                                <i className="flaticon-arrival" />
                                                {" " + hotel_Details.address}
                                            </p>
                                        </div>
                                        <div className="pd-review">
                                            {hotel_starnum_HTML}
                                            <p>{hotel_Details.city}</p>
                                            <p>{this.state.newNoOfReviews + " reviews"} </p>
                                        </div>
                                    </div>
                                    <div className="p-short-info">
                                        <div className="single-info">
                                            <i className='bx bx-hotel' />
                                            <div className="info-texts">
                                                <strong>Number of rooms</strong>
                                                {hotel_Rooms_HTML}
                                            </div>
                                        </div>
                                        <div className="single-info">
                                            <i className="flaticon-translate" />
                                            <div className="info-texts">
                                                <strong>Languages</strong>
                                                {hotel_languages_HTML}
                                            </div>
                                        </div>
                                        <div className="single-info">
                                            <i className='bx bx-phone-call' />
                                            <div className="info-texts">
                                                <strong>Telephone</strong>
                                                {hotel_telephone_HTML}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="showMore-div">
                                        <div className="package-tab">
                                            <h3>Amenities</h3>
                                            <span class="exit" onClick={this.showMoreExit}>X</span>
                                            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                                <li className="nav-item XX" role="presentation">
                                                    <button className="nav-link active" id="pills-amenities-tab" data-bs-toggle="pill" data-bs-target="#pills-amenities" type="button" role="tab" aria-controls="pills-amenities" aria-selected="true"><i className="flaticon-info" />
                                                        Property amenities</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="pills-features-tab" data-bs-toggle="pill" data-bs-target="#pills-features" type="button" role="tab" aria-controls="pills-features" aria-selected="false"><i className="flaticon-clipboard" />
                                                        Room features</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="pills-types-tab" data-bs-toggle="pill" data-bs-target="#pills-types" type="button" role="tab" aria-controls="pills-types" aria-selected="false"> <i className="flaticon-gallery" />
                                                        Room types</button>
                                                </li>
                                            </ul>
                                            <div className="tab-content p-tab-content" id="pills-tabContent">
                                                <div className="tab-pane fade show active" id="pills-amenities" role="tabpanel" aria-labelledby="pills-amenities-tab">
                                                    {all_Hotel_Propertyamenities}
                                                </div>
                                                <div className="tab-pane fade show " id="pills-features" role="tabpanel" aria-labelledby="pills-features-tab">
                                                    {all_Hotel_Features}
                                                </div>
                                                <div className="tab-pane fade show " id="pills-types" role="tabpanel" aria-labelledby="pills-types-tab">
                                                    {all_Hotel_Types}
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
                                                                {hotel_description_HTML}
                                                            </div>
                                                            <div className="p-details-table">
                                                                <table className="table caption-top cust-table">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="table-border">City</td>
                                                                            <td className="table-border">{hotel_Details.city}</td>
                                                                        </tr>
                                                                        {hotel_Propertyamenities_HTML}
                                                                        {hotel_roomfeatures_HTML}
                                                                        {hotel_roomtypes_HTML}
                                                                        {hotel_hotelstyle_HTML}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            {hotel_rate_HTML_div}
                                                            <div className="p-review hotel-review-section">
                                                                <h5>Reviews</h5>
                                                                <ul>
                                                                    {this.state.hotel_reviews_HTML}
                                                                </ul>
                                                                {this.state.hotel_reviews_pagination}
                                                            </div>
                                                            <div className="p-review-input">
                                                                <form onSubmit={this.handleSubmit}>
                                                                    <h5>Add Review</h5>
                                                                    <div className="row">
                                                                        <div className="col-lg-6">
                                                                            <h6>Title</h6>
                                                                            <input className="reviews-title" type="text" placeholder="Write Your Title" onChange={(e) => this.setState({ review_title: e.target.value })} />
                                                                        </div>
                                                                        <div class="col-lg-6">
                                                                            <h6>Date of Stay</h6>
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
                                                                            <Rating ratingValue={this.state.star_value} tooltipArray={tooltipArray} onClick={(rate) => this.handelRviewRate(rate)} fillColor={'#ea965d'} size={30} style={React.CSSProperties = { top: '-5px', marginBottom: '30px' }} />
                                                                        </div>
                                                                        <div className="col-lg-12">
                                                                            <input type="submit" defaultValue="Submit Now" onClick={() => this.fetchReview()} />
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
                                                        {hotel_images_Html}
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
                                        <div className="col-lg-12 col-md-6">
                                            <div className="p-sidebar-form">
                                                <form name="contactform"
                                                    className="contactform"
                                                    onSubmit={this.contactSubmit.bind(this)} >
                                                    <h5 className="package-d-head">Book This Package</h5>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <p className="book-p">Price</p>
                                                        </div>
                                                        <div className="col-lg-6 mx-auto">
                                                            {hotel_Price_HTML}
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <h5 className="book-h5">Check In</h5>
                                                            <div className="calendar-input" id="packageCalenderMainDiv">
                                                                <DatePicker required={true} selected={chick_in_date} minDate={new Date()} name="chick_in_date" value={this.state.chick_in_date}
                                                                    onChange={(date) => this.changeCheckInDate(date)}
                                                                    className="input-field check-in" placeholder="Check In" />
                                                                <i className="flaticon-calendar" id="packageCalenderIcon" />
                                                            </div>

                                                        </div>
                                                        <div className="col-lg-12 ">
                                                            <h5 className="book-h5">Check Out</h5>
                                                            <div className="calendar-input" id="packageCalenderMainDiv">
                                                                <DatePicker required={true} selected={chick_out_date} minDate={this.state.chick_in_date}
                                                                    name="chick_out_date" value={this.state.chick_out_date}
                                                                    onChange={(date) => this.changeCheckOutDate(date)} className="input-field check-in" placeholder="mm-mm-yy" />
                                                                <i className="flaticon-calendar" id="packageCalenderIcon" />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <h5 className="book-h5">No of Rooms</h5>
                                                            <select className="form-select" name="noRoom"
                                                                // value={this.state.noRoom} 
                                                                value={this.state.fields["noRoom"]}
                                                                // onChange={(e) => this.comparison(e.target.value)}
                                                                onChange={this.handleChange.bind(this, "noRoom")}

                                                                aria-label="Default select example" required >
                                                                {/* this.state.hotelData.Numofrooms */}
                                                                <option selected>No of Rooms</option>
                                                                <option value={1} >1</option>
                                                                <option value={2}>2</option>
                                                                <option value={3}>3</option>
                                                                <option value={4}>4</option>
                                                                <option value={5}>5</option>
                                                            </select>
                                                        </div>
                                                        <span style={{ color: "red" }}>{this.state.errors["noRoom1"]}</span>

                                                        <div className="col-lg-6">
                                                            <h5 className="book-h5">Adult</h5>
                                                            <select className="form-select" required={true} name="adult"
                                                                // value={this.state.adult}
                                                                // onChange={(e) => this.roomAdult(e.target.value)}
                                                                value={this.state.fields["adult"]}
                                                                // onChange={(e) => this.comparison(e.target.value)}
                                                                onChange={this.handleChange.bind(this, "adult")}
                                                                aria-label="Default select example">
                                                                <option selected>Adult</option>
                                                                <option value={1}>1</option>
                                                                <option value={2}>2</option>
                                                                <option value={3}>3</option>
                                                                <option value={4}>4</option>
                                                                <option value={5}>5</option>
                                                            </select>
                                                        </div>
                                                        {/* <span style={{ color: "red" }}>{this.state.errors["adult"]}</span> */}

                                                        <div className="col-lg-6">
                                                            <h5 className="book-h5">Child</h5>
                                                            <select className="form-select" name="child"

                                                                //  value={this.state.child}
                                                                // onChange={(e) => this.setState({ child: e.target.value })}
                                                                onChange={this.handleChange.bind(this, "child")}
                                                                value={this.state.fields["child"]}

                                                                aria-label="Default select example">
                                                                <option selected>Child</option>
                                                                <option value={0}>0</option>
                                                                <option value={1}>1</option>
                                                                <option value={2}>2</option>
                                                                <option value={3}>3</option>
                                                                <option value={4}>4</option>
                                                                <option value={5}>5</option>
                                                            </select>
                                                        </div>
                                                        <span style={{ color: "red" }}>{this.state.errors["adult"]}</span>
                                                        <span style={{ color: "red" }}>{this.state.errors["child"]}</span>
                                                        <div className="col-lg-12">
                                                            <input style={{ marginBottom: "10px" }}
                                                                // disabled={isEnabled || isEnabledAdult}
                                                                type="submit" value="Book Now"
                                                            //  onClick={() => this.fetchData()}
                                                            />
                                                            {this.state.BookState}
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="package-d-sidebar">
                                                <div className="row">
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
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(PackageDetails);
