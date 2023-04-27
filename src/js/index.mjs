import * as storage from "./storage/storage.mjs";
import * as listeners from "./handlers/index.mjs";

const profileName = storage.load("profile");

const path = location.pathname;

if ( path === "/profile/register/register.html" ) {
    listeners.registerFormListener();
} 
if ( path === "/profile/login/login.html" ) {
    listeners.loginFormListener();
}

console.log(profileName);
