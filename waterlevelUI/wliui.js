import {
  //database
  connectDB,
  ref,
  get,
  set,
  child,
  update,
  remove,
} from "../source/firebaseinitialization.js";

//initial loader
const initialLoader = document.getElementById("overlayLoader");
//water level div
const waterLevelDiv = document.getElementById("waterLevel");
//on/off button
const powerButton = document.querySelector(".power-button");
//auto mode on/off
const toggleButton = document.getElementById("toggleButton");

let isOn = false;
let productid, waterlevel;
//-----------------------functions------------------------------------
// Update water level based on slider value
function updateWaterLevel(level) {
  const percentage = Math.min(Math.max(level, 0), 100); // Limit the range between 0 and 100
  waterLevelDiv.style.height = percentage + "%";
  document.getElementById(
    "text"
  ).innerHTML = `<h2 style="font-family:sans-serif;">${percentage} %</h2>`;
}
//getproduct Data
function productData() {
  get(child(ref(connectDB), "products/" + productid))
    .then((snapshot) => {
      let data = snapshot.val();
      waterlevel = data.Waterlevel;
      updateWaterLevel(waterlevel);
      console.log(data.Waterlevel);
    })
    .catch((e) => {
      console.log("error while fetching data", e);
      // location.replace("index.html");
    });
}
//updatingWorkingmode
function updatingWorkingmode(AutoOrManual, manualbtnstatus) {
  update(child(ref(connectDB), "products/" + productid), {
    mode: AutoOrManual,
    pump: manualbtnstatus,
  })
    .then(() => {
      //   console.log(AutoOrManual);
    })
    .catch((e) => {
      console.log("something Went Wrong\nplease Try Again\nERROR:", e.code);
    });
}

//logout
function logout(userAuthExtra) {
  if (confirm("Are you Sure To Logout !\n  " + userAuthExtra.email)) {
    console.log("cleared");
    update(child(ref(connectDB), "users/" + userAuthExtra.uid), {
      UserLoggedIn: false,
    })
      .then(() => {
        location.replace("../index.html");
        console.log("logged out");
        // localStorage.removeItem("userid<@#(1029384756)#@>");
        // localStorage.removeItem("userEmail<@#(0192837465)#@>");
        sessionStorage.removeItem("userid<@#(1029384756)#@>");
        sessionStorage.removeItem("userEmail<@#(0192837465)#@>");
        sessionStorage.removeItem("LOgiN#@$%^&;;");
      })
      .catch((e) => {
        alert("something Went Wrong\nplease Try Again\nERROR:", e.code);
      });
  } else {
    // alert("you cancel the logout Process");
    return;
  }
}
///////////////////////////////////////////////////////////////////////////////
//-----------------------END  functions------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const userAuthUid = sessionStorage.getItem("userid<@#(1029384756)#@>");
  const userAuthExtra = JSON.parse(
    sessionStorage.getItem("userEmail<@#(0192837465)#@>")
  );
  //logout btn
  document.getElementById("logout").addEventListener("click", () => {
    logout(userAuthExtra);
  });

  if (userAuthUid !== null || userAuthExtra !== null) {
    if (userAuthUid == userAuthExtra.uid) {
      get(child(ref(connectDB), "users/" + userAuthUid))
        .then((snapshot) => {
          let dataL = snapshot.val();
          productid = dataL.Regproductid;
          console.log(dataL.Regproductid);
          productData();
          document.getElementById(
            "pid"
          ).innerHTML = `<i style="color:blue;">${productid}</i>`;
          initialLoader.classList.add("d-none");
        })
        .catch((e) => {
          console.log("error while fetching data wli", e);
          // location.replace("index.html");
        });
    } else {
      console.log("no data");
      alert("something Went Wrong...\nplease login again");
      location.replace("../mainpage.html");
      //redirect to indexpage or mainpage
    }
  } else {
    alert("something Went Wrong...\nplease login again..");
    location.replace("../index.html");
  }
});
// Set initial water level based on the slider's value

// Add a click event listener to the checkbox and toggle the class when clicked
toggleButton.addEventListener("click", function () {
  const slider = document.querySelector(".slider");
  const AutoOrManualToggle = document.getElementById("auto-manual");
  const manualControlBtn = document.getElementById("manual-control-btn");
  const btnstatus = document.getElementById("manual-status");
  slider.classList.toggle("active");
  if (slider.classList.contains("active")) {
    AutoOrManualToggle.innerHTML = "<b>AutoMode On</b>";
    updatingWorkingmode(true, "Null");
    manualControlBtn.setAttribute("disabled", "true");
    btnstatus.innerHTML = "Auto mode Enabled";
    powerButton.classList.remove("on", isOn);

    //   console.log(`The class name "${classNameToCheck}" exists on the element.`);
  } else {
    updatingWorkingmode(false, false);
    document.getElementById("manual-control-btn").removeAttribute("disabled");
    document.getElementById("auto-manual").innerHTML = "<b>AutoMode Off</b>";
    document.getElementById("manual-status").innerHTML = "off";

    //   console.log(`The class name "${classNameToCheck}" does not exist on the element.` );
  }
});
//power button
powerButton.addEventListener("click", () => {
  isOn = !isOn;
  powerButton.classList.toggle("on", isOn);
  if (powerButton.classList.contains("on")) {
    document.getElementById("manual-status").innerHTML = "On";
    updatingWorkingmode(false, true);
    // productData();
    //   console.log(`The class name "${classNameToCheck}" exists on the element.`);
  } else {
    updatingWorkingmode(false, false);
    document.getElementById("manual-control-btn").removeAttribute("disabled");
    document.getElementById("manual-status").innerHTML = "Off";

    //   console.log(`The class name "${classNameToCheck}" does not exist on the element.` );
  }
});

$(".navTrigger").click(function () {
  $(this).toggleClass("active");
  console.log("Clicked menu");
  $("#mainListDiv").toggleClass("show_list");
  $("#mainListDiv").fadeIn();
});

// Get the modal
var modal = document.getElementById("deviceModal");

// Get the button that opens the modal
var deviceLink = document.getElementById("device-list");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the "Devices" link, open the modal
deviceLink.onclick = function (event) {
  event.preventDefault(); // Prevent the default link behavior
  modal.style.display = "block"; // Show the modal
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none"; // Hide the modal
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none"; // Hide the modal
  }
};

setInterval(productData, 3000);
