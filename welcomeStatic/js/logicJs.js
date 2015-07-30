/**
 * Created by ASUS_1 on 2015/6/28.
 */
function isEmpty(){
    var isUsernameEmpty = document.getElementById('username');
    var isPasswordEmpty = document.getElementById('password');
    if (!isUsernameEmpty != " "&&isPasswordEmpty == " ")
    {
        alert('请输入用户名或密码！');
    }
}