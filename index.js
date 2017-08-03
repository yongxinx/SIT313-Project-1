/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


console.log("about to declare showLoginPage");

//------------------------------------------------------------------------------
//Nic's Code Here
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//Variables
//------------------------------------------------------------------------------

var topics = [

    {title: "Student Topics", posts: 24, Last_Post: "John/6 hours ago"},
    {title: "Other Topics", posts: 11, Last_Post: "David/12 hours ago"}

];

var studentTopics = [

    {title: "SIT313", contents: "I have a question about assignment 1,.......", users: "John/6 hours ago"},
    {title: "SIT313", contents: "Need some help for my assignment 1,.......", users: "David/15 hours ago"}

];

var otherTopics = [

    {title: "Enrolment questions", contents: "Need some enrolment advices,...", users: "Jack/8 hours ago"},
    {title: "General question", contents: "What is the assignment 1 's deadline?....", users: "Alex/19 hours ago"}

];
//------------------------------------------------------------------------------
//Nic's Code Here
//------------------------------------------------------------------------------

//add function to show login page
function showLoginPage() {
	
	//Create the login page
	var page = $("<div></div>");
	page.append("<h1 class='titleFont'>Login Page</h1>");
	
	//Add the username field
	var username = $("<input type='text'></input>");
	
	var usernameLine = $("<p class='textFont'>Username: </p>");
	usernameLine.append(username);
	
	page.append(usernameLine);
	
	//Add the password field
	var password = $("<input type='text'></input>");
	
	var passwordLine = $("<p class='textFont'>Password: </p>");
	passwordLine.append(password);
	
	page.append(passwordLine);
	
	//Add the login button
	var loginButton = $("<button class='button'>Login</button>");
	page.append(loginButton);
	loginButton.on("click", function() {
		
		showForumTopics();
		
	});
	
	//Add the page to web app
	$("#maincontent").html(page);
	
}

//add function to show registeration page
function showRegistrationPage() {
	
	//Create the registration page
	var page = $("<div></div>");
	page.append("<h1 class='titleFont'>Registration Page</h1>");
	
	//add the email field
	var email = $("<input type='text'></input>");
	
	var emailLine = $("<p class='textFont'>Email Address: </p>");
	emailLine.append(email);
	
	page.append(emailLine);
	
	//Add the username field
	var username = $("<input type='text'></input>");
	
	var usernameLine = $("<p class='textFont'>Username: </p>");
	usernameLine.append(username);
	
	page.append(usernameLine);
	
	//Add the password field
	var password = $("<input type='text'></input>");
	
	var passwordLine = $("<p class='textFont'>Password: </p>");
	passwordLine.append(password);
	
	page.append(passwordLine);
	
	//Add the Confirmpassword field
	var password = $("<input type='text'></input>");
	
	var passwordLine = $("<p class='textFont'>Confirm Password: </p>");
	passwordLine.append(password);
	
	page.append(passwordLine);
	
	//Add the registerNow button
	var registerNowButton = $("<button class='button'>Register Now!</button>");
	page.append(registerNowButton);
	registerNowButton.on("click", function() {
		
		//add alert to show users that registration has been completed
		alert("You've registered successfully! Log in with your account in login page!");
		
	});
	
	//Add the page to web app
	$("#maincontent").html(page);
	
}

/**
    This function shows the list of all topics in studentTopics page.
	This function shows all topics that are in the "studentTopics" variable.
*/

// add function to show student topics page
function showStudentTopicsPage(){
	
	//Create the studentTopics page
	var page = $("<div></div>");
	page.append("<h1 class='titleFont'>Student topics</h1>");
	
	//create table for showStudentTopicsPage
	var studentTopicTable = $("<table class='topicTable'><tr><th width='70%'>Title</th><th width='15%'>Contents</th><th width='15%'>Users</th></tr></table>");
	
	//Loop through all topics in the global variable "stuentsTopics"
	for(index in studentTopics) {
		
		var row = $("<tr></tr>");
		row.append("<td>" + studentTopics[index].title + "</td>");
		row.append("<td>" + studentTopics[index].contents + "</td>");
		row.append("<td>" + studentTopics[index].users  + "</td>");

		studentTopicTable.append(row);
		
	}
	
	page.append(studentTopicTable);
	    
		//add go back button into showStudentTopicsPage
	    var logoutButton = $("<button class='button'>Go back</button>");
	    page.append(logoutButton);
	    logoutButton.on("click", function() {
			
		//function go back button forward to showForumTopics page
			showForumTopics();
	});
	
	//Add the page to web app
	$("#maincontent").html(page);
	
}

//create onclick function to operate showSingleTopic function 
function createOnClick(node,topic) {
	    node.on("click", function() {
	    showSingleTopic(topic);
		});
	
}

//create function to identify what function needs to be operated
function showSingleTopic(topicDetails){
	
	//operate showStudentTopicsPage function when condition is identified
	if(topicDetails.title=="Student Topics"){
		showStudentTopicsPage();
	}
	
	//operate showOtherTopicsPage function when condition is identified
	if(topicDetails.title=="Other Topics"){
		showOtherTopicsPage();
	}
}

/**
    This function shows the list of all topics in otherTopics.
	This function shows all topics that are in the "otherTopics" variable.
*/

// add function to show other topics page
function showOtherTopicsPage(){
	
	//Create the studentTopics page
	var page = $("<div></div>");
	page.append("<h1 class='titleFont'>Other topics</h1>");
	
	//create the table for showOtherTopicsPage
	var otherTopicTable = $("<table class='topicTable'><tr><th width='70%'>Title</th><th width='15%'>Contents</th><th width='15%'>Users</th></tr></table>");
	
	//Loop through all topics in the global variable "stuentsTopics"
	for(index in otherTopics) {
		
		var row = $("<tr></tr>");
		row.append("<td>" + otherTopics[index].title + "</td>");
		row.append("<td>" + otherTopics[index].contents + "</td>");
		row.append("<td>" + otherTopics[index].users  + "</td>");

		otherTopicTable.append(row);
		
	}
	
	page.append(otherTopicTable);
	
	    //add go back button into showOtherTopicsPage
	    var logoutButton = $("<button class='button'>Go back</button>");
	    page.append(logoutButton);
	    logoutButton.on("click", function() {
		
		//go back to showForumTopics page when go back button is clicked
			showForumTopics();
	});
	
	//Add the page to web app
	$("#maincontent").html(page);
	
	
}

/**
    This function shows the list of all forum topics.
	This function shows all topics that are in the "topics" variable.
*/

// add function to show Forum topics page
function showForumTopics() {
	
	//Create the ForumTopic page
	var page = $("<div></div>");
	page.append("<h1 class='titleFont'>Forum topics</h1>");
	
	//create the table for showForumTopics
	var topicTable = $("<table class='topicTable'><tr><th width='70%'>Title</th><th width='15%'>Posts</th><th width='15%'>Last_Post</th></tr></table>");
	
	//Loop through all topics in the global variable "topics"
	for(index in topics) {
		
		var row = $("<tr></tr>");
		row.append("<td>" + topics[index].title + "</td>");
		row.append("<td>" + topics[index].posts + "</td>");
		row.append("<td>" + topics[index].Last_Post  + "</td>");

		createOnClick(row,topics[index]);
		
		topicTable.append(row);
		
	}
	
    page.append(topicTable);
	
	    //add log out button into showForumTopics page
		var logoutButton = $("<button class='button'>Logout</button>");
	    page.append(logoutButton);
	    logoutButton.on("click", function() {
		
		//operate showLoginPage function when login button is clicked
			showLoginPage();
	});
		
	//Add the page to web app
	$("#maincontent").html(page);
	
}


//------------------------------------------------------------------------------
/**

*/
//------------------------------------------------------------------------------


$( document ).ready(function() {
	$("#loginButton").on("click", showLoginPage);
	$("#registerButton").on("click", showRegistrationPage);
	
	//show the login page initially
	showLoginPage();
	
});