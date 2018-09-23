//Henry test with ngrok 2 Sep

// First we need to import the HTTP module. This module contains all the logic for dealing with HTTP requests.
var http = require('http');

// Import express and request modules
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
//import our business layer
var BusinessLayer = require('./BusinessLayer');
var name1,icon1,style1,name2,icon2,style2,name3,icon3,style3,name4,icon4,style4,name5,icon5,style5;
var happinesslevel ='';



//10 September
//const axios = require('axios');
//const qs = require('qs');
//const apiUrl = 'https://slack.com/api';

// Store our app's ID and Secret. These we got from Step 1. 
// For this tutorial, we'll keep your API credentials right here. But for an actual app, you'll want to  store them securely in environment variables. 
var clientId = '413354812451.427533931460';
var clientSecret = 'e93139ac9118b7ec41e90e4631ca11d5';
var tokenId = 'xoxp-413354812451-413568494785-433650059650-047d018e19b8968c76c217215850b7d7';
var tsMessage ='';
var response_url;
var msg;
var bodyMesg;
var typeTeam ='I';//Individual
var CommitBtn = 'COMMIT INDIVIDUAL';//'COMMIT INDIVIDUAL' or 'COMMIT TEAMWORK'

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


//PHP Message function:
// NewMessage creates a new Message

function ActionArr (name1,icon1,style1,name2,icon2,style2,name3,icon3,style3,name4,icon4,style4,name5,icon5,style5)
    { 
        var ActionNode =
        [ {

            "name": name1,
            "text": name1 + ' '+ icon1, 
            "type": "button",
            "style": style1,
            "value": name1
        },
        {
            "name": name2,
            "text": name2 + ' '+ icon2, 
            "type": "button",
            "style": style2,
            "value": name2
        },
        {
            "name": name3,
            "text": name3 + ' '+ icon3, 
            "type": "button",
            "style": style3,
            "value": name3
        },
        {
            "name": name4,
            "text": name4 + ' '+ icon4, 
            "type": "button",
            "style": style4,
            "value": name4
        },
        /*{
            "name": "COMMIT",
            "text": "COMMIT" , 
            "type": "button",
            "style": "danger",
            "value": "COMMIT"
        },*/
        {
            "name": name5,
            "text": name5 + ' '+ icon5, 
            "type": "button",
            "style": style5,
            "value": name5
        }

    
    ]
        
    return ActionNode

}


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
        if (error){localStorage
            //handle errors as you see fit
        }
    })
}

//20 September: Henry added the sending file function
//'https://files.slack.com/files-pri/TC5AEPWD9-FCX7GKNBC/test_slack.xlsx',
function UploadFile2Slack (filename)
{  
    var postOptions =
    {
        uri: 'https://slack.com/api/files.upload',//'https://slack.com/api/chat.postEphemeral'
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        qs: {
            "token": tokenId,//integration.get('slack_token'),
            "channel": 'CCTQ8NXCP',//integration.get('channel_id'),
            //"user": 'UC5GQEJP3', //@phucpebble
            "filename": filename//'https://files.slack.com/files-pri/TC5AEPWD9-FCX7GKNBC/test_slack.xlsx',
            //"attachments": JSON.stringify(attachment)
            //"icon_url": SLACK_BOT_ICON,
           }

    }

    request(postOptions, (error,response,body)=>{
        //resMess = .response; 
        var reqBody = body;
        bodyMesg =body;
        responseURL = reqBody.response_url;
        response_url = responseURL;
        //tsMessage = body.ts;
        console.log("Chuoi tra ve test upload file to slack la: ")
        console.log(body);
        
        if (error){
            //handle errors as you see fit
        }

        
    })

}

function sendToSlack(attachment, message) {
    request.post({
    json: true,
    url: 'https://slack.com/api/chat.postMessage',
    qs: {
      "token": tokenId,//integration.get('slack_token'),
      "channel": 'CCTQ8NXCP', //integration.get('channel_id'),
      "username": 'HowIsIt',
      "text": 'Test with chat.postMessage',
      //"attachments": JSON.stringify(attachment),
      //"icon_url": SLACK_BOT_ICON,
     },
    }, function(err, resp, body) {
      if (body.ok) {
        console.log(body);
      } else {
        console.log(err);
      }
    });
  }

//10 September: Henry Add function to chat.postMessage

function chatPostMessage(responseURL,attachment){
    var postOptions =
    {
        uri: 'https://slack.com/api/chat.postMessage',//'https://slack.com/api/chat.postEphemeral'
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        qs: {
            "token": tokenId,//integration.get('slack_token'),
            "channel": 'CCTQ8NXCP',//integration.get('channel_id'),
            //"user": 'UC5GQEJP3', //@phucpebble
            "username": 'HowIsIt',
            "attachments": JSON.stringify(attachment)
            //"icon_url": SLACK_BOT_ICON,
           }

    }

    
    request(postOptions, (error,response,body)=>{
        //resMess = .response; 
        var reqBody = body;
        bodyMesg =body;
        responseURL = reqBody.response_url;
        response_url = responseURL;

        //tsMessage = body.ts;
        console.log("Ben trong ham request " + responseURL);
        tsMessage = JSON.parse(body).ts;
        //console.log("Ben trong ham request " + tsMessage);
        //tsMessage = JSON.parse(body).ts;
        //console.log(tsMessage);
        if (error){
            //handle errors as you see fit
        }

        
    })
    
}

//10 September: Henry Add function to Update Message
function chatUpdateMessage(responseURL,Timestamp,attachment){

    var postOptions =
    {
        uri: 'https://slack.com/api/chat.update',
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        qs: {
            "token": tokenId,//integration.get('slack_token'),
            "channel": 'CCTQ8NXCP',//integration.get('channel_id'),
            "username": 'HowIsIt',
            "ts": Timestamp,
            "attachments": JSON.stringify(attachment),
            //"icon_url": SLACK_BOT_ICON,
           },

    }

    request(postOptions, (error,response,body)=>{
        if (error){
            //handle errors as you see fit
        }
    })
}

//10 September: Henry Add function to Update Message
function chatUpdateMessage2(responseURL,Timestamp,attachment){
    response_url = body.response_url;
    var postOptions =
    {
        uri: response_url,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        qs: {
            "token": tokenId,//integration.get('slack_token'),
            "channel": 'CCTQ8NXCP',//integration.get('channel_id'),
            "username": 'HowIsIt',
            "ts": Timestamp,
            "attachments": JSON.stringify(attachment),
            //"icon_url": SLACK_BOT_ICON,
           },

    }

    request(postOptions, (error,response,body)=>{
        if (error){
            //handle errors as you see fit
        }
    })
}

// Route the Slack command /mbot in the config slack app: Process with input happiness level part
app.post('/mbot', urlencodedParser, function(req, res) {
    //res.send('Welcome to Monitor slack bot of Group 08 !');
    res.status(200).end(); // best practice to respond with empty 200 status code
    var reqBody = req.body;
    responseURL = reqBody.response_url;
    
    if ( 1 != 1)//reqBody.token != YOUR_APP_VERIFICATION_TOKEN){
        {

        res.status(403).end("Acess fordidden") 
    
    }
    else {    
        //res.send('Welcome to Monitor slack bot of Group 08 !');
        var message = {
            "text": "*WELCOME TO HOWISIT OF GROUP08 !*\n Would you like to share something now ?",
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
        //console.log("Gia tri body sau khi goi ben  ngoai" + bodyMesg);

    }

});


//Capture the feed back actions from user
app.post('/actions', urlencodedParser, (req, res) =>{
    res.status(200).end() // best practice to respond with 200 status
    var actionJSONPayload = JSON.parse(req.body.payload) // parse URL-encoded payload JSON string
    var message = {
        "text": actionJSONPayload.user.name+" clicked: " + actionJSONPayload.actions[0].name,
        "replace_original": false
    }
    //sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  

    bodyMesg = req.body;
    responseURL = bodyMesg.response_url;
    //console.log("Log gia tri Bodymesg");
    //console.log(bodyMesg);
   
    if ( actionJSONPayload.actions[0].value == "Letgo")//reqBody.token != YOUR_APP_VERIFICATION_TOKEN){
        
    {   
        CommitBtn = 'COMMIT INDIVIDUAL';//'COMMIT INDIVIDUAL' 
         var message = {
           "text": "Please share about your happiness level now ?",
           "attachments": [
            {
                "text": "Please share us how do you feel now",
                "fallback": "You are unable to choose this option",
                "callback_id": "wopr_survey",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','',CommitBtn,'','danger')
           
          }]
        }   
        
        
        //chatPostMessage(actionJSONPayload.response_url, attachment);
       
        sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  
    };
      
    //20 September: Process for report select menu part
    if ( actionJSONPayload.actions[0].value == "Team")//reqBody.token != YOUR_APP_VERIFICATION_TOKEN){
        {
            
            var filesend ='https://files.slack.com/files-pri/TC5AEPWD9-FCX7GKNBC/test_slack.xlsx'

            UploadFile2Slack (filesend)
             //sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  
        };

        if ( actionJSONPayload.actions[0].value == "Individual")//reqBody.token != YOUR_APP_VERIFICATION_TOKEN){
        
            {
                 var message = {
                 "text": "You chose report for Individual !",
                   "attachments": [
                    {
                        "text": "Please share us how do you feel now",
                        "fallback": "You are unable to choose this option",
                        "callback_id": "wopr_survey",
                        "color": "#3AA3E3",
                        "attachment_type": "default",
                        "actions": ActionArr('Report Individual',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','',CommitBtn,'','danger')
                   
                  }]
                }   
               
                 sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  
            };
    // Helper functions
    //console.log("Truoc khi chon gia tri Happy " + bodyMesg);
    //console.log(actionJSONPayload);
    switch(actionJSONPayload.actions[0].value)
    {
        case "Thrilled":
        happinesslevel ='Thrilled';
        var message = {
            "text": "Hey, would you like to share something now ?",
           "attachments": [
            {
                "text": "Please share us how do you feel now",
                "fallback": "You are unable to choose this option",
                "callback_id": "wopr_survey",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": ActionArr('Thrilled',':heart_eyes_cat:','primary','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','',CommitBtn,'','danger')
            }]
            }   
        sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  
        break;

        case "Happy":
        happinesslevel ='Happy';
        var message = {
            "text": "Hey, would you like to share something now ?",
           "attachments": [
            {
                "text": "Please share us how do you feel now",
                "fallback": "You are unable to choose this option",
                "callback_id": "wopr_survey",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','primary','So So',':smirk_cat:','','Morose',':crying_cat_face:','',CommitBtn,'','danger')
            }]
            }   
        sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  
        break;

        case "So So":
        happinesslevel ='So So';
        var message = {
            "text": "Hey, would you like to share something now ?",
           "attachments": [
            {
                "text": "Please share us how do you feel now",
                "fallback": "You are unable to choose this option",
                "callback_id": "wopr_survey",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','primary','Morose',':crying_cat_face:','',CommitBtn,'','danger')
            }]
            }   
        sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  
        break;


        case "Morose":
        happinesslevel ='Morose';
        var message = {
            "text": "Hey, would you like to share something now ?",
           "attachments": [
            {
                "text": "Please share us how do you feel now",
                "fallback": "You are unable to choose this option",
                "callback_id": "wopr_survey",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','primary',CommitBtn,'','danger')
            }]
            }   
        sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  
        break;

        case "COMMIT INDIVIDUAL":
        if (happinesslevel =='') {
            var message = {
                "text": "*Please CHOOSE THE HAPPINES LEVEL FIRST !*",
                "attachments": [
                    {
                        "text": "Please share us how do you feel now about your teamwork",
                        "fallback": "You are unable to choose this option",
                        "callback_id": "InpputTeamwork",
                        "color": "#3AA3E3",
                        "attachment_type": "default",
                        "actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','',CommitBtn,'','primary')
                    }]
                    }   
                sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  
        }
        else
        {
            //-----------Insert Database MongoDB here-------------//
            //Function to insert Database: value take from happinesslevel variable
            
            var dt = new Date();
            //console.log(dt);
            //store data into Mongodb
            var data = {name: "Sushi", team: "DevTeam08", date: dt, rating: happinesslevel};
            BusinessLayer.insertTeamMemberData(data);
            console.log('Inserted Individual Happiness Level Data to MongoDB');
            typeTeam ='T'; //Switch TypeTeam from Individual to Team
            //Continue get input data about the Team
            //Change to new Input data for Teamwork
            CommitBtn = 'COMMIT TEAMWORK';//'COMMIT INDIVIDUAL' or 'COMMIT TEAMWORK'
            happinesslevel = '';//Reset value to '';
            var message = {
            "text": "_*Thank you so much for your feedback about yourself*_ \n *Please share more about your Teamwork !*",
            "attachments": [
                {
                    "text": "Please share us how do you feel now about your teamwork",
                    "fallback": "You are unable to choose this option",
                    "callback_id": "InpputTeamwork",
                    "color": "#3AA3E3",
                    "attachment_type": "default",
                    "actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','',CommitBtn,'','primary')
                }]
                }   
            sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  

        
        }
        

        break;

        case "COMMIT TEAMWORK":

        if (happinesslevel =='') 
        {
            //Continue get input data about the Team
              var message = {
            "text": "*Please CHOOSE YOUR TEAMWORK HAPPINESS LEVEL FIRST !*",
            "attachments": [
             {
                 "text": "Please share us how do you feel now about your teamwork",
                 "fallback": "You are unable to choose this option",
                 "callback_id": "InpputTeamwork",
                 "color": "#3AA3E3",
                 "attachment_type": "default",
                 "actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','','COMMIT TEAMWORK','','primary')
             }]
             }   
 
            sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  
    
        }
        else
        {
            //Continue get input data about the Team
            happinesslevel ='';
            CommitBtn = 'COMMIT INDIVIDUAL';
             var message = {
            "text": "Thank you so much for your sharing ! See you ! ",
            /*"attachments": [
             {
                 "text": "Please share us how do you feel now about your teamwork",
                 "fallback": "You are unable to choose this option",
                 "callback_id": "InpputTeamwork",
                 "color": "#3AA3E3",
                 "attachment_type": "default",
                 "actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','','COMMIT TEAMWORK','','primary')
             }]*/
             }   
 
         console.log('Inserted Teamwork Happiness Level Data to MongoDB');
 
         sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  
      
         //-----------Insert Database MongoDB for Teamwork here-------------//
         //Function to insert Database: value take from happinesslevel variable
 

        }
        
        //Message thank you
        break;
        default:
        break;
    
    }


});


// Route the Slack command /rbot in the config slack app: Process with report part
app.post('/rbot', urlencodedParser, function(req, res) {
    //res.send('Welcome to Monitor slack bot of Group 08 !');
    res.status(200).end(); // best practice to respond with empty 200 status code
    var reqBody = req.body;
    responseURL = reqBody.response_url;
    
    if ( 1 != 1)//reqBody.token != YOUR_APP_VERIFICATION_TOKEN){
        {
        res.status(403).end("Acess fordidden") 
    }
    else {    
        //res.send('Welcome to Report part !');
        var message = {
            "text": "Please select type of report: Team or Individual ?",
            "response_type": "in_channel",
            "attachments": [
                {
                    "text": "Choose one type of report that you prefer ",
                    "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
                    "color": "#3AA3E3",
                    "attachment_type": "default",
                    "callback_id": "report_selection",
                    "actions": [
                        {
                            "name": "report_list",
                            "text": "Pick a type of report...",
                            "type": "select",
                            "options": [
                                {
                                    "text": "Team",
                                    "value": "Team"
                                },
                                {
                                    "text": "Individual",
                                    "value": "Individual"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        
    
        sendMessageToSlackResponseURL(responseURL, message);
        //console.log("Gia tri body sau khi goi ben  ngoai" + bodyMesg);

    }

});