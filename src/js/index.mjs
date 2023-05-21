import * as storage from "./storage/storage.mjs";
import * as listeners from "./handlers/index.mjs";
import * as listingMethods from "./api/listings/index.mjs";
import * as profileMethods from "./api/profiles/index.mjs";
import * as templates from "./templates/index.mjs";

const profileName = storage.load("profile");
const isLoggedIn = localStorage.getItem("token");

const path = location.pathname;
console.log(path);
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
    listeners.removeListingListener();
}

if( path === "/index.html") {
    //activeListingsTemplate();
    listingsSearchFilter();
}

if( path === "/listing/popularListings.html" || "/listing/popularlistings.html") {
    //SortedByHighestBidCountTemplate();
    SortedByPopularSearchFilter();
}

if ( path === "/listing/newestListings.html" || path === "/listing/newestlistings") {
    SortedByNewestTemplate();
    SortedByNewestSearchFilter();
}

if ( path === "/profile/profileListings/profileListings.html"){
    profileListingsTemplate();
    profileListingsSearchFilter();
}

if( path === "/profile/account.html" ) {
    accountTemplate();
}

 if ( path === "/listing/listing.html") {
     listingTemplate();
     listeners.getListingInfo();
}

if ( path === "/listing/listing.html" && isLoggedIn) {
    listeners.getListingInfo();
}

if ( path === "/profile/profileListings/specificProfileListing.html") {
    profileListingTemplate();
}

if ( path === "/listing/listing.html") {
       listeners.createBidListener();
}

async function accountTemplate() {
    if (isLoggedIn) {
        const profile = await profileMethods.getProfile(profileName.name);
    const profileContainer = document.querySelector("#accountInfo");
    templates.renderAccountTemplate(profile, profileContainer);
    }
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

 async function SortedByNewestTemplate() {
    const listing = await listingMethods.getActiveListings();
    const listingsContainer = document.querySelector("#newestListingsContainer");
    templates.renderListingTemplate(listing, listingsContainer);
 };

 async function listingsSearchFilter() {
    const listings = await listingMethods.getActiveListings();
    const listingsContainer = document.querySelector("#listingsContainer");
    templates.renderListingTemplates(listings, listingsContainer);

    const searchBar = document.querySelector(".searchInput");
    const searchForm = document.querySelector(".searchBar");

    searchBar.addEventListener('input', (event) => listeners.filterListings(event));
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        listeners.filterListings(event);
    });
  }

  async function profileListingsSearchFilter() {
    const profileListings = await profileMethods.getProfilesListings();
    const profileListingsContainer = document.querySelector("#profileListingsContainer");
    templates.renderProfileListingTemplates(profileListings, profileListingsContainer);

    const searchBar = document.querySelector(".searchInput");
    const searchForm = document.querySelector(".searchBar");

    searchBar.addEventListener('input', (event) => listeners.filterProfileListings(event));
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        listeners.filterProfileListings(event);
  })};

  async function SortedByNewestSearchFilter() {
    const listings = await listingMethods.getActiveListings();
    function sortListingsByNewest(a, b) {
        return new Date (b.created) - new Date (a.created);
      }
    const sortedListingsByNewest = listings.sort(sortListingsByNewest);
    const listingContainer = document.querySelector("#newestListingsContainer");
    templates.renderListingTemplates(sortedListingsByNewest, listingContainer);

    const searchBar = document.querySelector("#searchInput");
    const searchForm = document.querySelector(".searchBar");

    searchBar.addEventListener('input', (event) => listeners.filterNewlyListed(event));
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        listeners.filterNewlyListed(event);
  })}

  async function SortedByPopularSearchFilter() {
    const listings = await listingMethods.getActiveListings();
    function sortListingsByBids(a, b) {
        return b._count.bids - a._count.bids;
      }
    const sortedListingsByBids = listings.sort(sortListingsByBids);
    const listingContainer = document.querySelector("#activeListingsContainer");
    templates.renderListingTemplates(sortedListingsByBids, listingContainer);

    const searchBar = document.querySelector("#searchInput");
    const searchForm = document.querySelector(".searchBar");

    searchBar.addEventListener('input', (event) => listeners.filterPopularListings(event));
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        listeners.filterPopularListings(event);
  })
 };
 const accountContainer = document.querySelector("#accountContainer");

if (!profileName && accountContainer) {
    const accountContainer = document.querySelector("#accountContainer");

    accountContainer.innerHTML = `<div class="mx-auto d-flex justify-content-center p-5 flex-column text-light" id="loginMessage">
      <span class="w-100">Seems like you are not logged in.</span>
      <span>Log in <a class="fw-bold" href="/profile/login/login.html"> HERE </a> </span>
    </div>`;
} 

const loginButton = document.querySelector("#loginBtn");
const logoutButton = document.querySelector("#logoutBtn");

const loginLink = document.querySelector("#login-link");
const logoutLink = document.querySelector("#logout-link");

function userIsLoggedIn() {

    if(!isLoggedIn) {
        loginButton.style.display = "flex";
        logoutButton.style.display = "none";
    } else {
        loginLink.style.display = "none";
        logoutButton.style.display = "flex";
    }

    if (isLoggedIn) {
        loginButton.style.display = "none";
        
      
        logoutLink.addEventListener("click", () => {
          listeners.logoutUser();
        });
    } else {
        loginLink.style.display = "flex";
        logoutButton.style.display = "none";
    }
}

if ( path !== "/profile/login/login.html" ){
    userIsLoggedIn();
}

const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const navBarToggleBtn = document.querySelector("#navBarToggleBtn");

navBarToggleBtn.addEventListener("click", () => {
    if (!navBarToggleBtn.classList.contains("collapsed") && isLoggedIn) {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "flex";
    } else if (navBarToggleBtn.classList.contains("collapsed") && isLoggedIn) {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "none";
    }

    else if (!navBarToggleBtn.classList.contains("collapsed") && !isLoggedIn) {
        loginBtn.style.display = "flex";
        logoutBtn.style.display = "none";
    } else {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "none";
    }
})

if (!isLoggedIn && path === "/listing/listing.html") {
    const listingInfoSection = document.querySelector("#listingInfoSection");
    listingInfoSection.innerHTML = "";
    console.log(listingInfoSection);
}
console.log("yooolo");