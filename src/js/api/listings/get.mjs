import { API_AUCTION_URL } from "../constants.mjs";
import { fetchWithToken } from "../authFetch.mjs";

const action = "/listings";

export async function getListings() {

    const getListingsURL = `${API_AUCTION_URL}${action}`;
    
    const response = await fetchWithToken(getListingsURL);

    const listings = await response.json();

    return listings;
};

export async function getListing(id) {
    if (!id) {
        throw new Error("GET requires a listingID");
    }
    const getListingURL = `${API_AUCTION_URL}${action}/${id}`;
    
    const response = await fetchWithToken( getListingURL );

    return await response.json();
};
