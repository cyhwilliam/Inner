


$("#h1").click(function(event) {
	/* Act on the event */
	$(this).parent('div').animate({top:'0'},500);
	$(this).delay(500).animate({left:'0px'}, 500);
	$('#signBar-container').delay(1000).animate({opacity:"1"}, 500);
			
	});




	$('#user-name').focus(function(event) {
		/* Act on the event */
		// $(this).children('p').css('display', 'block');
		$('#user-name + p ').css('display', 'block');
	});
	// $('#user-name').keyup(function(event) {
	// 	/* Act on the event */
		
	// });
	$('#user-name').blur(function(event) {
		/* Act on the event */
    	var   re =/[^\w\u4e00-\u9fa5]/g;
   		Length=getLength(this.value);
    	if(re.test(this.value)){
    		$('#user-name + p').css('color', 'red').html('请输入数字、英文字母和汉字');
    	}
    	else if(Length==0){
    		$('#user-name + p').css('color', 'red').html('这个空不能不输入呀');
    	}
    	else if(Length>20||Length<6){
    		$('#user-name + p').css('color', 'red').html('长度不能少于6个字节或者多于20个字节');
    	}
    	else{
    		$('#user-name + p').css('color', 'green').html('符合要求');
    	}
	});



	$('#email').focus(function(event) {
		/* Act on the event */
		$('#email + p ').css('display', 'block');
	});
	$('#email').blur(function(event) {
		/* Act on the event */
    	var   re =/[@]/g;
    	var   re2 = /[\.]/;
   		Length=getLength(this.value);
    	if(re.test(this.value)&&re2.test(this.value)){
    		$('#email + p').css('color', 'green').html('符合要求');
    	}
    	else{
    		$('#email + p').css('color', 'red').html('请按照xxx@example.com的格式来填写');
    	}
	});





	$('#password').focus(function(event) {
		/* Act on the event */
		$('#password + p ').css('display', 'block');

	});
	$('#password').blur(function(event) {
		/* Act on the event */
    	var   re =/[^\w\u4e00-\u9fa5]/g;
   		Length=getLength(this.value);
    	if(re.test(this.value)&&re2.test(this.value)){
    		$('#password + p').css('color', 'red').html('请输入数字、英文字母和汉字作为密码');
    	}
    	else if(Length<6||Length>20){
    		$('#password + p').css('color', 'red').html('密码不得少于6位或不能多于20位');
    	}
    	else{
    		$('#password + p').css('color', 'green').html('符合要求');
    		$('#password2').removeAttr('disabled');


    	}
	});


	$('#password2').focus(function(event) {
		/* Act on the event */
		$('#password2 + p ').css('display', 'block');
	});
	$('#password2').blur(function(event) {
		/* Act on the event */
    	var   re =/[^\w\u4e00-\u9fa5]/g;
   		Length=getLength(this.value);
    	if(this.value!=$('#password').val()){
    		$('#password2 + p').css('color', 'red').html('和第一次输入的密码不一致');
    		
    	}
    	else{
    		$('#password2 + p').css('color', 'green').html('符合要求');
    	}
	});

$(function(){
	var Length=0;
	});


// 中文正则表达式区间范围： \u4e00-\u9fa5
// /[^\w\u4e00-\u9fa5]/g

function getLength(str){
	return str.replace(/[^\x00-\xff]/g,'xx').length;
}
