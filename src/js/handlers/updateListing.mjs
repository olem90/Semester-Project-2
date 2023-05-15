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
        //form.endsAt.valueAsDate = new Date(profileListing.endsAt);
        // form.endsAt.value = new Date(profileListing.endsAt).toISOString().slice(0, 16);

        button.disabled = false;

        console.log(profileListing.media)
        console.log(profileListing);

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const listing = Object.fromEntries(formData.entries());
            const mediaUrls = formData.getAll('media[]')[0].split(",").map(url => url.trim());
            listing.id = id;

            console.log(mediaUrls); 
           
            console.log('data sent to API:', listing);

            //send to api
            try {
                if ( updateListing ) {
                    updateListing(listing);
        
                    setTimeout(function routeBack() {
                    {
                        window.location.replace("/profile/profileListings/specificProfileListing.html" + `?id=${id}`);
                    }
                    },1000);          

            }
            
            }  catch (error) {
                console.error(error);
              }        
        })
    } 
};





