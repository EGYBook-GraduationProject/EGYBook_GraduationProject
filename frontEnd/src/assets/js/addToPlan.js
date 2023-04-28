function arrayRemove(arr, value) {
    return arr.filter(function (item) {
        return (item.name != value.name);
    });
}

function arrayRemoveFromEdit(arr, value) {
    return arr.filter(function (item) {
        var name = item.Subject
        if(name.includes("(Hotel)")){
            name = name.replace(" (Hotel)","")
        }else if(name.includes("(Attraction)")){
            name = name.replace(" (Attraction)","")
        }else if(name.includes("(Reataurant)")){
            name = name.replace(" (Restaurant)","")
        }
        return (name != value.name);
    });
}

function handelRemoveFromWaiting(item,local_name) {
    var parsedArray = []
    if (localStorage.getItem(local_name)) {
        var temp = localStorage.getItem(local_name);
        parsedArray = JSON.parse(temp)
        if (parsedArray.length > 1) {
            parsedArray = arrayRemove(parsedArray, item)
        } else {
            parsedArray = []
        }
        if (parsedArray.length == 0) {
            localStorage.removeItem(local_name);
        }
        else { window.localStorage.setItem(local_name, JSON.stringify(parsedArray)); }
    }
}

function handelRemoveFromEditList(item){
    var parsedArray = []
    if (localStorage.getItem("edit_plan")) {
        var temp = localStorage.getItem("edit_plan");
        parsedArray = JSON.parse(temp)
        console.table(parsedArray)
        var places = parsedArray.places_plan
        var random = parsedArray.random_plan
        if(places.length > 1) {
            places = arrayRemoveFromEdit(places, item)
        } else {
            places = []
        }
        if (random.length > 1) {
            random = arrayRemoveFromEdit(random, item)
        } else {
            random = []
        }
        parsedArray.places_plan = places
        parsedArray.random_plan = random
         window.localStorage.setItem("edit_plan", JSON.stringify(parsedArray)); 
    }
}

function addHotelToPlan(item) {
    var parsedArray = []
    var arr = []
    var button = document.getElementById(item.name)
    console.table(button.classList)
    if (localStorage.getItem("Hotels")) {
        var temp = localStorage.getItem("Hotels");
        parsedArray = JSON.parse(temp)
        if (temp.includes(JSON.stringify(item))) {
            // Remove
                parsedArray = arrayRemove(parsedArray, item)
                console.table(parsedArray)
                console.table("5")
                button.classList.remove("fa-minus-circle")
                button.classList.add("fa-plus-circle")
                button.title = "Add to plan"
        } else {
            //add
                parsedArray.push(item);
                button.classList.remove("fa-plus-circle")
                button.classList.add("fa-minus-circle")
                button.title = "Remove from plan"
        }
        if (parsedArray.length == 0) {
            localStorage.removeItem("Hotels");
        }
        else { window.localStorage.setItem("Hotels", JSON.stringify(parsedArray)); }

    }
    else {
        console.table("first Time")
        parsedArray.push(item)
        window.localStorage.setItem("Hotels", JSON.stringify(parsedArray));
        button.classList.remove("fa-plus-circle")
        button.classList.add("fa-minus-circle")
        button.title = "Remove from plan"
        //console.table(button.classList)

    }
}

function addAttractionToPlan(item) {
    var parsedArray = []
    var arr = []
    var button = document.getElementById(item.name)

    if (localStorage.getItem("Attractions")) {
        var temp = localStorage.getItem("Attractions");
        parsedArray = JSON.parse(temp)
        if (temp.includes(JSON.stringify(item))) {
            // Remove
                // console.table(parsedArray)
                // console.table(item)
                parsedArray = arrayRemove(parsedArray, item)
                console.table(parsedArray)
                console.table("5")
                button.classList.remove("fa-minus-circle")
                button.classList.add("fa-plus-circle")
                button.title = "Add to plan"
        } else {
            //add
                parsedArray.push(item);
                button.classList.remove("fa-plus-circle")
                button.classList.add("fa-minus-circle")
                button.title = "Remove from plan"
        }
        if (parsedArray.length == 0) {
            localStorage.removeItem("Attractions");
        }
        else { window.localStorage.setItem("Attractions", JSON.stringify(parsedArray)); }

    }
    else {
        console.table("first Time")
        parsedArray.push(item)
        window.localStorage.setItem("Attractions", JSON.stringify(parsedArray));
        button.classList.remove("fa-plus-circle")
        button.classList.add("fa-minus-circle")
        button.title = "Remove from plan"
    }
}

function addRestaurantToPlan(item) {
    var parsedArray = []
    var arr = []
    var button = document.getElementById(item.name)

    if (localStorage.getItem("Restaurants")) {
        var temp = localStorage.getItem("Restaurants");
        parsedArray = JSON.parse(temp)
        if (temp.includes(JSON.stringify(item))) {
            // Remove
                parsedArray = arrayRemove(parsedArray, item)
                console.table(parsedArray)
                console.table("5")
                button.classList.remove("fa-minus-circle")
                button.classList.add("fa-plus-circle")
                button.title = "Add to plan"
        } else {
            //add
                parsedArray.push(item);
                button.classList.remove("fa-plus-circle")
                button.classList.add("fa-minus-circle")
                button.title = "Remove from plan"
        }
        if (parsedArray.length == 0) {
            localStorage.removeItem("Restaurants");
        }
        else { window.localStorage.setItem("Restaurants", JSON.stringify(parsedArray)); }

    }
    else {
        console.table("first Time")
        parsedArray.push(item)
        window.localStorage.setItem("Restaurants", JSON.stringify(parsedArray));
        button.classList.remove("fa-plus-circle")
        button.classList.add("fa-minus-circle")
        button.title = "Remove from plan"
    }
}


export { addHotelToPlan, addAttractionToPlan, addRestaurantToPlan,handelRemoveFromWaiting,handelRemoveFromEditList}