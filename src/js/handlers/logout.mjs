import * as storage from "../storage/storage.mjs";

//const logoutButton = document.querySelector(".logoutBtn");

const path = location.pathname;

//if ( path === "/feed/listings.html" ) {
  // logoutButton.addEventListener('click', logoutUser);
//} 

function logoutUser(){
    const profile = localStorage.profile;
    const token = localStorage.token;

    storage.remove('token');
    storage.remove('profile');
};