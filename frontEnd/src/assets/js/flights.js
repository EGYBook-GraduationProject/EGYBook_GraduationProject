import { data } from "jquery";

const axios = require("axios");
var sid
var sh
var id

 function getFlightData(from, to, noAdult, travelClass, flightHtml, departureDate) {
    // const options = {
    //     method: 'GET',
    //     url: 'https://api.flightapi.io/onewaytrip/62bc61aefa54150a3ea2944e/'+from+'/'+to+'/'+departureDate+'/2/0/1/Economy/EGP',

    // };
    //     axios.request(options).then(function (response) {
    //         console.table(response.data);
    //     }).catch(function (error) {
    //         console.error(error);
    //     })
    // }
    return new Promise((resolve) => {
        
    const options = {
        method: 'GET',
        url: 'https://travel-advisor.p.rapidapi.com/flights/create-session',
        params: { o1: from, d1: to, dd1: departureDate, currency: 'EGP', ta: noAdult, c: travelClass },
        headers: {
            'X-RapidAPI-Key': '5959f9e42dmsh07ebbea8decbe49p186ab4jsnf100b4509bc9',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    };

     axios.request(options).then(function (response) {
        console.table(response.data);
        sid = response.data.search_params.sid
        sh = response.data.summary.sh
        console.table(sid)
        console.table(sh)
    }).catch(function (error) {
        console.error(error);
    });
    resolve();
  });

}
 function pollFlight(from, to) {
    return new Promise((resolve) => {
        setTimeout(
            ()=>{
    console.table("entered ID")

    const options = {
        method: 'GET',
        url: 'https://travel-advisor.p.rapidapi.com/flights/poll',
        params: {
            sid: sid,
            so: 'PRICE',
            currency: 'EGP',
            n: '15',
            ns: 'NON_STOP,ONE_STOP',
            o: '0'
        },
        headers: {
            'X-RapidAPI-Key': '5959f9e42dmsh07ebbea8decbe49p186ab4jsnf100b4509bc9',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    };

     axios.request(options).then(function (response) {
        console.table(response.data);
        console.table("id")
        id = response.data.itineraries[0].l[0].id
        console.table(id)


    }).catch(function (error) {
        console.error(error);
    });
},5000);

    resolve();
  });
}
 function flightResult(from, to) {

    return new Promise((resolve) => {
        setTimeout(
            ()=>{
    const options = {
        method: 'GET',
        url: 'https://travel-advisor.p.rapidapi.com/flights/get-booking-url',
        params: {
            searchHash: sh,
            Dest: to,
            id: id,
            Orig: from,
            searchId: sid
        },
        headers: {
            'X-RapidAPI-Key': '5959f9e42dmsh07ebbea8decbe49p186ab4jsnf100b4509bc9',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    };

     axios.request(options).then(function (response) {
        console.table("enter")
        console.table(response.data.partner_url);
        var url = response.data.partner_url
        localStorage.setItem("url", url)
        return response.data.partner_url
    }).catch(function (error) {
        console.error(error);
    });
},10000);

    resolve();
  });

}
export async function fnAsync(from, to, noAdult, travelClass, flightHtml, departureDate) {
    await getFlightData(from, to, noAdult, travelClass, flightHtml, departureDate);
    await pollFlight(from,to);
    await flightResult(from,to);
  }