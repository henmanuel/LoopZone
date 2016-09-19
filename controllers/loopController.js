function modal(id,content){
	if ($("#"+id).length == 0){
		$('body').append('<div id="'+id+'" class="modal" ></div>');
		$.ajax({
			url:content,
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
				
				if($('#userDash').length > 0){
					$('#userDash').css('display','flex');
				}else{
					modal('userDash','views/dashBoard.html');
					$('#userDash').css('display','flex');
				}
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
function auth(req,condition){
	FB.api('/me?fields=id,name,email,birthday', function(response) {
		if(response.error){
			faceLogin(req,condition);
		}else{
			$.ajax({
			    url: "models/index.php",
			    type: "POST",
			    dataType: 'jsonp',
			    data: {id:response.id, name:response.name, email:response.email, birthday:response.birthday},
			    headers: {
			        "Access-Control-Allow-Origin": "*",
			        "Access-Control-Allow-Headers": "origin, content-type, accept"
			    },
			    success: function(data) {
			        localStorage['token']=data;
			        if (typeof(condition) !== "undefined"){
						request(req,condition);
			        }
			    }
			});
		}

	});
}
function request(req, condition){
	var datas = req.split('/');
	if (typeof(Storage) !== "undefined") {
		var token = localStorage['token'];
		if (typeof(token)  !== "undefined"){
			jqXHR = $.ajax({
			    url: "models/index.php",
			    type: datas[0],
			    dataType: 'jsonp',
			    async:false,
			    processData: true,
			    data: {tK:token,request:datas[1],condition:condition},
			    headers: {
			        "Access-Control-Allow-Origin": "*",
			        "Access-Control-Allow-Headers": "origin, content-type, accept"
			    },
			    success: function(data) {
			    	if (data === "expTk"){
			    		localStorage.clear();
			    		auth(req,condition);
			    		console.log(data);
			    	}else if(data === "warning"){
			    		modal('warnigSecure','Se detecto in intento de acceso incorrepto');
			    	}else{
			    		delete req,condition;
			    	}
			    },
				error: function (xhr,thrownError){
					//Tipo error
				}
			});
			return jqXHR.responseJSON;
		}else{
			auth(req);
		}
	}else{
		alert('Su browser no soporta el almacenamiento local, necesario para el correcto funcionamiento del sistema');
	}
}
function faceLogin(req,condition){
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
		login(req,condition);
	}
	function statusUser(req,condition){  
		FB.getLoginStatus(function(response){  
			if (response.status === 'connected'){
				request(req,condition);
				plus();
			}else if(response.status === 'not_authorized'){
				modal('authModal','views/authorized.html');
			}else{
				$('#plusCont').append('<img id="plusLogIn" class="plus" src="style/img/fb.png">');
				$('#plusLogIn').click(function(){
					login(req,condition);
				});
				localStorage.clear();
			} 
		}); 
	} 
	function login(req,condition){  
		FB.login(function(response){ 
			if (response['status']  == "unknown"){
				modal('authModal','views/authorized.html');
			}else{
				statusUser(req,condition);
			} 	  
		},{scope: 'public_profile, user_likes, user_friends, email'});  
	}
}
document.oncontextmenu = function(){return false;}
$(document).ready(function(){ 
	faceLogin('acces');
});