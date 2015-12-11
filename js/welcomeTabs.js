$(function (){
	var email=localStorage.getItem("email");
	//add
	$("#addDeviceSubmit").on("click",function(){
		
		var serialno=$("#addDeviceSerialNo").val();
		var roomno=$("#addDeviceRoomNo").val();
		var data={
			serialno : serialno,
			roomno : roomno,
			email : email,
			method : "addDeviceDetails",
			format : "json"
		}
		$.post("http://storage.couragedigital.com/ecoAPI/dev/api/sensorDetails.php",data)
			.done(function (response){
				if(response.addDeviceDetailsResponse==="ERROR") {
					alert('Devive details are not added successfully.Please try again..');
				}
				else {					
					//e.preventDefault();		
					alert("Device details successfully added..");
					//show room no to user
					window.location.href = "index.html";
				}				
			}).fail(function(){
				alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
			});
	});
	//edit
	$("#editDeviceSubmit").on("click",function(){
		var roomno=$("#editDeviceRoomNo").val();
		var selectedDeviceEdit=$('option:selected','#selectDeviceEdit').val();
		var data={
			selectedDeviceEdit : selectedDeviceEdit,	
			roomno : roomno,
			method : "updateDeviceDetails",
			format : "json"
		}
		$.post("http://storage.couragedigital.com/ecoAPI/dev/api/sensorDetails.php",data)
			.done(function (response){
				if(response.updateDeviceDetailsResponse==="ERROR_WHILE_UPDATINGING") {
					alert('Devive details are not updated.Please try again..');
				}
				else {					
					//e.preventDefault();		
					alert("Device details successfully updated..");
					//show room no to user
					window.location.href = "index.html";
				}				
			}).fail(function(){
				alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
			});
	});
	
	//remove
	$("#removeDeviceSubmit").on("click",function(){
		var selectedDeviceRemove=$('option:selected','#selectDeviceRemove').val();
		var data={
			selectedDeviceRemove : selectedDeviceRemove,
			method : "removeDeviceDetails",
			format : "json"
		}
		$.post("http://storage.couragedigital.com/ecoAPI/dev/api/sensorDetails.php",data)
			.done(function (response){
				if(response.removeDeviceDetailsResponse==="ERROR_WHILE_REMOVING") {
					alert('Devive not removed.Please try again..');
				}
				else {						
					alert("Device successfully Removed..");
					//show room no to user
					window.location.href = "index.html";
				}				
			}).fail(function(){
				alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
			});
	});
	
	//load device as per user
	$.get("http://storage.couragedigital.com/ecoAPI/dev/api/sensorDetails.php?email="+email+"&method=loadDevice&format=json")
		.done(function (response){
			var select=document.getElementById("selectDeviceEdit");				
			$.each(response.loadedDeviceList,function (index,loadDevice){
				var loadDeviceyObj=loadDevice;
				var device_serial_no=loadDeviceyObj.device_serial_no
				var option=document.createElement('option');
				option.text= option.value = device_serial_no;
				select.add(option);
			});
			var select2=document.getElementById("selectDeviceRemove");	
			$.each(response.loadedDeviceList,function (index,loadDevice){
				var loadDeviceyObj=loadDevice;
				var device_serial_no=loadDeviceyObj.device_serial_no
				var option=document.createElement('option');
				option.text= option.value = device_serial_no;
				select2.add(option);
			});
		})
	.fail(function (){   
       alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!'); 
	});
	
});