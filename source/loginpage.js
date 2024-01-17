// // -------------showpassword Template--------------------

// let showpassword = (showpwdElId, styleclassElId) => {
//   var x = document.getElementById(`${showpwdElId}`);
//   document.getElementById(`${styleclassElId}`).classList.toggle("fa-eye-slash");
//   if (x.type === "password") {
//     // navigator.vibrate([50]);
//     x.type = "text";
//   } else {
//     // navigator.vibrate([50]);
//     x.type = "password";
//   }
// };

// //-----------------------------------------------------

// export { showpassword };
// document.getElementById("google-login").addEventListener("click", (e) => {
//   e.preventDefault();
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       const user = result.user;
//       console.log(token, user, credential);
//       // IdP data available using getAdditionalUserInfo(result)
//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });
// });

// const save = (uid, name, email, pwd, mailverification) => {
//   let userDataSetInFirebaseDatabase = firebase.database().ref("users/" + uid);

//   userDataSetInFirebaseDatabase.set({
//     UserName: name,
//     email: email,
//     password: pwd,
//     emailVerified: mailverification,
//   });
// };

// // save("3", "ivbd", "@gmail.nxisj", "whfyew", false);
// // const select = (uid) => {
// //   let dbref = ref(db);

// //   get(child(ref(dbref, "users/" + uid)))
// //     .then((snapshot) => {
// //       if (snapshot.exist()) {
// //         console.log("data selected ");
// //         console.log(snapshot.val().email, "data selected ");
// //       } else {
// //         console.log("no data found ");
// //       }
// //     })
// //     .catch((e) => {
// //       console.log("error");
// //     });
// //   // console.log(e);
// // };
