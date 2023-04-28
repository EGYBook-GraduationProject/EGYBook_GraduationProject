export function postData(param,route){
    const { city,name } = param
    fetch("http://localhost:8000/backend/" + route, {
        method: "POST",
        body: JSON.stringify({
            city: city,
            name: name
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    //.then(response => response.json())
}


//export default {postData,getData}