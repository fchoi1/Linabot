
function createVideoWidget(mjpeg_server,div_id,topic,width,height)
{
  var video_width = width;
  var video_height = height;
  var video_quality = 60;
  var video_update_interval = 800;
  var img_url= "http://" + mjpeg_server + ":8080/?topic="+topic+"?width="+video_width+"?height="+video_height+"?quality="+video_quality;
  var video = new ros.widgets.SnapshotWidget(div_id, video_width, video_height, img_url, video_update_interval);
}


function checkURL()
{

  if(document.referrer == "http://www.pr2-remotelab.com/hri/index.html" ||
     document.referrer == "http://www.pr2-remotelab.com/hri/" ||document.referrer == "http://pr2-remotelab.com/hri/index.html" ||
     document.referrer == "http://pr2-remotelab.com/hri/"){
    return true;
  }
  else {
    document.write("Oops Illegal Access");
    return false;
  }
}

function checkRobot(rosNode, responseFunc)
{
  var srv_topic = "/get_robot_status";
  var srv = rosNode.serviceClient(srv_topic);
  var out = true;

  srv.call(ros.json([out]), responseFunc); 
}

function setRobot(rosNode, responseFunc, r_status)
{
  var srv_topic = "/set_robot_status";
  var srv = rosNode.serviceClient(srv_topic);
  var out = r_status;

  srv.call(ros.json([out]), responseFunc); 
}

function nodeLauncher(rosNode,launch_name)
{
  var srv_topic = "/launch";
  var srv = rosNode.serviceClient(srv_topic);
  
  srv.call(ros.json([launch_name]),ros.nop);
}

function createFaileDialog(divID)
{
  var divtext;
  var div = document.getElementById(divID);

  div.setAttribute("title","Failed to connect :(");

  $("#"+divID).dialog({height:300, width:800});
  divtext = "<center><h1>Failed to connect to the robot.</h1><br/><h1>Please refresh the page to reconnect</h1></center>";
  $("#"+divID).html(divtext);
}


function createInitDialog(divID, time)
{
  var divtext;
  var div = document.getElementById(divID);

  div.setAttribute("title","Welcome!");

  $("#"+divID).dialog({height:300, width:800});
  divtext = "<center><h1>Robot is now loading</h1><br/><h1>Please wait until this dialog closes</h1></center>";
  $("#"+divID).html(divtext);

  setTimeout("closeDialog(\""+divID+"\")", time);
}

function closeDialog(divID)
{
  $("#"+divID).dialog('close');
}

function createSurveyDialog(msg,divID)
{
  if(surveyOn == true)
    return;
  
  if(msg.time < 0)
    return;

  surveyOn = true;
  var divtext;
  var div = document.getElementById(divID);
  var title;

  
  if(msg.result == true)
  {
    title = "Success!!  " + " Time : " + msg.time.toFixed(4) + " seconds";
  }
  else
  {
    title = "Failed :( " + " Time : " + msg.time.toFixed(4) + " seconds";
  }

  div.setAttribute("title",title);

  $("#"+divID).dialog({height:850, width:800, close: function(event, ui){window.location.href="index.html";} });
  divtext = "<center> "+ title +" <br><br><iframe height=95% width=100% src=https://spreadsheets.google.com/spreadsheet/viewform?formkey=dEtwcjhYbmJUbzZkM2NIYjlTOHJxMlE6MQ></iframe></center>";
  $("#"+divID).html(divtext);
  //  window.location.href = "index.html";
}

function subscribeResultMessage(rosNode,surveyDivID)
{
  var topic = "/experiment_result";

  rosNode.subscribe(topic,function (msg) { setRobot(rosNode,ros.nop,false); createSurveyDialog(msg,surveyDivID)});// log('got Msg : ' + msg.time.toFixed(3)); createSurveyDialog(msg,surveyDivID)});
}

function createRobotInUse(divID)
{
  var divtext;
  var div = document.getElementById(divID);

  div.setAttribute("title","Sorry..");

  $("#"+divID).dialog({height:300, width:800, close: function(event, ui){window.location.href="index.html";}});
  divtext = "<center><h1>Robot is in use</h1><br/><h1>Please try it later</h1></center>";
  $("#"+divID).html(divtext);

}

