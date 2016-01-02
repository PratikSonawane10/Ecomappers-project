function validateRegistrationForm() {
	
	$("#registrationForm").validate({
		rules :{
			name : "required",
			city : "required",
			mobileno : "required",
			
			registrationemail : {
				required : true,
				email : true
			},
			registrationpassword : {
				required : true,
				minlength : 6
			},
			registrationconfirmpassword : {
				required : true,
				minlength : 6,
				equalTo :"#registrationpassword"
				
			},
		},
		messages :{
			name : "Please enter name",
			city : "Please enter city",
			mobileno : "Please enter mobileno",
			
			registrationpassword : {
				required : "Please enter Password",
				minlength : "Password contain atleast 8 character long"
			},
			registrationconfirmpassword : {
				required : "Please enter Password",
				minlength : "Password contain atleast 8 character long",
				equalTo :"please enter same password as above"
				
			},
		},
		errorElement : 'form',
		errorLabelContainer: 'Error'
	});
	
	/*
	//alert("I was run after loading !");
	
	var minPassLen = 8, maxPassLen = 12;
		var passwordMsg = "Password must be between " + minPassLen + " and " + maxPassLen + " characters, inclusive.";
		jQuery.validator.setDefaults({
			debug: true,      //Avoids form submit. Comment when in production.
			success: "valid",
			submitHandler: function() {	
			
				var name=$("#name").val();
				var city=$("#city").val();
				var mobileno=$("#mobileno").val();
				var email=$("#registrationemail").val();
				alert("Email = "+email);	
				var password=$("#password").val();
				var confirmpassword=$("#confirmpassword").val();
				//var password = SHA1($("#password").val());
				
				/*var fullURL = sessionStorage.getItem("url");
				var separateURL =  fullURL.split("/");
				if(separateURL[4]!=="") {
					var url = separateURL[4];
				}
				else {
					var url = "login.html";
				//*} 
									
				var data = {
					name : name,
					city : city,
					mobileno : mobileno,
					email : email,
					password : password,
					confirmpassword : confirmpassword,
					method : "userRegistration",
					format : "json"
				};		
				$.post("/ecoAPI/dev/api/userLoginAPI.php", data)
				.done(function(response) {
					if(response.saveUsersDetailsResponse==="ERROR") {
						alert('There is error while registering!');
						
					}
					else {					
						window.location = "login.html";
					}
				}).fail(function(){
					alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
				});
			}
		});
    validate signup form on keyup and submit
   $("#registrationForm").validate({
      rules: {
         registrationemail: {
            required: true, 
			email: true			
         },
         password: {
            required: true,
            minlength: minPassLen,
            maxlength: maxPassLen
         }
      },
      messages: {
         email: {
            required: "email required",	
         },
         password: {
            required: "Password required",
            minlength: passwordMsg,
            maxlength: passwordMsg
			
         }
       },
		errorElement : 'form',
		errorLabelContainer: 'Error'
		
   });
	
	alert("Validation script was run ");
	*/
}
