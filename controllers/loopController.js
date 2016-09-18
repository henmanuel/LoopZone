function modal(id,content){
	if ($("#"+id).length == 0){
		$('body').append('<div id="'+id+'" class="modal" ></div>');
		$.ajax({
			url:content,async:true,
			success: function(data){
				$('#'+id).append('<div id="modal"><span class="modalClose">×</span>'+data+'</div>');
				var modal = document.getElementById(id);
				var span = document.getElementsByClassName("modalClose")[0];
				span.onclick = function(){
					modal.style.display = "none";
				}
				window.onclick = function(event){
					if (event.target == modal) {
						modal.style.display = "none";
					}
				}
			},
			error: function (xhr,thrownError){
				$('#'+id).append('<div class="modAlert"><h3>'+content+'</h3><input class="modalAcept" type="button" value="Aceptar"></div>');
				$(".modalAcept").click(function(){
					$('#'+id).css('display','none');
				})
			}
		});
	}
}
function plus(){//objeto longPress
	var pressTimer;
	$('#plusCont').remove('#plusLogIn');
	if ($("#plus").length == 0){
		$('#plusCont').append('<img id="plus" class="plus" src="style/img/plus.png">');
		$('#plus').mousedown(function(){
			pressTimer = window.setTimeout(function() {// evento longPress
				$('#userDash').css('display','flex');
			},300);
		}).mouseup(function(){// evento click
			clearTimeout(pressTimer);
			var barOn = $('#barra').css("display");
			if (barOn != "none"){
				$('#barra').css("display","none");
				$('#content').css("padding-top","25px");
				$('#contUser').css("margin-top","2%");
			}else{
				$('#barra').css("display","block");
				$('#content').css("padding-top","100px");
				$('#contUser').css("margin-top","");
			} 
		});
	}
}
function chart(){
	var config = {
	    data: {
	        datasets: [{
	            data: [
	                1,
	            ],
	            backgroundColor: [
	                "rgba(235, 235, 224, 0.5)",
	            ],
	            label: 'My dataset' // for legend
	        }],
	        labels: [
	            "Click Para Editar Vision",
	        ]
	    },
	    options: {
	        responsive: false,
	        legend: {
	            display: false,
	        },
	        title: {
	            display: true,
	            text: 'Vision Personal'
	        },
	        scale: {
	          ticks: {
	            max: 5,
	            min: 0,
	          }, 
	        },
	    }
	};
	resp = request('objetive');
   	console.log(resp);
    var ctx = document.getElementById("chart-area");
    myPolarArea = Chart.PolarArea(ctx, config);
    $("#chart-area").click(function(e) {
        var activeElements = myPolarArea.getElementsAtEvent(e);
        try {
            req = activeElements[0]['_model']['label']; 
        }
        catch(err) {
            req = "noElement";
        }
        if (req != "noElement"){
        	if (req == "Click Para Editar Vision"){
        		$('#vision').css('display','block');
        	}else{
        		
        	}
        }
    });
};
function auth(req){
	FB.api('/me?fields=id,name,email,birthday', function(response) {
		if(response.error){
			faceLogin(req);
		}else{
			$.ajax({
			    url: "models/index.php",
			    type: "POST",
			    dataType: 'jsonp',
			    processData: true,
			    data: {id:response.id, name:response.name, email:response.email, birthday:response.birthday},
			    headers: {
			        "Access-Control-Allow-Origin": "*",
			        "Access-Control-Allow-Headers": "origin, content-type, accept"
			    },
			    success: function(data) {
			        localStorage['token']=data;
			        request(req);
			    }
			});
		}

	});
}
function request(req, callback){
	var resp;
	if (typeof(Storage) !== "undefined") {
		var token = localStorage['token'];
		if (typeof(token)  !== "undefined"){
			jqXHR = $.ajax({
			    url: "models/index.php",
			    type: "POST",
			    dataType: 'jsonp',
			    async:false,
			    processData: true,
			    data: {tK:token,request:req},
			    headers: {
			        "Access-Control-Allow-Origin": "*",
			        "Access-Control-Allow-Headers": "origin, content-type, accept"
			    },
			    success: function(data) {
			    	if (data === "expTk"){
			    		localStorage.clear();
			    		auth(req);
			    	}else if(data === "warning"){
			    		modal('warnigSecure','views/warningSecure.html');
			    	}else{
			    		console.log(data);
			    	}
			    }
			});
			//return jqXHR.responseJSON[1];
		}else{
			auth(req);
		}
	}else{
		alert('Su browser no soporta el almacenamiento local, necesario para el correcto funcionamiento del sistema');
	}
}
function faceLogin(req){
	console.log('faceLogin '+req);
	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/es_LA/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	window.fbAsyncInit = function() {
		FB.init({
			appId      : '1413878928878484',
			xfbml      : true,
			version    : 'v2.7'
		});
		statusUser(req);
	};
	if(req != 'acces'){
		login(req);
	}
	function statusUser(req){  
		FB.getLoginStatus(function(response){  
			if (response.status === 'connected'){
				request(req);
				plus();
				modal('userDash','views/dashBoard.html');
			}else if(response.status === 'not_authorized'){
				modal('authModal','views/authorized.html');
			}else{
				$('#plusCont').append('<img id="plusLogIn" class="plus" src="style/img/fb.png">');
				$('#plusLogIn').click(function(){
					login();
				});
				localStorage.clear();
			} 
		}); 
	} 
	function login(req){  
		FB.login(function(response){ 
			if (response['status']  == "unknown"){
				modal('authModal','views/authorized.html');
			}else{
				statusUser(req);
			} 
			console.log('login '+response);	  
		},{scope: 'public_profile, user_likes, user_friends, email'});  
	}
}
$(document).ready(function(){ 
	faceLogin('acces');
});