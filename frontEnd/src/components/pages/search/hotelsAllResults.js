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

class hotelsAllResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchString: (this.props.match.params).string,
            value: null,
            rateValue: null,
            key: null,
            manageState: '',
            FilterArray: [],
            hotels: null,
            hotelsHTML: [],
            PoolHTML: [],
            WifiHTML: [],
            SpaHTML: [],
            Pool: false,
            Wifi: false,
            Spa: false,
            Romantic:false,
            Business:false,
            Family:false,
            Quiet:false,
            arrPool: [],
            arrWifi: [],
            arrSpa: [],
            attractionFlag: false,
            activePage: 1,
            paginationArray: [],
            onLoadPagniation: [],
            allOnLoadPagniation: [],
            totalItems: null,
            unCheckedFlag: false,
            priceFilter: [
                "Low to High",
                "High to Low"
            ],
            rating: [
                { id: 5, value: "5" },
                { id: 4, value: "4" },
                { id: 3, value: "3" },
                { id: 2, value: "2" },
                { id: 1, value: "1" },
            ],
            rateItem: null,
            isChecked: null,
        }
        this.handelCheckbox = this.handelCheckbox.bind(this);
        this.handelCheckboxStyle = this.handelCheckboxStyle.bind(this)
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
                    hotels: data.hotels,
                });
                //console.table(data) 
            });
    }


    handleChangeStart = () => {
        console.log('Change event started')
    };

    handleChange = (value, hotelsArray) => {
        this.setState({ value: value })
        console.table(this.state.value)
        this.hotelSlider()
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
    handleRateChange = (value, hotelsArray) => {
        // var slider = document.getElementById("rateValue");
        this.setState({ rateValue: value })
        console.table(this.state.rateValue)
        this.hotelSlider()
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
    handleChangeComplete = () => {
        console.log('Change event completed')
    };

    componentDidMount() {
        this.fetchData()

    }

    renderDataInsideDiv(div, hotelsHTML) {
        ReactDOM.unmountComponentAtNode(div);
        ReactDOM.render(hotelsHTML, div)
    }

    pagination(array) {
        var placeDiv = document.getElementById('data-div')
        var size = 10 * this.state.activePage;
        var items = array.slice((this.state.activePage - 1) * 10, size)
        this.renderDataInsideDiv(placeDiv, items)
    }

    async handlePageChange(hotelCheckArray, pageNumber) {
        this.setState({ activePage: await pageNumber });
        this.checkSelectedData(hotelCheckArray)
        this.checkSelectedStyle(hotelCheckArray)
        // this.checkSelectedRate()
        this.hotelSlider()
        // this.hotelPriceSlider()
        this.pagination(this.state.paginationArray)
        this.forceUpdate();
    }

    fillArrayProp(hotelsArray) {
        var arrProp = []
        var property = []
        var bool = false
        var boolPool = false
        var boolWifi = false
        var boolSpa = false
        var arrPool = []
        var arrWifi = []
        var arrSpa = []
        hotelsArray.forEach(hotel => {
            if (hotel.Propertyamenities != "None") {
                property = hotel.Propertyamenities
                //console.table("amenities : "+hotel.Propertyamenities)
                property.forEach(prop => {
                    //console.table(hotel.name+" :prop: "+ prop)
                    if (this.state.Pool == true && prop == "Pool") {
                        boolPool = true
                        arrPool = arrPool.concat(hotel)

                    }
                    if (this.state.Wifi == true && prop == "Wifi") {
                        boolWifi = true
                        arrWifi = arrWifi.concat(hotel)

                    }
                    if (this.state.Spa == true && prop == "Spa") {
                        boolSpa = true
                        arrSpa = arrSpa.concat(hotel)

                    }
                    // else{
                    //     bool = false
                    // }
                    if (boolPool == true && boolWifi == true && boolSpa == true) {
                        bool = true
                    }
                })
            }
        })
        // if(boolPool == true && boolWifi == true && boolSpa == true){
        //     arrProp = arrProp.concat(hotel)

        // }

        if (this.state.Pool == true && this.state.Wifi == false && this.state.Spa == false) {
            arrProp = arrPool
            // this.state.Pool = true
        }
        else if (this.state.Pool == false && this.state.Wifi == true && this.state.Spa == false) {
            arrProp = arrWifi
            //    this.state.Wifi = true
        }
        else if (this.state.Pool == false && this.state.Wifi == false && this.state.Spa == true) {
            arrProp = arrSpa
            // this.state.Spa = true
        }
        else if (this.state.Pool == true && this.state.Wifi == true && this.state.Spa == false) {

            //arrProp = new Set(arrPool);
            //take only repeated values
            //      arrPool.concat(arrWifi).forEach(item =>{
            //     if (arrProp.indexOf(item) == -1) 
            //     arrProp.push(item); 
            //  });
            arrProp = arrPool.filter((element) => {
                return arrWifi.includes(element);
            });
            //   this.state.Pool = true
            //   this.state.Wifi = true
        }
        else if (this.state.Pool == true && this.state.Wifi == false && this.state.Spa == true) {
            arrProp = arrPool.filter((element) => {
                return arrSpa.includes(element);
            });
            // this.state.Pool = true
            // this.state.Spa = true
            //     .forEach(item =>{
            //     if (arrProp.indexOf(item) == -1) 
            //     arrProp.push(item); 
            //  });
        }
        else if (this.state.Pool == false && this.state.Wifi == true && this.state.Spa == true) {
            arrProp = arrWifi.filter((element) => {
                return arrSpa.includes(element);
            });
            // this.state.Spa = true
            // this.state.Wifi = true
            //     .forEach(item =>{
            //     if (arrProp.indexOf(item) == -1) 
            //     arrProp.push(item); 
            //  });
        }
        else if (bool == true) {
            var arr = arrWifi.filter((element) => {
                return arrSpa.includes(element);
            });

            arrProp = arr.filter((element) => {
                return arrPool.includes(element);
            });
            // this.state.Pool = true
            // this.state.Wifi = true
            // this.state.Spa = true
            // arrSpa.concat(arrWifi,arrPool)
            //  arrProp = new Set(arrSpa);

        }
        //arrProp = arrProp.concat(hotel)}
        else if (bool = false) {
            arrPool = []
        }



        // this.state.arrPool = arrPool
        // console.table(arrPool)
        // this.state.arrWifi = arrWifi
        // console.table(arrWifi)
        // this.state.arrSpa = arrSpa
        // console.table(arrSpa)
        // console.table("this is arrayProp: ")
        // console.table(arrProp)
        return arrProp

    }
    fillArrayStyle(hotelsArray) {

        var arrStyle =[]
        var styleArrAll=[]
        var style = []
        var arrFamily =[]
        var arrBusiness = []
        var arrRomantic = []
        var arrQuiet = []
        hotelsArray.forEach(hotel => {
            if (hotel.hotelstyle!= "None") {
               style = hotel.hotelstyle
               style.forEach(styles=>{
                if(this.state.Family == true && styles == "Family"){
                    arrFamily = arrFamily.concat(hotel)
                }
                if(this.state.Romantic == true && styles == "Romantic"){
                    arrRomantic = arrRomantic.concat(hotel)
                }
                if(this.state.Business == true && styles == "Business"){
                    arrBusiness = arrBusiness.concat(hotel)
                }
                if(this.state.Quiet == true && styles == "Quiet"){
                    arrQuiet = arrQuiet.concat(hotel)
                }
               })
            }})
            if(this.state.Family == true){
                arrStyle = arrStyle.concat(arrFamily)
            }
            if(this.state.Romantic == true){
                arrStyle = arrStyle.concat(arrRomantic) 
            }
            if(this.state.Business == true){
                arrStyle = arrStyle.concat(arrBusiness)  
            }
            if(this.state.Quiet == true){
                arrStyle = arrStyle.concat(arrQuiet)
            }
            arrStyle.forEach(item =>{
                    if (styleArrAll.indexOf(item) == -1) 
                    styleArrAll.push(item); 
                 });

            return styleArrAll
    }
    checkSelectedData(hotelsArray) {
        this.state.paginationArray = []
        var Pool = document.getElementById("Pool")
        var Wifi = document.getElementById("Wifi")
        var Spa = document.getElementById("Spa")
        this.state.hotelsHTML = []
        if (Pool.checked) {
            this.state.Pool = true
        } else {
            this.state.Pool = false
            this.state.hotelsHTML = []
        }
        if (Wifi.checked) {
            this.state.Wifi = true
        } else {
            this.state.Wifi = false
            this.state.hotelsHTML = []
        }
        if (Spa.checked) {
            this.state.Spa = true

        } else {
            this.state.Spa = false
            this.state.hotelsHTML = []
        }
        //this.fillArrayProp(hotelsArray)
        this.fillHotelHTMLFilter(this.state.hotelsHTML)
        this.state.paginationArray = this.state.hotelsHTML
        if ((!Pool.checked) && (!Wifi.checked) && (!Spa.checked)) {
            this.state.unCheckedFlag = true
        }
    }
  checkSelectedStyle(hotelCheckArray)
    {
        this.state.paginationArray = []
        var Family = document.getElementById("Family")
        var Business = document.getElementById("Business")
        var Quiet = document.getElementById("Quiet")
        var Romantic = document.getElementById("Romantic")
        this.state.hotelsHTML = []
        if (Family.checked) {
            this.state.Family = true
        } else {
            this.state.Family = false
            this.state.hotelsHTML = []
        }
        if (Business.checked) {
            this.state.Business = true
        } else {
            this.state.Business = false
            this.state.hotelsHTML = []
        }
        if (Quiet.checked) {
            this.state.Quiet = true

        } else {
            this.state.Quiet = false
            this.state.hotelsHTML = []
        }
        if (Romantic.checked) {
            this.state.Romantic = true

        } else {
            this.state.Romantic = false
            this.state.hotelsHTML = []
        }
        //this.fillArrayProp(hotelsArray)
        this.fillHotelHTMLFilter(this.state.hotelsHTML)
        this.state.paginationArray = this.state.hotelsHTML
        if ((!Family.checked) && (!Business.checked) && (!Quiet.checked) && (!Romantic.checked)) {
            this.state.unCheckedFlag = true
        }
  }
    hotelSlider = () => {
        this.state.hotelsHTML = []
        this.fillHotelHTMLFilter(this.state.hotelsHTML)
        this.state.paginationArray = this.state.hotelsHTML
    }
    handelCheckbox(hotelCheckArray) {
        this.checkSelectedData(hotelCheckArray)
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
    handelCheckboxStyle(hotelCheckArray){
        this.checkSelectedStyle(hotelCheckArray)
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

    onLoadCheckbox(hotelsArray) {
        this.state.FilterArray = hotelsArray
        this.state.hotelsHTML = []
        this.fillHotelHTML(this.state.hotelsHTML)
        this.state.allOnLoadPagniation = this.state.hotelsHTML
        this.state.onLoadPagniation = this.state.allOnLoadPagniation.slice(0, 10)

        if ((this.state.paginationArray.length == 0) && (this.state.unCheckedFlag == false)) {
            this.state.totalItems = this.state.allOnLoadPagniation.length
        }
        else if ((this.state.paginationArray.length != 0) || ((this.state.paginationArray.length == 0) && (this.state.unCheckedFlag == true))) {
            this.state.totalItems = this.state.paginationArray.length
        }

    }

    checkHotelData(hotel, hotelImg, hotel_Price_HTML, hotel_Rate_HTML, hotel_State_HTML) {
        //images
        if (hotel.images == "None") {
            hotelImg.push(<img src={NoPhoto} alt="" className="img-fluid" />)
        } else {
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
        // state
        if (hotel.state == "None") {
            hotel_State_HTML.push()
        }
        else {
            hotel_State_HTML.push(<span>{hotel.state}</span>)
        }


    }
    fillHotelHTML() {
        this.state.FilterArray.forEach(hotel => {
            var hotelImg = []
            var hotel_Price_HTML = []
            var hotel_Rate_HTML = []
            var hotel_State_HTML = []
            this.checkHotelData(hotel, hotelImg, hotel_Price_HTML, hotel_Rate_HTML, hotel_State_HTML)
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
                                <a href={`${process.env.PUBLIC_URL}/aboutcity`}>
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
                                <h5><i className="" />{hotel_Price_HTML}</h5>
                            </div>

                            <div className="package-rating package-rating-edit">
                                <strong className="rev-element"><i className="flaticon-comment" /><span>{hotel.reviewsnum}</span> Reviews</strong>
                                <strong><i className="bx bxs-star" />{hotel_Rate_HTML}</strong>
                                <strong><i className="flaticon-experience" />{hotel_State_HTML}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
    }


    fillHotelHTMLFilter(hotelsArray) {

        var arrPrice = []
        var arrRate = []
        var arrProp = []
        var arrStyle = []
        this.state.FilterArray.forEach(hotel => {
            if (this.state.value != null && this.state.value >= hotel.price) {
                arrPrice = arrPrice.concat(hotel)
            }
        })
        console.table("price")
        console.table(arrPrice)
        if (arrPrice.length == 0 && (this.state.value == null || this.state.value == 0)) {
            arrPrice = this.state.FilterArray
        }
        arrPrice.forEach(hotel => {
            if (this.state.rateValue != null && this.state.rateValue == hotel.rating) {
                arrRate = arrRate.concat(hotel)
            }
        })
        console.table("rate")
        console.table(arrRate)
        if (arrRate.length == 0 && (this.state.rateValue == null || this.state.rateValue == 0)) {
            arrRate = arrPrice
        }
        if (this.state.Pool == true || this.state.Wifi == true || this.state.Spa == true) {
            arrProp = this.fillArrayProp(arrRate)
            console.table(arrProp)
        }

        if (arrProp.length == 0) {
            arrProp = arrRate
        }
        if (this.state.Family == true || this.state.Business == true || this.state.Romantic == true || this.state.Quiet == true) {
            arrStyle = this.fillArrayStyle(arrProp)
            console.table(arrStyle)
        }

        if (arrStyle.length == 0) {
            arrStyle = arrProp
        }
        arrStyle.forEach(hotel => {
            var hotelImg = []
            var hotel_Price_HTML = []
            var hotel_Rate_HTML = []
            var hotel_State_HTML = []
            this.checkHotelData(hotel, hotelImg, hotel_Price_HTML, hotel_Rate_HTML, hotel_State_HTML)
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
                                <a href={`${process.env.PUBLIC_URL}/aboutcity`}>
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
                                <h5><i className="" />{hotel_Price_HTML}</h5>
                            </div>

                            <div className="package-rating package-rating-edit">
                                <strong className="rev-element"><i className="flaticon-comment" /><span>{hotel.reviewsnum}</span> Reviews</strong>
                                <strong><i className="bx bxs-star" />{hotel_Rate_HTML}</strong>
                                <strong><i className="flaticon-experience" />{hotel_State_HTML}</strong>
                            </div>

                        </div>
                    </div>
                </div>
            )
        });

    }

    // fillHotelHTMLFilter() {
    //     var arr = []
    //     var arrAll = []

    //     this.state.FilterArray.forEach(hotel => {

    //         if(this.state.value != null && this.state.rateValue != null ){
    //         if (this.state.rateValue == hotel.rating && this.state.value >= hotel.price) {
    //             arr= arr.concat(hotel)

    //         }}

    //         else if(this.state.rateValue == null && this.state.value >= hotel.price){
    //             arr= arr.concat(hotel)
    //         }
    //         else if(this.state.value == null && this.state.rateValue == hotel.rating){
    //                 arr= arr.concat(hotel)
    //             }

    //     })
    //     console.table("this is arr: "+arr)
    //     if(this.state.value == null && this.state.rateValue == null){
    //         arr = this.state.FilterArray
    //     }
    //     if(this.state.Pool == true || this.state.Wifi == true || this.state.Spa == true){
    //             arrAll = this.fillArrayProp(arr)
    //            console.table(arrAll)
    //         }

    //             if(arrAll.length == 0){
    //                 arrAll = arr
    //             }
    //         arrAll.forEach(hotel => {
    //             var hotelImg = []
    //             var hotel_Price_HTML = []
    //             var hotel_Rate_HTML = []
    //             var hotel_State_HTML = []
    //             this.checkHotelData(hotel, hotelImg, hotel_Price_HTML, hotel_Rate_HTML,hotel_State_HTML)
    //             this.state.hotelsHTML.push(
    //                 <div className="col-lg-12 col-md-12" id="hotel-result">
    //                     <div className="package-card-xl">
    //                         <div className="package-thumb-xl">
    //                             <a href={`${process.env.PUBLIC_URL}/hotel/${hotel.city}/${hotel.name}`}>
    //                                 {hotelImg}
    //                             </a>
    //                         </div>
    //                         <div className="package-details-xl package-details-xl-edit">
    //                             <div className="package-info">
    //                                 <a href={`${process.env.PUBLIC_URL}/hotel/${hotel.city}/${hotel.name}`}>
    //                                     <h5 className="search-card-h5"><span className="search-card-title">{hotel.name}</span></h5>
    //                                 </a>
    //                                 <h3 className="place-type"><span>Hotel</span></h3>
    //                             </div>
    //                             <div className="package-info package-info-edit">
    //                                 <a href={`${process.env.PUBLIC_URL}/aboutcity`}>
    //                                     <h3 className="h3-city">
    //                                         <i className="flaticon-arrival" />
    //                                         <span>{hotel.city}</span>
    //                                     </h3>
    //                                 </a>
    //                             </div>
    //                             <div className="package-info package-info-edit address-div">
    //                                 <h3 className="h3-address">
    //                                     <i className="flaticon-arrival" />
    //                                     {hotel.address}
    //                                 </h3>
    //                             </div>
    //                             <div className="package-info package-info-price">
    //                                 <h5><i className="" />{hotel_Price_HTML}</h5>
    //                             </div>

    //                             <div className="package-rating package-rating-edit">
    //                                 <strong className="rev-element"><i className="flaticon-comment" /><span>{hotel.reviewsnum}</span> Reviews</strong>
    //                                 <strong><i className="bx bxs-star" />{hotel_Rate_HTML}</strong>
    //                                 <strong><i className="flaticon-experience" />{hotel_State_HTML}</strong>
    //                             </div>

    //                         </div>
    //                     </div>
    //                 </div>
    //             )
    //             });

    // }




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


    render() {

        if (!this.state.hotels) {
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
        var hotelsArray = this.state.hotels
        const { value } = this.state;
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
                                    <ul className="breadcrumb-links" >
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
                                            {this.onLoadCheckbox(hotelsArray)}
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
                                                onChange={this.handlePageChange.bind(this, hotelsArray)}
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
                                                <h5 className="categorie-head">Popular Filters</h5>
                                                <div className="durations-option durations-option-edit radio-box">
                                                    {/*this.onLoadCheckbox(hotelsArray)*/}
                                                    <div className="single-option">
                                                        <input type="checkbox" name="categorie" id="Pool" defaultChecked={this.state.Pool} onChange={() => this.handelCheckbox(hotelsArray)} />
                                                        <label htmlFor="hotels">Pool</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="categorie" id="Wifi" defaultChecked={this.state.Wifi} onChange={() => this.handelCheckbox(hotelsArray)} />
                                                        <label htmlFor="hotels">Wifi</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="categorie" id="Spa" defaultChecked={this.state.Spa} onChange={() => this.handelCheckbox(hotelsArray)} />
                                                        <label htmlFor="hotels">Spa</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-6">
                                            <div className="sidebar-categorie sidebar-Style-edit mt-40">
                                                <h5 className="categorie-head">Hotel Style</h5>
                                                <div className="durations-option durations-option-edit radio-box">
                                                    {/*this.onLoadCheckbox(hotelsArray)*/}
                                                    <div className="single-option">
                                                        <input type="checkbox" name="Style" id="Family" defaultChecked={this.state.Family} onChange={() => this.handelCheckboxStyle(hotelsArray)} />
                                                        <label htmlFor="hotels">Family</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="Style" id="Business" defaultChecked={this.state.Business} onChange={() => this.handelCheckboxStyle(hotelsArray)} />
                                                        <label htmlFor="hotels">Business</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="Style" id="Romantic" defaultChecked={this.state.Romantic} onChange={() => this.handelCheckboxStyle(hotelsArray)} />
                                                        <label htmlFor="hotels">Romantic</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="Style" id="Quiet" defaultChecked={this.state.Quiet} onChange={() => this.handelCheckboxStyle(hotelsArray)} />
                                                        <label htmlFor="hotels">Quiet</label>
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
                                                        onChange={(e) => this.handleRateChange(e, hotelsArray)}
                                                        onChangeComplete={this.handleChangeComplete}
                                                    />
                                                    <div className='value'>{rateValue}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="sidebar-range mt-40">
                                                <h5 className="categorie-head">Price / night</h5>
                                                <div className='slider'>
                                                    <Slider
                                                        min={0}
                                                        max={20000}
                                                        value={value}
                                                        id="priceValue"
                                                        onChangeStart={this.handleChangeStart}
                                                        onChange={(e) => this.handleChange(e, hotelsArray)}
                                                        onChangeComplete={this.handleChangeComplete}
                                                    />
                                                    <div className='value'>EGP{value}</div>
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

export default withRouter(hotelsAllResults);
