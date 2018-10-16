/********************************Develop "Product How.Is.IT"*********************************************/
/***********************AGIGLE METHODOLOGY, SCRUM FRAMEWORK AND EXPERIMENT CHATBOT***********************/

// First we need to import the HTTP module. This module contains all the logic for dealing with HTTP requests.
var http = require('http');
var fs = require('fs');
//Define Slack object
var slackObj = require('nodejslack');
// Import express and request modules
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
//import our business layer
var BusinessLayer = require('./BusinessLayer');
const dateformat = require('dateformat');
//Parameter using for dynamic icons in buttons
var name1,icon1,style1,name2,icon2,style2,name3,icon3,style3,name4,icon4,style4,name5,icon5,style5;
var commitBtn = 'COMMIT INDIVIDUAL';//'COMMIT INDIVIDUAL' or 'COMMIT TEAMWORK'
//Get happiness level from team input
var happinesslevel ='';
// Declare the Client ID, Secret key and token ID
var clientId = '413354812451.427533931460';
var clientSecret = 'e93139ac9118b7ec41e90e4631ca11d5';
var tokenId = 'xoxb-413354812451-428794835063-XLs3DAn7aT7UvRF69DcES5Ic'; //Parameter with XOXB, not XOXP in https://api.slack.com/apps/ACKFPTDDJ/oauth?
//Initial the user ID
var userID = 'CCTQ8NXCP';//'UC5GQEJP3';//'CCTQ8NXCP';
//Variable of Mesage  and url will be sent
var response_url;
var bodyMesg;
//Define type for Report of Survey 
var submmitType;
var delaytime = 2;
//Define for extract report file CSV
var filecsv; 


//for writing to file
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Instantiates Express and assigns our app variable to it
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Again, we define a port we want to listen to
const PORT=8000;
var slack = new slackObj(tokenId);

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
// Define dynamic button in the message to Slack

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


//Send message function to Slack 
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

//20 September: Henry added the sending file function
//'https://files.slack.com/files-pri/TC5AEPWD9-FCX7GKNBC/test_slack.xlsx',
function UploadFile2Slack (filename)
{  
    var postOptions =
    {
        uri: 'https://slack.com/api/files.upload',//'https://slack.com/api/chat.postEphemeral'
        method: 'POST',
        headers: {
            'Content-type': 'multipart/form-data'
        },
        qs: {
            "token": tokenId,//integration.get('slack_token'),
            "channels": 'CCTQ8NXCP',//integration.get('channel_id'),
            //"user": 'UC5GQEJP3', //@phucpebble
            "filetype": "auto",
            "filename": filename, 
            "file": fs.createReadStream(filename), //("./file.csv"),
            //"file": "https://files.slack.com/files-pri/TC5AEPWD9-FCX7GKNBC/test_slack.xlsx",
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

function UploadFile2Slack2 (filename, userID)
{  
    var form = {
        file: fs.createReadStream(filename),//'Test_slack.xlsx'), // Optional, via multipart/form-data. If omitting this parameter, you MUST submit content 
        // content: 'Your text here', // Optional, File contents. If omitting this parameter, you must provide a `file`  
        filename: filename,//'Test_slack.xlsx', // Required  
        fileType: 'auto', // Optional, See more file types in https://api.slack.com/types/file#file_types 
        title: 'Plese download your file!', // Optional 
        //initial_comment: 'First comment about this file.', // Optional 
        channels: 'CCTQ8NXCP'//userID //'CCTQ8NXCP' //Optional, If you want to put more than one channel, separate using comma, example: 'general,random' 
      };
     console.log(filecsv);
      slack.fileUpload(form)
      .then(function(response){
  
          // Slack sends a json with a boolean var ok.  
          // Error example : data = { ok: false, error: 'user_not_found'         } 
          // Error example : data = { ok: true, file: 'user_not_found' } 
          if(!response || !response.ok){
              return Promise.reject(new Error('Something wrong happened during the upload.'));
          }
          //console.log('Uploaded Successfully:',response);
  
          return Promise.resolve(response);
      })
      .catch(function(err){
          return err;
      });

}



//26 September 2018: Henry added Diaglog fucntion for researcher
function SendDiaglogInputData(responseURL,attachment,trigger_id){
    console.log('I am in Diaglog'+trigger_id)
    submmitType ='InputData';
    var happypiness ={
                     label: 'Very Happy :heart_eyes_cat:', value: 'Very Happy' ,
                     label: 'Happy :smile_cat:', value: 'Happy' ,
                     label: 'Neutrual :kissing_cat:', value: 'Neutrual' ,
                     label: 'A bit unhappy :smirk_cat:', value: 'A bit unhappy' ,
                     label: 'Very unhappy :crying_cat_face:', value: 'Very unhappy' ,
                    }
    var postOptions =
    {
        uri: 'https://slack.com/api/dialog.open',
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        qs: {
            "token": tokenId,//integration.get('slack_token'),
            "trigger_id": trigger_id,
            //"attachments": JSON.stringify(attachment)
            "dialog": JSON.stringify({
                title: 'SURVEY HAPPINIESS !',
                callback_id: 'Submit-ticket',
                submit_label: 'Submit',
                elements: [
                    {
                        label:'Please select one option', //PL an image to indicate how happy you are about your work.',
                        hint: 'To indicate how happy you are about your work.',
                        //placeholder: null,
                        type: 'select',
                        name: 'IndividualHappiness',
                        options: [
                          { label: 'Very Happy :joy:', value: 'Very Happy' }, //:heart_eyes_cat:
                          { label: 'Happy :smiley:', value: 'Happy' }, //:smile_cat:
                          { label: 'Neutrual :relaxed:', value: 'Neutrual' }, //:kissing_cat:
                          { label: 'A bit unhappy :rage:', value: 'A bit unhappy' }, //:smirk_cat:
                          { label: 'Very unhappy :imp:', value: 'Very unhappy' },//crying_cat_face
                        ],
                      },
                  
                      {
                    label:'Please select one option',  //'Please select an image to indicate how happy you think the team is about the work',
                    hint: 'To indicate how happy you think the team is about their work.',
                    type: 'select',
                    name: 'TeamHappiness',
                    options: [
                      { label: 'Very Happy :joy:', value: 'Very Happy' },
                      { label: 'Happy :smiley:', value: 'Happy' },
                      { label: 'Neutrual :relaxed:', value: 'Neutrual' },
                      { label: 'A bit unhappy :rage:', value: 'A bit unhappy' },
                      { label: 'Very unhappy :imp:', value: 'Very unhappy' },
                    ],
                  },
                  /*
                  {
                    label:'More comment',  //'Please select an image to indicate how happy you think the team is about the work',
                    type: 'text',
                    name: 'Comment',
                    optional: true,
                    hint: 'Put your comment here',
                  },*/

                ],
              }),
           }

    }

    
    request(postOptions, (error,response,body)=>{
        //response_url = responseURL;
        //const body = JSON.parse(req.body.payload);
        //tsMessage = body.ts;
         console.log(response.body);
        //tsMessage = JSON.parse(body).ts;
        //console.log("Ben trong ham request " + tsMessage);
        if (error){
            console.log(error);
            //handle errors as you see fit
        }

        
    })
    
}
//26 September 2018: Henry added Diaglog fucntion for researcher
function SendDiaglogReport(responseURL,attachment,trigger_id){
    
    var dt1, dt2 = new Date();
    dt2.setDate(dt2.getDate() +1); //System date on server delay 1 day ?

    submmitType ='Report';
    var postOptions =
    {
        uri: 'https://slack.com/api/dialog.open',
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        qs: {
            "token": tokenId,//integration.get('slack_token'),
            "trigger_id": trigger_id,
            //"user": 'UC5GQEJP3', //@phucpebble
            //"attachments": JSON.stringify(attachment)
            "dialog": JSON.stringify({
                title: 'Report for researcher !',
                callback_id: 'Statistic-ticket',
                submit_label: 'Statistic',
                elements: [
                  {
                    label: 'Date From',
                    type: 'text',
                    name: 'DateFrom',
                    value: dateformat(dt1, 'yyyy-mm-dd'),//filecsv
                    hint: 'Start date of the report yyyy-mm-dd',
                  },
                  {
                    label: 'Date To',
                    type: 'text',
                    name: 'DateTo',
                    value: dateformat(dt2, 'yyyy-mm-dd'),
                    hint: 'End date of the report yyyy-mm-dd',
                    //optional: true,
                  },
                  {
                    label: 'Type of report',
                    type: 'select',
                    name: 'Type',
                    options: [
                      { label: 'Individual', value: 'Individual' },
                      { label: 'Team', value: 'Team' },
                    ],
                  },
                ],
              }),
           }

    }

    
    request(postOptions, (error,response,body)=>{
        //console.log("Ben trong ham request " + tsMessage);
        //tsMessage = JSON.parse(body).ts;
        //console.log(tsMessage);
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
function SendRemider(tokenId, userID){
   //Do not need parameter tokenId, userID anymore
   var message = {
        "text": "*SCHEDULED TIME!*\n",
        "attachments": [
            {
                "text": "It's now time to enter your happiness information again",
                "fallback": "You are unable to choose this option",
                "callback_id": "wopr_survey",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "Letgo",
                        "text": "Click here",
                        "style": "primary", //danger, warning
                        "type": "button",
                        "value": "Letgo"
                   
                    }
                
                ]
            },
            {
                "text": "I am busy, postpone for minutes:",
                "fallback": "You are unable to choose this option",
                "callback_id": "wopr_survey",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "05",
                        "text": "05",
                        "type": "button",
                        "value": "05"
                    },
                    {
                        "name": "10",
                        "text": "10",
                        "type": "button",
                        "value": "10"
                    },
                    {
                        "name": "20",
                        "text": "20",
                        "type": "button",
                        "value": "20"
                    }
                ]
            }
        ]
           
    }
    
    var responseURL ='';
    sendMessageToSlackResponseURL(responseURL, message);

}

function SendReminder(tokenId, userID){     
     
    var attachment=[
    {
        "text": "It's now time to enter your happiness information again",
        "fallback": "You are unable to choose this option",
        "callback_id": "wopr_survey",
        "color": "#3AA3E3",
        "attachment_type": "default",
        "actions": [
            {
                "name": "Letgo",
                "text": "Click here",
                "style": "primary", //danger, warning
                "type": "button",
                "value": "Letgo"
           
            }
        
        ]
    },
    {
        "text": "I am busy, postpone for minutes:",
        "fallback": "You are unable to choose this option",
        "callback_id": "wopr_survey",
        "color": "#3AA3E3",
        "attachment_type": "default",
        "actions": [
            {
                "name": "05",
                "text": "05",
                "type": "button",
                "value": "05"
            },
            {
                "name": "10",
                "text": "10",
                "type": "button",
                "value": "10"
            },
            {
                "name": "20",
                "text": "20",
                "type": "button",
                "value": "20"
            }
        ]
      }
    ]
    var postOptions =
    {
        uri: 'https://slack.com/api/chat.postEphemeral',//'https://slack.com/api/chat.postMessage',//
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        qs: {
            "token": tokenId,//integration.get('slack_token'),
            "channel": 'CCTQ8NXCP',//integration.get('channel_id'),
            "user": userID, //'UC8TWA753', //Need put your ID @phucpebble
            "username": 'HowIsIt',
            "text": "*SCHEDULED TIME!*\n",
            "attachments": JSON.stringify(attachment),
            
           }
    }

    request(postOptions, (error,response,body)=>{
        //console.log("Ben trong ham request " + response);
        //tsMessage = JSON.parse(body).ts;
        console.log(body);
        if (error){
            //handle errors as you see fit
        }

        
    })
 }


//timer functions for reminder
//read data from db and remind them all
// will trigger around 10 am every day
var handle;
function remindTeamMembersDaily(){
     BusinessLayer.getTeamMembers(function(result){
      
        console.log("getData"+result.length);
        for( i = 0; i< result.length;i++){
            SendReminder(tokenId,result[i].userId);
            var todayDate = BusinessLayer.getTodayDate();
            data = {name: "DateTest", userId: result[i].userId, team: "DevTeam08", date: new Date(todayDate), rating: "NA", Reminder: 1, Delay: 0, InsertedTime: BusinessLayer.getCurrentTimeInMinutes()};
            BusinessLayer.insertTeamMemberData(data);
        }
    });
    clearInterval(handle);
    handle = setInterval(remindTeamMembersDaily,BusinessLayer.getDailyReminderTimer());
    console.log(BusinessLayer.getDailyReminderTimer());
}


var handleRemindTeamMember;
function remindTeamMembers() {

    var todayDate = BusinessLayer.getTodayDate();

    BusinessLayer.getTeamMembers(function(result){
      
        
        for( i = 0; i< result.length;i++){
            BusinessLayer.getTeamMemberHappinessByDateId(result[i].userId,todayDate,function(data){
        
                
                    //if reminder is less than 3 and user hasn't clicked any delay buttons and already more than two minutes
                    //from first reminder then remind again
                    if (data[0].Delay == 0 && data[0].Reminder <= 3 && data[0].rating == 'NA'){
                        var currentMinutes = BusinessLayer.getCurrentTimeInMinutes();
                        console.log("current minutes"+currentMinutes);
                        if ((currentMinutes-data[0].InsertedTime)>2 && data[0].Reminder == 1){
                            console.log("send reminder for reminder"+data[0].Reminder+1);
                            SendReminder(tokenId,data[0].userId);
                            dataToUpdate = {$set: {Reminder: data[0].Reminder+1}};
                            var todayDate = BusinessLayer.getTodayDate();
                            var query = {userId: data[0].userId, date: new Date(todayDate)};
                            BusinessLayer.updateTeamMemberData(dataToUpdate,query);
                        } else if ((currentMinutes-data[0].InsertedTime)>7 && data[0].Reminder == 2){
                            console.log("send reminder for reminder"+data[0].Reminder+1);
                            SendReminder(tokenId,data[0].userId);
                            dataToUpdate = {$set: {Reminder: data[0].Reminder+1}};
                            var todayDate = BusinessLayer.getTodayDate();
                            var query = {userId: data[0].userId, date: new Date(todayDate)};
                            BusinessLayer.updateTeamMemberData(dataToUpdate,query);
                        } else if ((currentMinutes-data[0].InsertedTime)>12 && data[0].Reminder == 3){
                            console.log("You are clearly too busy. We will remind you at the next scheduled time.");
                            dataToUpdate = {$set: {Reminder: data[0].Reminder+1}};
                            var todayDate = BusinessLayer.getTodayDate();
                            var query = {userId: data[0].userId, date: new Date(todayDate)};
                            BusinessLayer.updateTeamMemberData(dataToUpdate,query);
                        }
                    }
                    
                    
                    
                
            });
        }
    });

   

}


// for every 24 hours (for now just set 10 minutes for testing)
 var data = [{name: "Phuc", team: "DevTeam08", RegistrationDate: "dt", userId: "UC5GQEJP3"},
{name: "Ar", team: "DevTeam08", RegistrationDate: "dt", userId: "UC8TWA753"}];
//BusinessLayer.insertNewTeamMembers(data);  // this is just for testing purpose, admin need to do this task
handle = setInterval(remindTeamMembersDaily,BusinessLayer.getDailyReminderTimer());

// for every 2 minutes check if somebody ignore reminder and do follow up
handleRemindTeamMember = setInterval(remindTeamMembers,20000);
remindTeamMembersDaily();

// userID = 'UC5GQEJP3';
// SendReminder(tokenId, userID);



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

function SendMessage(tokenId, userID, messagetxt){

    var postOptions =
    {
        uri: 'https://slack.com/api/chat.postEphemeral',//'https://slack.com/api/chat.postMessage',//
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        qs: {
            "token": tokenId,//integration.get('slack_token'),
            "channel": 'CCTQ8NXCP',//integration.get('channel_id'),
            "user": userID, //'UC8TWA753', //Need put your ID @phucpebble
            "username": 'HowIsIt',
            "text": messagetxt, //'*Thank you, your answers have been anonymously saved*',
            
           }
    }

    request(postOptions, (error,response,body)=>{
        //console.log("Ben trong ham request " + response);
        //tsMessage = JSON.parse(body).ts;
        //console.log(tsMessage);
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
    console.log(responseURL)
    
    if ( 1 != 1)//reqBody.token != YOUR_APP_VERIFICATION_TOKEN){
        {

        res.status(403).end("Acess fordidden") 
    
    }
    else {    
        //res.send('Welcome to Monitor slack bot of Group 08 !');
        //var reqBody = req.body;
        //responseURL = reqBody.response_url;
        var message = {
            "text": "*SCHEDULED TIME!*\n",
            "attachments": [
                {
                    "text": "It is now to enter your happiness information",
                    "fallback": "You are unable to choose this option",
                    "callback_id": "wopr_survey",
                    "color": "#3AA3E3",
                    "attachment_type": "default",
                    "actions": [
                        /*{
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
                        },*/
                        {
                            "name": "Letgo",
                            "text": "Click here",
                            "style": "primary", //danger, warning
                            "type": "button",
                            "value": "Letgo"
                       
                        }
                    
                    ]
                }
            ,
            {
                "text": "I am busy, postpone for minutes:",
                "fallback": "You are unable to choose this option",
                "callback_id": "wopr_survey",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "05",
                        "text": "05",
                        "type": "button",
                        "value": "05"
                    },
                    {
                        "name": "10",
                        "text": "10",
                        "type": "button",
                        "value": "10"
                    },
                    {
                        "name": "20",
                        "text": "20",
                        "type": "button",
                        "value": "20"
                    }
                ]
            }
            ]
           
               
            
        }
        
        sendMessageToSlackResponseURL(responseURL, message);
        //console.log("Gia tri body sau khi goi ben  ngoai" + bodyMesg);

    }

});



//Capture the feed back actions from user after select 
app.post('/actions', urlencodedParser, (req, res) =>{
    res.status(200).end() // best practice to respond with 200 status
    var actionJSONPayload = JSON.parse(req.body.payload) // parse URL-encoded payload JSON string
    var trigger_id  = actionJSONPayload.trigger_id;
    //console.log("Check value after assign for trigger_id" + trigger_id);
    //sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  
   // console.log(actionJSONPayload.submission.Type + "  DateFrom" + actionJSONPayload.submission.DateFrom + "  DateTo  " +actionJSONPayload.submission.DateTo);
    //console.log(actionJSONPayload);
    bodyMesg = req.body;
    responseURL = bodyMesg.response_url;
    console.log(req.body);
    //Case user's action come from Slack Diglog submit button
    if (actionJSONPayload.type =="dialog_submission")
    {
       console.log(submmitType);
       console.log(actionJSONPayload.callback_id);

       //Case user click Submit button on Survey dialog
       if (submmitType == "InputData")
       {
        var happinesslevel1 = actionJSONPayload.submission.IndividualHappiness;
        var comment = actionJSONPayload.submission.Comment;
        //store data into Mongodb
        //date: BusinessLayer.getTodayDate()
        //Lech 1 ngay:
        var dt = new Date();
        dt.setDate(dt.getDate());
        var data1 = {name: userID, team: "DevTeam08", date: dt, rating: happinesslevel1};
        var todayDate = BusinessLayer.getTodayDate();
        BusinessLayer.getTeamMemberHappinessByDateId(userID,todayDate,function(result){
            var delay = 0;
            if(result.length === 0) {
                BusinessLayer.insertTeamMemberData(data1);
                console.log("Data inserted");
            } else {
                data = {$set: {rating: happinesslevel1}};
                var query = {userId: userID, date: new Date(todayDate)};
                BusinessLayer.updateTeamMemberData(data,query);
                console.log("Data updated");
    
            }
    
        });
        
        console.log('Inserted Individual Happiness Level Data to MongoDB');

        //-----------Insert Database MongoDB for Teamwork here-------------//
        //date: BusinessLayer.getTodayDate()
        var happinesslevel2 = actionJSONPayload.submission.TeamHappiness;
        var data2 = {name: userID, team: "DevTeam08",  date: dt, rating: happinesslevel2};
        BusinessLayer.insertTeamData(data2);
        console.log('Inserted Individual Happiness Level Data to MongoDB');
        //send thank mesage after Subbmit survey
        //Do not need parameter tokenId, userID anymore
        userID = 'UC5GQEJP3';
        console.log (tokenId);
        console.log(userID)
        var message = '*Thank you, your answers have been anonymously saved*';
        SendMessage(tokenId, userID, message);
 
         }


       if (submmitType == "Report") //Case of user click Statistic button on researcher dialog
       {
        var dt1 = actionJSONPayload.submission.DateFrom;
        var dt2 = actionJSONPayload.submission.DateTo;
        var type = actionJSONPayload.submission.Type;
        filecsv = "./" + dateformat(new Date(), 'ddhhmmss') + ".csv"//filecsv
        console.log(filecsv);
        //UploadFile2Slack (filename)t
        //var filename ='file.csv';
        // var file = BusinessLayer.getFileForResearcher("1988-09-10","2018-05-05","individual");
        // console.log("fle"+file);
        //phauc call this
        console.log(dt1);
        console.log(dt2);
        BusinessLayer.getDataByTeamDate(dt1,dt2,type,function(result){
                    
           // console.log("getData"+result.length);
            console.log(result);
            const csvWriter= createCsvWriter({
                path: filecsv, //'./file.csv',
                header: [
                    //{id: 'name', title:'NAME'},
                    {id: 'name', title:'USER ID'},
                    {id: 'team', title:'TEAM'},
                    {id: 'date', title:'DATE'},
                    {id: 'rating', title:'RATING'},
                    {id: 'reminder', title:'REMINDER'}
                ]
            });
            
            csvWriter.writeRecords(result).then(()=>{
                console.log('Done writing to file');
                UploadFile2Slack2 (filecsv, userID);
                //do whatever you want to do here
            });
        });
        
          
       }


    }
    else //Check button click of user 
    {

        console.log(actionJSONPayload);
          //   const { text, trigger_id } = req.body;
         var attachment=[
        {
            "text": "test",
            "fallback": "You are unable to choose this option",
            "callback_id": "wopr_survey",
            "color": "#3AA3E3",
            "attachment_type": "default",
            //"actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','',CommitBtn,'','danger')
       
          }]
        
        
         if ( actionJSONPayload.actions[0].value == "Letgo")
         {  
             commitBtn = 'COMMIT !';//'COMMIT INDIVIDUAL' 
            /*var message = {
            * "text": "Please select an image to indicate how happy you are about your work.",
            *"attachments": [
            *  {
            *   "text": "",
            *   "fallback": "You are unable to choose this option",
            *    "callback_id": "wopr_survey",
            *   "color": "#3AA3E3",
            *   "attachment_type": "default",
            *   "actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','',commitBtn,'','danger')
            *  }]
            } * */
            //If click letgo button, then call Dialog survey
            SendDiaglogInputData(responseURL,attachment,trigger_id);
         };
         //Check if Delay number button 05, 10, 20 are clicked
         if (( actionJSONPayload.actions[0].value == "05") || ( actionJSONPayload.actions[0].value == "10") || ( actionJSONPayload.actions[0].value == "20"))
         {  
            delaytime = actionJSONPayload.actions[0].value;
            console.log("Clicked " + delaytime);
            //Process with Delay schedule fucntion 
            var todayDate = BusinessLayer.getTodayDate();
    
             BusinessLayer.getTeamMemberHappinessByDateId(userID,todayDate,function(result){
            var reminder = 0;
            if(result.length === 0) {
                data = {name: "DateTest", userId: userID, team: "DevTeam08", date: new Date(todayDate), rating: "NA", Reminder: 1};
                BusinessLayer.insertTeamMemberData(data);
                console.log("Data inserted");
            } else {
                reminder = result[0].Reminder;
                reminder = reminder +1;
                data = {$set: {Reminder: reminder}};
                var query = {userId: userID, date: new Date(todayDate)};
                BusinessLayer.updateTeamMemberData(data,query);
                console.log("Data updated");

            }

            if(reminder <= 100) {
                //create reminder 
                setTimeout(function(){SendRemider(tokenId,userID)},delaytime*60000);
                console.log("Reminder created");
                //Send message to inform to end user about delay
                userID = 'UC5GQEJP3';
                var message = 'You have postponed ' + delaytime + ' minutes ! See you !';
                SendMessage(tokenId, userID, message);

            } else {
                console.log("no more reminder for today")
                //Send message to inform to end user about delay
                userID = 'UC5GQEJP3'
                var message = 'You do not have right to delay !';
                SendMessage(tokenId, userID, message);
            }
            });
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
                        "actions": ActionArr('Report Individual',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','',commitBtn,'','danger')
                   
                  }]
                }   
               
                 sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  
            };

        }
            


});

// Route the Slack command /rbot in the config slack app: Process with report part
app.post('/delay', urlencodedParser, function(req, res) 
{
    delaytime = 2;
    console.log(req.body.text);
    delaytime = req.body.text; 
    console.log(req.body.text);
    if (!delaytime)
    {
        delaytime = 2;
        
    }
    delaytime = 1;
    
    userID = req.body.user_id;
    
    //continue to process after Delay here
    console.log(delaytime);
    console.log(userID);
    var todayDate = BusinessLayer.getTodayDate();
    
    BusinessLayer.getTeamMemberHappinessByDateId(userID,todayDate,function(result){
        var delay = 0;
        if(result.length === 0) {
            data = {name: "DateTest", userId: userID, team: "DevTeam08", date: new Date(todayDate), rating: "NA", Reminder: 0, Delay: delaytime};
            BusinessLayer.insertTeamMemberData(data);
            console.log("Data inserted");
        } else {
            delay = result[0].Delay;
            delay = delay +delaytime;
            data = {$set: {Delay: delay}};
            var query = {userId: userID, date: new Date(todayDate)};
            BusinessLayer.updateTeamMemberData(data,query);
            console.log("Data updated");

        }

        // user can delay up to one hour (option are 5, 10, 20 minutes )
        if(delay < 3) {
             //create reminder 
             setTimeout(function(){SendRemider(tokenId,userID)},delaytime*60000);
             console.log("Reminder created");
        } else {
            console.log("No more reminder for today as maximum delay time has been reached");
        }
    });

   
});


// Route the Slack command /rbot in the config slack app: Process with report part
app.post('/survey', urlencodedParser, function(req, res) {
    //res.send('Welcome to Monitor slack bot of Group 08 !');
    const { text, trigger_id } = req.body;
    res.status(200).end(); // best practice to respond with empty 200 status code
    var reqBody = req.body;
    responseURL = reqBody.response_url;
    //console.log("Triger_id");
    userID = req.body.user_id;
    console.log(req.body);
    //console.log(trigger_id);
    //console.log(body);
    //Function to show the diaglog for input data
    //   const { text, trigger_id } = req.body;
    var attachment=[
        {
            "text": "test",
            "fallback": "You are unable to choose this option",
            "callback_id": "wopr_survey",
            "color": "#3AA3E3",
            "attachment_type": "default",
            //"actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','',commitBtn,'','danger')
       
      }]
    console.log(responseURL);
    SendDiaglogInputData(responseURL,attachment,trigger_id)
    //SendReminder(tokenId)
    

});

// Route the Slack command /rbot in the config slack app: Process with report part
app.post('/report', urlencodedParser, function(req, res) {
    //res.send('Welcome to Monitor slack bot of Group 08 !');
    res.status(200).end(); // best practice to respond with empty 200 status code
    var reqBody = req.body;
    responseURL = reqBody.response_url;
    const { text, trigger_id } = req.body;
    //console.log(trigger_id);
    //console.log(body);
    var attachment=[
        {
            "text": "test",
            "fallback": "You are unable to choose this option",
            "callback_id": "wopr_survey",
            "color": "#3AA3E3",
            "attachment_type": "default",
            //"actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','',commitBtn,'','danger')
       
      }]
      SendDiaglogReport(responseURL,attachment,trigger_id);
      

});





// Helper functions
    //console.log("Truoc khi chon gia tri Happy " + bodyMesg);
    //console.log(actionJSONPayload);
    /*
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
                "actions": ActionArr('Thrilled',':heart_eyes_cat:','primary','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','',commitBtn,'','danger')
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
                "actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','primary','So So',':smirk_cat:','','Morose',':crying_cat_face:','',commitBtn,'','danger')
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
                "actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','primary','Morose',':crying_cat_face:','',commitBtn,'','danger')
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
                "actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','primary',commitBtn,'','danger')
            }]
            }   
        sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  
        break;

        case "COMMIT !": //Commit for Individual input
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
                        "actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','',commitBtn,'','primary')
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
            commitBtn = 'COMMIT';//'COMMIT INDIVIDUAL' or 'COMMIT TEAMWORK'
            happinesslevel = '';//Reset value to '';
            var message = {
            "text": "_*Thank you so much for your feedback about yourself*_ \n *Please select an image to indicate how happy you think the team is about the work*",
            "attachments": [
                {
                    "text": "",
                    "fallback": "You are unable to choose this option",
                    "callback_id": "InpputTeamwork",
                    "color": "#3AA3E3",
                    "attachment_type": "default",
                    "actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','',commitBtn,'','primary')
                }]
                }   
            sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  

        
        }
        

        break;

        case "COMMIT": //Commit teamwork

        if (happinesslevel =='') 
        {
            //Continue get input data about the Team
              var message = {
            "text": "*Please CHOOSE YOUR TEAMWORK HAPPINESS LEVEL FIRST !*",
            "attachments": [
             {
                 "text": "Please select an image to indicate how happy you think the team is about the work",
                 "fallback": "You are unable to choose this option",
                 "callback_id": "InpputTeamwork",
                 "color": "#3AA3E3",
                 "attachment_type": "default",
                 "actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','','COMMIT','','primary')
             }]
             }   
 
            sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  
    
        }
        else
        {
            //Continue get input data about the Team
            happinesslevel ='';
            commitBtn = 'COMMIT !';//reset again back to Commit Individual
             var message = {
            "text": "Thank you so much for your sharing ! See you ! ",
            
             }   

         //-----------Insert Database MongoDB for Teamwork here-------------//
         //Function to insert Database: value take from happinesslevel variable           
            var dt = new Date();
            //console.log(dt);
            //store data into Mongodb
            var data = {name: "Sushi", team: "DevTeam08", date: dt, rating: happinesslevel};
            BusinessLayer.insertTeamData(data);
            console.log('Inserted Individual Happiness Level Data to MongoDB');
 
         sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  

        }
        
        //Message thank you
        break;
        default:
        break;
    
    }*/