import * as storage from "./storage/storage.mjs";
import * as listeners from "./handlers/index.mjs";
import * as listingMethods from "./api/listings/index.mjs";
import * as profileMethods from "./api/profiles/index.mjs";
import * as templates from "./templates/index.mjs";

const profileName = storage.load("profile");

const path = location.pathname;

if ( path === "/profile/register/register.html" ) {
    listeners.registerFormListener();
} 
if ( path === "/profile/login/login.html" ) {
    listeners.loginFormListener();
}
if ( path === "/listing/create/createListing.html") {
    listeners.createListingListener();
 }
 if ( path === "/profile/edit/edit.html") {
    listeners.updateProfileListener();
 }
if( path === "/feed/listings.html") {
    homeListingsTemplates();
 }
 if ( path === "/profile/myListings/myListings.html"){
    myListingsTemplate();
 }

 if( path === "/profile/account.html" ) {
    accountTemplate();
 }
 if ( path === "/listing/specificListing.html") {
    templates.specificListingTemplate();
 }
 
async function homeListingsTemplates() {
    const listings = await listingMethods.getListings();
    const container = document.querySelector("#listingsContainer");
    templates.renderListingTemplates(listings, container);
};

async function accountTemplate() {
    const profile = await profileMethods.getProfile(profileName.name);
    const profileContainer = document.querySelector("#accountInfo");
    templates.renderAccountTemplate(profile, profileContainer);
};

async function myListingsTemplate() {
    const profileListings = await profileMethods.getProfilesListings();
    const profileContainer = document.querySelector("#listingsContainer");
    templates.renderListingTemplates(profileListings, profileContainer);
};

// async function specificListingTemplate(id) {
//     const specificListing = await listingMethods.getListing(id);
//     const specificListingContainer = document.querySelector("#specificListing");
//     templates.renderCreateListingHTML(specificListing, specificListingContainer);
// };





