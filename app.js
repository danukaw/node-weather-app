console.log("start executing app.js");

const request = require('request');

request({
    url : "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAl-QCs1Ztxejbm1G7yUHYkl_TLulqAPTY&address=341/1%20Wellawaya%20road%20monaragala",
    json: true
}, (error, response, body) => {
    console.log(JSON.stringify(body, undefined, 2));
    console.log("========= END BODY ===========");
 /*    console.log(response);
    console.log("========= END RESPONSE ======="); */
    console.log("inside call back function");
});

console.log("finished executing app.js")