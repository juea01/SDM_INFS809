/********************************Develop "Product How.Is.IT"*********************************************/
/************************AGIGLE METHODOLOGY, SCRUM FRAMEWORK AND EXPERIMENT CHATBOT**********************/

// First we need to import the HTTP module. This module contains all the logic for dealing with HTTP requests.
var http = require('http');
var fs = require('fs');
// Import express and request modules
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
//import our business layer
var BusinessLayer = require('./BusinessLayer');
const dateformat = require('dateformat');
var name1,icon1,style1,name2,icon2,style2,name3,icon3,style3,name4,icon4,style4,name5,icon5,style5;
var happinesslevel ='';
var Slack = require('nodejslack');
// Store our app's ID and Secret. These we got from Step 1. 
// For this tutorial, we'll keep your API credentials right here. But for an actual app, you'll want to  store them securely in environment variables. 
var clientId = '413354812451.427533931460';
var clientSecret = 'e93139ac9118b7ec41e90e4631ca11d5';
var tokenId = 'xoxb-413354812451-428794835063-XLs3DAn7aT7UvRF69DcES5Ic'; //Parameter with XOXB, not XOXP in https://api.slack.com/apps/ACKFPTDDJ/oauth?
var userID = 'UC5GQEJP3';//'UC5GQEJP3';//'CCTQ8NXCP';
var tsMessage ='';
var response_url;
var msg;
var bodyMesg;
var typeTeam ='I';//Individual
var CommitBtn = 'COMMIT INDIVIDUAL';//'COMMIT INDIVIDUAL' or 'COMMIT TEAMWORK'
var SubmmitType;
var delaytime = 2;

// Instantiates Express and assigns our app variable to it
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Again, we define a port we want to listen to
const PORT=8000;
var slack = new Slack(tokenId);

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
            "filename": "Test_slack.xlsx",
            "file": fs.createReadStream("./Test_slack.xlsx"),
            //"file": "https://files.slack.com/files-pri/TC5AEPWD9-FCX7GKNBC/test_slack.xlsx",//fs.createReadStream('Test_slack.xlsx'),
            //'https://files.slack.com/files-pri/TC5AEPWD9-FCX7GKNBC/test_slack.xlsx',
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
        channels: userID //'CCTQ8NXCP' //Optional, If you want to put more than one channel, separate using comma, example: 'general,random' 
      };
  
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
    SubmmitType ='InputData';
    var postOptions =
    {
        uri: 'https://slack.com/api/dialog.open',//'https://slack.com/api/chat.postEphemeral'
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        qs: {
            "token": tokenId,//integration.get('slack_token'),
            "trigger_id": trigger_id,
            //"attachments": JSON.stringify(attachment)
            "dialog": JSON.stringify({
                title: 'Survery for happiness',
                callback_id: 'Submit-ticket',
                submit_label: 'Submit',
                elements: [
                    {
                        label:'How happy are you ?' ,//'PL an image to indicate how happy you are about your work.',
                        type: 'select',
                        name: 'IndividualHappiness',
                        options: [
                          { label: 'Very Happy :heart_eyes_cat:', value: 'Very Happy' },
                          { label: 'Happy :smile_cat:', value: 'Happy' },
                          { label: 'Neutrual :kissing_cat:', value: 'Neutrual' },
                          { label: 'Bad :smirk_cat:', value: 'Bad' },
                          { label: 'Very Bad :crying_cat_face:', value: 'Very Bad' },
                        ],
                      },
                  
                      {
                    label:'How happy is your team ?',  //'Please select an image to indicate how happy you think the team is about the work',
                    type: 'select',
                    name: 'TeamHappiness',
                    options: [
                      { label: 'Very Happy :heart_eyes_cat:', value: 'Very Happy' },
                      { label: 'Happy :smile_cat:', value: 'Happy' },
                      { label: 'Neutrual :kissing_cat:', value: 'Neutrual' },
                      { label: 'Bad :smirk_cat:', value: 'Bad' },
                      { label: 'Very Bad :crying_cat_face:', value: 'Very Bad' },
                    ],
                  },

                  {
                    label:'More comment',  //'Please select an image to indicate how happy you think the team is about the work',
                    type: 'text',
                    name: 'Comment',
                    optional: true,
                    hint: 'Put your comment here',
                  },

                ],
              }),
           }

    }

    
    request(postOptions, (error,response,body)=>{
        //resMess = .response; 
        //var reqBody = body;
        //bodyMesg =body;
        //responseURL = reqBody.response_url;
        //response_url = responseURL;
        //const body = JSON.parse(req.body.payload);
        //tsMessage = body.ts;
        console.log(body);
        //tsMessage = JSON.parse(body).ts;
        //console.log("Ben trong ham request " + tsMessage);
        //tsMessage = JSON.parse(body).ts;
        //console.log(tsMessage);
        if (error){
            //handle errors as you see fit
        }

        
    })
    
}
//26 September 2018: Henry added Diaglog fucntion for researcher
function SendDiaglogReport(responseURL,attachment,trigger_id){
    var dt = new Date();
    SubmmitType ='Report';
    var postOptions =
    {
        uri: 'https://slack.com/api/dialog.open',//'https://slack.com/api/chat.postEphemeral'
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
                    value: dateformat(dt, 'mmmm dS, yyyy'),
                    hint: 'Start date of the report',
                  },
                  {
                    label: 'Date To',
                    type: 'text',
                    name: 'DateTo',
                    value: dateformat(dt, 'mmmm dS, yyyy'),
                    hint: 'End date of the report',
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
        //resMess = .response; 
        //var reqBody = body;
        //bodyMesg =body;
        //responseURL = reqBody.response_url;
        //response_url = responseURL;
        //const body = JSON.parse(req.body.payload);
        //tsMessage = body.ts;
        //console.log(body);
        //tsMessage = JSON.parse(body).ts;
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
            "text": '*DATA SURVEY REMIDER* \n\n\nPlease choose the option by typing the command below:\n - /delay for doing servey later, example: /delay 35 means delaying 35 minutes. The value can be between 5 and 50 minutes. \n*- /mbot for do survey* \n*- /rbot for statistic*'
            /*
            "attachments": JSON.stringify(
                [
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
                                "name": "Type /mbot to go continue !",
                                "text": "Type /mbot to go continue",
                                //"style": "primary", //danger, warning
                                "type": "text",
                                "value": "Letgo"
                           
                            }
                        ]
                    }
                ]

            )*/
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


//timer functions for reminder
//read data from db and remind them all
// will trigger around 10 am every day
var handle;
function remindTeamMembersDaily(){
     BusinessLayer.getTeamMembers(function(result){
      
        console.log("getData"+result.length);
        for( i = 0; i< result.length;i++){
            SendRemider(tokenId,result[i].userId);
        }
    });
    clearInterval(handle);
    handle = setInterval(remindTeamMembersDaily,BusinessLayer.getDailyReminder());
    console.log(BusinessLayer.getDailyReminder());
}



function remindTeamMembers() {
    SendRemider(tokenId,userID)

}

// for every 24 hours (for now just set 10 minutes for testing)
// var data = [{name: "Phauc", team: "DevTeam08", RegistrationDate: "dt", userId: "CCTQ8NXCP"},
// {name: "Ar", team: "DevTeam08", RegistrationDate: "dt", userId: "UC8TWA753"}];
//BusinessLayer.insertNewTeamMembers(data);  // this is just for testing purpose, admin need to do this task
handle = setInterval(remindTeamMembersDaily,BusinessLayer.getDailyReminder());
console.log(BusinessLayer.getDailyReminder());
// for every 2 minutes (for now just set 1 minutes for testing)
//setInterval(remindTeamMembers,10000);


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
app.post('/mbot2', urlencodedParser, function(req, res) {
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



//Capture the feed back actions from user after select 
app.post('/actions', urlencodedParser, (req, res) =>{
    res.status(200).end() // best practice to respond with 200 status
    var actionJSONPayload = JSON.parse(req.body.payload) // parse URL-encoded payload JSON string
    const { text, trigger_id } = req.body;
    /*var message = {
        "text": actionJSONPayload.user.name+" clicked: " + actionJSONPayload.actions[0].name,
        "replace_original": false
    }*/
    //sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);  
   // console.log(actionJSONPayload.submission.Type + "  DateFrom" + actionJSONPayload.submission.DateFrom + "  DateTo  " +actionJSONPayload.submission.DateTo);
    //console.log(actionJSONPayload);
    bodyMesg = req.body;
    responseURL = bodyMesg.response_url;
    //console.log("Log gia tri Bodymesg");
    //console.log(bodyMesg);
    if (actionJSONPayload.type =="dialog_submission")
    {
       console.log(SubmmitType);
       console.log(actionJSONPayload.callback_id);
       if (SubmmitType == "InputData")
       {

        var dt1 = actionJSONPayload.submission.DateFrom;
        var dt2 = actionJSONPayload.submission.DateTo;
        
        var happinesslevel1 = actionJSONPayload.submission.IndividualHappiness;
        var comment = actionJSONPayload.submission.Comment;
        //console.log(dt);
        //store data into Mongodb
        var data1 = {name: "Sushi", team: "DevTeam08", date: dt1, rating: happinesslevel1};
        BusinessLayer.insertTeamMemberData(data1);
        console.log('Inserted Individual Happiness Level Data to MongoDB');

        //-----------Insert Database MongoDB for Teamwork here-------------//
        var happinesslevel2 = actionJSONPayload.submission.TeamHappiness;
        var data2 = {name: "Sushi", team: "DevTeam08", date: dt2, rating: happinesslevel2};
        BusinessLayer.insertTeamData(data2);
        console.log('Inserted Individual Happiness Level Data to MongoDB');
        //send thank mesage:
        var message = {
            "text": "Thank you for your sharing information.",
            "attachments": [
                {
                    "text": "See you later!",
                    "fallback": "You are unable to choose this option",
                    "callback_id": "wopr_survey",
                    "color": "#3AA3E3",
                    "attachment_type": "default"
                    /*"actions": [
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
                    ]*/
                }
            ]
        }
        
    
        sendMessageToSlackResponseURL(responseURL, message);


       }

       if (SubmmitType == "Report") //Case of /rbot extract data
       {
        
        //UploadFile2Slack (filename)
        var filename ='Test_slack.xlsx';
        UploadFile2Slack2 (filename, userID);
          
       }


    }
    else
    {

    
    if ( actionJSONPayload.actions[0].value == "Letgo")//reqBody.token != YOUR_APP_VERIFICATION_TOKEN){
        
    {  
        
        CommitBtn = 'COMMIT !';//'COMMIT INDIVIDUAL' 
         var message = {
           "text": "Please select an image to indicate how happy you are about your work.",
           "attachments": [
            {
                "text": "",
                "fallback": "You are unable to choose this option",
                "callback_id": "wopr_survey",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','',CommitBtn,'','danger')
           
          }]
        }   
       
        sendMessageToSlackResponseURL(actionJSONPayload.response_url, message); 

        //Function to show the diaglog for input data
        /*var attachment=[
         {
            "text": "test",
            "fallback": "You are unable to choose this option",
            "callback_id": "wopr_survey",
            "color": "#3AA3E3",
            "attachment_type": "default",
            //"actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','',CommitBtn,'','danger')
       
         }]
         SendDiaglogInputData(responseURL,attachment,trigger_id) */
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

        }
            
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
            CommitBtn = 'COMMIT';//'COMMIT INDIVIDUAL' or 'COMMIT TEAMWORK'
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
                    "actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','',CommitBtn,'','primary')
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
            CommitBtn = 'COMMIT !';//reset again back to Commit Individual
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


});

// Route the Slack command /rbot in the config slack app: Process with report part
app.post('/delay', urlencodedParser, function(req, res) 
{
    delaytime =2;
    console.log(req.body.text);
    delaytime = req.body.text; 
    if (( delaytime >5 ) && ( delaytime < 50 ) )
    {
        delaytime = req.body.text;
        console.log(delaytime);
    }
    else {delaytime = 2};

    
    userID = req.body.user_id;
    console.log(delaytime);
    //Hi Ar, you can continue to process after Delay here
  

});

// Route the Slack command /rbot in the config slack app: Process with report part
app.post('/mbot', urlencodedParser, function(req, res) {
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
    var attachment=[
        {
            "text": "test",
            "fallback": "You are unable to choose this option",
            "callback_id": "wopr_survey",
            "color": "#3AA3E3",
            "attachment_type": "default",
            //"actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','',CommitBtn,'','danger')
       
      }]
    SendDiaglogInputData(responseURL,attachment,trigger_id)
    //SendRemider(tokenId)
    

});

// Route the Slack command /rbot in the config slack app: Process with report part
app.post('/rbot', urlencodedParser, function(req, res) {
    //res.send('Welcome to Monitor slack bot of Group 08 !');
    res.status(200).end(); // best practice to respond with empty 200 status code
    var reqBody = req.body;
    responseURL = reqBody.response_url;
    const { text, trigger_id } = req.body;
    console.log(trigger_id);
    //console.log(body);
    var attachment=[
        {
            "text": "test",
            "fallback": "You are unable to choose this option",
            "callback_id": "wopr_survey",
            "color": "#3AA3E3",
            "attachment_type": "default",
            //"actions": ActionArr('Thrilled',':heart_eyes_cat:','','Happy',':smile_cat:','','So So',':smirk_cat:','','Morose',':crying_cat_face:','',CommitBtn,'','danger')
       
      }]
      SendDiaglogReport(responseURL,attachment,trigger_id);
      //res.send('Thank you for your sharing !');
    /*
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
    
}*/

});