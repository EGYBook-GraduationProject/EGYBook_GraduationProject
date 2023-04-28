import React, { Component } from "react";
import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "react-datepicker/dist/react-datepicker.css";
import { Link, NavLink } from "react-router-dom";
import NoPhoto from  "../../../assets/images/NoPhoto.jpeg"



class FindForm extends Component {

  constructor(props) {
      super(props);
      this.state = {
          open: false,
          search: null,
          places: null,
          hotels: null,
          attractions: null,
          restaurants: null
      };
    }

    
   async updateInputValue(e) {
        const val = e.target.value
        console.table(val)
        console.table(this.state.search)
      
        this.setState({
        search: await  val
        });
        console.table(this.state.search)
        this.handleButtonClick();
       this.fetchData();
      }

    
      fetchData() {
   
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
              places: data.places,
              hotels: data.hotels,
              attractions: data.attraction,
              restaurants: data.restaurant });
              console.table(data) 
            });
            
            console.table(this.state.hotels) 
        console.table(this.state.places) 
        console.table(this.state.restaurants)
    }
          
    
   
    container = React.createRef();
    _handleKeyDown = (ev) => {
        if (ev.key === "Enter") {
            ev.preventDefault();
            window.location.replace(`${process.env.PUBLIC_URL}/search/${this.state.search}`);
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
      };
    



    componentDidMount() {
       
   document.addEventListener("mousedown", this.handleClickOutside);      
    }
    
componentWillUnmount() {
  document.removeEventListener("mousedown", this.handleClickOutside);
}
    
scrollTop()
{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    }

    
    render() {
       
        //  const startDate =this.state.startDate;
        var placesArray = []
        var attractionArray = []
        var hotelsArray = []
        var restaurantsArray = []
        const placesHTML = []
        var hotelImage=[]
        var attractionImage=[]
        var restaurantImage=[]
        var placesImage=[]
             
        if (!this.state.places || !this.state.attractions || !this.state.hotels || !this.state.restaurants) {
          
        }
        else {
         
            placesArray = this.state.places;
            hotelsArray = this.state.hotels;
            attractionArray = this.state.attractions;
            restaurantsArray = this.state.restaurants;
            if (placesArray.length < 1 && restaurantsArray.length < 1 && hotelsArray.length < 1 && attractionArray.length < 1) {
                placesHTML.push(<div class="no-result" >No results found</div>)
            }
            else {
                if (placesArray.length >= 1) {
                    placesHTML.push(<div class="search-header"><i class="icon-search-header" className="flaticon-arrival" />Places</div>)
                    placesArray.forEach(function (place) {
                        if (place.images == 'None')
                        {
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
                        //  for (let i = 0; i < placesArray.length; i++) {
                    });
                
                
           
                
                        //if there is result in database
                      
                      
                    
                }
           
                if (hotelsArray.length >= 1) {
                    placesHTML.push(<div class="search-header"><i class="icon-search-header" className="flaticon-arrival" />Hotels</div>)
                    hotelsArray.forEach(function (hotel) {
                        if (hotel.images == 'None')
                        {
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
                        //  for (let i = 0; i < placesArray.length; i++) {
                    });
                
                
           
                
                        //if there is result in database
                      
                      
                    
                }
                if (attractionArray.length >= 1) {
                    placesHTML.push(<div class="search-header"><i class="icon-search-header" className="flaticon-arrival" />Attractions</div>)
                    attractionArray.forEach(function (attraction) {
                        if (attraction.images == 'None')
                        {
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
                            <Link  to={`${process.env.PUBLIC_URL}/attraction/${attraction.city}/${attraction.name}`}>
                                <div class="image-search">
                                    <picture>
                                   {attractionImage}
                                </picture></div>
                                <div class="description"><div><div class="city-name">{attraction.name}</div><div> {attraction.city}</div></div></div>
                            </Link>
                        
                        )
                        attractionImage = []
                        //  for (let i = 0; i < placesArray.length; i++) {
                    });
                
                
           
                
                        //if there is result in database
                      
                      
                    
                }
                if (restaurantsArray.length >= 1) {
                    placesHTML.push(<div class="search-header"><i class="icon-search-header" className="flaticon-arrival" />Restaurants</div>)
                    restaurantsArray.forEach(function (restaurant) {
                        if (restaurant.images == 'None')
                        {
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
                            <Link to={`${process.env.PUBLIC_URL}/restaurant/${restaurant.city}/${restaurant.name}`}>
                                <div class="image-search">
                                    <picture>
                                   {restaurantImage}
                                </picture></div>
                                <div class="description"><div><div class="city-name">{restaurant.name}</div><div> {restaurant.city}</div></div></div>
                            </Link>
                        
                        )
                        restaurantImage = []
                       
                    });
                
                
           
                      
                      
                    
                }
            
                if (placesArray.length >= 3 || restaurantsArray.length >= 3 || hotelsArray.length >= 3 || attractionArray.length >= 3) {
                
                    placesHTML.push(
                        <Link activeClassName="active" to={`${process.env.PUBLIC_URL}/search/${this.state.search}`} onClick={this.scrollTop} >see all results</Link>
                    )
                }
            }
        }
    

    
        
       
    return (
        <>
          
            {/* ===============  findfrom area start ============= */}
            <div className="find-form"ref={this.container}>
                <div className="container">
                    <form id="search"className="findfrom-wrapper">
                        <div className="row">
                            <div className="sidebar-searchbox">
                                
                           
                                <div class="dropdown" >
                                    
                                    <div class="input-group search-box "ref={this.container}>
                               
                                        <input type="search" name="search" value={this.state.search} id="name" className="form-control" placeholder="Where To?" aria-label="Recipient's username" aria-describedby="button-addon2"
                                            autoComplete="off"
                                            onKeyPress={(ev) => { this._handleKeyDown(ev) }}
                                
                                            onChange={(e) => {   
                                                this.updateInputValue(e)
                                              //  this.setState({ search: e.target.value })
                                           
                                              
                                          
                                            }}
                                            // onClick={() => {
                                          
                                            //         this.handleButtonClick();
                                            //         this.fetchData();
                                             
                                            // }}
                                          />
                                     
                                        <button className="btn btn-outline-secondary " type="button" id="button-addon2" >
                                        
                                            <i className="bx bx-search" /></button>
                                </div>
                              
                                {this.state.open && (
                                        <div id="myDropdown" class="dropdown-content">

                                            {placesHTML}
                                            </div>
                                        )}
                                </div>
                                 </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* ===============  findfrom area end =============== */}
        </>
    );
  }
}

export default FindForm;