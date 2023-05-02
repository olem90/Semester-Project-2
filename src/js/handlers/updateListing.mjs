import { getListing, updateListing } from "../api/listings/index.mjs";

export async function updateListingListener() {
    const form =  document.querySelector("#updateListing");

    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    if (form) {
        const button = form.querySelector("button");
        button.disabled = true;

        const listing = await getListing(id);

        form.tags.value = listing.tags;
        form.title.value = listing.title;
        form.media.value = listing.media;
        form.description.value = listing.description;
        button.disabled = false;

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const listing = Object.fromEntries(formData.entries());
            listing.id = id;
           
            //send to api
            if ( updateListing ) {
                updateListing(listing);

                setTimeout(function routeBack() {
                {
                    window.location.replace("/feed/listings.html");
                }
            },1000);          
            }                
        })
    } 
};





