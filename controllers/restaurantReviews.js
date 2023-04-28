function handelRestaurantReview(review){
    if(review != "None"){
        var found = [],          // an array to collect the strings that are found
        rxp = /{([^}]+)}/g,
        str = review,
        curMatch;
        //console.log(str)
        console.log("7")
        while( curMatch = rxp.exec( str ) ) {
            // get profilename
            var firstvariable = "'profilename': '";
            var secondvariable = "', 'date_of_review':"
            var profile_name = curMatch[1].match(new RegExp(firstvariable + "(.*)" + secondvariable));
            // console.log(profile_name)
            //console.log("8")
            // get date 'date': '
            firstvariable = "'date_of_review': '";
            secondvariable = "', 'rate':"
            var date_of_review = curMatch[1].match(new RegExp(firstvariable + "(.*)" + secondvariable));
            //console.log(date)
            //console.log("9")
            // get rate  'rate': '
            firstvariable = "'rate': '";
            secondvariable = "', 'title':"
            var rate = curMatch[1].match(new RegExp(firstvariable + "(.*)" + secondvariable));
            rate = parseFloat(rate[1])
            //console.log(rate)
           // console.log("10")
            // get title 'title': '
            firstvariable = "'title': '";
            secondvariable = "', 'review':"
            var title = curMatch[1].match(new RegExp(firstvariable + "(.*)" + secondvariable));
            //console.log(title);
            //console.log("11")
            if(title == null){
                firstvariable = "'title': "+'"';
                secondvariable = '"'+", 'review':"
                title = curMatch[1].match(new RegExp(firstvariable + "(.*)" + secondvariable));
                //console.log(title);
                //console.log("12")
            }
            //console.log("13")
            // get review 
            firstvariable = "'review': '";
            secondvariable = "', 'date_of_visit':";
            var review = curMatch[1].match(new RegExp(firstvariable + "(.*)" + secondvariable));
            if(review == null){
                firstvariable = "'review': "+'"';
                secondvariable = '"'+", 'date_of_visit':";
                review = curMatch[1].match(new RegExp(firstvariable + "(.*)" + secondvariable));
            }
            //console.log(review)
            // get date of stay 'dateofsaty': '
            firstvariable = "'date_of_visit': '";
            secondvariable = "'";
            var date_of_visit = curMatch[1].match(new RegExp(firstvariable + "(.*)" + secondvariable));
            var reviews = {
                profileName: profile_name[1],
                date_of_review: date_of_review[1],
                rate: rate,
                title: title[1],
                review: review[1],
                date_of_visit: date_of_visit[1]
            }
            found.push( reviews );
        }
        //console.log(found);
        //console.log(found.length);
        return found 
    }

}

module.exports = {handelRestaurantReview}