import {
  getAuth,
  //database
  connectDB,
  ref,
  get,
  set,
  child,
  update,
  remove,
} from "./firebaseinitialization.js";

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
// const userAuthUid = sessionStorage.getItem("userid<@#(1029384756)#@>");
// const userAuthExtra = JSON.parse(
//   sessionStorage.getItem("userEmail<@#(0192837465)#@>")
// );
const userAuthUid = getCookie("userid<@#(1029384756)#@>");
const userAuthExtra = JSON.parse(getCookie("userEmail<@#(0192837465)#@>"));

// const userLogindata = sessionStorage.getItem("LOgiN#@$%^&;;");

// console.log(userAuthEmailerified.emailVerified);
const reference = ref(connectDB);
//initial loader
const initialLoader = document.getElementById("overlayLoader");
// get Data and Check Login Verification---------------
//-----------------------functions--------------------------------------
function verifyUser(data) {
  if (data) {
    if (
      !data.uid == userAuthUid ||
      !data.uid == userAuthExtra.uid ||
      !data.UserLoggedIn == true ||
      !data.emailVerified == userAuthExtra.emailVerified
    ) {
      console.log("no data availBLe", data);
      location.replace("index.html");
    } else {
      IsAlreadyHaveProductId(data.uid);
      console.log("data avail", data);
      document.getElementById("uname").innerText = data.email;
    }
  } else {
    // location.replace("index.html");
    console.log("no data avail", data);
  }
}
// console.log(JSON.parse(localStorage.getItem("userEmail<@#(0192837465)#@>")));
function deleteCookie(name) {
  document.cookie = name + "=; Max-Age=0; path=/;";
}

function logout() {
  navigator.vibrate([100]);
  if (confirm("Are you Sure To Logout!")) {
    navigator.vibrate([50]);
    console.log("cleared");
    update(child(ref(connectDB), "users/" + userAuthExtra.uid), {
      UserLoggedIn: false,
    })
      .then(() => {
        location.replace("index.html");
        console.log("logged out");
        // localStorage.removeItem("userid<@#(1029384756)#@>");
        // localStorage.removeItem("userEmail<@#(0192837465)#@>");
        // sessionStorage.removeItem("userid<@#(1029384756)#@>");
        // sessionStorage.removeItem("userEmail<@#(0192837465)#@>");
        // sessionStorage.removeItem("LOgiN#@$%^&;;");
        deleteCookie("userid<@#(1029384756)#@>");
        deleteCookie("userEmail<@#(0192837465)#@>");
      })
      .catch((e) => {
        alert("something Went Wrong\nplease Try Again\nERROR:", e.code);
      });
  } else {
    navigator.vibrate([50]);
    // alert("you cancel the logout Process");
    // return;
  }
}
document.getElementById("logout").addEventListener("click", logout);
//uicheck
function uicheck(productid, data) {
  update(child(ref(connectDB), "products/" + productid), {
    uid: userAuthUid,
    mailid: userAuthExtra.email,
  })
    .then(() => {
      // location.replace(`/waterlevelUI/${data.ui}ui.html`);
      console.log("logged out");
      // localStorage.removeItem("userid<@#(1029384756)#@>");
      // localStorage.removeItem("userEmail<@#(0192837465)#@>");
    })
    .catch((e) => {
      alert("something Went Wrong\nplease Try Again\nERROR:", e.code);
    });
  update(child(ref(connectDB), "users/" + userAuthUid), {
    Regproductid: productid,
  })
    .then(() => {
      location.replace(
        `../water-level-indicator/waterlevelUI/${data.ui}ui.html`
      );
      // location.replace(
      //   `../waterlevelUI/${data.ui}ui.html`
      // );
      console.log("logged out");
      // localStorage.removeItem("userid<@#(1029384756)#@>");
      // localStorage.removeItem("userEmail<@#(0192837465)#@>");
    })
    .catch((e) => {
      alert("something Went Wrong\nplease Try Again\nERROR:", e.code);
    });
}
function productCheck() {
  navigator.vibrate([100]);
  let productid = prompt("Enter Your Product id");
  if (productid !== "" && productid.length == 8) {
    console.log(productid);
    get(child(reference, "products/" + productid))
      .then((snapshot) => {
        let data = snapshot.val();
        console.log(data.ui);
        if (data.Registered == true) {
          alert("Given Product id already registered with another account");
        } else {
          update(child(reference, "products/" + productid), {
            Registered: true,
          })
            .then(() => {
              uicheck(productid, data);
            })
            .catch((e) => {
              // alert("something Went Wrong\nplease Try Again\nERROR:", e.code);
            });
        }
      })
      .catch((e) => {
        alert("please enter a valid product id");
        console.log("error while fetching data", e);
        // location.replace("index.html");
      });
  } else {
    alert("please enter a valid product id");
    return productCheck();
  }
}
function IsAlreadyHaveProductId(uid) {
  get(child(reference, "users/" + uid))
    .then((snapshot) => {
      let data = snapshot.val();
      get(child(reference, "products/" + data.Regproductid))
        .then((snap) => {
          let pid = snap.val();
          location.replace(
            `../water-level-indicator/waterlevelUI/${pid.ui}ui.html`
          );
          // location.replace(
          //   `../waterlevelUI/${pid.ui}ui.html`
          // );
        })
        .catch((e) => {
          initialLoader.classList.add("d-none");

          console.log("error while fetching data IsAlreadyHaveProductId()", e);
          // location.replace("index.html");
        });
    })
    .catch((e) => {
      initialLoader.classList.add("d-none");

      console.log("error while fetching data", e);
      // location.replace("index.html");
    });
}

document.getElementById("product").addEventListener("click", productCheck);
//---------------------------------End functions------------------------------
//-----------------Get data From Firebase database--------------

function firebaseDB() {
  get(child(reference, "users/" + userAuthUid))
    .then((snapshot) => {
      let data = snapshot.val();
      console.log(data);

      verifyUser(data);
    })
    .catch((e) => {
      console.log("error while fetching data", e);
      // location.replace("index.html");
    });
}
firebaseDB();
