/**
 * Created by ASUS_1 on 2015/6/18.
 */
function getId(idname){
    var con = document.getElementById('contact');
    var abo = document.getElementById('introduce');
    var news = document.getElementById('whatnew');
    var log = document.getElementById('login');
    var contactpage = document.getElementById('contactPage');
    var aboutpage = document.getElementById('aboutPage');
    var newpage = document.getElementById('newPage');
    var loginpage = document.getElementById('loginPage');
    if(idname == con)
    {popAmination(contactpage)}
    else if(idname == abo)
    {popAmination(aboutpage)}
    else if(idname == news)
    {popAmination(newpage)}
    else if(idname == log)
    {popAmination(loginpage)}
}
var timer = null;
var oNavbar = document.getElementById('navbar');
function popAmination(objId) {
    oNavbar.style.animation = "hide 1s linear 0s  ";
    oNavbar.addEventListener("webkitAnimationEnd",function(){
        oNavbar.style.visibility = "hidden";
        showPage(objId,561)
    },false);//webkit
    oNavbar.addEventListener("mozAnimationEnd",function(){
        oNavbar.style.visibility = "hidden";
        showPage(objId,561)
    },false);//moz
    oNavbar.addEventListener("MSAnimationEnd",function(){
        oNavbar.style.visibility = "hidden";
        showPage(objId,561);
    },true);//ms
    oNavbar.addEventListener("oAnimationEnd",function(){
        oNavbar.style.visibility = "hidden";
        showPage(objId,561);
    },true);//opera
    oNavbar.addEventListener("animationend",function(){
        oNavbar.style.visibility = "hidden";
        showPage(objId,561);
    },true);//ie
}

function showPage(objId,iTarget){
    clearInterval(timer);
    var $objId = $(objId);
    var height = objId.offsetHeight;
    var bigContainer = document.getElementById('bigContainer');
    var imgTag = document.getElementById('logo');
    var $header1 = $('#headText');
    var $header2 = $('#headText1');
    var $header3 = $('#headText2');
    var $header4 = $('#headText3');
    timer = setInterval(
        function(){
            var speed = (iTarget-height);
            if(height <= 0)
            {
                clearInterval(timer);
                imgTag.style.visibility = "hidden";
                bigContainer.style.animation = "dark 0.5s linear 0s 1";
                bigContainer.addEventListener("webkitAnimationEnd",function(){
                    bigContainer.style.backgroundColor = " #2C2C2C";
                    bigContainer.style.opacity = "0.8";
                },true);//webkit
                bigContainer.addEventListener("mozAnimationEnd",function(){
                     bigContainer.style.backgroundColor = " #2C2C2C";
                    bigContainer.style.opacity = "0.8";
                },true);//moz
                bigContainer.addEventListener("MSAnimationEnd",function(){
                    bigContainer.style.backgroundColor = " #2C2C2C";
                    bigContainer.style.opacity = "0.8";
                },true);//ms
                bigContainer.addEventListener("oAnimationEnd",function(){
                    bigContainer.style.backgroundColor = " #2C2C2C";
                    bigContainer.style.opacity = "0.8";
                },true);//opera
                bigContainer.addEventListener("animationend",function(){
                    bigContainer.style.backgroundColor = " #2C2C2C";
                    bigContainer.style.opacity = "0.8";
                },true);//ie
                //$(".body").animo({animation:'blur'});
                $header1.animo({animation:"fadeInRight", duration: 0.4});
                $header2.animo({animation:"fadeInRight", duration: 0.4});
                $header3.animo({animation:"fadeInRight", duration: 0.4});
                $header4.animo({animation:"fadeInRight", duration: 0.4});
                showTxt();
            }
            height  = height-speed/17;
            objId.style.marginTop = height + 'px';
    },10);
}

function showTxt(){
    var $text = $('.contactText');
    var text  = document.getElementById('contactText');
    text.style.animation = "appear 3s "
}

function closeWindow(){
    var page = document.getElementById("loginPage");
    var narv = document.getElementById("navbar");
    var bigcontainer = document.getElementById('bigContainer');
    var imgTag = document.getElementById('logo');
    window.location.reload(true);
    page.style.visibility = "hidden";
    narv.style.visibility = "visible";
    bigcontainer.style.visibility = "hidden";
    imgTag.style.visibility = "visible";

}