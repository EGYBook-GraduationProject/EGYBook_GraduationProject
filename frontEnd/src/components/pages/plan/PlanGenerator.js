
import React, { Component } from "react";

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
import { handelRemoveFromWaiting,handelRemoveFromEditList} from "../../../assets/js/addToPlan.js"
import NoPhoto from "../../../assets/images/NoPhoto.jpeg"


enableRipple(true);
// read hotel from localstorage
var temp_hotel = localStorage.getItem("Hotels")
temp_hotel = JSON.parse(temp_hotel)
// read attraction from localstorage
var temp_attraction = localStorage.getItem("Attractions")
temp_attraction = JSON.parse(temp_attraction)
// read reataurant from localstorage
var temp_restaurant = localStorage.getItem("Restaurants")
temp_restaurant = JSON.parse(temp_restaurant)


class PlanGenerator extends Component {

  constructor(props) {
    super(props);
    this.isTreeItemDropped = false;
    this.draggedItemId = "";
    this.allowDragAndDrops = true;
    this.fieldIsAdded = false;
    this.isAttraction = false
    this.isHotel = false
    this.isRestaurant = false
    this.hotel_data = []
    this.attraction_data = []
    this.restaurant_data = []
    this.state = {
      auth_state: null,
      span_HTML: [],
      places_plan: [],
      random_plan: [],
      edit_plan: null,
      edit_flag: false,
      edit_plan_id: null,
      date: null
    };
  }
  //localData= extend([], null, true) ;

  data = 
  [{
    EventType: "Attraction",
    Subject : "Temple of Karnak (Attraction)",
    Location : "Luxor",
    StartTime : "2017-05-12T00:30:00.000Z",
    EndTime : "2017-05-12T01:00:00.000Z",
    IsAllDay : false,
    StartTimezone : null,
    EndTimezone : null,
    RecurrenceRule : null,
    Id : 1,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/aa/06/32/exterior.jpg?w=600&h=500&s=1",
    price: 1401
}]

/* places_plan = []
random_plan = [] */

  menuItems = [
    { text: 'Remove Item' }
  ];

  componentDidMount(){
    this.fetchData()
    this.state.edit_plan = this.checkForEditPlan()
    if(localStorage.getItem("Hotels")){
      this.hotel_data = JSON.parse(localStorage.getItem("Hotels"))
    }
    this.hotel_fields = { dataSource: this.hotel_data, id: 'name' }; 
    if(localStorage.getItem("Attractions")){
      this.attraction_data = JSON.parse(localStorage.getItem("Attractions"))
    }
    this.attraction_fields = { dataSource: this.attraction_data, id: 'name' }; 
    if(localStorage.getItem("Restaurants")){
      this.restaurant_data = JSON.parse(localStorage.getItem("Restaurants"))
    }
    this.restaurant_fields = { dataSource: this.restaurant_data, id: 'name' }; 
    
  }
  
  index = 1;
  // hotel localstorage
  //hotel_fields = { dataSource: this.hotel_data, id: 'name' }; 
  // attarction localstorage
  //attraction_fields = { dataSource: this.attraction_data, id: 'name' }; 
  // restaurant localstorage
  //restaurant_fields = { dataSource: this.restaurant_data, id: 'name' };

  

  async fetchData(){
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if(localStorage.getItem("token")){
      myHeaders.append('Authorization',  `Bearer ${localStorage.getItem("token")}`);
    }
    fetch('http://localhost:8000/backend/plan',{
      method: 'GET',
      headers: myHeaders
    }).then(response => response.json())
      .then(data => {
        this.setState({ 
          auth_state: data
        });
    });
  }

  checkLocalStorage(input){
    var array = []
    console.table("//////")
    if(typeof input == "object"){
      console.table("object")
    }
  }
  nodeclickedHotel(args) {
    this.isHotel = true
    this.isAttraction = false
    this.isRestaurant = false
    if (args.event.which === 3) {
      this.treeObj.selectedNodes = [args.node.getAttribute('data-uid')];
    }
  }
  nodeclickedAttraction(args) {
    this.isAttraction = true
    this.isHotel = false
    this.isRestaurant = false
    if (args.event.which === 3) {
      this.treeObj2.selectedNodes = [args.node.getAttribute('data-uid')];
    }
  }
  nodeclickedRestaurant(args) {
    this.isRestaurant = true
    this.isAttraction = false
    this.isHotel = false
    if (args.event.which === 3) {
      this.treeObj3.selectedNodes = [args.node.getAttribute('data-uid')];
    }
  }

  beforeopenHotel() {
    console.table("666")
    let targetNodeId = this.treeObj.selectedNodes[0];
    let targetNode = document.querySelector('[data-uid="' + targetNodeId + '"]');
    if (targetNode.classList.contains('remove')) {
      this.menuObj.enableItems(['Remove Item'], false);
    }
    else {
      this.menuObj.enableItems(['Remove Item'], true);
    }

  }
  beforeOpenAttraction() {
    let targetNodeId = this.treeObj2.selectedNodes[0];
    let targetNode = document.querySelector('[data-uid="' + targetNodeId + '"]');
    if (targetNode.classList.contains('remove')) {
      this.menuObj2.enableItems(['Remove Item'], false);
    }
    else {
      this.menuObj2.enableItems(['Remove Item'], true);
    }
  }
  beforeOpenRestaurant() {
    let targetNodeId = this.treeObj3.selectedNodes[0];
    let targetNode = document.querySelector('[data-uid="' + targetNodeId + '"]');
    if (targetNode.classList.contains('remove')) {
      this.menuObj3.enableItems(['Remove Item'], false);
    }
    else {
      this.menuObj3.enableItems(['Remove Item'], true);
    }
  }

  menuclick() {
    //selectednodes will return id of this node
    if (this.isHotel == true && this.isAttraction == false && this.isRestaurant == false) {
      console.table("//////")
      let targetNodeId = this.treeObj.selectedNodes[0];
      console.table(targetNodeId)
      var deletedItem = temp_hotel.filter(item => {
        return item.name == targetNodeId
      }
      );
      console.table(deletedItem)
      let item = {
        name: deletedItem[0].name,
        city: deletedItem[0].city,
        image: deletedItem[0].image,
        price: deletedItem[0].price
      };
      console.table(item)
      handelRemoveFromWaiting(item,"Hotels")
      handelRemoveFromEditList(item)
      this.treeObj.removeNodes([targetNodeId]);
    }
    else if (this.isAttraction == true && this.isHotel == false && this.isRestaurant == false) {
      console.table("555")
      let targetNodeId = this.treeObj2.selectedNodes[0];
      console.table(targetNodeId)
      var deletedItem = temp_attraction.filter(item => {
        return item.name == targetNodeId
      }
      );
      console.table(deletedItem)
      let item = {
        name: deletedItem[0].name,
        city: deletedItem[0].city,
        image: deletedItem[0].image,
      };
      console.table(item)
      handelRemoveFromWaiting(item,"Attractions")
      handelRemoveFromEditList(item)
      this.treeObj2.removeNodes([targetNodeId]);
    }
    else if (this.isRestaurant == true && this.isAttraction == false && this.isHotel == false) {
      console.table("555")
      let targetNodeId = this.treeObj3.selectedNodes[0];
      console.table(targetNodeId)
      var deletedItem = temp_restaurant.filter(item => {
        return item.name == targetNodeId
      }
      );
      console.table(deletedItem)
      let item = {
        name: deletedItem[0].name,
        city: deletedItem[0].city,
        image: deletedItem[0].image,
      };
      console.table(item)
      handelRemoveFromWaiting(item,"Restaurants")
      handelRemoveFromEditList(item)
      this.treeObj3.removeNodes([targetNodeId]);
    }
  }

  // stop dragging when hitting schedule 
  onTreeDragStopHotel(event) {
    console.table("1")
    this.isHotel = true
    this.isAttraction = false
    this.isRestaurant = false
    let treeElement = closest(event.target, ".e-treeview");
    let classElement = this.scheduleObj.element.querySelector(
      ".e-device-hover"
    );
    if (classElement) {
      classElement.classList.remove("e-device-hover");
    }
    if (!treeElement) {
      event.cancel = true;
      let scheduleElement = closest(event.target, ".e-content-wrap");
      if (scheduleElement) {
        let treeviewData = this.treeObj.fields.dataSource;
        console.table("2")
        console.table(treeviewData)
        if (event.target.classList.contains("e-work-cells")) {
          const filteredData = treeviewData.filter(
            item => item.name === event.draggedNodeData.id
          );
          console.table(filteredData)
          let cellData = this.scheduleObj.getCellDetails(event.target);
          let eventData = {
            Subject: filteredData[0].name + " (Hotel)",
            Location: filteredData[0].city,
            EventType: "Hotel",
            StartTime: cellData.startTime,
            EndTime: cellData.endTime,
            IsAllDay: cellData.isAllDay,
          };
          //add to schedule
          this.scheduleObj.openEditor(eventData, "Add", true);
          this.isTreeItemDropped = true;
          this.draggedItemId = event.draggedNodeData.id;
          console.table(this.draggedItemId)
        }
      }
    }
  }

  // stop dragging when hitting schedule 
  onTreeDragStopAttraction(event) {
    this.isAttraction = true
    this.isHotel = false
    this.isRestaurant = false
    console.table("1")
    let treeElement = closest(event.target, ".e-treeview");
    let classElement = this.scheduleObj.element.querySelector(
      ".e-device-hover"
    );
    if (classElement) {
      classElement.classList.remove("e-device-hover");
    }
    if (!treeElement) {
      event.cancel = true;
      let scheduleElement = closest(event.target, ".e-content-wrap");
      if (scheduleElement) {
        let treeviewData = this.treeObj2.fields.dataSource;
        console.table("2")
        console.table(treeviewData)
        if (event.target.classList.contains("e-work-cells")) {
          const filteredData = treeviewData.filter(
            item => item.name === event.draggedNodeData.id
          );
          console.table(filteredData)
          let cellData = this.scheduleObj.getCellDetails(event.target);
          let eventData = {
            Subject: filteredData[0].name + " (Attraction)",
            Location: filteredData[0].city,
            EventType: "Attraction",
            StartTime: cellData.startTime,
            EndTime: cellData.endTime,
            IsAllDay: cellData.isAllDay,
          };
          //add to schedule
          this.scheduleObj.openEditor(eventData, "Add", true);
          this.isTreeItemDropped = true;
          this.draggedItemId = event.draggedNodeData.id;
          console.table(this.draggedItemId)
        }
      }
    }
  }

  // stop dragging when hitting schedule 
  onTreeDragStopRestaurant(event) {
    this.isRestaurant = true
    this.isAttraction = false
    this.isHotel = false
    console.table("1")
    let treeElement = closest(event.target, ".e-treeview");
    let classElement = this.scheduleObj.element.querySelector(
      ".e-device-hover"
    );
    if (classElement) {
      classElement.classList.remove("e-device-hover");
    }
    if (!treeElement) {
      event.cancel = true;
      let scheduleElement = closest(event.target, ".e-content-wrap");
      if (scheduleElement) {
        let treeviewData = this.treeObj3.fields.dataSource;
        console.table("2")
        console.table(treeviewData)
        if (event.target.classList.contains("e-work-cells")) {
          const filteredData = treeviewData.filter(
            item => item.name === event.draggedNodeData.id
          );
          console.table(filteredData)
          let cellData = this.scheduleObj.getCellDetails(event.target);
          let eventData = {
            Subject: filteredData[0].name + " (Restaurant)",
            Location: filteredData[0].city,
            EventType: "Restaurant",
            StartTime: cellData.startTime,
            EndTime: cellData.endTime,
            IsAllDay: cellData.isAllDay,
            price: 555
          };
          //add to schedule
          this.scheduleObj.openEditor(eventData, "Add", true);
          this.isTreeItemDropped = true;
          this.draggedItemId = event.draggedNodeData.id;
          console.table(this.draggedItemId)
        }
      }
    }
  }

  //remove element from waiting list when drag it
  onActionBegin(event) {
    if (event.requestType === "eventCreate") {
      if(this.isTreeItemDropped){
      let record = {}
      record = event.addedRecords[0]
      console.table(record)
      // hotel
      if (this.isHotel == true && this.isAttraction == false && this.isRestaurant == false) {
        // push data to array
        let record_temp = {}
        record_temp = temp_hotel.filter(item=>{
          let name = (record.Subject).replace(" (Hotel)","")
          return item.name == name && item.city == record.Location
        })
        console.table(record_temp)
        record.price = record_temp[0].price
        record.image = record_temp[0].image
        this.state.places_plan.push(record)
        // remove from waiting list
        let treeViewdata = this.treeObj.fields.dataSource;
        var filteredChoice = treeViewdata.filter(
          item => item.name !== this.draggedItemId
        );
        this.treeObj.fields.dataSource = filteredChoice;
      }
      // attraction
      else if (this.isAttraction == true && this.isHotel == false && this.isRestaurant == false) {
         // push data to array
         let record_temp = {}
         record_temp = temp_attraction.filter(item=>{
           let name = (record.Subject).replace(" (Attraction)","")
           return item.name == name && item.city == record.Location
         })
         record.image = record_temp[0].image
         this.state.places_plan.push(record)
         // remove from waiting list
        let treeViewdata = this.treeObj2.fields.dataSource;
        const filteredChoice = treeViewdata.filter(
          item => item.name !== this.draggedItemId
        );
        this.treeObj2.fields.dataSource = filteredChoice;
      }
      // Restaurant
      else if(this.isRestaurant == true && this.isHotel == false && this.isAttraction == false){
         // push data to array
         let record_temp = {}
         record_temp = temp_restaurant.filter(item=>{
           let name = (record.Subject).replace(" (Restaurant)","").replace("&amp;","&")
           return item.name == name && item.city == record.Location
         })
         record.image = record_temp[0].image
         this.state.places_plan.push(record)
         // remove from waiting list
        let treeViewdata = this.treeObj3.fields.dataSource;
        const filteredChoice = treeViewdata.filter(
          item => item.name !== this.draggedItemId
        );
        this.treeObj3.fields.dataSource = filteredChoice;
      }
      this.isTreeItemDropped = false
    }
    else{
      let record = {}
      record = event.addedRecords[0]
      console.table(record)
      this.state.random_plan.push(record)
    }
    }
    //add deleted node form shedule to waiting list again
    if (event.requestType === "eventRemove") {
      console.table(event)
      console.table(event.deletedRecords[0])
      // hotel
      let record = event.deletedRecords[0]
      var type = event.data[0].EventType
      if(type == "Hotel" || type == "Attraction" || type == "Restaurant"){
       this.state.places_plan = this.state.places_plan.filter(item => {
          return item.Subject !== record.Subject
        })
      }else{
        this.state.random_plan = this.state.random_plan.filter(item => {
          return item.Subject !== record.Subject
        })
      }
      var name = event.data[0].Subject
      var city = event.data[0].Location
      if (type == "Hotel") {
        name = name.replace(" (Hotel)","")
        if(temp_hotel !== null){
          var deletedItem = temp_hotel.filter(item => {
            return item.name == name && item.city == city
          });
          if(deletedItem.length == 0){
            var image = event.data[0].image
            var price = event.data[0].price
          }else{
            var image = deletedItem[0].image
            var price = deletedItem[0].price
          }
          var item = {
            name: name,
            city: city,
            image: image,
            price: price
          };
          if(deletedItem.length == 0){
            temp_hotel.push(item)
          }
          var targetNodeId = this.treeObj.selectedNodes[0];
        }else{
          temp_hotel = []
          let image = event.data[0].image
          let price = event.data[0].price
          var item = {
            name: name,
            city: city,
            image: image,
            price: price
          }
          temp_hotel.push(item)
          var targetNodeId = event.data[0].Id;
        }
        this.treeObj.addNodes([item], targetNodeId, null);
        let dataSource = this.treeObj.fields.properties.dataSource
        dataSource.push(item)
      }
      // attraction
      if (type == "Attraction") {
        name = name.replace(" (Attraction)","")
        if(temp_attraction !== null){
          var deletedItem = temp_attraction.filter(item => {
            return item.name == name && item.city == city
          });
          if(deletedItem.length == 0){
            var image = event.data[0].image
          }else{
            var image =  deletedItem[0].image
          }
          var item = {
            name: name,
            city: city,
            image: image,
          };
          if(deletedItem.length == 0){
            temp_attraction.push(item)
          }
          var targetNodeId = this.treeObj2.selectedNodes[0];
        }else{
          temp_attraction = []
          let image = event.data[0].image
          var item = {
            name: name,
            city: city,
            image: image
          }
          temp_attraction.push(item)
          var targetNodeId = event.data[0].Id;
        }
        this.treeObj2.addNodes([item], targetNodeId, null);
          let dataSource = this.treeObj2.fields.properties.dataSource
          dataSource.push(item)
      }
      if (type == "Restaurant") {
        name = name.replace(" (Restaurant)","")
        name = name.replace("&amp;","&")
        if(temp_attraction !== null){
          var deletedItem = temp_restaurant.filter(item => {
            return item.name == name && item.city == city
          });
          if(deletedItem.length == 0){
            var image = event.data[0].image
          }else{
            var image =  deletedItem[0].image
          }
          var item = {
            name: name,
            city: city,
            image: image,
          };
          if(deletedItem.length == 0){
            temp_restaurant.push(item)
          }
          var targetNodeId = this.treeObj3.selectedNodes[0];
        }else{
          temp_restaurant = []
          let image = event.data[0].image
          var item = {
            name: name,
            city: city,
            image: image
          }
          temp_restaurant.push(item)
          var targetNodeId = event.data[0].Id;
        }
        this.treeObj3.addNodes([item], targetNodeId, null);
        let dataSource = this.treeObj3.fields.properties.dataSource
        dataSource.push(item)
      }
      else{
        console.table("deleted")
      }
    }
    if (event.requestType == "eventChange"){
      console.table(event.changedRecords[0])
      let record = event.changedRecords[0]
      console.table(record)
      let eventtype = event.changedRecords[0].EventType
      if(eventtype == "Attraction" || eventtype == "Restaurant" || eventtype == "Hotel" ){
        console.table("places")
        console.table(this.state.places_plan)
        this.state.places_plan = this.state.places_plan.filter(item=>{
          return item.Subject !== record.Subject
        })
        console.table(this.state.places_plan)
        delete record.Guid;
        this.state.places_plan.push(record)
        console.table(this.state.places_plan)
      }else{
        console.table("random")
        this.state.random_plan = this.state.random_plan.filter(item=>{
          return item.Subject !== record.Subject
        })
        console.table(this.state.random_plan)
        delete record.Guid;
        console.table(record)
        this.state.random_plan.push(record)
      }
    }

  }

  onPopupOpen(event) {
    if (event.type === 'Editor') {
      {
        let type = event.data.EventType
        if(type == "Attraction" || type == "Restaurant" || type == "Hotel"){
          if (!event.element.querySelector('.custom-field-row')) {
            var row = document.createElement('div');
            row.classList.add('custom-field-row')
            var formElement = event.element.querySelector('.e-schedule-form');
            console.table(formElement)
            formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);
            var container = document.createElement('div');
            container.classList.add('custom-field-container')
            var inputEle = document.createElement('input');
            inputEle.classList.add('e-field')
            inputEle.id = "input-eventtype"
            inputEle.setAttribute('name', 'EventType');
            container.appendChild(inputEle);
            row.appendChild(container);
              var inpu = new TextBox({
                value: event.data.EventType,
                floatLabelType: 'Always', placeholder: 'Type', readonly: true
              });
            inpu.appendTo(inputEle);
            document.querySelector('[aria-labelledby="label_Subject"]').readOnly = true
            document.querySelector('[aria-labelledby="label_Location"]').readOnly = true
          }
        }
        else{
          if (event.element.querySelector('.custom-field-row')) {
            event.element.querySelector('.custom-field-row').remove()
          }
          document.querySelector('[aria-labelledby="label_Subject"]').readOnly = false
          document.querySelector('[aria-labelledby="label_Location"]').readOnly = false
        }
      }
    }
  }

  onItemDrag() {
    if (document.body.style.cursor === "not-allowed") {
      document.body.style.cursor = "";
    }
  }

  treeTemplateHotel(data) {
    // price
    var hotel_price = []
    if (data.price == "None") {
      hotel_price.push()
    } else {
      hotel_price.push(<h5 className="waiting-price"><span>{data.price + " EGP"}</span></h5>)
    }
    // name
    var name_01 = (data.name).slice(0, 20)
    var name_02 = (data.name).slice(20)
    var hotel_name_temp = []
    if (name_02 !== "") {
      hotel_name_temp.push(<span>{name_02}</span>)
    }
    // image
    var hotel_image = []
    if (data.image == "None") {
      hotel_image.push(<img src={NoPhoto} alt="" style={{height: "85px",minWidth:"181px"}}/>)
    } else {
      hotel_image.push(<img src={data.image} alt="" style={{height: "85px",minWidth:"181px"}} />)
    }
    return (
      <div id="waiting">
        <div id="waitdetails">
          <div id="waitlist">
            <ul className="package-cards package-cards-edit">
              <li className="package-card-sm package-card-sm-edit">
                <div className="p-sm-img p-sm-img-edit">
                  {hotel_image}
                </div>
                <div className="package-info package-info-edit">
                  <h3 className="waiting-name">
                    {data.name}
                  </h3>
                  <h5 className="waiting-city"><i className="flaticon-arrival waiting-icon" />
                    {data.city}
                  </h5>
                  {hotel_price}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  treeTemplateAttraction(data) {
    // name
    var name_01 = (data.name).slice(0, 20)
    var name_02 = (data.name).slice(20)
    var attraction_name_temp = []
    if (name_02 !== "") {
      attraction_name_temp.push(<span>{name_02}</span>)
    }
    // image
    var attraction_image = []
    if (data.image == "None") {
      attraction_image.push(<img src={NoPhoto} alt="" style={{height: "85px",minWidth:"110px"}} />)
    } else {
      attraction_image.push(<img src={data.image} alt="" style={{height: "85px",minWidth:"110px"}} />)
    }
    return (
      <div id="waiting">
        <div id="waitdetails">
          <div id="waitlist">
            <ul className="package-cards package-cards-edit">
              <li className="package-card-sm package-card-sm-edit">
                <div className="p-sm-img p-sm-img-edit">
                  {attraction_image}
                </div>
                <div className="package-info package-info-edit">
                  <h3 className="waiting-name">
                    {name_01}
                  </h3>
                  <h5 className="waiting-city"><i className="flaticon-arrival waiting-icon" />
                    {data.city}
                  </h5>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  treeTemplateRestaurant(data) {
    // name
    var name_01 = (data.name).slice(0, 20)
    var name_02 = (data.name).slice(20)
    var restaurant_name_temp = []
    if (name_02 !== "") {
      restaurant_name_temp.push(<span>{name_02}</span>)
    }
    // image
    var restaurant_image = []
    if (data.image == "None") {
      restaurant_image.push(<img src={NoPhoto} alt="" style={{height: "85px",minWidth:"110px"}}/>)
    } else {
      restaurant_image.push(<img src={data.image} alt="" style={{height: "85px",minWidth:"110px"}}/>)
    }
    return (
      <div id="waiting">
        <div id="waitdetails">
          <div id="waitlist">
            <ul className="package-cards package-cards-edit">
              <li className="package-card-sm package-card-sm-edit">
                <div className="p-sm-img p-sm-img-edit">
                  {restaurant_image}
                </div>
                <div className="package-info package-info-edit">
                  <h3 className="waiting-name">
                    {name_01}
                  </h3>
                  <h5 className="waiting-city"><i className="flaticon-arrival waiting-icon" />
                    {data.city}
                  </h5>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  fillHotelTree(hotel_tree,hotel_fields){
    if(this.hotel_data == null){
      hotel_tree.push()
    }
    else{
      hotel_tree.push(
        <div id="hotel-tree">
        <h4 className="section-waiting-title"><i class='bx bx-chevrons-right'></i>Hotels</h4>
        <TreeViewComponent
          className="treeview-external-drag"
          ref={tree => (this.treeObj = tree)}
          fields={this.hotel_fields}
          nodeTemplate={this.treeTemplateHotel.bind(this)}
          allowDragAndDrop={true}
          nodeDragging={this.onItemDrag.bind(this)}
          nodeClicked={this.nodeclickedHotel.bind(this)}
          nodeDragStop={this.onTreeDragStopHotel.bind(this)} />
        <ContextMenuComponent
          target='#hotel-tree'
          items={this.menuItems}
          beforeOpen={this.beforeopenHotel.bind(this)}
          select={this.menuclick.bind(this)}
          ref={(contextmenu) => {
            this.menuObj = contextmenu;
          }} />
        {/********/}
      </div>

      )
    }
  }
  fillAttractionTree(attraction_tree){
    if(this.attraction_data == null){
      attraction_tree.push()
    }
    else{
      attraction_tree.push(
        <div id="attraction-tree">
        <h4 className="section-waiting-title"><i class='bx bx-chevrons-right'></i>Attraction</h4>
        <TreeViewComponent
          className="treeview-external-drag"
          ref={tree => (this.treeObj2 = tree)}
          fields={this.attraction_fields}
          nodeTemplate={this.treeTemplateAttraction.bind(this)}
          allowDragAndDrop={true}
          nodeDragging={this.onItemDrag.bind(this)}
          nodeClicked={this.nodeclickedAttraction.bind(this)}
          nodeDragStop={this.onTreeDragStopAttraction.bind(this)} />
        <ContextMenuComponent
          target='#attraction-tree'
          items={this.menuItems}
          beforeOpen={this.beforeOpenAttraction.bind(this)}
          select={this.menuclick.bind(this)}
          ref={(contextmenu) => {
            this.menuObj2 = contextmenu;
          }} />
      </div>
      )
    }
  }

  fillRestaurantTree(restaurant_tree){
    if(this.restaurant_data == null){
      restaurant_tree.push()
    }
    else{
      restaurant_tree.push(
        <div id="restaurant-tree">
          <h4 className="section-waiting-title"><i class='bx bx-chevrons-right'></i>Restaurants</h4>
          <TreeViewComponent
            className="treeview-external-drag"
            ref={tree => (this.treeObj3 = tree)}
            fields={this.restaurant_fields}
            nodeTemplate={this.treeTemplateRestaurant.bind(this)}
            allowDragAndDrop={true}
            nodeDragging={this.onItemDrag.bind(this)}
            nodeClicked={this.nodeclickedRestaurant.bind(this)}
            nodeDragStop={this.onTreeDragStopRestaurant.bind(this)} />
          <ContextMenuComponent
            target='#restaurant-tree'
            items={this.menuItems}
            beforeOpen={this.beforeOpenRestaurant.bind(this)}
            select={this.menuclick.bind(this)}
            ref={(contextmenu) => {
              this.menuObj3 = contextmenu;
            }} />
        </div>
      )
    }
  }
  handelSave(){
    console.table(this.state.places_plan)
    console.table(this.state.random_plan)
    var plan_obj  = {
      id: "",
      places_plan: this.state.places_plan,
      random_plan: this.state.random_plan
    }
    if(this.state.places_plan.length == 0 && this.state.random_plan.length == 0)
    {
      this.state.span_HTML = []
      this.state.span_HTML.push(<p>Please Fill your table first</p>)
    }else{
      if(this.state.auth_state == "signedIn"){
        if(this.state.edit_flag == true){
          plan_obj.id = this.state.edit_plan_id
        }
        fetch("http://localhost:8000/backend/plan", {
          method: "POST",
          body: JSON.stringify({
              token: localStorage.getItem("token"),
              plan: plan_obj,
          }),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      })
      // check from database
      this.state.span_HTML = []
      this.state.span_HTML.push(<p>Your plan has been saved please check <a href={`${process.env.PUBLIC_URL}/planProfile`}> your profile </a></p>)
      // remove tree
      var hotel_tree = []
      var attraction_tree = []
      var restaurant_tree = []
      this.removeTree(hotel_tree,attraction_tree,restaurant_tree)
      this.state.edit_plan = null
      }else{
        console.table("not found")
        this.state.span_HTML = []
        this.state.span_HTML.push(<p>Please <a href={`${process.env.PUBLIC_URL}/registeration`}>SignIn </a>first to Save Your Plan</p>)
      }
    }
    this.forceUpdate()
  }

  removeTree(hotel_tree,attraction_tree,restaurant_tree){
    localStorage.removeItem("Hotels")
    this.hotel_data = null
    this.fillHotelTree(hotel_tree)
    localStorage.removeItem("Attractions")
    this.attraction_data = null
    this.fillAttractionTree(attraction_tree)
    localStorage.removeItem("Restaurants")
    this.restaurant_data = null
    this.fillRestaurantTree(restaurant_tree)
  }

  checkForEditPlan(){
    if(localStorage.getItem("edit_plan")){
      this.state.edit_flag = true
      var plan = JSON.parse(localStorage.getItem("edit_plan"))
      this.state.edit_plan_id = plan.id
      var places = plan.places_plan
      this.state.places_plan = this.state.places_plan.concat(places)
      var random = plan.random_plan
      this.state.random_plan = this.state.random_plan.concat(random)
      places = places.concat(random)
      return places
    }
  }

  render() {
    // hotel
    var hotel_tree = []
    this.fillHotelTree(hotel_tree)
    // attraction
    var attraction_tree = []
    this.fillAttractionTree(attraction_tree)
    // restaurant
    var restaurant_tree = []
    this.fillRestaurantTree(restaurant_tree)
    // 
    var empty_data = []
    if(this.hotel_data == null && this.attraction_data == null && this.restaurant_data == null){
      empty_data.push(<h2 className="empty-data">No Data Was Found</h2>)
    }
    else{
      empty_data.push()
    }
    //var edit_plan = this.checkForEditPlan()
    if(localStorage.getItem("edit_plan")){
      var plan = JSON.parse(localStorage.getItem("edit_plan"))
      var places = plan.places_plan
      console.table(places[0].StartTime)
      this.state.date = places[0].StartTime
    }else{
      this.state.date = new Date()
    }
    
    return (
      <>
      <div className="breadcrumb-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="breadcrumb-wrap">
                            <h2>Generate Your plan</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="waiting-container">
          <div className="schedule-control-section row">
            <div className="col-lg-8 control-section">
              <div className="control-wrapper drag-sample-wrapper">
                <div className="schedule-container">
                  <div className="schedule-title">
                    <h2>Traveling plan</h2>
                  </div>
                  <ScheduleComponent
                    ref={schedule => this.scheduleObj = schedule}
                    width='100%' height='auto' currentView='Week'
                    className="schedule-drag-drop"
                    popupOpen={this.onPopupOpen.bind(this)}
                    /* quickInfoTemplates={{
                      header: this.headerTemplate.bind(this),
                    }} */
                    
                    selectedDate={this.state.date}
                    eventSettings={{
                      dataSource: this.state.edit_plan,
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
                    allowDragAndDrop={true}
                    actionBegin={this.onActionBegin.bind(this)}
                  >
                    <ViewsDirective>
                      <ViewDirective option='Day' />
                      <ViewDirective option='Week' />
                      <ViewDirective option='Month' interval='1' />
                      <ViewDirective option='Agenda' />
                    </ViewsDirective>
                    <Inject services={[Day, Week, Agenda, Month, DragAndDrop, Resize]} />
                  </ScheduleComponent>
                  <button className="plan-profile-button save-button" onClick={()=> this.handelSave()}> save</button>
                  {this.state.span_HTML}
                </div>
              </div>
            </div>
            <div className="col-lg-4 treeview-container">
              <div className="package-d-sidebar">
                <div className="row">
                  <div className="col-lg-12 col-md-6">
                    <div className="p-sidebar-cards p-sidebar-cards-edit mt-40">
                      <h5 class="package-d-head package-d-head-edit">Waiting List</h5>
                      {empty_data}
                      {hotel_tree}
                      {attraction_tree}
                      {restaurant_tree}
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
export default PlanGenerator;
