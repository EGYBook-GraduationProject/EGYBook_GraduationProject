function parseArray(array) {
    array = [...array.map((obj) => {
      if(obj.images!=="None")
      {obj.images = JSON.parse(obj.images.replace(/'/g, `"`))}
        return obj;
    })];
}

function modifyStarnum(array){
    array = [...array.map((obj) => {
        obj.starnum = parseFloat(obj.starnum)
        return obj;
    })];
}

function parseImages(array){
    array = [...array.map((obj) => {
    if(obj.images != "None"){
        obj.images = (obj.images).replace(/photo-w/g,"photo-o")
        obj.images = (obj.images).replace(/photo-s/g,"photo-o")
        obj.images = JSON.parse(obj.images.replace(/'/g, `"`))
        if((obj.images).length > 1 ){
            obj.images = [...new Set(obj.images)];
        }
    }
    return obj;
})];
}
function parseroomfeatures(array) {
    array = [...array.map((obj) => {
        if(obj.roomfeatures != "None"){
            obj.roomfeatures = obj.roomfeatures.replace(/'s/g, ` `)
            obj.roomfeatures = obj.roomfeatures.replace(/s' /g, `s`)
            obj.roomfeatures = JSON.parse(obj.roomfeatures.replace(/'/g, `"`))
        }
        return obj;
    })];
}function parsePropertyamenities(array) {
    array = [...array.map((obj) => {
        if(obj.Propertyamenities != "None"){
            obj.Propertyamenities = obj.Propertyamenities.replace(/'s/g, ` `)
            obj.Propertyamenities = obj.Propertyamenities.replace(/s' /g, `s`)
        obj.Propertyamenities = JSON.parse(obj.Propertyamenities.replace(/'/g, `"`))
        }
        return obj;
    })];
}
function parsehotelstyle(array){
    array = [...array.map((obj) => {
    if(obj.hotelstyle != "None"){
        obj.hotelstyle = obj.hotelstyle.replace(/'s/g, ` `)
        obj.hotelstyle = obj.hotelstyle.replace(/s' /g, `s`)
        obj.hotelstyle = JSON.parse(obj.hotelstyle.replace(/'/g, `"`))
    } 
    return obj;
})];
}
function modifycuisines(array){
    array = [...array.map((obj) => {
        if(obj.cuisines == "None"){
            obj.cuisines = ""
        }
        return obj;
    })];
}

module.exports = {parseArray,parseroomfeatures,parsePropertyamenities,parsehotelstyle,modifyStarnum,modifycuisines,parseImages}