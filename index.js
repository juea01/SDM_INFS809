//Henry test with ngrok 2 Sep

// First we need to import the HTTP module. This module contains all the logic for dealing with HTTP requests.
var http = require('http');

// Import express and request modules
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');



// Store our app's ID and Secret. These we got from Step 1. 
// For this tutorial, we'll keep your API credentials right here. But for an actual app, you'll want to  store them securely in environment variables. 
var clientId = '413354812451.427533931460';
var clientSecret = 'e93139ac9118b7ec41e90e4631ca11d5';

// Instantiates Express and assigns our app variable to it
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });



// Again, we define a port we want to listen to
const PORT=8000;

// Lets start our server
app.listen(PORT, function () {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Example app listening on port " + PORT);
});


// This route handles GET requests to our root ngrok address and responds with the same "Ngrok is working message" we used before
app.get('/', function(req, res) {
    res.send('Henry say Ngrok is working! Path Hit: ' + req.url);
});

// This route handles get request to a /oauth endpoint. We'll use this endpoint for handling the logic of the Slack oAuth process behind our app.
app.get('/oauth', function(req, res) {
    // When a user authorizes an app, a code query parameter is passed on the oAuth endpoint. If that code is not there, we respond with an error message
    if (!req.query.code) {
        res.status(500);
        res.send({"Error": "Looks like we're not getting code."});
        console.log("Looks like we're not getting code.");
    } else {
        // If it's there...

        // We'll do a GET call to Slack's `oauth.access` endpoint, passing our app's client ID, client secret, and the code we just got as query parameters.
        request({
            url: 'https://slack.com/api/oauth.access', //URL to hit
            qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret}, //Query string data
            method: 'GET', //Specify the method

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                res.json(body);

            }
        })
    }
});

//Add function to send Message to Slack
function sendMessageToSlackResponseURL(responseURL,JSONmessage){

    var postOptions =
    {
        uri: responseURL,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        json: JSONmessage
    }

    request(postOptions, (error,response,body)=>{
        if (error){
            //handle errors as you see fit
        }
    })
}


// Route the endpoint that our slash command will point to and send back a simple response to mbot command
app.post('/command', urlencodedParser, function(req, res) {
    res.send('Welcome to Monitor slack bot of Group 08 !');
    res.status(200).end(); // best practice to respond with empty 200 status code
    var reqBody = req.body;
    var responseURL = reqBody.response_url;
    
    if ( 1 != 1)//reqBody.token != YOUR_APP_VERIFICATION_TOKEN){
        {

        res.status(403).end("Acess fordidden") 
    
    }
    else {    
        var message = {
            "text": "Hey,would you like to share something now ?",
            "attachments": [
                {
                    "text": "You can choose one option to go next",
                    "fallback": "You are unable to choose this option",
                    "callback_id": "wopr_survey",
                    "color": "#3AA3E3",
                    "attachment_type": "default",
                    "actions": [
                        {
                            "name": "Ignore",
                            "text": "Ignore",
                            "type": "button",
                            "value": "Ignore",
                                "confirm": {
                                "title": "Are you sure?",
                                "text": "Wouldn't you like to share something now?",
                                "ok_text": "Yes",
                                "dismiss_text": "No"
                            }
                        },
                        {
                            "name": "Later",
                            "text": "Later",
                            "type": "button",
                            "value": "Later"
                        },
                        {
                            "name": "Letgo",
                            "text": "Let go",
                            "style": "primary", //danger, warning
                            "type": "button",
                            "value": "Letgo"
                       
                        }
                    ]
                }
            ]
        }

        sendMessageToSlackResponseURL(responseURL, message);

    }

});


app.post('/actions', urlencodedParser, (req, res) =>{
    res.status(200).end() // best practice to respond with 200 status
    var actionJSONPayload = JSON.parse(req.body.payload) // parse URL-encoded payload JSON string
    var message = {
        "text": actionJSONPayload.user.name+" clicked: " + actionJSONPayload.actions[0].name,
        "replace_original": false
    }

    if ( actionJSONPayload.actions[0].value == "Letgo")//reqBody.token != YOUR_APP_VERIFICATION_TOKEN){
        {

         var reqBody = req.body;
         var responseURL = reqBody.response_url;
    
         message = {
        "text": "How are you happy with work ?",
        "attachments": [
            {
                "text": "Please share us your fell now",
                "fallback": "You are unable to choose this option",
                "callback_id": "wopr_survey",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {

                        "name": "Thrilled",
                        "text": "Thrilled :heart_eyes_cat:",
                        "type": "button",
                        "value": "Thrilled",
                            "confirm": {
                            "title": "Are you sure?",
                            "text": "Wouldn't you like to share something now?",
                            "ok_text": "Yes",
                            "dismiss_text": "No"
                               }
                    },
                    {
                        "name": "Happy",
                        "text": "Happy :smile_cat:",
                        "type": "button",
                        "value": "Happy"
                    },
                    {
                        "name": "Smiley",
                        "text": "Smiley :kissing_cat:",
                        "type": "button",
                        "value": "Smiley"
                    },
                    {
                        "name": "Boring",
                        "text": "Boring :smirk_cat:",
                        "type": "button",
                        "value": "Boring"
                    },
                    {
                        "name": "Morose",
                        "text": "Morose :crying_cat_face:",
                        "type": "button",
                        "value": "Morose"
                    }
            ]
           
          }
         ]       
            
           }
         sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  
        };
        
        
     if ( actionJSONPayload.actions[0].value == "Happy")//reqBody.token != YOUR_APP_VERIFICATION_TOKEN){
            {
    
             var reqBody = req.body;
             var responseURL = reqBody.response_url;
        
             message = {
            "text": "How are you happy with work ?",
            "attachments": [
                {
                    "text": "You are verry happy !",
                    "fallback": "You are unable to choose this option",
                    "callback_id": "wopr_survey",
                    "color": "#3AA3E3",
                    "attachment_type": "default" 
               
              }
             ]       
                
               }
             sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  
            }     
            




});


/*
            "attachments": [
                {
                    "fallback": "ReferenceError - UI is not defined: https://honeybadger.io/path/to/event/",
                    "text": "You can choose happy level of yourself :poop:?",
                   // "fallback": "You are unable to choose this option",
                   // "callback_id": "wopr_survey",
                    "color": "#3AA3E3",
                   // "attachment_type": "default",
                    "fields": [
                        {
                            "title": "Thrilled :boom:",
                            "value": "Awesome Project",
                            "short": true
                        },
                        {
                            "title": "Happy :heart_eyes:",
                            "value": "production",
                            "short": true
                        },
                        {
                            "title": "Smiley :smiley:",
                            "value": "Awesome Project1",
                            "short": true
                        },
                        {
                            "title": "Tongue :stuck_out_tongue:",
                            "value": "production3",
                            "short": true
                        },
                        {
                            "title": "sweat :sweat:",
                            "value": "production2",
                            "short": true
                        }]
                       */