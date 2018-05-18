$(document).ready(function () {

const url = "https://randomuser.me/api/?results=12&nat=us&exc=gender,registered,phone,id,nat&callback=?";

$.getJSON(url, function (data) {
    // displays first name of first object in the results array
    console.log(data.results[0].name.first);

});


});
