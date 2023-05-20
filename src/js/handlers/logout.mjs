import * as storage from "../storage/storage.mjs";

const logoutButton = document.querySelector("#loginOutButton");

const path = location.pathname;

export function logoutUser(){
    const profile = localStorage.profile;
    const token = localStorage.token;

    storage.remove('token');
    storage.remove('profile');
};




