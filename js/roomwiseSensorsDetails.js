$(function() {
	
	var email=localStorage.getItem("email");
	var usernameLabel = email.split("@");
	$("#usernameLabel").append(usernameLabel[0]);
	$("#dynamicList").hide();
	$("#getroomsList").on("click",function(){
		$("#dynamicList").show();
	});	
	
	//check device is availble or not if available then show room no otherwise dont show.
	var roomno;
	var createDynamicList = document.getElementById("dynamicList");
	var li;	
	// to laod room no as per loged in user
		$.get("http://localhost/EcomappersAPI/api/ecomappersapi.php?email="+email+"&method=userRooms&format=json")
			.done(function (response){
			if(response.loadRooomsList ==""){
					alert("Device is not available.. please configure your device..");
					$("#getroomsList").hide();
			} else{
				$("#getroomsList").show();
				$("#dynamicList").append("<ul></ul>");									
				$.each(response.loadRooomsList,function (index,loadroomno){
					var loadRoomnoObj=loadroomno;
					var roomno=loadroomno.device_serial_no;
					
					for(var i in loadRoomnoObj) {
						li = "<li>";						
						$("#dynamicList ul").append(li.concat(loadRoomnoObj[i]));
					}
					$('#dynamicList li').each(function (i, val) {
						var locationName = val.textContent;
						$(this).attr('id',locationName);
						$(this).attr('value', locationName);
					});
					$("#dynamicList ul").css({
						color : "#b8c7ce"
					});
					$('#dynamicList li').css('cursor', 'pointer');
				});	
			}
				$('#dynamicList li').on("click",function() {
					roomno = this.id;
					if(typeof roomno != "undefined") {
						localStorage.setItem("roomno",roomno);
						showAllSensorsByRoom(roomno, email);	
						$("#includeContent").load("sensorList.html");
					}	
					
				});		
		});
	//show sensor values as per room no of loged in user
	function showAllSensorsByRoom(roomno,email) {		
		$.get("http://localhost/EcomappersAPI/api/ecomappersapi.php?roomno="+roomno+"&email="+email+"&method=roomWiseSensors&format=json")
			.done(function (response){
					if(response.showRoomWiseSensorsResponse==""){						
						alert("Data is not available for these room try another room..");						
					}
					else{
						$.each(response.showRoomWiseSensorsResponse, function(i,sensorDetails){
							
							var sens1 =sensorDetails.temperature;
							var sens2 =sensorDetails.pm2;
							var sens3 =sensorDetails.pm10;
							var sens4 =sensorDetails.noise;
							var sens5 =sensorDetails.co;
							var sens6 =sensorDetails.co2;
							var sens7 =sensorDetails.no2;
							var sens8 =sensorDetails.humidity;	
							var serialNo =sensorDetails.device_serial_no;
							
							$.each(sensorDetails,function(i,sensorValue){
								var valueOfSensor = sensorValue;
								var nameOfSensor=i;								
								//alert(i+" "+valueOfSensor);
								$.get("http://localhost/EcomappersAPI/api/ecomappersapi.php?valueOfSensor="+valueOfSensor+"&nameOfSensor="+nameOfSensor+"&method=sensorStatus&format=json")
									.done(function (response){
										$.each(response.showStatusResponse, function(i,sensorStatus){
											var status = sensorStatus.status;
											
											
											if(status == "good" ){												
												$("#"+nameOfSensor).css('cssText','background-color:#E00000 !important ;background-repeat: no-repeat; background-position: 50%;  border-radius: 50%; width: 100px height: 100px;');
												
											} else if(status == "moderate" ){
												$("#"+nameOfSensor).css('cssText','background-color:yellow !important ;background-repeat: no-repeat; background-position: 50%;  border-radius: 50%; width: 100px height: 100px;');
												
											}else if(status == "Unhealthy for Sensitive Groups"){
												$("#"+nameOfSensor).css('cssText','background-color:#FF7600 !important ;background-repeat: no-repeat; background-position: 50%;  border-radius: 50%; width: 100px height: 100px;');
												
											}else if(status == "Unhealthy"){
												$("#"+nameOfSensor).css('cssText','background-color:red !important ;background-repeat: no-repeat; background-position: 50%;  border-radius: 50%; width: 100px height: 100px;');
												
											}else if(status == "very Unhealthy" ){
												$("#"+nameOfSensor).css('cssText','background-color:#990049 !important ;background-repeat: no-repeat; background-position: 50%;  border-radius: 50%; width: 100px height: 100px;');
												
											}else if(status == "Hazardous"){
												$("#"+nameOfSensor).css('cssText','background-color:#7e0018 !important ;background-repeat: no-repeat; background-position: 50%;  border-radius: 50%; width: 100px height: 100px;');
											}
											
										});
									});
							});
							
							
							$('#sens1Value').empty(); 
							$('#sens2Value').empty(); 
							$('#sens3Value').empty(); 
							$('#sens4Value').empty(); 
							$('#sens5Value').empty(); 
							$('#sens6Value').empty(); 
							$('#sens7Value').empty(); 
							$('#sens8Value').empty(); 
														
							$("#sens1Value").append(sens1);					
							$("#sens2Value").append(sens2);					
							$("#sens3Value").append(sens3);					
							$("#sens4Value").append(sens4);
							$("#sens5Value").append(sens5);					
							$("#sens6Value").append(sens6);					
							$("#sens7Value").append(sens7);					
							$("#sens8Value").append(sens8);
											
						});
					}	
						
				
				$('.showGraph').on("click",function () {										
					var selectedSensorName = $(this).attr("id");
					localStorage.setItem("sensorsName",selectedSensorName);
					localStorage.setItem("email",email);					
					$("#includeContent").load("graphOfSensor.html", function(){
						var nameOfSensor=localStorage.getItem("sensorsName");
						var email=localStorage.getItem("email");
						var roomno=localStorage.getItem("roomno");
						$("#sensNameLabel").append(nameOfSensor);
						$("#roomnoLabel").append(roomno);

						//Define Date Range Picker 
						$('#sensordateandtimerange').daterangepicker({
							timePicker: true, timePickerIncrement: 1, locale: {
								format: 'DD/MM/YYYY h:mm A'
							}, ranges: {
								'Today': [moment(), moment()],
								'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
								'Last 7 Days': [moment().subtract(6, 'days'), moment()],
								'Last 30 Days': [moment().subtract(29, 'days'), moment()],
								'This Month': [moment().startOf('month'), moment().endOf('month')],
								'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
							}
						});      
						var realtime = "on";
						//for the first graph which is default
						var url = "http://localhost/EcomappersAPI/api/ecomappersapi.php?method=defaultSensorGraph&format=json&email="+email+"&nameOfSensor="+nameOfSensor+"&roomno="+roomno+""; //../ecoAPI/dev
							
						jsonData();
						//Take the graph data
						function jsonData() {
							$.getJSON(url, function(response) {
								if($.isArray(response.showSensorDetailsResponse) && response.showSensorDetailsResponse.length) {
									//var env = environment.getEnv();
									var Sensor1 = [];
									var Time = [];
									$.each(response.showSensorDetailsResponse, function(i, sensorPoints) {
										sensorPointsInString = sensorPoints;
										Sensor1.push(parseFloat(sensorPointsInString.poll_sen1));
										var date = new Date(sensorPointsInString.time);
										var dateInMilliSeconds = date.getTime();
										Time.push(dateInMilliSeconds);
									});
									var length = Math.min(Sensor1.length, Time.length);
									var data = [];
									for (var i = 0; i < length; i++) {
										data.push([Time[i], Sensor1[i]]);
									}	    			
									plotGraph(data);	    			    			        
								}
								else {
									alert("No Sensor Data available in the database!");
								}
							});
						}
						
						//On change of Date Range Picker
						$("#sensordateandtimerange").change(function(){
							$fullRangeDate = $("#sensordateandtimerange").val();
							$splitRangeDate = $fullRangeDate.split("-");
							$fromDateRange = $splitRangeDate[0];
							$toDateRange = $splitRangeDate[1];
							
							//From Date Split to correct format
							$splitFromDateRange = $fromDateRange.split(" ");
							$fromDate = $splitFromDateRange[0];
							$fromTime = $splitFromDateRange[1];
							$fromTimeAMPM = $splitFromDateRange[2];
							$splitFromDate = $fromDate.split("/");
							$fromDay = $splitFromDate[0];
							$fromMonth = $splitFromDate[1];
							$fromYear = $splitFromDate[2];
							$formattedFromDate = $fromYear + "-" + $fromMonth + "-" + $fromDay;
							$fromTimeTwentyFourHourFormat = ConvertTimeformat("24", $fromTime + " " + $fromTimeAMPM);
							$formattedFromTime = $fromTimeTwentyFourHourFormat + ":00";
							$fullFromDateWithTime = $formattedFromDate + " " + $formattedFromTime;
							
							//To Date Split to correct format
							$splitToDateRange = $toDateRange.split(" ");
							$toDate = $splitToDateRange[1];
							$toTime = $splitToDateRange[2];
							$toTimeAMPM = $splitToDateRange[3];
							$splitToDate = $toDate.split("/");
							$toDay = $splitToDate[0];
							$toMonth = $splitToDate[1];
							$toYear = $splitToDate[2];
							$formattedToDate = $toYear + "-" + $toMonth + "-" + $toDay;
							$toTimeTwentyFourHourFormat = ConvertTimeformat("24", $toTime + " " + $toTimeAMPM);
							$formattedToTime = $toTimeTwentyFourHourFormat + ":00";
							$fullToDateWithTime = $formattedToDate + " " + $formattedToTime;
							//for the graph but as per user selected date
							url = "http://localhost/EcomappersAPI/api/ecomappersapi.php?method=showGraphOfSensor&format=json&fromDate="+$fullFromDateWithTime+"&toDate="+$fullToDateWithTime+"&email="+email+"&nameOfSensor="+nameOfSensor+"&roomno="+roomno+" "; //../ecoAPI/dev
							realtime = "off";
							jsonData();
						});

						//Plot the Graph
						function plotGraph(data) {
							dataset = [
										{ label: "Pollution Sensor 1", data: data }
									];
							
							$.plot($("#sensorgraph"), dataset, {
								grid: {
									borderColor: "#f3f3f3",
									borderWidth: 1,
									tickColor: "#f3f3f3",
									hoverable: true, 
									clickable: true            
								},
								series: {
									shadowSize: 0, // Drawing is faster without shadows
									color: "#3c8dbc",
									points: {
										show :true
									},
									lines: {
										show :true
									}            
								},
								lines: {
									fill: true, //Converts the line chart to area chart
									color: "#3c8dbc"
								},
								yaxis: {
									min: 0,
									max: 0.0500,
									show: true
								},
								xaxis: {
									mode: "time",
									timezone: "browser",
									timeformat: "%d/%m/%y %l:%M %P",
									show: true
								}
							});
							
							$("<div id='tooltip'></div>").css({
								position: "absolute",
								display: "none",
								border: "1px solid #72afd2",
								padding: "2px",
								"background-color": "#acd0e5",
								opacity: 0.80
							}).appendTo("body");
									$("#sensorgraph").bind("plothover", function(event, pos, item) {
								if (item) {
									var date = new Date(item.datapoint[0]);
									var now = date.customFormat("#DD#/#MM#/#YY# #h#:#mm# #AMPM#");
									var x = now;
									var y = item.datapoint[1].toFixed(4);
											$("#tooltip").html(y + " , " + x).css({
										top : item.pageY + 5,
										left : item.pageX + 5
									}).fadeIn(200);
								} else {
									$("#tooltip").hide();
								}
							});
						}
						var updateInterval = 50000;
						var realtime = "on";
						function update() {  
							if (realtime === "on") {
								jsonData();
								setTimeout(update, updateInterval);
							}
						}
						   
						if (realtime === "on") {
							update();
						}
						//REALTIME TOGGLE
						$("#sensorgraphrealtime .btn").click(function () {
							if ($(this).data("toggle") === "on") {
								realtime = "on";         
							}
							else {
								realtime = "off";
							}
							update();
						});
						
						function ConvertTimeformat(format, str) {
							var time = str;
							var hours = Number(time.match(/^(\d+)/)[1]);
							var minutes = Number(time.match(/:(\d+)/)[1]);
							var AMPM = time.match(/\s(.*)$/)[1];
							if (AMPM == "PM" && hours < 12) hours = hours + 12;
							if (AMPM == "AM" && hours == 12) hours = hours - 12;
							var sHours = hours.toString();
							var sMinutes = minutes.toString();
							if (hours < 10) sHours = "0" + sHours;
							if (minutes < 10) sMinutes = "0" + sMinutes;
							return sHours + ":" + sMinutes;
						}

						//Date Custom Format
						Date.prototype.customFormat = function(formatString) {
							var YYYY,
								YY,
								MMMM,
								MMM,
								MM,
								M,
								DDDD,
								DDD,
								DD,
								D,
								hhhh,
								hhh,
								hh,
								h,
								mm,
								m,
								ss,
								s,
								ampm,
								AMPM,
								dMod,
								th;
							YY = (( YYYY = this.getFullYear()) + "").slice(-2);
							MM = ( M = this.getMonth() + 1) < 10 ? ('0' + M) : M;
							MMM = ( MMMM = ["January","February","March","April","May","June","July","August","September","October","November","December"][M - 1]).substring(0, 3);
							DD = ( D = this.getDate()) < 10 ? ('0' + D) : D;
							DDD = ( DDDD = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0, 3);
							th = (D >= 10 && D <= 20) ? 'th' : (( dMod = D % 10) == 1) ? 'st' : (dMod == 2) ? 'nd' : (dMod == 3) ? 'rd' : 'th';
							formatString = formatString.replace("#YYYY#", YYYY).replace("#YY#", YY).replace("#MMMM#", MMMM).replace("#MMM#", MMM).replace("#MM#", MM).replace("#M#", M).replace("#DDDD#", DDDD).replace("#DDD#", DDD).replace("#DD#", DD).replace("#D#", D).replace("#th#", th);
							h = ( hhh = this.getHours());
							if (h == 0)
								h = 24;
							if (h > 12)
								h -= 12;
							hh = h < 10 ? ('0' + h) : h;
							hhhh = h < 10 ? ('0' + hhh) : hhh;
							AMPM = ( ampm = hhh < 12 ? 'am' : 'pm').toUpperCase();
							mm = ( m = this.getMinutes()) < 10 ? ('0' + m) : m;
							ss = ( s = this.getSeconds()) < 10 ? ('0' + s) : s;
							return formatString.replace("#hhhh#", hhhh).replace("#hhh#", hhh).replace("#hh#", hh).replace("#h#", h).replace("#mm#", mm).replace("#m#", m).replace("#ss#", ss).replace("#s#", s).replace("#ampm#", ampm).replace("#AMPM#", AMPM);
						};
					});
				});
			});
	}
			var updateInterval = 60000;			
			function updateSensorValueForRoom() { 
				if(typeof roomno != "undefined") {
					showAllSensorsByRoom(roomno,email);
					setTimeout(updateSensorValueForRoom, updateInterval);		
				}										
			}
			updateSensorValueForRoom();	
			
			
});