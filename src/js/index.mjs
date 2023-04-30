import * as storage from "./storage/storage.mjs";
import * as listeners from "./handlers/index.mjs";
import * as listingMethods from "./api/listings/index.mjs";
import * as templates from "./templates/listing.mjs"

const profileName = storage.load("profile");

const path = location.pathname;

if ( path === "/profile/register/register.html" ) {
    listeners.registerFormListener();
} 
if ( path === "/profile/login/login.html" ) {
    listeners.loginFormListener();
}
if( path === "/feed/listings.html" ) {
    homeListingsTemplates();
 };

async function homeListingsTemplates() {
    const listings = await listingMethods.getListings();
    const container = document.querySelector("#listingsContainer");
    templates.renderListingTemplates(listings, container);
};



console.log(profileName);

