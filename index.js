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



//------------------------------------------------------------------------------
//Nic's Code Here
//------------------------------------------------------------------------------

window.baseUrl = " http://introtoapps.com/datastore.php?appid=215476964";

//Create function to the initial page
function showInitialPage() {
	
    //Create the initial page
    var page = $("<div></div>");
	page.append();
	
	//Create the Logo image
	var img=$("<img />").attr("src","img/logo.png").css({'display': 'block',
    'margin-left': 'auto','margin-right': 'auto','width':'195px','height':'195px'});
	page.append(img);
	
	//Add the LOG IN button
	var logInButton = $("<button class='button'>LOG IN</button></br>");
    page.append(logInButton);
	logInButton.on("click", function() {
		showLoginPage();	
	});
	//Add the JOIN TODAY! button
    var joinTodayButton = $("<button class='button'>JOIN TODAY!</button>");
    page.append(joinTodayButton);
	joinTodayButton.on("click", function() {
		showRegistrationPage();	
	});
	//Add the page to web app
	$("#maincontent").html(page);
}

//add function to show login page
function showLoginPage() {
	
	//Create the login page
	var page = $("<div></div>");
	page.append("<h2 class='titleFont'>Login Page</h2>");
	
	//Add the username field
	var username = $("<input type='text' placeholder='Username' id='loginUsername'></input>");
	
	page.append(username);
	
	//Add the password field
	var password = $("<input type='password' placeholder='Password' id='loginPassword'></input></br>");
	
	page.append(password);
	
	//Add the login button and validadte the input data
	var login = $("<button class='button'>Log In</button></br>");
	page.append(login);
	login.on("click", function() {
	    var usernameInput = document.getElementById("loginUsername").value;
        var passwordInput = document.getElementById("loginPassword").value;
        var hashpasswordInput = CryptoJS.SHA256(passwordInput).toString();
		
        if((usernameInput == "") || (passwordInput == "" )){
           alert("Please input your username and password!");
        } else {
			
         validateLogin();
     }
		
	});
	//add go back button into login page
	var logoutButton = $("<button class='button'>Go back</button>");
	page.append(logoutButton);
	logoutButton.on("click", function() {

    //function go back button forward to showInitialPage 
		showInitialPage();
	});
	//Add the page to web app
	$("#maincontent").html(page);
}

window.userData = [];

//This function is to validate input username and password in login page and see if the inputs match any data in datastore
function validateLogin() {
	var url = baseUrl + "&action=load&objectid=userData";
	var usernameInput = document.getElementById("loginUsername").value;
	var passwordInput = document.getElementById("loginPassword").value;
	var hashpasswordInput = CryptoJS.SHA256(passwordInput).toString();
	
	        $.ajax({ url: url, cache: false })
            .done(function (data) {
                try {
                    window.userData = JSON.parse(data);
                    // Retreive stored data from datastore 
                    for (var index = 0; index < userData.length; index++) {
						
                        var storedData = userData[index];
                        //set the value of password and username combination to check for this latter on
                        var loginData = storedData.username + storedData.password;
                    
                    }
                    //validate input username and password to see if they exist in datastore
                    if (loginData.indexOf(usernameInput) >= 0 && loginData.indexOf(hashpasswordInput) >= 0){

                        alert("Log in successfully!");
                        loadForumTopics();
					localStorage.setItem('currentuser', JSON.stringify(usernameInput) + JSON.stringify(hashpasswordInput));
                    }
                    else {
                        alert("Login unsuccessfully!Wrong username or password!");
                    }

                } catch (e){
                    alert(e);
                }
            }).fail(function (jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });
	
}

//add function to show registeration page
function showRegistrationPage() {
	
	//Create the registration page
	var page = $("<div></div>");
	page.append("<h2 class='titleFont'>Registration Page</h2>");
	
	//add the email field
	var email = $("<input type='text' id='email'></input>");
	
	var emailLine = $("<p class='textFont'>Email Address: </p>");
	emailLine.append(email);
	
	page.append(emailLine);
	
	//Add the username field
	var username = $("<input type='text' id='username'></input>");
	
	var usernameLine = $("<p class='textFont'>Username: </p>");
	usernameLine.append(username);
	
	page.append(usernameLine);
	
	//Add the password field
	var password = $("<input type='password' id='password'></input>");
	
	var passwordLine = $("<p class='textFont'>Password: </p>");
	passwordLine.append(password);
	
	page.append(passwordLine);
	
	//Add the Confirmpassword field
	var password = $("<input type='password' id='confirmpassword'></input>");
	
	var passwordLine = $("<p class='textFont'>Confirm Password: </p>");
	passwordLine.append(password);
	
	page.append(passwordLine);
	
	//Add the registerNow button and validate all input 
	var registerNowButton = $("<button class='button'>Register Now!</button></br>");
	page.append(registerNowButton);
	registerNowButton.on("click", function() {
		var emailInput = document.getElementById("email").value;
		var usernameInput = document.getElementById("username").value;
        var passwordInput = document.getElementById("password").value;
        var confirmPasswordInput = document.getElementById("confirmpassword").value;
		var hashpasswordInput = CryptoJS.SHA256(passwordInput).toString();
	// validate all inputs and make sure everything are completed
	if ((emailInput == "") || (usernameInput == "") || (passwordInput == "") || (confirmPasswordInput == "")) {
		
		alert("Please input all information!");
		return false;
	} else if (confirmPasswordInput != passwordInput) {
		
		alert("Password and Confirm password is not match!");
		return false;
	} else {
		createUser(usernameInput,hashpasswordInput);
	}
	});
	
	//add go back button into showRegistrationPage
	var logoutButton = $("<button class='button'>Go back</button>");
	page.append(logoutButton);
	logoutButton.on("click", function() {
			
    //function go back button forward to showInitialPage 
		showInitialPage();
	});
	//Add the page to web app
	$("#maincontent").html(page);
}

//Function to for new user to creat new account and save to datastore, called from registeration page
function createUser(_username, _password) {
	var userObject = {
		username : _username,
		password : _password
	};
	userData.push(userObject);
	var data = JSON.stringify(userData);
	var url = baseUrl + "&action=save&objectid=userData&data=" + encodeURIComponent(data);
	
	$.ajax({url: url,cache: false})
	.done(function( data ) {
		//when successfully complete, run this function 
		alert("Successfully Registered!");
		showLoginPage();
		localStorage.setItem('Accounts', JSON.stringify(userData));
	}).fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});
}

/**
    These function is to direct users to the single tipic that they click and show the further page.
*/

//create onclick function to operate showSingleTopic function 
function createOnClick(node,topic) {
	    node.on("click", function() {
	    showSingleTopic(topic);
		});
	
}

//create function to identify what function needs to be operated
function showSingleTopic(topicDetails){
	
	//operate loadiPhoneXForumsTopics function when condition is identified
	if(topicDetails.title=="iPhoneX-Forums"){
		loadiPhoneXForumsTopics();
	}
	
	//operate loadiPhone8ForumsTopics function when condition is identified
	if(topicDetails.title=="iPhone8-Forums"){
		loadiPhone8ForumsTopics();
	}
	
	//operate loadiPhone7ForumsTopics function when condition is identified
	if(topicDetails.title=="iPhone7-Forums"){
		loadiPhone7ForumsTopics();
	}
	
	//operate loadiPhone6ForumsTopics function when condition is identified
	if(topicDetails.title=="iPhone6-Forums"){
		loadiPhone6ForumsTopics();
	}
}

window.forumTopics = [];

/**
    This function shows the list of all forum topics.
	This function shows all topics that are stored in datastore.
*/

// Create Forum topics page
function showForumTopics() {
	
	var page = $("<div></div>");
	page.append("<h1 class='titleFont'>Forum topics</h1>");

	var topicTable = $("<table class='topicTable'><tr><th>Title</th><th>Posts</th><th>Author</th></tr></table></br>");
	
		for (index in forumTopics) {

		    var row = $("<tr></tr>");
		    row.append("<td>" + forumTopics[index].title  + "</td>");
		    row.append("<td>" + forumTopics[index].post + "</td>");
		    row.append("<td>" + forumTopics[index].Lastpost + "</td>");

		createOnClick(row,forumTopics[index]);
			
		topicTable.append(row);
	}
	    page.append(topicTable);
		
	    //add log out button into showForumTopics page
	 	var logoutButton = $("<button class='button'>Logout</button>");
	    page.append(logoutButton);
	    logoutButton.on("click", function() {
		
		//operate showLoginPage function when logout button is clicked
			showLoginPage();
			localStorage.removeItem("currentuser");
			localStorage.removeItem("Accounts");	
			localStorage.removeItem("forumTopics");
			localStorage.removeItem("iPhoneXForumsTopics");
			localStorage.removeItem("iPhone8ForumsTopics");
			localStorage.removeItem("iPhone7ForumsTopics");
			localStorage.removeItem("iPhone6ForumsTopics");
	});
		
	//Add the page to web app
	$("#maincontent").html(page);
}
// This function is to load all data of Forum topics from datastore
function loadForumTopics() {
	var url = baseUrl + "&action=load&objectid=Forumtopics";
	
	$.ajax({url: url,cache: false})
	.done(function( data ) {
		try {
		window.forumTopics = JSON.parse(data);
		showForumTopics();
		} catch (e) {
			alert(e);
		}
localStorage.setItem('forumTopics', JSON.stringify(forumTopics));
	}).fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});
}

/**
    This function shows the list of all topics in iPhoneXForumsTopics page.
	This function shows all topics that stored in the file called "iPhoneXForumsTopics".
*/

window.iPhoneXForumsTopics = [];

// This function is to show iPhoneX forum page
function showiPhoneXForumsPage() {
	var page = $("<div></div>");
	page.append("<h1 class='titleFont'>iPhoneX-Forums</h1>");

	var topicTable = $("<table class='topicTable'><tr><th>Title</th><th>Contents</th><th>Author</th></tr></table></br>");
	
		for (index in iPhoneXForumsTopics) {

		    var row = $("<tr></tr>");
		    row.append("<td>" + iPhoneXForumsTopics[index].title  + "</td>");
		    row.append("<td>" + iPhoneXForumsTopics[index].Contents + "</td>");
		    row.append("<td>" + iPhoneXForumsTopics[index].Lastpost + "</td>");

		//createOnClick(row,forumTopics[index]);
		
		topicTable.append(row);
	}
	    page.append(topicTable);
		
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
//This function is to load data from baseUrl + "&action=load&objectid=IPhoneXForumsTopics
function loadiPhoneXForumsTopics() {
	var url = baseUrl + "&action=load&objectid=IPhoneXForumsTopics";
	
	$.ajax({url: url,cache: false})
	.done(function( data ) {
		try {
		window.iPhoneXForumsTopics = JSON.parse(data);
		showiPhoneXForumsPage();
		} catch (e) {
			alert(e);
		}
localStorage.setItem('iPhoneXForumsTopics', JSON.stringify(iPhoneXForumsTopics));
	}).fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});
	
}

/**
    This function shows the list of all topics in iPhone8ForumsTopics page.
	This function shows all topics that stored in the file called "iPhone8ForumsTopics".
*/

window.iPhone8ForumsTopics = [];

// This function is to show iPhone8 forum page
function showiPhone8ForumsPage() {
	var page = $("<div></div>");
	page.append("<h1 class='titleFont'>iPhone8-Forums</h1>");

	var topicTable = $("<table class='topicTable'><tr><th>Title</th><th>Contents</th><th>Author</th></tr></table></br>");
	
		for (index in iPhone8ForumsTopics) {

		    var row = $("<tr></tr>");
		    row.append("<td>" + iPhone8ForumsTopics[index].title  + "</td>");
		    row.append("<td>" + iPhone8ForumsTopics[index].Contents + "</td>");
		    row.append("<td>" + iPhone8ForumsTopics[index].Lastpost + "</td>");

		//createOnClick(row,forumTopics[index]);
		
		topicTable.append(row);
	}
	    page.append(topicTable);
		
		//add go back button into iPhone8 forum page
	    var logoutButton = $("<button class='button'>Go back</button>");
	    page.append(logoutButton);
	    logoutButton.on("click", function() {
			
		//function go back button forward to showForumTopics page
			showForumTopics();
	});
	//Add the page to web app
	$("#maincontent").html(page);
}
//This function is to load data from baseUrl + "&action=load&objectid=IPhone8ForumsTopics
function loadiPhone8ForumsTopics() {
	var url = baseUrl + "&action=load&objectid=IPhone8ForumsTopics";
	
	$.ajax({url: url,cache: false})
	.done(function( data ) {
		try {
		window.iPhone8ForumsTopics = JSON.parse(data);
		showiPhone8ForumsPage();
		} catch (e) {
			alert(e);
		}
localStorage.setItem('iPhone8ForumsTopics', JSON.stringify(iPhone8ForumsTopics));
	}).fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});
	
}

/**
    This function shows the list of all topics in iPhone7ForumsTopics page.
	This function shows all topics that stored in the file called "iPhone7ForumsTopics".
*/

window.iPhone7ForumsTopics = [];

// This function is to show iPhone7 forum page
function showiPhone7ForumsPage() {
	var page = $("<div></div>");
	page.append("<h1 class='titleFont'>iPhone7-Forums</h1>");

	var topicTable = $("<table class='topicTable'><tr><th>Title</th><th>Contents</th><th>Author</th></tr></table></br>");
	
		for (index in iPhone7ForumsTopics) {

		    var row = $("<tr></tr>");
		    row.append("<td>" + iPhone7ForumsTopics[index].title  + "</td>");
		    row.append("<td>" + iPhone7ForumsTopics[index].Contents + "</td>");
		    row.append("<td>" + iPhone7ForumsTopics[index].Lastpost + "</td>");

		//createOnClick(row,forumTopics[index]);
		
		topicTable.append(row);
	}
	    page.append(topicTable);
		
		//add go back button into showiPhone7ForumsPage
	    var logoutButton = $("<button class='button'>Go back</button>");
	    page.append(logoutButton);
	    logoutButton.on("click", function() {
			
		//function go back button forward to showForumTopics page
			showForumTopics();
	});
	//Add the page to web app
	$("#maincontent").html(page);
}
//This function is to load data from baseUrl + "&action=load&objectid=IPhone7ForumsTopics
function loadiPhone7ForumsTopics() {
	var url = baseUrl + "&action=load&objectid=IPhone7ForumsTopics";
	
	$.ajax({url: url,cache: false})
	.done(function( data ) {
		try {
		window.iPhone7ForumsTopics = JSON.parse(data);
		showiPhone7ForumsPage();
		} catch (e) {
			alert(e);
		}
localStorage.setItem('iPhone7ForumsTopics', JSON.stringify(iPhone7ForumsTopics));
	}).fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});
	
}

/**
    This function shows the list of all topics in iPhone6ForumsTopics page.
	This function shows all topics that stored in the file called "iPhone6ForumsTopics".
*/

window.iPhone6ForumsTopics = [];

// This function is to show iPhone7 forum page
function showiPhone6ForumsPage() {
	var page = $("<div></div>");
	page.append("<h1 class='titleFont'>iPhone6-Forums</h1>");

	var topicTable = $("<table class='topicTable'><tr><th>Title</th><th>Contents</th><th>Author</th></tr></table></br>");
	
		for (index in iPhone6ForumsTopics) {

		    var row = $("<tr></tr>");
		    row.append("<td>" + iPhone6ForumsTopics[index].title  + "</td>");
		    row.append("<td>" + iPhone6ForumsTopics[index].Contents + "</td>");
		    row.append("<td>" + iPhone6ForumsTopics[index].Lastpost + "</td>");

		//createOnClick(row,forumTopics[index]);
		
		topicTable.append(row);
	}
	    page.append(topicTable);
		
		//add go back button into showiPhone6ForumsPage
	    var logoutButton = $("<button class='button'>Go back</button>");
	    page.append(logoutButton);
	    logoutButton.on("click", function() {
			
		//function go back button forward to showForumTopics page
			showForumTopics();
	});
	//Add the page to web app
	$("#maincontent").html(page);
}
//This function is to load data from baseUrl + "&action=load&objectid=IPhone6ForumsTopics
function loadiPhone6ForumsTopics() {
	var url = baseUrl + "&action=load&objectid=IPhone6ForumsTopics";
	
	$.ajax({url: url,cache: false})
	.done(function( data ) {
		try {
		window.iPhone6ForumsTopics = JSON.parse(data);
		showiPhone6ForumsPage();
		} catch (e) {
			alert(e);
		}
localStorage.setItem('iPhone6ForumsTopics', JSON.stringify(iPhone6ForumsTopics));
	}).fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});
	
}

function loadUser(username) {
	var url = baseUrl + "&action=load&objectid=UserLoginData";
	
	$.ajax({url: url,cache: false})
	.done(function( data ) {
		$("body").append( data );
	}).fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});
}

//------------------------------------------------------------------------------
/**

*/
//------------------------------------------------------------------------------


$( document ).ready(function() {
	
	showInitialPage();
	
	
});