import { getActiveListings } from "../api/listings/get.mjs"; 
import { getProfilesListings } from "../api/profiles/get.mjs";
import * as templates from "../templates/index.mjs";

const path = location.pathname;
const searchBar = document.querySelector("#searchInput");
const listingsContainer = document.querySelector("#listingsContainer");
const profileListingsContainer = document.querySelector("#profileListingsContainer");
const searchForm = document.querySelector(".searchBar");
const newestListingsContainer =  document.querySelector("#newestListingsContainer")
const popularListingsContainer = document.querySelector("#activeListingsContainer");

export async function filterListings(event) {
    event.preventDefault();
    let filterValue = searchBar.value.toLowerCase();
    const listings = await getActiveListings();
    
    const filteredListings = listings.filter(
        (filteredListing) => {

            const title = filteredListing.title.toLowerCase();
            let description = "";
            if (filteredListing.description) {
                description = filteredListing.description.toLowerCase();
            }


            const tags = filteredListing.tags && filteredListing.tags.some((tag) =>
            tag.toLowerCase().includes(filterValue));

            return title.includes(filterValue) || description.includes(filterValue) || tags; 
        }
    );

    listingsContainer.innerHTML = "";
    templates.renderListingTemplates(filteredListings, listingsContainer);   
   
};

if ( path === "/feed/listings.html") {
    searchBar.addEventListener('input', (event) => filterListings(event));

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        filterListings(event);
    });

}

  export async function filterProfileListings(event) {
    event.preventDefault();
    let filterValue = searchBar.value.toLowerCase();
    const profileListings = await getProfilesListings();
    
    const filteredProfileListings = profileListings.filter(
        (filteredProfileListing) => {

            const title = filteredProfileListing.title.toLowerCase();

            let description = "";
            if (filteredProfileListing.description) {
                description = filteredProfileListing.description.toLowerCase();
            }

            const tags = filteredProfileListing.tags && filteredProfileListing.tags.some((tag) =>
            tag.toLowerCase().includes(filterValue));

            return title.includes(filterValue) || description.includes(filterValue) || tags; 
        }
    );

    profileListingsContainer.innerHTML = "";
    templates.renderListingTemplates(filteredProfileListings, profileListingsContainer);
   
};

export async function filterNewlyListed(event) {
    event.preventDefault();
    let filterValue = searchBar.value.toLowerCase();
    const newestListings = await getActiveListings();
    
    const filteredNewListings = newestListings.filter(
        (filteredNewListing) => {

            const title = filteredNewListing.title.toLowerCase();

            let description = "";
            if (filteredNewListing.description) {
                description = filteredNewListing.description.toLowerCase();
            }

            const tags = filteredNewListing.tags && filteredNewListing.tags.some((tag) =>
            tag.toLowerCase().includes(filterValue));

            return title.includes(filterValue) || description.includes(filterValue) || tags; 
        }
    );

    newestListingsContainer.innerHTML = "";
    templates.renderListingTemplates(filteredNewListings, newestListingsContainer);
   
};

export async function filterPopularListings(event) {
    event.preventDefault();
    let filterValue = searchBar.value.toLowerCase();
    const popularListings = await getActiveListings();
    
    const filteredPopularListings = popularListings.filter(
        (filteredPopularListing) => {

            const title = filteredPopularListing.title.toLowerCase();

            let description = "";
            if (filteredPopularListing.description) {
                description = filteredPopularListing.description.toLowerCase();
            }

            const tags = filteredPopularListing.tags && filteredPopularListing.tags.some((tag) =>
            tag.toLowerCase().includes(filterValue));

            
            return title.includes(filterValue) || description.includes(filterValue) || tags; 
        }
    );

    popularListingsContainer.innerHTML = "";
    templates.renderListingTemplates(filteredPopularListings, popularListingsContainer);
   
};