import { getListing, removeListing } from "../api/listings/index.mjs";

    export async function removeListingListener() {
        const removeListingBtn = document.querySelector("#deleteProfileListingBtn");
    
        const url = new URL(location.href);
        const id = url.searchParams.get("id");
        const listing = await getListing(id);
    
        removeListingBtn.addEventListener("click", (event) => {
            listing.id = id;
                
            //Send to API
            if (removeListing) {
                removeListing(id);

                setTimeout(function routeHome() {
                {
                    window.location.replace("/profile/profileListings/profileListings.html");               
                }          
                },1000);               
            }                          
        })      
    };
    
   