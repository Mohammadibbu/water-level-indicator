//  Firebase configuration with project's configuration
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  //database
  connectDB,
  ref,
  get,
  set,
  child,
  update,
  remove,
} from "./source/firebaseinitialization.js";
//firebase auth init

const auth = getAuth();
const provider = new GoogleAuthProvider();

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null; // Return null if not found
}

window.onload = () => {
  // const userAuthUid = sessionStorage.getItem("userid<@#(1029384756)#@>");
  // const userAuthExtra = JSON.parse(
  //   sessionStorage.getItem("userEmail<@#(0192837465)#@>")
  // );
  // sessionStorage.removeItem("userid<@#(1029384756)#@>");
  // sessionStorage.removeItem("userEmail<@#(0192837465)#@>");
  if (
    getCookie("userid<@#(1029384756)#@>") &&
    getCookie("userEmail<@#(0192837465)#@>")
  ) {
    // console.log("get DB");
    location.replace("mainpage.html");
    return;
  }

  // if (userAuthUid && userAuthExtra) {
  //   location.replace("mainpage.html");
  // } else {
  //   return;
  // }
};
// -------------showpassword Template--------------------

let showpassword = (showpwdElId, styleclassElId) => {
  var x = document.getElementById(`${showpwdElId}`);

  document.getElementById(`${styleclassElId}`).classList.toggle("fa-eye-slash");
  if (x.type === "password") {
    // navigator.vibrate([50]);
    x.type = "text";
  } else {
    // navigator.vibrate([50]);
    x.type = "password";
  }
};
//clear all session storage
// window.onload = ;
//---------------------showpassword template------------------------------------

function showAlert(message, type) {
  const alertContainer = document.getElementById("alertContainer");
  const alertElement = document.createElement("div");
  alertElement.className = `alert alert-${type} alert-custom alert-dismissible fade show`;
  alertElement.role = "alert";
  // Define icons based on type
  const icons = {
    error: "bi bi-x-circle",
    successful: "bi bi-check-circle",
    information: "bi bi-info-circle",
    warn: "bi bi-exclamation-triangle",
  };

  alertElement.innerHTML = `
    <i class="${icons[type]} alert-icon"></i>
    ${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>`;

  alertContainer.appendChild(alertElement);

  // Automatically remove the alert after a few seconds
  setTimeout(() => {
    $(alertElement).alert("close");
  }, 5000);
}
//---------------------switch signup and login form------------
document
  .querySelector(".signup-link a")
  .addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".login-form").style.display = "none";
    document.querySelector(".signup-form").style.display = "block";
  });

document.querySelector(".login-link a").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".login-form").style.display = "block";
  document.querySelector(".signup-form").style.display = "none";
});
//--------------------------------------------------------------------------
// firebase realtime data base----------------------

const save = (uid, name, email, pwd, mailverification, loginValue) => {
  set(ref(connectDB, "users/" + uid), {
    uid: uid,
    UserName: name,
    email: email,
    password: pwd,
    emailVerified: mailverification,
    UserLoggedIn: loginValue,
  })
    .then(() => {
      console.log("successfully sent sign up data");
    })
    .catch((e) => {
      console.error("un success", e);
    });
};
// ------------------------------------------------------------
// Login form
var loginForm = document.getElementById("login-form");
var loginForm_btn = document.getElementById("login-btn");
var loginEmail = document.getElementById("login-email");
var loginPassword = document.getElementById("login-password");

// var LoginWithGoogle = document.getElementById("google-login");
//google provider log in--------------------------------
//add Display:None for err message template
function add_none(WhichELPerformEventListener, whereTOAddclass) {
  WhichELPerformEventListener.addEventListener("focus", () => {
    whereTOAddclass.classList.add("d-none");
  });
}
//button disable and enable Code Here.....----------------
function btnDisableOrEnable(Element) {
  if (!Element.hasAttribute("disabled")) {
    Element.setAttribute("disabled", "true");
    Element.style.cursor = "not-allowed";
  } else {
    Element.removeAttribute("disabled");
    Element.style.removeProperty("cursor");
  }
}

//funtion setEmail verify
function setEmailVerify(data, refid) {
  //update data emailverified==true....
  !data.emailVerified == true
    ? update(child(ref(connectDB), "users/" + refid), {
        emailVerified: true,
      })
        .then(() => {
          console.log("send verified");
        })
        .catch((e) => {
          alert(e);
        })
    : console.warn("mailid already verified true");
}
// ---------------------------------------------------------

//login with google......
// LoginWithGoogle.addEventListener("click", (e) => {
//   e.preventDefault();
//   navigator.vibrate([100]);

//   //when click the button BUtton will disabled
//   btnDisableOrEnable(loginForm_btn);
//   btnDisableOrEnable(LoginWithGoogle);
//   loginForm_btn.children[0].classList.add("fa-spinner", "fa-spin");
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       loginForm_btn.children[0].classList.remove("fa-spinner", "fa-spin");
//       btnDisableOrEnable(loginForm_btn);
//       btnDisableOrEnable(LoginWithGoogle);

//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       const user = result.user;
//       // console.log(token);

//       loginError.innerHTML = `<div class="alert" style="background-color: #53f877 !important;" >Login Successfully...<i class="fa fa-spinner fa-spin"></i></div>`;
//       // localStorage.setItem("userid<@#(1029384756)#@>", result.user.uid);
//       // localStorage.setItem(
//       //   "userEmail<@#(0192837465)#@>",
//       //   JSON.stringify(result.user)
//       // );
//       sessionStorage.setItem("userid<@#(1029384756)#@>", result.user.uid);
//       sessionStorage.setItem(
//         "userEmail<@#(0192837465)#@>",
//         JSON.stringify(result.user)
//       );
//       // sessionStorage.setItem("LOgiN#@$%^&;;", true);
//       save(
//         user.uid,
//         user.displayName,
//         user.email,
//         "Login with google",
//         user.emailVerified,
//         true
//       );
//       setTimeout(() => {
//         location.replace("mainpage.html");
//       }, 1500);

//       // console.log("user name", user.displayName);
//       // console.log("user details", user);
//       // console.log("user mail", user.email);
//       // console.log("user verified", user.emailVerified);
//       // console.log("user pic", user.photoURL);
//       console.log("user credential", credential);
//       // IdP data available using getAdditionalUserInfo(result)
//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       btnDisableOrEnable(loginForm_btn);
//       btnDisableOrEnable(LoginWithGoogle);
//       loginForm_btn.children[0].classList.remove("fa-spinner", "fa-spin");

//       switch (error.code) {
//         case "auth/popup-closed-by-user":
//         case "auth/cancelled-popup-request":
//             showAlert("Something went wrong! Please try again.", "error");
//             break;
//         case "auth/popup-blocked":
//             showAlert( "error", "Your browser may block the pop-up.");
//             break;
//         default:
//             showAlert(error.message, "error");
//             break;
//     }
//       console.error(error.code);
//       // const errorCode = error.code;
//       // const errorMessage = error.message;
//       // The email of the user's account used.
//       // const email = error.customData.email;
//       // The AuthCredential type that was used.
//       // const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });
// });

//perform login form action
loginForm_btn.addEventListener("click", (e) => {
  e.preventDefault();
  navigator.vibrate([100]);

  btnDisableOrEnable(loginForm_btn);
  // btnDisableOrEnable(LoginWithGoogle);
  loginForm_btn.children[0].classList.add("fa-spinner", "fa-spin");
  let email = loginEmail.value;
  let password = loginPassword.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userdetails) => {
      loginForm_btn.children[0].classList.remove("fa-spinner", "fa-spin");
      btnDisableOrEnable(loginForm_btn);
      // btnDisableOrEnable(LoginWithGoogle);
      console.log("new", auth.currentUser);

      if (!userdetails.user.emailVerified) {
        alert(
          "Please verify your email otherwise,you will not be able to login"
        );
        // console.log(userdetails.user.email);
        if (
          confirm(
            "if you want to send mail verification for\n" +
              userdetails.user.email
          )
        ) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              alert("Verification Mail Sent Successfully!");
            })
            .catch((e) => {
              console.log(
                "something went wrong in while sending verification mail",
                e
              );
            });
        } else {
          console.warn("user denied to send  mail verification..");
          alert("If already sent please check your mail id");
        }
      } else {
        showAlert("Login Successfully...", "successful");
        navigator.vibrate([100, 50, 100]);

        // sessionStorage.setItem(
        //   "userid<@#(1029384756)#@>",
        //   userdetails.user.uid
        // );
        // sessionStorage.setItem(
        //   "userEmail<@#(0192837465)#@>",
        //   JSON.stringify(userdetails.user)
        // );
        // sessionStorage.setItem("LOgiN#@$%^&;;", true);
        // Function to set a cookie
        function setCookie(name, value, days) {
          var expires = "";
          if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
          }
          document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }

        // Setting cookies with the same functionality
        setCookie("userid<@#(1029384756)#@>", userdetails.user.uid, 7); // Expires in 7 days
        setCookie(
          "userEmail<@#(0192837465)#@>",
          JSON.stringify(userdetails.user),
          7
        );
        setCookie("LOgiN#@$%^&;;", true, 7);

        //set mail verified
        get(child(ref(connectDB), "users/" + userdetails.user.uid))
          .then((snapshot) => {
            let data = snapshot.val();
            setEmailVerify(data, userdetails.user.uid);
          })
          .catch((e) => {
            console.error("error while fetching data", e);
          });
        //Login auth userLogged in or not
        update(child(ref(connectDB), "users/" + userdetails.user.uid), {
          UserLoggedIn: true,
        })
          .then(() => {
            console.log("login");
          })
          .catch((e) => {
            alert(e);
          });
        setTimeout(() => {
          location.replace("mainpage.html");
        }, 1500);
      }
    })
    .catch((e) => {
      // Handle login errors
      loginForm_btn.children[0].classList.remove("fa-spinner", "fa-spin");
      btnDisableOrEnable(loginForm_btn);
      // btnDisableOrEnable(LoginWithGoogle);
      navigator.vibrate([100, 50, 100]);

      console.error(e);
      if (email === "" || password === "") {
        showAlert("Please fill all required fields", "error");
      } else {
        switch (e.code) {
          case "auth/invalid-email":
            showAlert("Invalid email ID", "error");
            break;
          case "auth/user-disabled":
            showAlert(
              "Your account has been suspended. Please contact admin.",
              "error"
            );
            break;
          case "auth/user-not-found":
            showAlert(
              "No user found with this email ID. Please sign up.",
              "error"
            );
            break;
          case "auth/wrong-password":
            showAlert("Wrong password", "error");
            break;
          case "auth/network-request-failed":
            showAlert("Login failed due to network issue", "error");
            break;
          case "auth/too-many-requests":
            showAlert("Too many requests. Please try again later.", "error");
            break;
          case "auth/invalid-login-credentials":
            showAlert("Invalid credentials", "error");
            break;
          default:
            showAlert(e.message, "error");
            break;
        }
      }
    });
});

//------------showpassword Process Here-------------------
const showpwd = document.getElementById("login-showpwd");
const signUpShowpwd = document.getElementById("signup-showpwd");
const signUpConfirmShowpwd = document.getElementById("signupCnfrm-showpwd");

showpwd.addEventListener("click", (e) => {
  e.preventDefault();
  navigator.vibrate([50]);

  showpassword("login-password", "eye-1");
});
signUpShowpwd.addEventListener("click", (e) => {
  e.preventDefault();
  navigator.vibrate([50]);

  showpassword("signup-pwd", "eye-2");
});
signUpConfirmShowpwd.addEventListener("click", (e) => {
  e.preventDefault();
  navigator.vibrate([50]);

  showpassword("confirm-password", "eye-3");
});
// ------------------------------------------------------------

// Sign up form

var signupForm = document.getElementById("signup-form");
var signupName = document.getElementById("signup-name");
var signupEmail = document.getElementById("signup-mail");
var signupPassword = document.getElementById("signup-pwd");
var signupConfirmPassword = document.getElementById("confirm-password");
var signupError = document.getElementById("signup-error");
let signup_btn = document.getElementById("signup_btn");

// signup process done here...
signup_btn.addEventListener("click", function (event) {
  navigator.vibrate([100]);

  event.preventDefault();

  btnDisableOrEnable(signup_btn);

  signup_btn.children[0].classList.add("fa-spinner", "fa-spin");
  // store data in firebase database...............
  var name = signupName.value;
  var email = signupEmail.value;
  var password = signupPassword.value;
  var confirmPassword = signupConfirmPassword.value;

  // Add validation logic for password and confirm password match
  if (password !== confirmPassword) {
    navigator.vibrate([100, 50, 100]);
    showAlert("Password do not Match", "error");
    signup_btn.children[0].classList.remove("fa-spinner", "fa-spin");
    btnDisableOrEnable(signup_btn);
  } else if (
    name === "" ||
    email === "" ||
    confirmPassword === "" ||
    password === ""
  ) {
    navigator.vibrate([100, 50, 100]);
    showAlert("*Please fill all Required fields", "error");

    signup_btn.children[0].classList.remove("fa-spinner", "fa-spin");
    btnDisableOrEnable(signup_btn);
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userdetails) => {
        // Sign up successful, redirect or perform additional actions
        signup_btn.children[0].classList.remove("fa-spinner", "fa-spin");
        btnDisableOrEnable(signup_btn);
        navigator.vibrate([200, 100, 300]);

        console.log(userdetails.user.email);
        console.log(auth.currentUser);
        sendEmailVerification(auth.currentUser)
          .then(() => {
            alert("Verification Mail Sent Successfully!");
          })
          .catch((e) => {
            console.error("error occur in signup verification mail", e);
          });
        save(
          userdetails.user.uid,
          name,
          userdetails.user.email,
          password,
          userdetails.user.emailVerified,
          false
        );

        showAlert("sign up successfully", "successful");
        setTimeout(() => {
          signupForm.reset();
          document.querySelector(".login-form").style.display = "block";
          document.querySelector(".signup-form").style.display = "none";
        }, 2000);
      })
      .catch(function (e) {
        // Handle sign up errors
        console.error(e);
        signup_btn.children[0].classList.remove("fa-spinner", "fa-spin");
        btnDisableOrEnable(signup_btn);
        navigator.vibrate([100, 50, 100]);
        switch (e.code) {
          case "auth/network-request-failed":
            showAlert("Login failed due to network issue", "error");
            break;
          case "auth/email-already-in-use":
            showAlert("Email ID already exists", "error");
            break;
          case "auth/invalid-email":
            showAlert("Invalid email ID", "error");
            break;
          default:
            showAlert(e.message, "error");
            break;
        }
      });
  }
});
