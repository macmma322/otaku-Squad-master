// Cache DOM elements
const container = document.querySelector(".container-login");
const signUpForm = document.getElementById("sign-up-form-id");
const loginForm = document.getElementById("login-form-id");

//--------------------Log In Password Show/Hide-------------------

const toggleLoginPassword = document.querySelector("#togglePasswordLogin");
const loginPasswordInput = document.querySelector("#login_password");

// toggle the type attribute
toggleLoginPassword.addEventListener("click", function (e) {
  const type =
    loginPasswordInput.getAttribute("type") === "password"
      ? "text"
      : "password";
  loginPasswordInput.setAttribute("type", type);
});

// toggle the eye slash icon with a blinking effect
toggleLoginPassword.classList.add("blink"); // Add the 'blink' class initially
setTimeout(() => {
  toggleLoginPassword.classList.remove("blink");
}, 1000);

const loginPasswordButton = document.querySelectorAll("ion-button")[0];
loginPasswordButton.addEventListener("click", () => {
  toggleLoginPassword.classList.add("blink");
  setTimeout(() => {
    if (toggleLoginPassword.getAttribute("name") == "eye-outline") {
      toggleLoginPassword.setAttribute("name", "eye-off-outline");
    } else {
      toggleLoginPassword.setAttribute("name", "eye-outline");
    }
  }, 500); // Change the name in the middle of the animation
  setTimeout(() => {
    toggleLoginPassword.classList.remove("blink");
  }, 1000);
});

//--------------------Sign Up Password Show/Hide-------------------

const toggleSignUpPassword = document.querySelector("#togglePasswordSignUp");
const signUpPasswordInput = document.querySelector("#signup_password");

// toggle the type attribute
toggleSignUpPassword.addEventListener("click", function (e) {
  const type =
    signUpPasswordInput.getAttribute("type") === "password"
      ? "text"
      : "password";
  signUpPasswordInput.setAttribute("type", type);
});

// toggle the eye slash icon with a blinking effect
toggleSignUpPassword.classList.add("blink"); // Add the 'blink' class initially
setTimeout(() => {
  toggleSignUpPassword.classList.remove("blink");
}, 1000);

const signUpPasswordButton = document.querySelectorAll("ion-button")[1];
signUpPasswordButton.addEventListener("click", () => {
  toggleSignUpPassword.classList.add("blink");
  setTimeout(() => {
    if (toggleSignUpPassword.getAttribute("name") == "eye-outline") {
      toggleSignUpPassword.setAttribute("name", "eye-off-outline");
    } else {
      toggleSignUpPassword.setAttribute("name", "eye-outline");
    }
  }, 500); // Change the name in the middle of the animation
  setTimeout(() => {
    toggleSignUpPassword.classList.remove("blink");
  }, 1000);
});

//--------------------Sign Up Repeated Password Show/Hide-------------------

const toggleSignUpPassword2 = document.querySelector("#togglePasswordSignUp2");
const signUpPasswordInput2 = document.querySelector("#signup_password_2");

// toggle the type attribute
toggleSignUpPassword2.addEventListener("click", function (e) {
  const type =
    signUpPasswordInput2.getAttribute("type") === "password"
      ? "text"
      : "password";
  signUpPasswordInput2.setAttribute("type", type);
});

// toggle the eye slash icon with a blinking effect
toggleSignUpPassword2.classList.add("blink"); // Add the 'blink' class initially
setTimeout(() => {
  toggleSignUpPassword2.classList.remove("blink");
}, 1000);

const signUpPasswordButton2 = document.querySelectorAll("ion-button")[2];
signUpPasswordButton2.addEventListener("click", () => {
  toggleSignUpPassword2.classList.add("blink");
  setTimeout(() => {
    if (toggleSignUpPassword2.getAttribute("name") == "eye-outline") {
      toggleSignUpPassword2.setAttribute("name", "eye-off-outline");
    } else {
      toggleSignUpPassword2.setAttribute("name", "eye-outline");
    }
  }, 500); // Change the name in the middle of the animation
  setTimeout(() => {
    toggleSignUpPassword2.classList.remove("blink");
  }, 1000);
});

// Event delegation for sign-up and login buttons
container.addEventListener("click", (event) => {
  if (event.target.id === "sign-up-btn") {
    container.classList.add("sign-up-mode");
  } else if (event.target.id === "login-btn") {
    container.classList.remove("sign-up-mode");
  }
});

signUpForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission
  signUpUser(); // Call the signUpUser function
});

function signUpUser() {
  // Get sign-up form input values
  const signUpUsername = document.getElementById("signup_username").value;
  const email = document.getElementById("signup_email").value;
  const signUpPassword = document.getElementById("signup_password").value;
  const signUpPassword2 = document.getElementById("signup_password_2").value;
  const fname = document.getElementById("signup_fname").value;
  const lname = document.getElementById("signup_lname").value;

  if (signUpPassword !== signUpPassword2) {
    alert("Passwords do not match");
    return;
  }

  // Send a POST request to the /api/sign-up endpoint
  const userData = {
    username: signUpUsername,
    email,
    password: signUpPassword,
    fname,
    lname,
  };

  fetch("http://localhost:3000/api/sign-up", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Handle the response data here
      // You can redirect the user or perform other actions as needed
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error(error);
    });
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission
  loginUser(); // Call the loginUser function
});

function loginUser() {
  // Get the login form input values
  const loginUsername = document.getElementById("login_username").value;
  const loginPassword = document.getElementById("login_password").value;

  // Display a loading message or spinner while waiting for the server response
  // This informs the user that their request is being processed
  // You can update this part to match your application's UI.
  const statusMessage = document.getElementById("status_message");
  statusMessage.textContent = "Logging in...";

  // Send a POST request to the /api/login endpoint
  const loginData = {
    username: loginUsername,
    password: loginPassword,
  };

  fetch("http://localhost:3000/api/login", {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include cookies in the request
  })
    .then((response) => {
      if (response.redirected) {
        // Handle redirection here
        window.location.href = response.url;
      } else {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data); // Handle the response data here
      if (data.user) {
        // User is successfully logged in
        statusMessage.textContent = "Login successful";
        // You should be redirected via the fetch response handling
      } else {
        // User login failed
        // Display an error message to the user
        statusMessage.textContent =
          "Login failed. Please check your credentials.";
      }
    })
    .catch((error) => {
      if (error instanceof SyntaxError) {
        // This error occurs when the response is not valid JSON
        console.error("Response is not valid JSON:", error);
        statusMessage.textContent = "Invalid response from the server.";
      } else if (error.response) {
        // The server returned a response with a status code
        if (error.response.status === 401) {
          statusMessage.textContent = "Invalid credentials. Please try again.";
        } else if (error.response.status === 500) {
          statusMessage.textContent = "Server error. Please try again later.";
        } else {
          // Handle other specific status codes as needed
          console.error("Unhandled status code:", error.response.status);
        }
      } else {
        // Other errors, including network issues
        console.error(error);
        statusMessage.textContent =
          "An error occurred. Please try again later.";
      }
    });
}
