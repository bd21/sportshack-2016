'use strict';

var placeBetButton = document.getElementById('place-bet-button');
var signInButton = document.getElementById('sign-in-button');
var signOutButton = document.getElementById('sign-out-button');

var authRef = firebase.auth();

var email = 'joshuamielke@gmail.com';
var password = 'seattlesportshackathon';

function getData() {
  var data = $.ajax({
      url: 'http://localhost:8000/nfl-t1/2015/PST/1/SEA/MIN/pbp.json?api_key=kkapenthwjg6gh22f9yb64v6', 
      type: 'GET',
      dataType: 'json',
      success: function(response) {     
        console.log(response);
      },
      complete: function() {
        console.log('complete');
      }
  });
}

function createNewUser(email, password) {
  //Also signs the User in
  authRef.createUserWithEmailAndPassword(email, password);
  // Error Codes
  // auth/email-already-in-use
  // Thrown if there already exists an account with the given email address.
  // auth/invalid-email
  // Thrown if the email address is not valid.
  // auth/operation-not-allowed
  // Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.
  // auth/weak-password
  // Thrown if the password is not strong enough.
}

function signIn(email, password) {
  authRef.signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + errorMessage)
  });
}

function signOut() {
  authRef.signOut();
}

function onAuthStateChanged() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    } else {
      // No user is signed in.
    }
  });
}

function createBet(comp, cond1, cond2, time, isAccepted, isCompleted, opponentID, outcome, stat) {
  var userId = firebase.auth().currentUser.uid

  var betData = {
    Comparator: comp
    , UserID: userId
    , Condition1: cond1
    , Condition2: cond2
    , GameTime: time
    , IsAccepted: isAccepted
    , IsCompleted: isCompleted
    , Opponent: opponentID
    , Outcome: outcome
    , Statistic: stat
  };

  console.log(betData);

  var newBetKey = firebase.database().ref().child('Bets').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/Bets/' + newBetKey] = betData;
  updates['/User-Bets/' + userId + '/' + newBetKey] = betData;

  console.log("Attempting to update the firebase database...");

  return firebase.database().ref().update(updates);
}

// Bindings on load.
window.addEventListener('load', function() {
  // // Bind Sign in button.
  // signInButton.addEventListener('click', function() {
  //   signIn();
  // });

  // // Bind Sign out button.
  // signOutButton.addEventListener('click', function() {
  //   signOut();
  // });

  placeBetButton.addEventListener("click", function() {
    createBet("Russell", 1, 1, 1, 1, 1, 1, 1, 1);
  });

  // Listen for auth state changes
  firebase.auth().onAuthStateChanged(onAuthStateChanged);

}, false);

signIn(email, password);
getData();
