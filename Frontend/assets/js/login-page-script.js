//Registration/Login form script and access to the backend

const login_btn = document.querySelector("#login-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container-login");

sign_up_btn.addEventListener("click", function () {
    container.classList.add("sign-up-mode");
});

login_btn.addEventListener("click", function () {
    container.classList.remove("sign-up-mode");
});



//--------------------Log In Password Show/Hide-------------------

const toggleLoginPassword = document.querySelector('#togglePasswordLogin');
const loginPasswordInput = document.querySelector('#login_password');

// toggle the type attribute
toggleLoginPassword.addEventListener('click', function (e) {
    const type = loginPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    loginPasswordInput.setAttribute('type', type);
});

// toggle the eye slash icon
const loginPasswordButton = document.querySelectorAll('ion-button')[0];
loginPasswordButton.addEventListener("click", () => {
    if (toggleLoginPassword.getAttribute('name') == 'eye-outline') {
        toggleLoginPassword.setAttribute('name', 'eye-off-outline');
    }
    else {
        toggleLoginPassword.setAttribute('name', 'eye-outline');
    }
});

//--------------------Sign Up Password Show/Hide-------------------

const toggleSignUpPassword = document.querySelector('#togglePasswordSignUp');
const signUpPasswordInput = document.querySelector('#signup_password');

// toggle the type attribute
toggleSignUpPassword.addEventListener('click', function (e) {
    const type = signUpPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    signUpPasswordInput.setAttribute('type', type);
});

// toggle the eye slash icon
const signUpPasswordButton = document.querySelectorAll("ion-button")[1];
signUpPasswordButton.addEventListener("click", () => {
    if (toggleSignUpPassword.getAttribute('name') == 'eye-outline') {
        toggleSignUpPassword.setAttribute('name', 'eye-off-outline');
    }
    else {
        toggleSignUpPassword.setAttribute('name', 'eye-outline');
    }
});








const signUpForm = document.getElementById('signup-btn');
signUpForm.addEventListener('click', signUpUser());

function signUpUser() {
    // Prevent the form from submitting and refreshing the page
    event.preventDefault();

    // Get sign up form input values
    var signUpUsername = document.getElementById('signup_username').value;
    var email = document.getElementById('signup_email').value;
    var signUpPassword = document.getElementById('signup_password').value;
    var fname = document.getElementById('signup_fname').value;
    var lname = document.getElementById('signup_lname').value;

    // Send a POST request to the /api/sign-up endpoint
    fetch('http://localhost:3000/api/sign-up', {
        method: 'POST',
        body: JSON.stringify({ signUpUsername, email, signUpPassword, fname, lname }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Handle the response data here
            insertUser(signUpUsername, email, signUpPassword, fname, lname);
        })
        .catch(error => {
            // Handle any errors that occur during the request
            console.error(error);
        });
}




const loginForm = document.getElementById('login-btn');
loginForm.addEventListener('submit', loginUser);

function loginUser(event) {
    // Prevent the form from submitting and refreshing the page
    event.preventDefault();

    // Get the login form input values
    var loginUsername = document.getElementById('login_username').value; console.log(loginUsername);
    var loginPassword = document.getElementById('login_password').value; console.log(loginPassword);

    // Send a POST request to the /api/login endpoint
    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        body: JSON.stringify({ loginUsername, loginPassword }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response data here
            console.log(data);
        })
        .catch(error => {
            // Handle any errors that occur during the request
            console.error(error);
        });
}
