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
    listeners.removeListingListener();
}

if( path === "/feed/listings.html") {
    //activeListingsTemplate();
    listingsSearchFilter();
}

if( path === "/listing/popularListings.html" ) {
    //SortedByHighestBidCountTemplate();
    SortedByPopularSearchFilter();
}

if ( path === "/listing/newestListings.html") {
    // SortedByNewestTemplate();
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

if ( path === "/profile/profileListings/specificProfileListing.html") {
    profileListingTemplate();
}

if ( path === "/listing/listing.html") {
       listeners.createBidListener();
}

// async function listingsTemplates() {
//     const listings = await listingMethods.getListings();
//     const container = document.querySelector("#listingsContainer");
//     templates.renderListingTemplates(listings, container);
// };

// async function activeListingsTemplate() {
//     const activeListings = await listingMethods.getActiveListings();
//     const container = document.querySelector("#listingsContainer");
//     templates.renderListingTemplates(activeListings, container);
// };

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

//  async function SortedByHighestBidCountTemplate() {
//     const listings = await listingMethods.getActiveListings();
//     function sortListingsByBids(a, b) {
//         return b._count.bids - a._count.bids;
//       }
//     const sortedListingsByBids = listings.sort(sortListingsByBids);
//     const listingContainer = document.querySelector("#activeListingsContainer");
//     templates.renderListingTemplates(sortedListingsByBids, listingContainer);

//  };

//  async function SortedByNewestTemplate() {
//     const listings = await listingMethods.getActiveListings();
//     function sortListingsByNewest(a, b) {
//         return new Date (b.created) - new Date (a.created);
//       }
//     const sortedListingsByNewest = listings.sort(sortListingsByNewest);
//     const listingContainer = document.querySelector("#newestListingsContainer");
//     templates.renderListingTemplates(sortedListingsByNewest, listingContainer);
//  };

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

 function isAuthenticated() {
    if (!localStorage.getItem('token')) {
        const accountLink = document.querySelector("#accountLink");
        accountLink.addEventListener("click", () => {
            alert(`<div> 
            <span>You don't seem to have an account</span>
            <span>Log in <a href="/profile/login/login.html">HERE</a></span>
            
            </div>`)
        })
}};

//isAuthenticated();