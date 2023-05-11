import { API_AUCTION_URL } from "../constants.mjs";
import { fetchWithToken } from "../authFetch.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const action = "/listings";
const method = "put";

export async function updateListing(listingData) {
    if ( !listingData.id ) {
        throw new Error("Updates requires an ID")
    }

    const titleInput = document.querySelector('input[name="title"]');
    const endsAtInput = document.querySelector('input[name="endsAt"]');
    const descriptionInput = document.querySelector('textarea[name="description"]');
    const tagsInput = document.querySelector('input[name="tags[]"]');
    const mediaInputs = document.querySelector('input[name="media[]"]');
    const mediaUrls = mediaInputs.value.split(",").map((url) => url.trim());

    const endsAt = new Date(endsAtInput.value);
    const formattedDate = endsAt.toISOString();
    
    const requestBody = {
        title: titleInput.value,
        endsAt: formattedDate,
        description: descriptionInput.value,
        tags: tagsInput.value.split(',').map(tag => tag.trim()),
        media: mediaUrls
};

    const updateListingURL = `${API_AUCTION_URL}${action}/${id}?_bids=true&_seller=true`;

    const response = await fetchWithToken( updateListingURL, {
        method,
        body: JSON.stringify(requestBody)
        
    })

    function updateListingResponse () {
        if (response.ok) {
            alert("Listing has been updated");
        } else {
            alert("ooops something went wrong");
        }
    } 
    updateListingResponse();
    
    return await response.json();
}
