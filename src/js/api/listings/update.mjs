import { API_AUCTION_URL } from "../constants.mjs";
import { fetchWithToken } from "../authFetch.mjs";

const action = "/listings";
const method = "put";

export async function updateListing(listingData) {
    if ( !listingData.id ) {
        throw new Error("Updates requires a postID")
    }

    const updateListingURL = `${API_AUCTION_URL}${action}/${listingData.id}`;
    
    const response = await fetchWithToken( updateListingURL, {
        method,
        body: JSON.stringify(listingData)
        
    })

    function updateListingResponse () {
        if (response.ok) {
            alert("Listing has been updated");
        } else {
            alert("You cannot update other users listings");
        }
    } 
    updateListingResponse();
    
    return await response.json();
}
