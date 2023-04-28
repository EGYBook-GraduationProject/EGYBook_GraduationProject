import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import NoPhoto from "../../../assets/images/NoPhoto.jpeg"
import sidebarBanner from "../../../assets/images/sidebar-banner.png"
import $ from "jquery";
import * as ReactDOM from 'react-dom';
import Pagination from "react-js-pagination";



// To include the default styles
import 'react-rangeslider/lib/index.css';

class SearchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            places: null,
            placesHTML: [],
            placesArray: [],
            onLoadPlacesHTML: [],
            beachPlacesHTML: [],
            statusPlacesHTML: [],
            pyramidsPlacesHTML: [],
            mountainPlacesHTML: [],
            desertPlacesHTML: [],
            multipleType: [],
            beachFlag: true,
            statusFlag: true,
            pyramidsFlag: true,
            mountainFlag: true,
            desertFlag: true,
            activePage: 1,
            totalItems: null,
            unCheckedFlag: false,
        }
    }

    fetchData() {
        fetch('http://localhost:8000/backend/all-places')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    places: data.places
                });
                console.table(data.places)
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
    renderDataInsideDiv(div, divHtml) {
        ReactDOM.unmountComponentAtNode(div);
        ReactDOM.render(divHtml, div)
    }

    pagination(array) {
        var placeDiv = document.getElementById('data-div')
        var size = 10 * this.state.activePage;
        var items = array.slice((this.state.activePage - 1) * 10, size)
        this.renderDataInsideDiv(placeDiv, items)
    }

    async handlePageChange(placesArray, pageNumber) {
        this.setState({ activePage: await pageNumber });
        if (this.state.placesHTML.length === 0) {
            this.fillPlacesHTML(placesArray, this.state.placesHTML)
        }
        this.pagination(this.state.placesHTML)
        this.forceUpdate();
    }

    arrayRemove(arr, value) {
        return arr.filter(function (item) {
            return item.type == value;
        });
    }

    remove(Arr, delArr) {
        this.state.placesHTML = []
        this.state.placesArray = Arr.filter(ar => !delArr.find(rm => (rm.type === ar.type)))
        this.fillPlacesHTML(this.state.placesArray, this.state.placesHTML)
    }

    addMultipleType(falgName, value) {
        if (falgName === false) {
            var temp = this.state.multipleType.filter((ar) => ar.type.includes(value))
            this.state.placesArray = this.state.placesArray.concat(temp)
        }
    }

    removeMultipleType(falgName, value) {
        if (falgName === false) {
            this.state.placesHTML = []
            this.state.placesArray = this.state.placesArray.filter((ar) => !this.state.multipleType.find(() => (ar.type).includes(value)))
            this.fillPlacesHTML(this.state.placesArray, this.state.placesHTML)
        }
    }
    commonActions() {
        this.state.placesHTML.sort(() => 0.5 - Math.random());
        this.state.activePage = 1
        this.pagination(this.state.placesHTML)
        this.forceUpdate();
    }
    handelBeachCheckbox(ev, placesArray) {
        if (ev.target.checked) {
            this.state.placesHTML = []
            this.state.beachFlag = true
            this.state.placesArray = this.state.placesArray.concat(this.state.beachPlacesHTML)
            this.addMultipleType(this.state.statusFlag, "Beach,Status")
            this.addMultipleType(this.state.mountainFlag, "Beach,Mountain")
            this.fillPlacesHTML(this.state.placesArray, this.state.placesHTML)
        }
        else {
            if (this.state.placesArray.length === 0) {
                this.state.placesArray = placesArray
            }
            this.state.beachFlag = false
            this.remove(this.state.placesArray, this.state.beachPlacesHTML)
            this.removeMultipleType(this.state.statusFlag, "Beach,Status")
            this.removeMultipleType(this.state.mountainFlag, "Beach,Mountain")
        }
        this.commonActions()
    }

    handelStatusCheckbox(ev, placesArray) {
        if (ev.target.checked) {
            this.state.placesHTML = []
            this.state.statusFlag = true
            this.state.placesArray = this.state.placesArray.concat(this.state.statusPlacesHTML)
            this.addMultipleType(this.state.beachFlag, "Beach,Status")
            this.addMultipleType(this.state.pyramidsFlag, "Pyramids,Status")
            this.fillPlacesHTML(this.state.placesArray, this.state.placesHTML)
        }
        else {
            if (this.state.placesArray.length === 0) {
                this.state.placesArray = placesArray
            }
            this.state.statusFlag = false
            this.remove(this.state.placesArray, this.state.statusPlacesHTML)
            this.removeMultipleType(this.state.beachFlag, "Beach,Status")
            this.removeMultipleType(this.state.pyramidsFlag, "Pyramids,Status")
        }
        this.commonActions()

    }
    handelMountainCheckbox(ev, placesArray) {
        if (ev.target.checked) {
            this.state.placesHTML = []
            this.state.mountainFlag = true
            this.state.placesArray = this.state.placesArray.concat(this.state.mountainPlacesHTML)
            this.addMultipleType(this.state.beachFlag, "Beach,Mountain")
            this.fillPlacesHTML(this.state.placesArray, this.state.placesHTML)
        }
        else {
            if (this.state.placesArray.length === 0) {
                this.state.placesArray = placesArray
            }
            this.state.mountainFlag = false
            this.remove(this.state.placesArray, this.state.mountainPlacesHTML)
            this.removeMultipleType(this.state.beachFlag, "Beach,Mountain")
        }
        this.commonActions()

    }
    handelPyramidsCheckbox(ev, placesArray) {
        if (ev.target.checked) {
            this.state.placesHTML = []
            this.state.pyramidsFlag = true
            this.state.placesArray = this.state.placesArray.concat(this.state.pyramidsPlacesHTML)
            this.addMultipleType(this.state.statusFlag, "Pyramids,Status")
            this.fillPlacesHTML(this.state.placesArray, this.state.placesHTML)
        }
        else {
            if (this.state.placesArray.length === 0) {
                this.state.placesArray = placesArray
            }
            this.state.pyramidsFlag = false
            this.remove(this.state.placesArray, this.state.pyramidsPlacesHTML)
            this.removeMultipleType(this.state.statusFlag, "Pyramids,Status")
        }
        this.commonActions()

    }
    handelDesertCheckbox(ev, placesArray) {
        if (ev.target.checked) {
            this.state.placesHTML = []
            this.state.desertFlag = true
            this.state.placesArray = this.state.placesArray.concat(this.state.desertPlacesHTML)
            this.fillPlacesHTML(this.state.placesArray, this.state.placesHTML)
        }
        else {
            if (this.state.placesArray.length === 0) {
                this.state.placesArray = placesArray
            }
            this.state.desertFlag = false
            this.remove(this.state.placesArray, this.state.desertPlacesHTML)
        }
        this.commonActions()
    }

    checkPlacesData(place, placeImg, place_about_HTML) {
        //img
        if (place.images == "None") {
            placeImg.push(<img src={NoPhoto} alt="" className="img-fluid" />)
        } else {
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

    fillPlacesHTML(placesArray, placesArrayHtml) {
        placesArray.forEach(place => {
            var placeImg = []
            var place_about_HTML = []
            this.checkPlacesData(place, placeImg, place_about_HTML)
            placesArrayHtml.push(
                <div className="col-lg-12 col-md-12">
                    <div className="package-card-xl">
                        <div className="package-thumb-xl">
                            <a href={`${process.env.PUBLIC_URL}/package-details`}>
                                {placeImg}
                            </a>
                        </div>
                        <div className="package-details-xl">
                            <div className="package-info">
                                <h5><span>{place.name}</span></h5>
                            </div>
                            <h3><i className="flaticon-arrival" />
                                {place.type}
                                <a href={`${process.env.PUBLIC_URL}/package-details}>${place.type}`}></a>
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


    onLoadCheckbox(placesArray) {
        //places
        if (placesArray.length > 0) {
            this.state.beachPlacesHTML = []
            this.state.statusPlacesHTML = []
            this.state.pyramidsPlacesHTML = []
            this.state.mountainPlacesHTML = []
            this.state.desertPlacesHTML = []
            this.state.onLoadPlacesHTML = []
            this.fillPlacesHTML(placesArray, this.state.onLoadPlacesHTML)
            var length = this.state.onLoadPlacesHTML.length
            this.state.onLoadPlacesHTML = this.state.onLoadPlacesHTML.slice(0, 10)
            //divide array to smaller arrays  according to type
            this.state.beachPlacesHTML = this.arrayRemove(placesArray, "Beach")
            this.state.statusPlacesHTML = this.arrayRemove(placesArray, "Status")
            this.state.pyramidsPlacesHTML = this.arrayRemove(placesArray, "Pyramids")
            this.state.mountainPlacesHTML = this.arrayRemove(placesArray, "Mountain")
            this.state.desertPlacesHTML = this.arrayRemove(placesArray, "Desert")
            // multiple types array
            var temp = this.state.beachPlacesHTML.concat(this.state.statusPlacesHTML, this.state.pyramidsPlacesHTML, this.state.mountainPlacesHTML, this.state.desertPlacesHTML)
            this.state.multipleType = placesArray.filter(ar => !temp.find(rm => (rm.type === ar.type)))

        } else {
            this.state.placesHTML = []
        }
        this.NumberOfItems(length)
    }

    NumberOfItems(length) {
        if ((!this.state.beachFlag) && (!this.state.statusFlag) && (!this.state.mountainFlag) && (!this.state.pyramidsFlag) && (!this.state.desertFlag)) {
            this.state.unCheckedFlag = true
        }
        if ((this.state.placesHTML.length == 0) && (this.state.unCheckedFlag == false)) {
            this.state.totalItems = length
        }
        else if ((this.state.placesHTML.length != 0) || ((this.state.placesHTML.length == 0) && (this.state.unCheckedFlag == true))) {
            this.state.totalItems = this.state.placesHTML.length
        }
    }

    showResult(PlacesArrLength) {
        if (PlacesArrLength <= 10) {
            if (PlacesArrLength == 0) {
                this.state.start = 0
            }
            else { this.state.start = 1 }
            this.state.end = PlacesArrLength
        }
        else if (PlacesArrLength > 10) {
            this.state.start = (this.state.activePage * 10) - 9
            var remaining = PlacesArrLength - ((this.state.activePage - 1) * 10)
            if (remaining < 10) {
                this.state.end = PlacesArrLength
            }
            else { this.state.end = this.state.start + 9 }
        }
    }


    render() {

        if (!this.state.places) {
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
        var placesArray = this.state.places
        return (
            <>
                {/* ===============  breadcrumb area start =============== */}
                <div></div>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="breadcrumb-wrap">
                                    <h2>All Cities</h2>
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
                                            {this.onLoadCheckbox(placesArray)}
                                            {this.showResult(this.state.totalItems)}
                                            <h5>Showing {this.state.start}-{this.state.end} of {this.state.totalItems} Result</h5>

                                        </div>
                                    </div>
                                </div>
                                <div className="row" id="search-result">
                                    <div id="data-div" >
                                        {this.state.onLoadPlacesHTML}

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
                                                onChange={this.handlePageChange.bind(this, placesArray)}
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
                                                        <input type="checkbox" name="categorie" id="beach" defaultChecked={this.state.beachFlag} onChange={(e) => this.handelBeachCheckbox(e, placesArray)} />
                                                        <label htmlFor="beach">Beach</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="categorie" id="status" defaultChecked={this.state.statusFlag} onChange={(e) => this.handelStatusCheckbox(e, placesArray)} />
                                                        <label htmlFor="status">Status</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="categorie" id="mountain" defaultChecked={this.state.mountainFlag} onChange={(e) => this.handelMountainCheckbox(e, placesArray)} />
                                                        <label htmlFor="mountain">Mountain</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="categorie" id="Pyramids" defaultChecked={this.state.pyramidsFlag} onChange={(e) => this.handelPyramidsCheckbox(e, placesArray)} />
                                                        <label htmlFor="Pyramids">Pyramids</label>
                                                    </div>
                                                    <div className="single-option">
                                                        <input type="checkbox" name="categorie" id="desert" defaultChecked={this.state.desertFlag} onChange={(e) => this.handelDesertCheckbox(e, placesArray)} />
                                                        <label htmlFor="desert">Desert</label>
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
