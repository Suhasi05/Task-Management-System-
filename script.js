$(document).ready(function() {
    $('#icon').click(function() {
        $('ul').toggleClass('show');
    })
});

var x=document.getElementById('login');
var y=document.getElementById('register');
var z=document.getElementById('btn');
var adminForm = document.getElementById('admin-login-form');

    function register()
    {
        x.style.left='-400px';
        y.style.left='50px';
        z.style.left='110px';
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('background-image').style.display = 'none';
        adminForm.style.display = 'none';
    }
    function login()
    {
        x.style.left='50px';
        y.style.left='450px';
        z.style.left='0px';
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('background-image').style.display = 'none';
        adminForm.style.display = 'none';
    }    
    function adminLogin() {
        adminForm.style.display = 'block';
        document.getElementById('login-form').style.display = 'none';       
        document.getElementById('background-image').style.display = 'none';
    }
    var modal = document.getElementById('login-form');
        window.onclick = function(event) 
        {
            if (event.target == modal) 
            {
                modal.style.display = "none";
            }
        }

// User name store
document.addEventListener("DOMContentLoaded", function () {
    var registerForm = document.getElementById("register");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            var username = document.getElementById("username").value;

            localStorage.setItem("username", username);
            console.log(localStorage.getItem);
        });
    }
});

function loginU() {
    var email = document.getElementById('emailL').value;
    window.location.href = 'user.html?email=' + email;
}

function registerL() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('registerEmail').value;
    var password = document.getElementById('registerPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    window.location.href = 'user.html';
}
