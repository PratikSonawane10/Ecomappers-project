$(function(){
	$('.sensorSuggessions').on("click",function() {
		
		var email = localStorage.getItem("email");
		var roomno = localStorage.getItem("roomno");
		$("#roomno").empty().append(roomno);
		//$("#roomno").append(roomno);
		if(roomno == null){
			alert("please select your device location...");
		}else {
			$.get("http://storage.couragedigital.com/ecoAPI/dev/api/ecomappersapi.php?roomno="+roomno+"&email="+email+"&method=showSuggessions&format=json ")
			.done(function (response){
				$.each(response.showSuggessionsResponse, function(i,suggessions){
					var nameOfSensor = suggessions.sensor_name;
					var suggession1 = suggessions.sug1_sensitive_groups;
					var suggession2 = suggessions.sug2_health_effects;
					var suggession3 = suggessions.sug3_cautionary;
					
					$("#SenitiveGroup"+nameOfSensor).empty(); 
					$("#HeathEffect"+nameOfSensor).empty(); 
					$("#Cautionary"+nameOfSensor).empty(); 
					
					$("#SenitiveGroup"+nameOfSensor).append(suggession1);					
					$("#HeathEffect"+nameOfSensor).append(suggession2);					
					$("#Cautionary"+nameOfSensor).append(suggession3);	
					
					if(suggession2=="none"){
						$("#HeathEffect"+nameOfSensor).hide();
						$(".healthEffects").hide();
					}
					if(suggession3=="none"){
						$("#Cautionary"+nameOfSensor).hide();
						$(".cautionarys").hide();
					}else {
						$(".healthEffects").show();
						$(".cautionarys").show();
						$("#Cautionary"+nameOfSensor).show();
						$("#HeathEffect"+nameOfSensor).show();	
						
					}
				});
				
			});
		}	
	});
});



