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
	}else{
		$('#'+id).css('display','flex');
	}
}
function plus(){//objeto longPress
	var pressTimer;
	$('#plusCont').remove('#plusLogIn');
	$('#plusCont').append('<img id="plus" class="plus" src="style/img/plus.png">');
	$('#plus').mousedown(function(){
		pressTimer = window.setTimeout(function() {// evento longPress
			modal('userDash','dash del usuario');
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
function faceLogin(req){
	window.fbAsyncInit = function(){
		FB.init({
		appId      : '1413878928878484',
		xfbml      : true,
		version    : 'v2.7'
		});
		statusUser();
	};
	function statusUser(){  
		FB.getLoginStatus(function(response){  
			if (response.status === 'connected'){
				plus();
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
	function login(){  
		FB.login(function(response){ 
			if (response['status']  == "unknown"){
				modal('authModal','views/authorized.html');
			}else{
				statusUser();
			} 	  
		},{scope: 'public_profile, user_likes, user_friends, email'});  
	}
	(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/es_LA/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
}
$(document).ready(function(){ 
	faceLogin('acces');
});