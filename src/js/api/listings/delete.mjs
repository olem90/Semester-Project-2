import { API_AUCTION_URL } from "../constants.mjs";
import { fetchWithToken } from "../authFetch.mjs";

const action = "/listings";
const method = "delete";

export async function removeListing(id) {
    if ( !id ) {
        throw new Error("Delete requires a listingID")
    }

    const removeListingURL = `${API_AUCTION_URL}${action}/${id}`;
    
    const response = await fetchWithToken( removeListingURL, {
        method
    })

    function deleteListingResponse() {
        if (response.ok) {
            alert("Listing has been deleted");          
        } else {
            alert("Ooops looks like something went wrong");
        }
    } ;
    
    deleteListingResponse();

    return await response.json();
}
