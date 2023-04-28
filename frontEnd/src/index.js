import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { registerLicense } from '@syncfusion/ej2-base';


//Image LightBox
import SimpleReactLightbox from 'simple-react-lightbox'

//Layout default import from components.
import defaultLayout from "./components/layouts/main";

//Import wrapping layout
import Layout from "./components/app";

//Import all page from components
import packages from "./components/pages/package/Packages";
import contact from "./components/pages/contact/Contact";
import faq from "./components/pages/faq/Faq";
import error from "./components/pages/404/404";
import guide from "./components/pages/guide/GuideComponent";
import HotelDetails from "./components/pages/package/HotelDetails";
import attractionDetails from "./components/pages/package/AttractionDetails";
import signIn from "./components/pages/registeration/SignIn";
import typeOfUser from "./components/pages/registeration/TypeOfUser";
import tourist from "./components/pages/registeration/Tourist";
import tourGuide from "./components/pages/registeration/TourGuide";
import admin from "./components/pages/registeration/Admin";
import SearchResults from "./components/pages/search/SearchResults";
import hotelsAllResults from "./components/pages/search/hotelsAllResults";
import attractionsAllResults from "./components/pages/search/attractionsAllResults";
import restaurantsAllResults from "./components/pages/search/restaurantsAllResults";
import AboutCity from "./components/pages/aboutcity/AboutCity";
import moreCities from "./components/pages/aboutcity/moreCities";
import PlanGenerator from "./components/pages/plan/PlanGenerator";
import PlanProfile from "./components/pages/plan/PlanProfile";
import FindForm from "./components/pages/home/FindForm";
import Plan from "./components/pages/home/Plan";
import restaurantDetails from "./components/pages/package/RestaurantDetails";
import Reservation from "./components/pages/reservation/Reservation";
import ErrorMessage from "./components/pages/registeration/ErrorMessage";
import myAccount from "./components/pages/registeration/myAccount";
import Flight from "./components/pages/flights/flight";
import RentCar from"./components/pages/cars/cars";
//Initializations All Css
import './index.css';
import './index.scss';


// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2VVhhQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkBjUX9ZdHFVRmBaVkc=');

//Default Warniing Error Hide
console.log = console.warn = console.error = () => { };

/*
* Version : 0.1
* Event : Rendering all content to web.
* Actions: Define all routes and page.
* @return html
* */

class Root extends React.Component {
    render() {
        return (
            <BrowserRouter basename={"/"}>
                <Switch>
                    <Route exact path='/' component={defaultLayout} />
                    <Layout>
                        <Switch>
                            <Route path={`${process.env.PUBLIC_URL}/hotel/:city/:name`} component={HotelDetails} />
                            <Route path={`${process.env.PUBLIC_URL}/attraction/:city/:name`} component={attractionDetails} />
                            <Route path={`${process.env.PUBLIC_URL}/planGenerator`} component={PlanGenerator} />
                            <Route path={`${process.env.PUBLIC_URL}/errMsg`} component={ErrorMessage} />
                            <Route path={`${process.env.PUBLIC_URL}/planProfile`} component={PlanProfile} />
                            <Route path={`${process.env.PUBLIC_URL}/restaurant/:city/:name`} component={restaurantDetails} />
                            <Route path={`${process.env.PUBLIC_URL}/MoreCities`} component={moreCities} />
                            <Route path={`${process.env.PUBLIC_URL}/package/:type`} component={packages} />
                            <Route path={`${process.env.PUBLIC_URL}/faq`} component={faq} />
                            <Route path={`${process.env.PUBLIC_URL}/guide`} component={guide} />
                            <Route path={`${process.env.PUBLIC_URL}/contact`} component={contact} />
                            <Route path={`${process.env.PUBLIC_URL}/registeration`} component={signIn} />
                            <Route path={`${process.env.PUBLIC_URL}/typeOfUser`} component={typeOfUser} />
                            <Route path={`${process.env.PUBLIC_URL}/tourist`} component={tourist} />
                            <Route path={`${process.env.PUBLIC_URL}/tourGuide`} component={tourGuide} />
                            <Route path={`${process.env.PUBLIC_URL}/admin`} component={admin} />
                            <Route path={`${process.env.PUBLIC_URL}/search/:string`} component={SearchResults} />
                            <Route path={`${process.env.PUBLIC_URL}/searchHotel/:string`} component={hotelsAllResults} />
                            <Route path={`${process.env.PUBLIC_URL}/searchAttraction/:string`} component={attractionsAllResults} />
                            <Route path={`${process.env.PUBLIC_URL}/searchrestaurants/:string`} component={restaurantsAllResults} />
                            <Route path={`${process.env.PUBLIC_URL}/AboutCity/:string`} component={AboutCity} />
                            <Route path={`${process.env.PUBLIC_URL}/FindForm`} component={FindForm} />
                            <Route path={`${process.env.PUBLIC_URL}/Plan`} component={Plan} />
                            <Route path={`${process.env.PUBLIC_URL}/Reservation`} component={Reservation} />
                            <Route path={`${process.env.PUBLIC_URL}/myAccount`} component={myAccount} />
                            <Route path={`${process.env.PUBLIC_URL}/flight`} component={Flight} />
                            <Route path={`${process.env.PUBLIC_URL}/car`} component={RentCar} />

                            <Route component={error} />
                        </Switch>
                    </Layout>
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <React.StrictMode>
        <SimpleReactLightbox>
            <Root />
        </SimpleReactLightbox>
    </React.StrictMode>,
    document.getElementById("root")
);

