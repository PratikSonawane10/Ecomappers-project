$(function (){
	$('#forgotPassword').click(function() {
		$("body").on("click","button.btnemailsubmit", function(e){
			var email=$("#emailforReset").val();
			var data = {
				email : email,				
				method : "checkemail",
				format : "json"
			};	
			$.post("http://localhost/EcomappersAPI/api/userLoginAPI.php", data)
			.done(function(response) {
				if(response.checkemailResponse==="INVALID_EMAIL") {
					alert('Please enter your registered email id..');
				}
				else {						
					localStorage.setItem("email",email);
					e.preventDefault();			
					$("#authentication").load("enterNewPassword.html");
					alert("Please check your mail for CODE...");
				}
			}).fail(function(){
				alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
			});
		});
		
		$("body").on("click","button.btnNewPasswordSubmit", function(e){
			var email=localStorage.getItem("email");
			var code=$("#activationCode").val();
			var password=$("#password").val();
			var data = {
				email : email,
				code : code,
				password : password,				
				method : "setNewPassword",
				format : "json"
			};	
			$.post("http://localhost/EcomappersAPI/api/userLoginAPI.php", data)
			.done(function(response) {
				if(response.setNewPasswordResponse==="ENTER_VALID_ACTIVATION_CODE") {
					alert('Please enter valid code..');
				}
				else {					
					e.preventDefault();			
					window.location.href = "login.html";
				}
			}).fail(function(){
				alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
			});
		});
		$("#authentication").load("forgotPassword.html"); 												
	});	 
	
	$('#registrationLink').click(function() {
		$("body").on("click","button.registrationSubmit", function(e){
			
			var name=$("#name").val();
			var city=$("#city").val();
			var mobileno=$("#mobileno").val();
			var email=$("#email").val();			
			var confirmpassword=$("#confirmpassword").val();
			var data = {
				name : name,
				city : city,
				mobileno : mobileno,
				email : email,
				confirmpassword : confirmpassword,				
				method : "userRegistration",
				format : "json"
			};	
			$.post("http://localhost/EcomappersAPI/api/userLoginAPI.php", data)
			.done(function(response) {
				if(response.saveUsersDetailsResponse==="ERROR") {
					alert('You are not registered. Please try again..');
				}
				else {			
					alert('You are successfully Registered..');
					e.preventDefault();			
					window.location.href = "login.html";
				}
			}).fail(function(){
				alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
			});			
		});
		$("#authentication").load("registration.html"); 												
	});	 
	
});