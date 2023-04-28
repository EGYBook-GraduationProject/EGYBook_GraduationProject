import React, { Component } from "react";
import {Link,NavLink}               from "react-router-dom";

//Import Image
import logoMain             from "../../assets/images/logo.png"
import secondLogo from "../../assets/images/logo-2.png"
import SearchResults from "../pages/search/SearchResults";
import pv_1 from "../../assets/images/package/pv-1.png";

class Header extends Component {
    constructor(props) {
        super(props);
    this.state = {
        isToggleOn: true,
    };
    this.handleClick = this.handleClick.bind(this);
    }
   
    _handleKeyDown = (ev) => {
      if (ev.key === "Enter") {
        ev.preventDefault();                                            
        window.location.replace("../pages/search/SearchResults"); 
        }
    }
    handleClick() {
        document.getElementById("Dropdown").classList.toggle("show");
    }
  makeArray() {
      const searchArray = ["hilton", "sovotel", "sheraton", "sar"];
      return searchArray;
      
  }
    
    scrollTop()
    {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
   
    render() {
       
        //this.state.attractions
        const placesHTML = []
        const resultHTML = []
        const array = this.makeArray();
        // eslint-disable-next-line 
        for (let i = 0; i < array.length; i++) {
           
            if (i <= 2) {
                //if there is result in database
                placesHTML.push(
                    <Link to={`${process.env.PUBLIC_URL}/package-details`}>
                    <a href="">
                        <div class="image-search"><picture>
                            <img srcset="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/10/e1/d3/guest-room.jpg?w=100&amp;h=-1&amp;s=1 1x,https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/10/e1/d3/guest-room.jpg?w=200&amp;h=-1&amp;s=1 2x"
                                width="100" height="75" alt="">
                            </img>
                        </picture></div>
                        <div class="description"><div><div class="city-name">{array[i]}</div><div> Paris Centre Gare Montparnasse</div></div><div ><div>Paris, Ile-de-France, France</div></div></div>
                        </a>
                        </Link>)
            } else {
                resultHTML.push(
                    <div className="package-card-xl">
                        <div className="package-thumb-xl">
                            <Link to={`${process.env.PUBLIC_URL}/package-details`}>
                                <img src={pv_1} alt="" className="img-fluid" />
                            </Link>
                        </div>
                        <div className="package-details-xl">
                            <div className="package-info">
                                <h5><span>$180</span>/Per Person</h5>
                            </div>
                            <h3><i className="flaticon-arrival" />
                                <Link to={`${process.env.PUBLIC_URL}/package-details`}>Paris Hill Tour</Link>
                            </h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem saepe amet magni!</p>
                            <div className="package-rating">
                                <strong><i className="bx bxs-star" /><span>8K+</span> Rating</strong>
                            </div>
                        </div>
                    </div>
                )
            }
           
        }
        
        placesHTML.push(
            <NavLink activeClassName="active" to={`${process.env.PUBLIC_URL}/search`} onClick={this.scrollTop} >see all results</NavLink>
        )
        resultHTML.push(
            <NavLink activeClassName="active" to={`${process.env.PUBLIC_URL}/search`} onClick={this.scrollTop} >see all results</NavLink> 
        )

       
        return (
            <>
                {/* =============== Topbar area start =============== */}
            {/* <div className="topbar-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-5 tob-contact-row">
                            <div className="topbar-contact">
                                <ul>
                                    <li>
                                        <i className="bx bxs-phone" />
                                        <a href="tel:+17632275032">+1 763-227-5032</a>
                                    </li>

                                    <li>
                                        <i className="bx bxs-envelope" />
                                        <a href="mailto:info@example.com">info@example.com</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6">
                            <div className="topbar-social">
                                <ul>
                                    <li>
                                        <Link to={"#"}><i className="bx bxl-instagram" /></Link>
                                    </li>
                                    <li>
                                        <Link to={"#"}><i className="bx bxl-facebook" /></Link>
                                    </li>
                                    <li>
                                        <Link to={"#"}><i className="bx bxl-twitter" /></Link>
                                    </li>
                                    <li>
                                        <Link to={"#"}><i className="bx bxl-whatsapp" /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 col-6">
                            <div className="custom-select languege-select">
                                <select>
                                    <option value={0}>ENG</option>
                                    <option value={1}>BAN</option>
                                    <option value={2}>FSP</option>
                                    <option value={3}>CHI</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* =============== Topbar area end =============== */}


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
                                         <div className="searchbar-open"> 
                                            <i className="flaticon-magnifier" />
                                      </div> 
                                        {/* <div className="user-dropdown-icon">
                                            <i className="flaticon-user" />
                                            <div className="account-dropdown">
                                                <ul>
                                                    <li className="account-el">
                                                        <i className="bx bx-user-pin" />
                                                        <Link to={"#"}>Sign in</Link>
                                                    </li>
                                                    <li className="account-el">
                                                        <i className="bx bxs-user-account" />
                                                        <Link to={"#"}>My Account</Link>
                                                    </li>
                                                    <li className="account-el">
                                                        <i className="bx bx-extension" />
                                                        <Link to={"#"}>Settings</Link>
                                                    </li>
                                                    <li className="account-el">
                                                        <i className="bx bx-log-in-circle" />
                                                        <Link to={"#"}>Log out</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div> */}
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
                                        <li>
                                        <span className="searchbar-open">
                                            <i><span class="span-search">Hotels
                                         </span></i></span>
                                        </li>
                                        <li> 
                                        <span className="searchbar-open">
                                            <i><span class="span-search">Restaurants
                                        </span></i></span>
                                        </li>
                                        <li>
                                        <span className="searchbar-open">
                                            <i><span class="span-search">Rent car
                                            </span></i></span>
                                              
                                        </li>
                                        <li>
                                        <span className="searchbar-open">
                                            <i><span class="span-search">Flights
                                                </span></i></span>
                                              
                                        </li>
                                        <li >
                                        <span className="searchbar-open">
                                            <i><span class="span-search">Attractions
                                                </span></i></span>
                                              
                                        </li>
                                        {/* <li className="has-child-menu">
                                            <Link to={"#"}>Pages</Link>
                                            <i className="fl flaticon-plus">+</i>
                                            <ul className="sub-menu">
                                                <li>
                                                    <NavLink activeClassName="active" to={`${process.env.PUBLIC_URL}/gallary`} className="sub-item" onClick={this.scrollTop}>gallary page</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink activeClassName="active" to={`${process.env.PUBLIC_URL}/guide`} className="sub-item" onClick={this.scrollTop}>guide page</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink activeClassName="active" to={`${process.env.PUBLIC_URL}/destination`} className="sub-item" onClick={this.scrollTop}>destination page</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink activeClassName="active" to={`${process.env.PUBLIC_URL}/404`} className="sub-item" onClick={this.scrollTop}>404 Page</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink activeClassName="active" to={`${process.env.PUBLIC_URL}/faq`} className="sub-item" onClick={this.scrollTop}>FAQ page</NavLink>
                                                </li>
                                            </ul>
                                        </li> */}
                                        <li>
                                        <span className="searchbar-open">
                                            <i><span class="span-search">Tour Guide 
                                             </span></i></span>
                                              
                                        </li>
                                        <li>
                                            <NavLink activeClassName="active" to={`${process.env.PUBLIC_URL}/contact`} onClick={this.scrollTop} >Contact Us</NavLink>
                                        </li>
                                    </ul>
                                    <div className="navbar-icons-2">
                                        <div className="searchbar-open">
                                            <i className="flaticon-magnifier" />
                                        </div>
                                        <div className="user-dropdown-icon">
                                            <i className="flaticon-user" />
                                            <div className="account-dropdown">
                                                <ul>
                                                    <li className="account-el">
                                                        <i className="bx bx-user-pin" />
                                                        <Link to={`form`} >Sign in</Link>
                                                    </li>
                                                    <li className="account-el">
                                                        <i className="bx bxs-user-account" />
                                                        <Link to={`#`} >My Account</Link>
                                                    </li>
                                                    <li className="account-el">
                                                        <i className="bx bx-extension" />
                                                        <Link to={`#`} >Settings</Link>
                                                    </li>
                                                    <li className="account-el">
                                                        <i className="bx bx-log-in-circle" />
                                                        <Link to={`#`} >Log out</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            </div>
                                            <div class="cart">
                                              <h5> <i class="fa fa-shopping-cart"></i></h5>
                                            </div>
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

                    <form>
                        <div className="main-searchbar">
                            <div className="searchbar-close">    
                            </div>
                            <input type="text" placeholder="Search Here......"  onClick={this.handleClick}
                                            onKeyPress={(ev) => { this._handleKeyDown(ev) }}
                                            autocomplete="off"/>
                            <div className="searchbar-icon">
                                <i className="bx bx-search" />
                            </div>
                        
                          <div id="Dropdown" class="dropdown-conten">
                                             {/* <a id="tar" href="#about">
                                           
                                                <div class="image-search"><picture>
                                                    <img srcset="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/10/e1/d3/guest-room.jpg?w=100&amp;h=-1&amp;s=1 1x,https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/10/e1/d3/guest-room.jpg?w=200&amp;h=-1&amp;s=1 2x"
                                                        width="100" height="75" alt="">
                                                    </img>
                                                </picture></div>
                                                <div class="description"><div><div class="city-name">hhh</div><div> Paris Centre Gare Montparnasse</div></div><div ><div>Paris, Ile-de-France, France</div></div></div>
                                            </a> 
                                            */}
                                            {placesHTML}
                                            </div>
                           </div>           
                        </form>
                    <form>
                        <div className="main-searchbar2">
                            <div className="searchbar-close">    
                            </div>
                            <input type="text" placeholder="Search Here......"  onClick={this.handleClick}
                                            onKeyPress={(ev) => { this._handleKeyDown(ev) }}
                                            autocomplete="off"/>
                            <div className="searchbar-icon">
                                <i className="bx bx-search" />
                            </div>
                        
                          <div id="Dropdown" class="dropdown-conten">
                                             {/* <a id="tar" href="#about">
                                           
                                                <div class="image-search"><picture>
                                                    <img srcset="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/10/e1/d3/guest-room.jpg?w=100&amp;h=-1&amp;s=1 1x,https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/10/e1/d3/guest-room.jpg?w=200&amp;h=-1&amp;s=1 2x"
                                                        width="100" height="75" alt="">
                                                    </img>
                                                </picture></div>
                                                <div class="description"><div><div class="city-name">hhh</div><div> Paris Centre Gare Montparnasse</div></div><div ><div>Paris, Ile-de-France, France</div></div></div>
                                            </a> 
                                            */}
                                            {placesHTML}
                                            </div>
                           </div>           
                        </form>
                       

                </div>
            </header>
            {/* ===============  header area end =============== */}
            </>
        );
    }
}

export default Header;
