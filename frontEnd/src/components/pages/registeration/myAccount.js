import React, { Component } from "react";
import { Fragment } from 'react';
import ModalPopup from './modal_popup';

class Packages extends Component {
  constructor(props) {
    super(props);
    this.contactSubmit2 = this.contactSubmit2.bind(this);
    this.state = {
      userFields: {},
      errors: {},
      verify_html: null,
      code_alert: false,
      user: null,
      alert: [],
      showModalPopup: false,
      planHtml: []

    };

    let userFields = this.state.userFields;
    userFields["FirstName"] = null;
    userFields["LastName"] = null;
    userFields["PhoneNumber"] = null;
    userFields["Email"] = null;


  }
  async componentDidMount() {

    this.getProfileInfo();

  }
  //add state to fields
  handleChange(field, e) {
    let userFields = this.state.userFields;
    userFields[field] = e.target.value;
    this.setState({ userFields });

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
        let firstName = this.state.user.username.charAt(0).toUpperCase() + this.state.user.username.slice(1);
      });
  }


  // handle form submition
  contactSubmit2(e) {
    e.preventDefault();
    if (this.handleValidation2()) {
      return ("OK")
    }
    else {
      return ("Not Ok")
    }
  }

  isShowPopup = (status) => {
    this.setState({ showModalPopup: status });
  };
  checkPlan() {
    this.state.planHtml = []
    if (this.state.user.places_plan) {
      this.state.planHtml.push(
        <div className="p-overview centered  ">
          <div className="tri-cont "><h5>Navigate Your Plans</h5></div>
          <a style={{fontWeight:"bold"}}href={`${process.env.PUBLIC_URL}/planProfile`}>Your Plans</a>
          </div>
      )
    }
    else {
      this.state.planHtml.push(
        <div className="p-overview centered  ">
          <div className="tri-cont"><h5>Create your first Plan!</h5></div>
          <div className="text"> Create a fully customized day by day itinerary for free
          </div> <a style={{fontWeight:"bold"}} href={`${process.env.PUBLIC_URL}/planGenerator`}> Start Planning</a> </div>
      )
    }
  }




  render() {
    if (this.state.user == null) {
      return null

    }
    var user = this.state.user
    console.table(this.state.user)
    this.checkPlan()

    return (
      <>
        {/* =============== user profile =============== */}
        <div className="backgroundUser">
          {/* ======= user content ====== */}
          <div class="d-flex flex-column">
            <div className="card-position">

              <div className="d-flex flex-nowrap">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" width="200" height="200" alt="" />
                <div class="d-flex flex-column">
                  <h2 id="first-name" className="reviews-title" type="text8" name="FirstName" autocomplete="off">{user.username}</h2>
                  <p className="profile-email">{user.email}</p>
                </div>

              </div>
              {/* <a href=""> <button class="prof-button">Edit profile</button></a> */}
              <Fragment>
                <div onClick={() => this.isShowPopup(true)}>
                  <button class="prof-button" >Edit profile</button>
                  <button class="gear-button"><span class="fa fa-gear"></span> </button>
                </div>
                <ModalPopup
                  showModalPopup={this.state.showModalPopup}
                  onPopupClose={this.isShowPopup}
                ></ModalPopup>
              </Fragment>
              <div className="package-tab tb-design">
                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link button-tab active " id="pills-plan-tab" data-bs-toggle="pill" data-bs-target="#pills-plan" type="button" role="tab" aria-controls="pills-plan" aria-selected="false"> <i className="flaticon-gallery" />
                      Plans</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link button-tab"id="pills-reviews-tab" data-bs-toggle="pill" data-bs-target="#pills-reviews" type="button" role="tab" aria-controls="pills-reviews" aria-selected="false"> <i className="flaticon-gallery" />
                      Reviews</button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="d-flex flex-nowrap">
              <div class="d-flex flex-column">

                <div className="card-position2">
                  <div class="ui_header ">Intro </div>
                  <div className="fonty"><a href="" > <span class=" fa fa-plus"></span>  Add your current city</a></div>
                  <div className="fonty"><a href="" class=" fa fa-calender"> <span class="ui_icon plus 		far fa-calendar "></span>  Joined in 2022</a></div>
                  <div className="fonty"><a href="" ><span class="fa fa-plus"></span> Add a website</a></div>
                  <div className="fonty"><a href="" ><span class=" fa fa-plus"></span> Write some details about yourself</a></div>
                </div>
                <div class="card-position2">
                  <div class="ui_header">Share your travel advice</div>
                  <div><button class="post-pic" > <div class="fa fa-camera "></div> <span > Post photos</span></button> </div>
                  <div className="fonty"> <a href=""><div class="fa fa-edit"></div> <span>   Write review</span></a></div>

                </div>
              </div>
              <div className="card-position3">
                <div className="tab-content p-tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-plan" role="tabpanel" aria-labelledby="pills-plan">
                    <div className="tab-contant-2 " style={{ padding:"180px" }}>
                      {this.state.planHtml}
                    </div>
                  </div>

                  <div className="tab-pane fade" id="pills-reviews" role="tabpanel" aria-labelledby="pills-reviews-tab3">
                    <div className="tab-contant-2 "style={{ padding:"180px" }}>
                      <div className="p-overview centered ">
                        <div className="tri-cont"><h5>Write your first review!</h5></div>
                        <div className="text">   Your opinion matters! Start reviewing hotels, things to do & more on EgyBook.
                        </div></div>
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

export default Packages;
