import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

//Import Image
import logoMain from "../../assets/images/logo.png"
import secondLogo from "../../assets/images/logo-2.png"
import NoPhoto from "../../assets/images/NoPhoto.jpeg"
import userProfile from "../../assets/images/A_black_image.png"

class Headers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            search: null,
            places: null,
            hotels: null,
            attraction: null,
            restaurant: null,
            signInMenu: [],
            auth_state: null
        };
    }

    removeLastSearch() {
        this.setState({
            search: ""
        });
    }
    async updateInputValue(e) {
        const val = e.target.value
        console.table(val)
        console.table(this.state.search)

        this.setState({
            search: await val
        });
        console.table(this.state.search)
        this.handleButtonClick();
        this.fetchHotel();
    }

    async updateInputValue2(e) {
        const val = e.target.value
        console.table(val)
        console.table(this.state.search)

        this.setState({
            search: await val
        });
        console.table(this.state.search)
        this.handleButtonClick();
        this.fetchRestaurant();
    }
    async updateInputValue3(e) {
        const val = e.target.value
        console.table(val)
        console.table(this.state.search)

        this.setState({
            search: await val
        });
        console.table(this.state.search)
        this.handleButtonClick();
        this.fetchAttraction();
    }
    async updateInputValue4(e) {
        const val = e.target.value
        console.table(val)
        console.table(this.state.search)

        this.setState({
            search: await val
        });
        console.table(this.state.search)
        this.handleButtonClick();
        this.fetchAll();
    }
    fetchHotel() {
        fetch('http://localhost:8000/search', {
            method: "POST",
            body: JSON.stringify({
                search: this.state.search
            }),
            headers: {

                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())

            .then(data => {
                console.table(data.hotels)

                this.setState({

                    hotels: data.hotels,
                    attraction: null,
                });
                console.table(this.state.search);
            });
    }
    fetchAll() {

        fetch('http://localhost:8000/search', {
            method: "POST",
            body: JSON.stringify({
                search: this.state.search
            }),
            headers: {

                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())

            .then(data => {
                console.table(data.hotels)

                this.setState({

                    hotels: data.hotels,
                    restaurant: data.restaurant,
                    attraction: data.attraction,
                    places: data.places,

                });
                console.table(this.state.search);
            });
    }
    fetchRestaurant() {
        fetch('http://localhost:8000/search', {
            method: "POST",
            body: JSON.stringify({
                search: this.state.search
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())

            .then(data => {

                this.setState({
                    restaurant: data.restaurant,
                    hotels: null,
                    attraction: null

                });

            });
    }

    fetchAttraction() {
        fetch('http://localhost:8000/search', {
            method: "POST",
            body: JSON.stringify({
                search: this.state.search
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())

            .then(data => {

                this.setState({
                    attraction: data.attraction,
                    hotels: null,
                    restaurant: null,


                });
            });
    }


    container = React.createRef();

    _handleKeyDown = (ev,type,value) => {
        if (ev.key === "Enter") {
            ev.preventDefault();
            if(type=="hotel")
            {
                window.location.assign(`${process.env.PUBLIC_URL}/searchHotel/${value}`);
            }
            else if(type=="attraction")
            {
                window.location.assign(`${process.env.PUBLIC_URL}/searchAttraction/${value}`);
            }
            else if(type=="restaurant"){
                window.location.assign(`${process.env.PUBLIC_URL}/searchrestaurants/${value}`);
            }
            else if(type=="search"){ window.location.assign(`${process.env.PUBLIC_URL}/search/${value}`);}
           
        }
    }
    handleButtonClick = () => {
        if (this.state.search !== '' && this.state.open === false) {

            this.setState((state) => {

                return {
                    open: !state.open,
                };
            });
        }
        else if (this.state.search === '') {
            this.setState((state) => {

                return {
                    open: false,
                };
            });

        }
    }

    handleClickOutside = (event) => {
        if (
            this.container.current &&
            !this.container.current.contains(event.target)
        ) {
            this.setState({
                open: false,
            });
        }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    scrollTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    removeGeneralSearch() {
        var generalSearch = document.getElementById("search");
        if (generalSearch !== null) {
            document.getElementById("search").style.display = "none";
        }
    }
    handleLogOut(){
        if(localStorage.getItem("token")){
            window.location.reload()
            localStorage.removeItem("token")
        }
    }
    checkSignIn() {
        if (localStorage.getItem("token")) {
            this.state.signInMenu.push(
                <div className="user-dropdown-icon">
                    <i><img id="header-img" className="header-img" src={userProfile}/></i>
                    <div className="account-dropdown">
                        <ul>
                            <li className="account-el">
                                <i className="bx bxs-user-account" />
                                <Link to={`${process.env.PUBLIC_URL}/myAccount`} >My Account</Link>
                            </li>
                            <li className="account-el" onClick={()=>this.handleLogOut()}>
                                <i className="bx bx-log-in-circle" />
                                <Link to={`${process.env.PUBLIC_URL}/`} >Log out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )
            this.state.signInMenu = []
        }
        else {
            console.table("not signed")
            this.state.signInMenu.push(
                <div className="user-dropdown-icon">
                    <i className="flaticon-user" style={{"padding-left": "15px"}} />
                    <div className="account-dropdown">
                        <ul>
                            <li className="account-el">
                                <i className="bx bx-user-pin" />
                                <Link to={`${process.env.PUBLIC_URL}/registeration`}>Sign in</Link>
                            </li>
                            <li className="account-el">
                                <i className="bx bx-user-pin" />
                                <Link to={`${process.env.PUBLIC_URL}/typeOfUser`}>Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )
            this.state.signInMenu = []
        }
    }


    render() {
        this.checkSignIn()
        var attraction1Array = []
        var hotels1Array = []
        var restaurants1Array = []
        var placesArray = []
        var placesImage = []
        const placesHTML = []
        var hotel1Image = []
        var hotelImage = []
        var restaurant1Image = []
        var restaurantImage = []
        var attraction1Image = []
        var attractionImage = []
        if (this.state.hotels != null && this.state.attraction != null && this.state.restaurant != null) {
            if (!this.state.hotels) {

            }
            else {

                placesArray = this.state.places;
                hotels1Array = this.state.hotels;
                attraction1Array = this.state.attraction;
                restaurants1Array = this.state.restaurant;
                if (placesArray.length < 1 && restaurants1Array.length < 1 && hotels1Array.length < 1 && attraction1Array.length < 1) {
                    placesHTML.push(<div class="no-result" >No results found</div>)
                }
                else {
                    if (placesArray.length >= 1) {
                        placesHTML.push(<div class="search-header"><i class="icon-search-header" className="flaticon-arrival" />Places</div>)
                        placesArray.forEach(function (place) {
                            if (place.images == 'None') {
                                placesImage.push(
                                    <img srcset={NoPhoto}
                                        width="100" height="70" alt="">
                                    </img>

                                )

                            }
                            else {
                                placesImage.push(

                                    <img srcset={place.images[0]}
                                        width="100" height="70" alt="">
                                    </img>
                                )

                            }
                            placesHTML.push(
                                <Link to={`${process.env.PUBLIC_URL}/aboutCity/${place.name}`}>
                                    <div class="image-search">
                                        <picture>
                                            {placesImage}
                                        </picture></div>
                                    <div class="description"><div><div class="city-name">{place.name}</div><div> {place.type}</div></div></div>
                                </Link>

                            )
                            placesImage = []
                        });
                        //if there is result in database
                    }

                    if (hotels1Array.length >= 1) {
                        placesHTML.push(<div class="search-header"><i class="icon-search-header" className="flaticon-arrival" />Hotels</div>)
                        hotels1Array.forEach(function (hotel) {
                            if (hotel.images == 'None') {
                                hotelImage.push(
                                    <img srcset={NoPhoto}
                                        width="100" height="70" alt="">
                                    </img>
                                )
                            }
                            else {
                                hotelImage.push(

                                    <img srcset={hotel.images[0]}
                                        width="100" height="70" alt="">
                                    </img>
                                )

                            }
                            placesHTML.push(
                                <a href={`${process.env.PUBLIC_URL}/hotel/${hotel.city}/${hotel.name}`}>
                                    <div class="image-search">
                                        <picture>
                                            {hotelImage}
                                        </picture></div>
                                    <div class="description"><div><div class="city-name">{hotel.name}</div><div> {hotel.city}</div></div></div>
                                </a>

                            )
                            hotelImage = []
                        });
                        //if there is result in database
                    }
                    if (attraction1Array.length >= 1) {
                        placesHTML.push(<div class="search-header"><i class="icon-search-header" className="flaticon-arrival" />Attractions</div>)
                        attraction1Array.forEach(function (attraction) {
                            if (attraction.images == 'None') {
                                attractionImage.push(
                                    <img srcset={NoPhoto}
                                        width="100" height="70" alt="">
                                    </img>
                                )
                            }
                            else {
                                attractionImage.push(

                                    <img srcset={attraction.images[0]}
                                        width="100" height="70" alt="">
                                    </img>
                                )

                            }
                            placesHTML.push(
                                <a href={`${process.env.PUBLIC_URL}/attraction/${attraction.city}/${attraction.name}`}>
                                    <div class="image-search">
                                        <picture>
                                            {attractionImage}
                                        </picture></div>
                                    <div class="description"><div><div class="city-name">{attraction.name}</div><div> {attraction.city}</div></div></div>
                                </a>
                            )
                            attractionImage = []
                        });
                     //if there is result in database

                    }
                    if (restaurants1Array.length >= 1) {
                        placesHTML.push(<div class="search-header"><i class="icon-search-header" className="flaticon-arrival" />Restaurants</div>)
                        restaurants1Array.forEach(function (restaurant) {
                            if (restaurant.images == 'None') {
                                restaurantImage.push(
                                    <img srcset={NoPhoto}
                                        width="100" height="70" alt="">
                                    </img>

                                )
                            }
                            else {
                                restaurantImage.push(

                                    <img srcset={restaurant.images[0]}
                                        width="100" height="70" alt="">
                                    </img>
                                )
                            }
                            placesHTML.push(
                                <a href={`${process.env.PUBLIC_URL}/restaurant/${restaurant.city}/${restaurant.name}`}>
                                    <div class="image-search">
                                        <picture>
                                            {restaurantImage}
                                        </picture></div>
                                    <div class="description"><div><div class="city-name">{restaurant.name}</div><div> {restaurant.city}</div></div></div>
                                </a>

                            )
                            restaurantImage = []

                        });
                    }
                    if (placesArray.length >= 3 || restaurants1Array.length >= 3 || hotels1Array.length >= 3 || attraction1Array.length >= 3) {

                        placesHTML.push(
                            <Link activeClassName="active" to={`${process.env.PUBLIC_URL}/search/${this.state.search}`} onClick={this.scrollTop} >see all results</Link>
                        )
                    }
                }
            }


        }
        else {
            if (this.state.hotels != null) {
                if (!this.state.hotels) {

                }
                else {
                    hotels1Array = this.state.hotels;

                    if (hotels1Array.length < 1) {

                        placesHTML.push(<div class="no-result" >No results found</div>)

                    }
                    hotels1Array.forEach(function (hotel1) {
                        if (hotel1.images == 'None') {
                            hotel1Image.push(
                                <img srcset={NoPhoto}
                                    width="100" height="70" alt="">
                                </img>

                            )
                        }
                        else {
                            hotel1Image.push(

                                <img srcset={hotel1.images[0]}
                                    width="100" height="70" alt="">
                                </img>
                            )

                        }
                        placesHTML.push(
                            <a href={`${process.env.PUBLIC_URL}/hotel/${hotel1.city}/${hotel1.name}`}>
                                <div class="image-search">
                                    <picture>
                                        {hotel1Image}
                                    </picture></div>
                                <div class="description"><div><div class="city-name">{hotel1.name}</div><div> {hotel1.city}</div></div></div>
                            </a>

                        )
                        hotel1Image = []
                    });
                    if (hotels1Array.length >= 3) {
                        placesHTML.push(
                            <NavLink activeClassName="active" to={`${process.env.PUBLIC_URL}/searchHotel/${this.state.search}`} onClick={this.scrollTop} >see all results</NavLink>)

                    }
                }

            } if (this.state.attraction != null) {

                if (!this.state.attraction) {
                }
                else {
                    attraction1Array = this.state.attraction;

                    if (attraction1Array.length === 0) {

                        placesHTML.push(<div class="no-result">No results found</div>)

                    }
                    attraction1Array.forEach(function (attraction2) {
                        if (attraction2.images == 'None') {
                            attraction1Image.push(
                                <img srcset={NoPhoto}
                                    width="100" height="70" alt="">
                                </img>

                            )
                        }
                        else {
                            attraction1Image.push(
                                <img srcset={attraction2.images[0]}
                                    width="100" height="70" alt="">
                                </img>
                            )
                        }
                        placesHTML.push(
                            <a href={`${process.env.PUBLIC_URL}/attraction/${attraction2.city}/${attraction2.name}`}>
                                <div class="image-search">
                                    <picture>
                                        {attraction1Image}
                                    </picture></div>
                                <div class="description"><div><div class="city-name">{attraction2.name}</div><div> {attraction2.city}</div></div></div>
                            </a>

                        )
                        attraction1Image = []
                    });
                    if (attraction1Array.length >= 3) {
                        placesHTML.push(
                            <NavLink activeClassName="active" to={`${process.env.PUBLIC_URL}/searchAttraction/${this.state.search}`} onClick={this.scrollTop} >see all results</NavLink>)

                    }
                }
            }
            if (this.state.restaurant != null) {

                if (!this.state.restaurant) {
                }
                else {
                    restaurants1Array = this.state.restaurant;
                    if (restaurants1Array.length < 1) {

                        placesHTML.push(<div class="no-result" >No results found</div>)

                    }
                    restaurants1Array.forEach(function (restaurant1) {
                        if (restaurant1.images == 'None') {
                            restaurant1Image.push(
                                <img srcset={NoPhoto}
                                    width="100" height="70" alt="">
                                </img>

                            )

                        }
                        else {
                            restaurant1Image.push(

                                <img srcset={restaurant1.images[0]}
                                    width="100" height="70" alt="">
                                </img>
                            )

                        }
                        placesHTML.push(
                            <a href={`${process.env.PUBLIC_URL}/restaurant/${restaurant1.city}/${restaurant1.name}`}>
                                <div class="image-search">
                                    <picture>
                                        {restaurant1Image}
                                    </picture></div>
                                <div class="description"><div><div class="city-name">{restaurant1.name}</div><div> {restaurant1.city}</div></div></div>
                            </a>

                        )
                        restaurant1Image = []

                    });
                    if (restaurants1Array.length >= 3) {
                        placesHTML.push(
                            <NavLink activeClassName="active" to={`${process.env.PUBLIC_URL}/searchrestaurants/${this.state.search}`} onClick={this.scrollTop} >see all results</NavLink>)

                    }
                }
            }
        }




        return (
            <>
                {/* ===============  header area start =============== */}
                <header>
                    <div className="header-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                                    <div className="navbar-wrap">
                                        <div className="logo d-flex justify-content-between">
                                            <Link to={`${process.env.PUBLIC_URL}/`} className="navbar-brand" onClick={this.scrollTop}><img src={logoMain} alt="" /></Link>
                                        </div>
                                        <div className="navbar-icons">
                                            <i className="bx bx-search" />
                                            <div className="mobile-menu d-flex ">
                                                <div className="top-search-bar m-0 d-block d-xl-none">
                                                </div>
                                                <Link to={"#"} className="hamburger d-block d-xl-none">
                                                    <span className="h-top" />
                                                    <span className="h-middle" />
                                                    <span className="h-bottom" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                    <nav className="main-nav">
                                        <div className="navber-logo-sm">
                                            <img src={secondLogo} alt="" className="img-fluid" />
                                        </div>
                                        <ul>
                                            <li

                                                onClick={() => {
                                                    this.removeGeneralSearch();
                                                    this.removeLastSearch();
                                                }}>
                                                <span className="searchbar-open">
                                                    <i><span class="span-search">Hotels
                                                    </span></i>
                                                </span>
                                            </li>

                                            <li onClick={() => {
                                                this.removeGeneralSearch();
                                                this.removeLastSearch();


                                            }}>
                                                <span className="searchbar-open2">
                                                    <i><span class="span-search">Restaurants
                                                    </span></i></span>


                                            </li>
                                            <li onClick={() => {
                                                this.removeGeneralSearch();
                                                this.removeLastSearch();


                                            }}>
                                                <span className="searchbar-open3">
                                                    <i><span class="span-search">Attractions
                                                    </span></i></span>

                                            </li>
                                            <li>
                                                <Link to={`${process.env.PUBLIC_URL}/PlanGenerator`}>
                                                    <span>
                                                        <i><span class="span-search">Plan</span></i>
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                            <Link to={`${process.env.PUBLIC_URL}/car`}>
                                                <span>
                                                    <i><span class="span-search">Rent car
                                                    </span></i></span>
</Link>
                                            </li>
                                            <li>
                                            <Link to={`${process.env.PUBLIC_URL}/flight`}>
                                                    <span>
                                                        <i><span class="span-search">Flights</span></i>
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={`${process.env.PUBLIC_URL}/guide`}>
                                                    <span>
                                                        <i><span class="span-search">Tour Guide</span></i>
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={`${process.env.PUBLIC_URL}/contact`} onClick={this.scrollTop} ><span>
                                                        <i><span class="span-search">Contact Us</span></i>
                                                    </span></Link>
                                            </li>
                                        </ul>
                                        <div className="navbar-icons-2">
                                            <div className="searchbar-open4 search-magn"
                                                onClick={() => {
                                                    this.removeGeneralSearch();
                                                    this.removeLastSearch();
                                                }}>
                                                <i className="bx bx-search" />
                                            </div>

                                            {this.state.signInMenu}
                                        </div>
                                        <div className="sidebar-contact">
                                            <ul>
                                                <li className="sidebar-single-contact"><i className="bx bxs-phone" />
                                                    <Link to={`tel:+17632275032`} >+1 763-227-5032</Link>
                                                </li>
                                                <li className="sidebar-single-contact"><i className="bx bxs-envelope" />
                                                    <Link to={`mailto:info@example.com`} >info@example.com</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div ref={this.container}>
                            <form>

                                <div className="main-searchbar">
                                    <div className="searchbar-close">
                                    </div>
                                    <div>
                                        <input type="search" placeholder="Search Hotel......"

                                            name="search"
                                            value={this.state.search}
                                            onChange={(e) => {
                                                this.updateInputValue(e)

                                            }}
                                            autoComplete="off"
                                            onKeyPress={(ev) => { this._handleKeyDown(ev,"hotel",this.state.search) }} />
                                        <button> <i className="bx bx-search" /> </button>
                                        {this.state.open && (
                                            <div id="Dropdown" class="dropdown-conten">
                                                {placesHTML}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </form>
                            <form>

                                <div className="main-searchbar4">
                                    <div className="searchbar-close4">
                                    </div>
                                    <div>
                                        <input type="search" placeholder="where to......"

                                            name="search"
                                            value={this.state.search}
                                            onChange={(e) => {
                                                this.updateInputValue4(e)

                                            }}
                                            autoComplete="off"
                                            onKeyPress={(ev) => { this._handleKeyDown(ev,"search",this.state.search) }} />
                                        <button> <i className="bx bx-search" /> </button>
                                        {this.state.open && (
                                            <div id="Dropdown" class="dropdown-conten">
                                                {placesHTML}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </form>
                            <form>

                                <div className="main-searchbar2">
                                    <div className="searchbar-close2">
                                    </div>
                                    <div>
                                        <input type="search" placeholder="Search Restaurant......"

                                            name="search"
                                            value={this.state.search}
                                            onChange={(e) => {
                                                this.updateInputValue2(e)

                                            }}
                                            autoComplete="off"
                                            onKeyPress={(ev) => { this._handleKeyDown(ev,"restaurant",this.state.search) }} />
                                        <button> <i className="bx bx-search" /> </button>

                                        {this.state.open && (
                                            <div id="Dropdown" class="dropdown-conten">
                                                {placesHTML}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </form>

                            <form>

                                <div className="main-searchbar3">
                                    <div className="searchbar-close3">
                                    </div>
                                    <div>
                                        <input type="search" placeholder="Search Attraction......"

                                            name="search"
                                            value={this.state.search}
                                            onChange={(e) => {
                                                this.updateInputValue3(e)

                                            }}
                                            autoComplete="off"
                                            onKeyPress={(ev) => { this._handleKeyDown(ev,"attraction",this.state.search) }} />
                                        <button> <i className="bx bx-search" /> </button>
                                        {this.state.open && (
                                            <div id="Dropdown" class="dropdown-conten">
                                                {placesHTML}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </header>
                {/* ===============  header area end =============== */}
            </>
        );
    }
}

export default Headers;
