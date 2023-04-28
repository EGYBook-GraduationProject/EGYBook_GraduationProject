import React, { Component } from "react";
import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {Link, Redirect} from "react-router-dom";
import {
  ScheduleComponent, Day, Week, Agenda, Month, Inject,
  ViewsDirective, ViewDirective, DragAndDrop, Resize
} from '@syncfusion/ej2-react-schedule';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
// import { maskedtextbox } from '@syncfusion/ej2-inputs'
import { closest, HijriParser, remove } from "@syncfusion/ej2-base";
import { TextBox } from '@syncfusion/ej2-inputs'

import { TreeViewComponent, ContextMenuComponent } from '@syncfusion/ej2-react-navigations'
import { enableRipple } from '@syncfusion/ej2-base';
import { handelRemoveFromWaiting} from "../../../assets/js/addToPlan.js"
import NoPhoto from "../../../assets/images/NoPhoto.jpeg"



enableRipple(true);
class PlanProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: null,
      current_plan: null,
      schedule_HTML: []
    };
  }


async fetchData() {
  await fetch('http://localhost:8000/backend/getPlan', {
    method: "POST",
    body: JSON.stringify({
        token: localStorage.getItem("token"),
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(data => {
      this.setState({
        plan: data.plan[0].places_plan
      });
      //data.plan[0].places_plan
      
    });
}

componentDidMount(){
  this.fetchData()
  localStorage.removeItem("edit_plan")
}

fillSchedule(){
  var user_plan = this.state.plan
  console.table(user_plan)
  console.table(typeof user_plan)
  this.state.schedule_HTML = []
  for(let i = 0; i < user_plan.length; i++){
    var places = user_plan[i].places_plan
    console.table(places)
    var random = user_plan[i].random_plan
    console.table(random)
    places = places.concat(random)
    console.table(places)
    var array = Object.keys(places).map((key) => places[key]);
    console.table(array[0].StartTime)
    var date = array[0].StartTime
    console.log(user_plan[i])
    this.state.schedule_HTML.push(
      <div>
        <div>
          <ScheduleComponent
            ref={schedule => this.scheduleObj = schedule}
            currentView='Week'
            className="schedule-drag-drop plan-profile-Schedule"
            readonly = {true}
            selectedDate={date}
            eventSettings={{
              dataSource: places,
              fields: {
                id: 'Id',
                EventType: { name: 'EventType', title: 'Type' },
                subject: { name: 'Subject', title: 'Destination Name' },
                location: { name: 'Location', title: 'Destination Location' },
                description: { name: 'Description', title: 'Trip Details' },
                startTime: { name: 'StartTime', title: 'Visit Start' },
                endTime: { name: 'EndTime', title: 'Visit End'}
              }
            }}
          >
            <ViewsDirective>
              <ViewDirective option='Day' />
              <ViewDirective option='Week' />
              <ViewDirective option='Month' interval='1' />
              <ViewDirective option='Agenda' />
            </ViewsDirective>
            <Inject services={[Day, Week, Agenda, Month, DragAndDrop, Resize]} />
          </ScheduleComponent>
        </div>
        <form>
         
          <button className="plan-profile-button" onClick={()=>this.handelDelete(user_plan[i])}> Delete </button>
          <Link className="plan-profile-button a-button" to={`${process.env.PUBLIC_URL}/planGenerator`} onClick={()=>this.handelEdit(user_plan[i])}> Edit </Link>
        </form>
      </div>
    )
    places = []
    random = []
  }
}

handelEdit(user_plan){
  console.table(user_plan)
  user_plan = JSON.stringify(user_plan)
  localStorage.setItem("edit_plan", user_plan);
}

async deletePlan(user_plan){
  await fetch('http://localhost:8000/backend/deletePlan', {
        method: "POST",
        body: JSON.stringify({
            token: localStorage.getItem("token"),
            plan: user_plan
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}

handelDelete(user_plan){
  console.table(user_plan)
  this.deletePlan(user_plan)
  this.fetchData()
  this.fillSchedule()
}


render() {
  const destinationsOptions = {
      stagePadding: 1,
      items: 1,
      loop: false,
      margin:25,
      smartSpeed: 1500,
      autoplay: false,
      dots: false,
      nav: false,
      //loop: true,
      navText : ["<i class='bx bx-chevron-left' ></i>","<i class='bx bx-chevron-right'></i>"],
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
              dots: false,
              nav:false,
              loop:false
          }
      }
  };

    if (!this.state.plan) {
      // resource is not yet loaded
      return<div><div class="preloader">
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
    </div></div>
    <div></div>
   <div className="offer-area pt-120" >
      <div className="container">
          <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
              <div align="center" class="section-style">
                <h5>Your Plans Collection</h5>
                    <h3>Enjoy Your Trip With US</h3>
                </div>
              </div>
          </div>
          <OwlCarousel  className="offer-slider dark-nav owl-carousel "  {...destinationsOptions}>
            <h2>Add your plan</h2> 
          </OwlCarousel>
      </div>
  </div>
    </div>
    ;
  }
  this.fillSchedule()
  
  

  return (
    <>
   <div></div>
   <div className="offer-area  pt-120" >
      <div className="container">
          <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
              <div align="center" class="section-style">
                <h5>Your Plans Collection</h5>
                    <h3>Enjoy Your Trip With US</h3>
                </div>
              </div>
              <OwlCarousel  className="offer-slider dark-nav owl-carousel plan-carousel"  {...destinationsOptions}>
                {this.state.schedule_HTML} 
              </OwlCarousel>
          </div>
          
      </div>
  </div>
   </>
  )
  
  }
}

export default PlanProfile;