import React, { Component } from "react";
import MainBanner from "./MainBanner";
import Destinations from "./Destinations";
import Achievement from "./Achievement";
import FindForm from "./FindForm";
import Plan from "./Plan";

//Define Default Content
class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  } 

  render() {
   
    
    return (
     
       <div>
           
           {/* End Preloader Area */}

           {/*---------Start Imported All Sections-----------*/}
          <MainBanner /> 
          <FindForm/>
        <Destinations />
        <Plan/>
        <Achievement /> 
        
           {/*---------End Imported All Sections-----------*/}
       </div>
    );
  }
}

export default HomePage;
