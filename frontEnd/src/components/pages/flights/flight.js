import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from 'moment';



import { fnAsync } from "../../../assets/js/flights"

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
class Packages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flightList: [],
            flightHtmlArray: [],
            flightError: null,
            fields: {},
            trips:{},
            errors: {},
            loading:false,

        };
        let fields = this.state.fields;
        fields["from"] = null;
        fields["to"] = null;
        fields["departure"] = Moment(new Date()).format("YYYY-MM-DD");
        fields["return"] = Moment(new Date()).format("YYYY-MM-DD");

        let trips = this.state.trips;
        trips["oneWay"]=null;
        trips["round"]=null;
        this.handleClick = this.handleClick.bind(this);
    }
    async handleChange(field, e) {

        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
        console.table(fields)
        
    }
    async handleTrip(trip, e) {
        let trips = this.state.trips;
        var roundtrip = document.getElementById("roundtrip")
        var oneWay = document.getElementById("one-way")
        if (e.target.value === "round") {
        
        trips[trip] = "round";
        trips["oneWay"]=null;

        this.setState({ trips });
        console.table(trips)}
        else if(e.target.value ==="oneWay"){
            trips[trip] = "oneWay";
            trips["round"]=null;
            this.setState({ trips });
            console.table(trips)
        }
        else{
            trips[trip] = null;
        this.setState({ trips });
        console.table(trips)
        }
        
        
    }
    
      flightUrl(event){
        return new Promise((resolve) => {
        event.preventDefault();
        let trips = this.state.trips
        let fields = this.state.fields;
        if(trips["oneWay"] !== null){
        var flightURL =   fnAsync(fields["from"], fields["to"], "1", "0", this.state.flightHtmlArray, fields["departure"])}
        resolve();
    });
    }

     handleClick() {
        
        let errors = {};
        return new Promise((resolve) => {
            setTimeout(
                ()=>{
        if(localStorage.getItem("url") !== null && localStorage.getItem("url") !== "undefined" ){
        window.location.href =localStorage.getItem("url");
        localStorage.removeItem("url")
        }
        else if(localStorage.getItem("url") === null || localStorage.getItem("url") === "undefined"){
            errors["flight"] = "no flight found";

            // alert("no flight found")
        }
    },14000);
    this.setState({ errors: errors });
    this.state.loading = true
        resolve();
    });
      }
     async result(e){
        this.state.loading = false

        // this.setState({ loading: true }, () => {
         this.flightUrl(e);
         this.handleClick();
    //     this.setState({
    //     loading: false,
    //     // data: [...result.data],
    //   })});
      }
      
    render() {
        return (
            <>
                {/* ===============  Package  area start =============== */}
                <div id="flightBooking" class="section">
                    <div class="section-center">
                        <div class="container">
                            <div class="row">
                                <div className="flightBooking-form">
                                    <form>
                                        <div className="form-group">
                                            <div className="form-checkbox">
                                                <label for="roundtrip">
                                                    <input type="radio" id="roundtrip" name="flight-type" value="round" onChange={this.handleTrip.bind(this, "round")} />
                                                    <span></span>Roundtrip
                                                </label>
                                                <label for="one-way">
                                                    <input type="radio" id="one-way" name="flight-type" value="oneWay" onChange={this.handleTrip.bind(this, "oneWay")} />
                                                    <span></span>One way
                                                </label>
                                                {/* <label for="multi-city">
                                                    <input type="radio" id="multi-city" name="flight-type" />
                                                    <span></span>Multi-City
                                                </label> */}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <span className="form-label">Flying from</span>
                                                    <input className="form-control" type="text" placeholder="City or airport" value={this.state.fields["from"]} onChange={this.handleChange.bind(this, "from")}/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <span className="form-label">Flying to</span>
                                                    <input className="form-control" type="text" placeholder="City or airport" value={this.state.fields["to"]} onChange={this.handleChange.bind(this, "to")} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <span className="form-label">Departing</span>
                                                    <input className="form-control" type="date" required value={this.state.fields["departure"]} onChange={this.handleChange.bind(this, "departure")}/>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <span className="form-label">Returning</span>
                                                    <input className="form-control" type="date"  value={this.state.fields["return"]} onChange={this.handleChange.bind(this, "return")}/>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <span className="form-label">Adults (18+)</span>
                                                    <select className="form-control">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </select>
                                                    <span className="select-arrow"></span>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <span className="form-label">Children (0-17)</span>
                                                    <select className="form-control">
                                                        <option>0</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </select>
                                                    <span className="select-arrow"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <span className="form-label">Travel className</span>
                                                    <select className="form-control">
                                                        <option>Economy className</option>
                                                        <option>Business className</option>
                                                        <option>First className</option>
                                                    </select>
                                                    <span className="select-arrow"></span>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-btn">
                                                    <button className="submit-btn" onClick={e => this.result(e)}>{this.state.loading?<i class="fa fa-spinner fa-spin"></i>:""} Show flights</button>
                                                    
                                                    {/* {loading ? <LoadingSpinner /> : <ResultsTable results={data} />} */}
                                                    <span style={{ color: "white" }}>{this.state.errors["flight"]}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
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

export default Packages;
