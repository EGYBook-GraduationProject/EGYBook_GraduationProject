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

class attractionsAllResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchString: (this.props.match.params).string,
            rateValue: null,
            manageState: '',
            FilterArray: [],
            attractions: null,
            attractionsHTML: [],
            shoppingMall: false,
            Historic: false,
            Religious: false,
            Museums: false,
            Monuments: false,
            Game: false,
            attractionFlag: false,
            activePage: 1,
            paginationArray: [],
            onLoadPagniation: [],
            allOnLoadPagniation: [],
            totalItems: null,
            unCheckedFlag: false,

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
                    attractions: data.attraction,
                });
                console.table(this.state.attractions)
            });
    }


    handleChangeStart = () => {
        console.log('Change event started')
    };
    handleRateChange = (value, attractionsArray) => {
        // var slider = document.getElementById("rateValue");
        this.setState({ rateValue: value })
        console.table(this.state.rateValue)
        this.attractionSlider()
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

    renderDataInsideDiv(div, attractionsHTML) {
        ReactDOM.unmountComponentAtNode(div);
        ReactDOM.render(attractionsHTML, div)
    }

    pagination(array) {
        var placeDiv = document.getElementById('data-div')
        var size = 10 * this.state.activePage;
        var items = array.slice((this.state.activePage - 1) * 10, size)
        this.renderDataInsideDiv(placeDiv, items)
    }

    async handlePageChange(attractionsArray, pageNumber) {
        this.setState({ activePage: await pageNumber });
        this.checkSelectedData(attractionsArray)
        this.attractionSlider()
        this.pagination(this.state.paginationArray)
        this.forceUpdate();
    }

    fillArrayType(attractionsArray) {

        var arrType = []
        var TypeArrAll = []
        var Types = []
        var arrshoppingMall = []
        var arrHistoric = []
        var arrReligious = []
        var arrMuseums = []
        var arrMonuments = []
        var arrGame = []

        attractionsArray.forEach(attraction => {
            if (attraction.typeofattraction != "None") {
                Types = attraction.typeofattraction

                if (this.state.shoppingMall == true && Types.indexOf("Points of Interest & Landmarks") > -1) {
                    arrshoppingMall = arrshoppingMall.concat(attraction)
                }
                if (this.state.Religious == true && Types.indexOf("Religious Sites") > -1) {
                    arrReligious = arrReligious.concat(attraction)
                }
                if (this.state.Historic == true && Types.indexOf("Historic Sites") > -1) {
                    arrHistoric = arrHistoric.concat(attraction)
                }
                if (this.state.Museums == true && Types.indexOf("Museum") > -1) {
                    arrMuseums = arrMuseums.concat(attraction)
                }
                if (this.state.Monuments == true && Types.indexOf("Monuments") > -1) {
                    arrMonuments = arrMonuments.concat(attraction)
                }
                if (this.state.Game == true && Types.indexOf("Game") > -1) {
                    arrGame = arrGame.concat(attraction)
                }
            }
        })
        if (this.state.shoppingMall == true) {
            arrType = arrType.concat(arrshoppingMall)
        }
        if (this.state.Religious == true) {
            arrType = arrType.concat(arrReligious)
        }
        if (this.state.Historic == true) {
            arrType = arrType.concat(arrHistoric)
        }
        if (this.state.Museums == true) {
            arrType = arrType.concat(arrMuseums)
        }
        if (this.state.Monuments == true) {
            arrType = arrType.concat(arrMonuments)
        }
        if (this.state.Game == true) {
            arrType = arrType.concat(arrGame)
        }
        arrType.forEach(item => {
            if (TypeArrAll.indexOf(item) == -1)
                TypeArrAll.push(item);
        });

        return TypeArrAll
    }

    checkSelectedData(attractionsArray) {
        this.state.paginationArray = []
        var shoppingMall = document.getElementById("shoppingMall")
        var Historic = document.getElementById("Historic")
        var Religious = document.getElementById("Religious")
        var Monuments = document.getElementById("Monuments")
        var Museums = document.getElementById("Museums")
        var Game = document.getElementById("Game")
        this.state.attractionsHTML = []
        if (shoppingMall.checked) {
            this.state.shoppingMall = true
        } else {
            this.state.shoppingMall = false
            this.state.attractionsHTML = []
        }
        if (Historic.checked) {
            this.state.Historic = true
        } else {
            this.state.Historic = false
            this.state.attractionsHTML = []
        }
        if (Religious.checked) {
            this.state.Religious = true

        } else {
            this.state.Religious = false
            this.state.attractionsHTML = []
        }
        if (Monuments.checked) {
            this.state.Monuments = true

        } else {
            this.state.Monuments = false
            this.state.attractionsHTML = []
        }
        if (Museums.checked) {
            this.state.Museums = true

        } else {
            this.state.Museums = false
            this.state.attractionsHTML = []
        }
        if (Game.checked) {
            this.state.Game = true

        } else {
            this.state.Game = false
            this.state.attractionsHTML = []
        }
        this.fillAttractionHTMLFilter(this.state.attractionsHTML)
        this.state.paginationArray = this.state.attractionsHTML
        if ((!shoppingMall.checked) && (!Historic.checked) && (!Religious.checked) && (!Monuments.checked) && (!Museums.checked) && (!Game.checked)) {
            this.state.unCheckedFlag = true
        }
    }

    attractionSlider = () => {
        this.state.attractionsHTML = []
        this.fillAttractionHTMLFilter(this.state.attractionsHTML)
        this.state.paginationArray = this.state.attractionsHTML
    }
    handelCheckbox(attractionsArray) {
        this.checkSelectedData(attractionsArray)
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
    handelCheckboxStyle(attractionsArray) {
        this.checkSelectedStyle(attractionsArray)
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

    onLoadCheckbox(attractionsArray) {
        this.state.FilterArray = attractionsArray
        this.state.attractionsHTML = []
        this.fillAttractionHTML(this.state.attractionsHTML)
        this.state.allOnLoadPagniation = this.state.attractionsHTML
        this.state.onLoadPagniation = this.state.allOnLoadPagniation.slice(0, 10)

        if ((this.state.paginationArray.length == 0) && (this.state.unCheckedFlag == false)) {
            this.state.totalItems = this.state.allOnLoadPagniation.length
        }
        else if ((this.state.paginationArray.length != 0) || ((this.state.paginationArray.length == 0) && (this.state.unCheckedFlag == true))) {
            this.state.totalItems = this.state.paginationArray.length
        }

    }

    checkattractionData(attraction, attractionImg, attraction_address, attraction_Rate_HTML, attraction_type_HTML) {
        //images
        if (attraction.images == "None") {
            attractionImg.push(<img src={NoPhoto} alt="" className="img-fluid" />)
        } else {
            attractionImg.push(<img src={attraction.images[0]} alt="" className="img-fluid" />)
        }
        //address
        if (attraction.address == "None") {
            attraction_address.push()
        } else {
            attraction_address.push(<h3 className="h3-address"><i className="flaticon-arrival" />{attraction.address}</h3>)
        }
        // rate
        if (attraction.rate == "None") {
            attraction_Rate_HTML.push()
        }
        else {
            attraction_Rate_HTML.push(<strong><i className="bx bxs-star" /><span>{attraction.rate}</span> Rating</strong>)
        }
        //typeofattraction
        if (attraction.typeofattraction == "None") {
            attraction_type_HTML.push()
        }
        else {
            var typeofattraction_1 = (attraction.typeofattraction).slice(0, 50);
            var typeofattraction_2 = (attraction.typeofattraction).slice(50);
            if (typeofattraction_2 == "") {
                attraction_type_HTML.push(<h5><i className="flaticon-footprints icon-beside-word" />{typeofattraction_1}</h5>)
            } else {
                attraction_type_HTML.push(<h5><i className="flaticon-footprints icon-beside-word" />{typeofattraction_1 + "..."}</h5>)
            }

        }

    }

    fillAttractionHTML(attractionsArray) {
        this.state.FilterArray.forEach(attraction => {
            var attractionImg = []
            var attraction_address = []
            var attraction_Rate_HTML = []
            var attraction_type_HTML = []
            this.checkattractionData(attraction, attractionImg, attraction_address, attraction_Rate_HTML, attraction_type_HTML)
            this.state.attractionsHTML.push(
                <div className="col-lg-12 col-md-12">
                    <div className="package-card-xl">
                        <div className="package-thumb-xl">
                            <a href={`${process.env.PUBLIC_URL}/attraction/${attraction.city}/${attraction.name}`}>
                                {attractionImg}
                            </a>
                        </div>
                        <div className="package-details-xl package-details-xl-edit">
                            <div className="package-info">
                                <a href={`${process.env.PUBLIC_URL}/attraction/${attraction.city}/${attraction.name}`}>

                                    <h5 className="search-card-h5"><span className="search-card-title">{attraction.name}</span></h5>
                                </a>
                                <h3 className="place-type"><span>Attraction</span></h3>
                            </div>
                            <div className="package-info package-info-edit">
                                <a href={`${process.env.PUBLIC_URL}/aboutcity`}>
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
                                <strong className="rev-element"><i className="flaticon-comment" /><span>{attraction.reviewsnum}</span> Reviews</strong>
                                {attraction_Rate_HTML}
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
    }



    fillAttractionHTMLFilter(attractionsArray) {
        var arrRate = []
        var arrType = []
        this.state.FilterArray.forEach(attraction => {
            if (this.state.rateValue != null && this.state.rateValue == attraction.rate) {
                arrRate = arrRate.concat(attraction)
            }
        })
        if (arrRate.length == 0 && (this.state.rateValue == null || this.state.rateValue == 0)) {
            arrRate = this.state.FilterArray
        }
        if (this.state.shoppingMall == true || this.state.Religious == true || this.state.Historic == true || this.state.Monuments == true || this.state.Museums == true || this.state.Game == true) {
            arrType = this.fillArrayType(arrRate)
        }
        if (arrType.length == 0 && (this.state.shoppingMall == false && this.state.Religious == false && this.state.Historic == false && this.state.Monuments == false && this.state.Museums == false && this.state.Game == false)) {
            arrType = arrRate
        }
        arrType.forEach(attraction => {
            var attractionImg = []
            var attraction_address = []
            var attraction_Rate_HTML = []
            var attraction_type_HTML = []
            this.checkattractionData(attraction, attractionImg, attraction_address, attraction_Rate_HTML, attraction_type_HTML)
            this.state.attractionsHTML.push(
                <div className="col-lg-12 col-md-12">
                    <div className="package-card-xl">
                        <div className="package-thumb-xl">
                            <a href={`${process.env.PUBLIC_URL}/attraction/${attraction.city}/${attraction.name}`}>
                                {attractionImg}
                            </a>
                        </div>
                        <div className="package-details-xl package-details-xl-edit">
                            <div className="package-info">
                                <a href={`${process.env.PUBLIC_URL}/attraction/${attraction.city}/${attraction.name}`}>
                                    <h5 className="search-card-h5"><span className="search-card-title">{attraction.name}</span></h5>
                                </a>
                                <h3 className="place-type"><span>Attraction</span></h3>
                            </div>
                            <div className="package-info package-info-edit">
                                <a href={`${process.env.PUBLIC_URL}/aboutcity`}>
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
                                <strong className="rev-element"><i className="flaticon-comment" /><span>{attraction.reviewsnum}</span> Reviews</strong>
                                {attraction_Rate_HTML}
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
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


    render() {

        if (!this.state.attractions) {
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
        var attractionsArray = this.state.attractions
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
                                            {this.onLoadCheckbox(attractionsArray)}
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
                                                onChange={this.handlePageChange.bind(this, attractionsArray)}
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
                                                    {/*this.onLoadCheckbox(attractionsArray)*/}
                                                    <div className="single-option">
                                                        <input type="checkbox" name="categorie" id="shoppingMall" defaultChecked={this.state.shoppingMall} onChange={() => this.handelCheckbox(attractionsArray)} />
                                                        <label htmlFor="attractions">Points of Interest & Landmarks</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="categorie" id="Historic" defaultChecked={this.state.Historic} onChange={() => this.handelCheckbox(attractionsArray)} />
                                                        <label htmlFor="attractions">Historic Sites</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="categorie" id="Religious" defaultChecked={this.state.Religious} onChange={() => this.handelCheckbox(attractionsArray)} />
                                                        <label htmlFor="attractions">Religious Sites</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="categorie" id="Monuments" defaultChecked={this.state.Monuments} onChange={() => this.handelCheckbox(attractionsArray)} />
                                                        <label htmlFor="attractions">Monuments & Statues</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="categorie" id="Museums" defaultChecked={this.state.Museums} onChange={() => this.handelCheckbox(attractionsArray)} />
                                                        <label htmlFor="attractions">Museums</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="categorie" id="Game" defaultChecked={this.state.Game} onChange={() => this.handelCheckbox(attractionsArray)} />
                                                        <label htmlFor="attractions">Game & Entertainment Centers</label>
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
                                                        onChange={(e) => this.handleRateChange(e, attractionsArray)}
                                                        onChangeComplete={this.handleChangeComplete}
                                                    />
                                                    <div className='value'>{rateValue}</div>
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

export default withRouter(attractionsAllResults);
