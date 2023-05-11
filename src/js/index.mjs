import * as storage from "./storage/storage.mjs";
import * as listeners from "./handlers/index.mjs";
import * as listingMethods from "./api/listings/index.mjs";
import * as profileMethods from "./api/profiles/index.mjs";
import * as templates from "./templates/index.mjs";

const profileName = storage.load("profile");

const path = location.pathname;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

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

if ( path === "/listing/edit/editListing.html") {
    listeners.updateListingListener();
}

if( path === "/feed/listings.html") {
    homeListingsTemplates();
}

if ( path === "/profile/profileListings/profileListings.html"){
    profileListingsTemplate();
}

if( path === "/profile/account.html" ) {
    accountTemplate();
}

 if ( path === "/listing/listing.html") {
     listingTemplate() ;
     console.log("I am listingTemplate");
}

if ( path === "/profile/profileListings/specificProfileListing.html") {
    profileListingTemplate();
}
if ( path === "/listing/listing.html") {
        window.onload = () => {
       listeners.createBidListener();
};
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

async function profileListingsTemplate() {
    const profileListings = await profileMethods.getProfilesListings();
    const profileListingsContainer = document.querySelector("#profileListingsContainer");
    templates.renderProfileListingTemplates(profileListings, profileListingsContainer);
};

async function profileListingTemplate() {
    const profileListing = await profileMethods.getProfileListing(profileName.name);
    const profileListingContainer = document.querySelector("#specificProfileListingsContainer");
    templates.renderProfileListingTemplate(profileListing, profileListingContainer);
};

 async function listingTemplate() {
    const listing = await listingMethods.getListing(id);
    const listingContainer = document.querySelector("#listingContainer");
    templates.renderListingTemplate(listing, listingContainer);
 };






