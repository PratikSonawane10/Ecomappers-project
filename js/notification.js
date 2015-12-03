$(function () {
	$("#sensorNotificationLabel").show();
	$("#userNotificationLabel").show();
	
	$(".accordion div").show();
	$('.accordion h4').css('cursor', 'pointer');
	setTimeout("$('.accordion div').slideToggle('slow');");
	$(".accordion h4").click(function () {
		$(this).next(".pane").slideToggle("slow").siblings(".pane:visible").slideUp("slow");
		$(this).toggleClass("current");
		$(this).siblings("h4").removeClass("current");
	});
	$("li#sensorNotification").on("click",function(){
		$("#sensorNotificationLabel").hide();
		//whenevr suggesions request will came use $("#sensorNotificationLabel").show();
	});
	$("li#userNotifications").on("click",function(){
		$("#userNotificationLabel").hide();
		//whenevr suggesions request will came use $("#userNotificationLabel").show();
	});	
	$("#signout").on("click",function(){
		localStorage.clear();
	});
	
			
});