import { API_AUCTION_URL } from "../constants.mjs";
import { fetchWithToken } from "../authFetch.mjs";

const action = "/listings";
const method = "post";

export async function createListing(listingData) {
   
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
    const createListingURL = API_AUCTION_URL + action; 
    
    const response = await fetchWithToken( createListingURL, {
        method,
        body: JSON.stringify(requestBody)
    })

    if ( !response.ok ) {
        alert("oooops. Looks like something went wrong");
    }

   return await response.json();
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

export async function createListingBid(bidAmount) {

    const createListingBidURL = `${API_AUCTION_URL}${action}/${id}/bids`; 
    const bidInput = document.querySelector('input[name="bidInput"]');
    const bidInputAmount = bidInput.value;
    const bidInputAmountToNumber = parseInt(bidInputAmount);

    const requestBody = {
        "amount": bidInputAmountToNumber
    }

    try {
        const response = await fetchWithToken( createListingBidURL, {
            method,
            body: JSON.stringify(requestBody)
        })

    if ( !response.ok ) {
        alert("oooops. Looks like something went wrong");
    } else if ( response.ok ) {
        alert("Your bid has been placed");
    }

    return await response.json();
    } catch {errors} 
}