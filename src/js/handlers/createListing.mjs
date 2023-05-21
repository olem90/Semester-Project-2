import { createListing } from "../api/listings/create.mjs";

export function createListingListener() {
    const form =  document.querySelector("#createListing");
    
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const listing = Object.fromEntries(formData.entries());
           
            //send to api          
            if (createListing) {
                createListing(listing);
                
                setTimeout(function routeHome() {
            {
                window.location.replace("/profile/profilelistings/profilelistings.html");                  
            }          
            },1000);
            }
        })
    }
};