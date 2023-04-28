import React, { Component } from "react";
//import ReactJsAlert from "reactjs-alert";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
//Load Image
import payment1 from "../../../assets/images/payment/payment-card-1.png"
import payment2 from "../../../assets/images/payment/payment-card-2.png"
import payment3 from "../../../assets/images/payment/payment-card-3.png"
import payment4 from "../../../assets/images/payment/payment-card-4.png"
import * as emailjs from '@emailjs/browser';
//var CryptoJS = require("crypto-js");
import * as bcrypt from 'bcryptjs';


class Reservation extends Component {

  constructor(props) {
    super(props);
    // this.contactSubmit2 = this.contactSubmit2.bind(this);
    this.state = {
      reservationFields: {},
      errors: {},
      check_in: new Date(),
      check_out: new Date(),
      noOfRooms: null,
      hotelName: null,
      adult: null,
      child: null,
      price: null,
      verify_html: null,
      code_alert: false,
      user: null,
      alert:[]

    };

    let reservationFields = this.state.reservationFields;
    reservationFields["FirstName"] = null;
    reservationFields["LastName"] = null;
    reservationFields["PhoneNumber"] = null;
    reservationFields["Email"] = null;
    reservationFields["CardName"] = null;
    reservationFields["CardNumber"] = null;
    reservationFields["cvv"] = null;
    reservationFields["Vcode"] = null;
  }
  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  async componentDidMount() {
    this.scrollTop();
    this.fetchData();
    this.getProfileInfo()

  }
  //add state to fields
  handleChange(field, e) {
    let reservationFields = this.state.reservationFields;
    reservationFields[field] = e.target.value;
    this.setState({ reservationFields });

  }

  fetchData() {
    fetch("http://localhost:8000/hotelReservationDetails", {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    }).then(response => response.json())
      .then(data => {
        this.setState({
          check_in: data.check_in,
          check_out: data.check_out,
          noOfRooms: data.noOfRooms,
          adult: data.adult,
          child: data.child,
          hotelName: data.hotelName,
          price: data.price,
        })
      });
  }

  fetchDataDatabase(){
    fetch("http://localhost:8000/hotelReservation", {
            method: "POST",
            body: JSON.stringify({
                check_in: this.state.check_in,
                noOfRooms: this.state.noOfRooms,
                check_out :  this.state.check_out,
                adult : this.state.adult,
                child : this.state.child,
                hotelName : this.state.hotelName,
                price :  this.state.price,
                user_id :  this.state.user._id,
                totalNumofrooms: this.state.totalNumofrooms
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
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
        let firstName = this.state.user.username.charAt(0).toUpperCase() + this.state.user.username.slice(1);
        let reservationFields = this.state.reservationFields;
        reservationFields["FirstName"] = firstName;
        reservationFields["PhoneNumber"] = "0" + this.state.user.phone;
        reservationFields["Email"] = this.state.user.email;
        document.getElementById("first-name").value = firstName;
        document.getElementById("user-email").value = this.state.user.email;
        document.getElementById("phone").value = "0" + this.state.user.phone;
      });
  }

  calculateTotalPrice(check_in, check_out, price, noOfRooms) {
    console.table("Enter Price ")
    var totalPrice = 0;
    console.table(check_in, check_out)
    if (check_in.getTime() == check_out.getTime()) {
      totalPrice = price * noOfRooms
      console.table("same day price : " + totalPrice);

    }
    if (price == null) {
      totalPrice = "Determined in the hotel adminstration";

    }
    else if (price !== null && check_in.getTime() !== check_out.getTime()) {
      var diffInMs = Math.abs(check_out.getTime() - check_in.getTime());
      diffInMs = diffInMs / (1000 * 60 * 60 * 24);
      // var diffInMs = Math.abs(parseInt(4) - parseInt(5));
      console.table("num of days : " + diffInMs);
      totalPrice = Math.ceil(price * diffInMs * noOfRooms);
    }
    //this.setState({total_price:totalPrice})
    return totalPrice;
  }

  //handle form submition
  contactSubmit2(e) {
    e.preventDefault();
    if (this.handleValidation2()) {
      return ("OK")
    }
    else {
      return ("Not Ok")
    }
  }
  vaildateCheck(e) {
    if (this.handelValidationCode()) {
      return ("OK")
    }
    else {
      return ("Not Ok")
    }
  }
  handelValidationCode() {
    let reservationFields = this.state.reservationFields;
    let errors = {};
    let formIsValid = true;
    if (reservationFields["Vcode"] == "") {
      errors["Vcode"] = "please enter your verification Code";
      formIsValid = false;
    }
    else if (!this.validateCodeNumber(reservationFields["Vcode"])) {
      errors["Vcode"] = "please enter correct 6-digit Code";
      formIsValid = false;
    }
    else if (this.state.code_alert) {
      errors["Vcode"] = <span>Not a vaild code, <b><u><a onClick={this.Resend.bind(this)} style={{ size: "5px", cursor: "pointer" }}>Re-send</a></u></b></span>
      formIsValid = false;
    }
    this.setState({ errors: errors });
    return formIsValid;
  }
  Resend(e) {
    this.state.reservationFields["Vcode"] = '';
    document.getElementById("vCode").value = ""

    this.handleVerify(e)
  }
  validateCodeNumber(number) {
    //Check if the number contains only numeric value  
    //and is of between 6 digits
    const regex = new RegExp("^[0-9]{6}$");
    if (!regex.test(number)) {
      return false;
    }
    return true;
  }

  validateCardNumber(number) {
    //Check if the number contains only numeric value  
    //and is of between 13 to 19 digits
    const regex = new RegExp("^[0-9]{13,19}$");
    if (!regex.test(number)) {
      return false;
    }
    return true;
  }
  validateCvvNumber(number) {
    //Check if the number contains only numeric value  
    //and is 3 digits
    const regex = new RegExp("^[0-9]{3}$");
    if (!regex.test(number)) {
      return false;
    }
    return true
  }

  //handle validation of fields
  handleValidation2() {
    let reservationFields = this.state.reservationFields;
    let errors = {};
    let formIsValid = true;

    //no of room field validation
    if (reservationFields["FirstName"] == null) {
      errors["FirstName"] = "please enter your first name";
      formIsValid = false;
    }
    if (reservationFields["LastName"] == null) {
      errors["LastName"] = "please enter your last name";
      formIsValid = false;
    }
    if (reservationFields["PhoneNumber"] == null) {
      errors["PhoneNumber"] = "please enter your Phone Number";
      formIsValid = false;
    }
    if (reservationFields["CardName"] == null) {
      errors["CardName"] = "please enter your Card Name";
      formIsValid = false;
    }
    if (reservationFields["CardNumber"] == null) {
      errors["CardNumber"] = "please enter your Card Number";
      formIsValid = false;
    }
    else {
      if (!this.validateCardNumber(reservationFields["CardNumber"])) {
        errors["CardNumber"] = "please enter correct card number";
        formIsValid = false;
      }
    }
    if (reservationFields["Email"] == null) {
      errors["Email"] = "please enter your email";
      formIsValid = false;
    }

    if (reservationFields["cvv"] == null) {
      errors["cvv"] = "please enter your cvv";
      formIsValid = false;
    }
    else {
      if (!this.validateCvvNumber(reservationFields["cvv"])) {
        errors["cvv"] = "please enter a correct cvv number";
        formIsValid = false;
      }
    }

    //email validation
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (reservationFields["Email"] !== null && regex.test(reservationFields["Email"]) === false) {
      formIsValid = false;
      errors["Email"] = "please enter a correct email";
    }
    this.setState({ errors: errors });
    return formIsValid;
  }
  // send email

  async generaterandomcode() {
    var random = Math.floor(100000 + Math.random() * 900000)
    console.table(random)
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(random.toString(), salt)
    window.localStorage.setItem("code", hash);
    return random

  }
  async handleVerify(e) {
    var check = this.contactSubmit2(e)
    var name = document.querySelector("#first-name").value
    var email = document.querySelector("#user-email").value
    if (check == "OK") {
      var code = await this.generaterandomcode()
      var user_Data = {
        user_name: name,
        user_email: email,
        code: code
      }
      emailjs.send("service_dipcmrn", "template_y22hjqg", user_Data, "5GXbC60ynP6RfNh8h");
      document.querySelector("#Vcode").style.display = "block";
      document.getElementById("sumbitBtn").style.display="none"; 
    }
  }
  //verify code
  checkCode(field, e) {
    let reservationFields = this.state.reservationFields;
    reservationFields[field] = e.target.value;
    this.setState({ reservationFields });
    var check = this.vaildateCheck(e)
    this.state.code_alert = false
    if (check == "OK") {
      var code = e.target.value
      var hashedValue = localStorage.getItem("code")
      bcrypt.compare(code, hashedValue).then(validPass => {
        if (validPass) {
          document.getElementById("bookBtn").style.display="block"; 
        }
        else {
          this.state.code_alert = true
          this.handelValidationCode()
        }
      }).catch(err => console.log('error: ' + err));
    }

  }
bookNow()
{
this.fetchDataDatabase()
document.getElementById("bookBtn").style.display="none"; 
this.state.alert=[]
this.state.alert.push(  
  <Alert variant="filled" severity="success">
  <AlertTitle>Success</AlertTitle>
  Booking successful — <strong><a href={`/`} style={{ color:"white" }}>Home</a></strong>
  </Alert>
)
document.body.scrollTop = document.documentElement.scrollTop = 0;
this.forceUpdate()
}
  render() {
    const priceDetails = [];
    if (!this.state.check_in || !this.state.check_out || !this.state.noOfRooms || !this.state.price) {
    }
    else {
      var noOfRooms = this.state.noOfRooms;
      var check_in = new Date(this.state.check_in);
      var check_out = new Date(this.state.check_out);
      var price = this.state.price;
      var hotelName = this.state.hotelName;
      var adult = this.state.adult;
      var child = this.state.child;
      //var total_price = 0;
      var total_price = this.calculateTotalPrice(check_in, check_out, price, noOfRooms);
      console.table((total_price))
      console.table(typeof (total_price))
      priceDetails.push(
        <div className="price-details">
          <p class="p-reservation-detail">hotel name: {hotelName} </p>
          <p class="p-reservation-detail">check in Date: {check_in.toDateString()} </p>
          <p class="p-reservation-detail">check out Date: {check_out.toDateString()} </p>
          <p class="p-reservation-detail">No of rooms: {noOfRooms}</p>
          <p class="p-reservation-detail">No of adults: {adult} </p>
          <p class="p-reservation-detail">No of childs: {child} </p>
          <hr></hr>
          <p class="p-reservation-detail">Total Price:{total_price}</p>
        </div>)
    }
    this.state.verify_html = []
    this.state.verify_html.push()
    return (
      <>
      {this.state.alert}
        <p class="reserv-title">Complete your booking — only takes 2 minutes!</p>
        <div className="p-review-input" style={{ marginBottom: "80px" }}>
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <form name="contactform2 " onSubmit={this.contactSubmit2.bind(this)}>
                <div className="M-card-info">
                  <p className="card-info-title">Basic Information</p>
                  <div className="row basicInfo">
                    <div className="col-lg-6">
                      <div className="input-container .p-review-input basicMargin ">
                        <h6>First Name <span>*</span></h6>
                        <input id="first-name" className="reviews-title" type="text3" name="FirstName"autocomplete="off" required
                          placeholder=" (e.g.john) "
                          value={this.state.reservationFields["FirstName"]}
                          onChange={this.handleChange.bind(this, "FirstName")}
                        />
                      </div>
                      <span style={{ color: "red", marginLeft: "15px" }}>{this.state.errors["FirstName"]}</span>

                      <div className="input-container .p-review-input basicMargin" >
                        <h6>Last Name <span>*</span></h6>
                        <input id="last-name" className="reviews-title" type="text3" name="LastName" autocomplete="off" required
                          placeholder=" (e.g.smith) "
                          value={this.state.reservationFields["LastName"]}
                          onChange={this.handleChange.bind(this, "LastName")}
                        />
                      </div>
                      <span style={{ color: "red", marginLeft: "15px" }}>{this.state.errors["LastName"]}</span>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-container .p-review-input basicMargin" >
                        <h6>Phone Number <span>*</span> </h6>
                        <input id="phone" className="reviews-title" type="text3" name="PhoneNumber" autocomplete="off" required
                          placeholder=" (e.g.01243527201)"
                          value={this.state.reservationFields["PhoneNumber"]}
                          onChange={this.handleChange.bind(this, "PhoneNumber")}
                        />
                      </div>
                      <span style={{ color: "red", marginLeft: "15px" }}>{this.state.errors["PhoneNumber"]}</span>
                      <div className="input-container .p-review-input basicMargin" >
                        <h6>Email <span>*</span></h6>
                        <input id="user-email" className="reviews-title" type="mail" name="Email" autocomplete="off" required
                          placeholder=" (e.g.X@y.com)"
                          value={this.state.reservationFields["Email"]}
                          onChange={this.handleChange.bind(this, "Email")}
                        />
                      </div>
                      <span style={{ color: "red", marginLeft: "15px" }}>{this.state.errors["Email"]}</span>
                    </div>
                  </div>
                </div>
                <div className="M-card-info">
                  <p className="card-info-title">Card Information</p>
                  <div style={{ paddingleft: "10px" }}>
                    <div className="card-container">
                      <p className="trust"><i class=" icon-beside-word flaticon-trust"></i>we use secure transmission</p>
                      <p className="trust"><i class=" icon-beside-word flaticon-trust"></i>we protect your personal information</p>
                      <ul >
                        <li class="payment-img">
                          <img src={payment1}></img>
                        </li>
                        <li class="payment-img">
                          <img src={payment2}></img>
                        </li>
                        <li class="payment-img">
                          <img src={payment3}></img>
                        </li>
                        <li class="payment-img">
                          <img src={payment4}></img>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row basicInfo">
                    <div className="col-lg-6">
                      <div className="input-container .p-review-input basicMargin" >
                        <h6>Name On Card <span>*</span> </h6>
                        <input className="reviews-title" type="text3" name="CardName"autocomplete="off" required
                          placeholder="Enter a valid card name"
                          value={this.state.reservationFields["CardName"]}
                          onChange={this.handleChange.bind(this, "CardName")}
                        />
                      </div>
                      <span style={{ color: "red", marginLeft: "15px" }}>{this.state.errors["CardName"]}</span>

                      <div className="input-container .p-review-input basicMargin" >
                        <h6>Credit card number <span>*</span> </h6>
                        <input className="reviews-title" type="text3" name="CardNumber" autocomplete="off" required
                          placeholder="Enter a valid card number"
                          value={this.state.reservationFields["CardNumber"]}
                          onChange={this.handleChange.bind(this, "CardNumber")}
                        />
                      </div>
                      <span style={{ color: "red", marginLeft: "15px" }}>{this.state.errors["CardNumber"]}</span>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-container .p-review-input basicMargin" >
                        <h6>Cvv Number <span>*</span> </h6>
                        <input className="reviews-title" type="text3" name="cvv" autocomplete="off" required
                          placeholder=" Enter a cvv number"
                          value={this.state.reservationFields["cvv"]}
                          onChange={this.handleChange.bind(this, "cvv")}
                        />
                      </div>
                      <span style={{ color: "red", marginLeft: "15px" }}>{this.state.errors["cvv"]}</span>

                      <div id="Vcode" className="input-container .p-review-input basicMargin divisble" >
                        <h6>Verification Code <span>*</span></h6>
                        <input id="vCode" className="reviews-title" type="text3" name="Vcode" autocomplete="off" required
                          placeholder="please, check your spam "
                          value={this.state.reservationFields["Vcode"]}
                          onChange={this.checkCode.bind(this, "Vcode")}
                        />
                      </div>
                      <span style={{ color: "red", marginLeft: "15px" }}>{this.state.errors["Vcode"]}</span>
                    </div>
                  </div>

                </div>
              </form>
            </div>
            <div class="col-lg-4 M-card-info btnRelative">
              <div class="">
                <p class="card-info-title">Booking Details</p>
                {priceDetails}
                <button id="sumbitBtn" class="ReservationBtn" onClick={this.handleVerify.bind(this)}>Sumbit</button>
                <button id="bookBtn" class="ReservationBtn divisble"  onClick={() => this.bookNow()}>Book Now</button>
              </div>
            </div>
          </div>
        </div>
     

        {/* ===============  Package  area start =============== */}


        {/* ===============  Package  area end =============== */}
      </>
    );
  }
}

export default Reservation;