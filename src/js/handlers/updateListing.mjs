import {updateListing, getListing} from "../api/listings/index.mjs";

export async function updateListingListener() {
    const form =  document.querySelector("#updateListing");

    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    if (form) {
        const button = form.querySelector("button");
        button.disabled = true;

        const profileListing = await getListing(id);
        
        form.tags.value = profileListing.tags;
        form.title.value = profileListing.title;
        form.media.value = profileListing.media.join(',');
        form.description.value = profileListing.description;

        button.disabled = false;

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const listing = Object.fromEntries(formData.entries());
            const mediaUrls = formData.getAll('media[]')[0].split(",").map(url => url.trim());
            listing.id = id;

            try {
                if ( updateListing ) {
                    updateListing(listing);
        
                    setTimeout(function routeBack() {
                    {
                        window.location.replace("/profile/profileListings/specificProfileListing.html" + `?id=${id}`);
                    }
                    },1000);          

            }
            
            } catch (error) {
                console.error(error);
            }        
        })
    } 
};





