import { API_AUCTION_URL } from "../constants.mjs";
import { fetchWithToken } from "../authFetch.mjs";
import* as storage from "../../storage/storage.mjs";

const action = "/profiles";

export async function getProfileListing(name) {
    if (!name) {
        throw new Error("GET requires a name")
    }
    const getProfileListingsURL = `${API_AUCTION_URL}${action}/${name}/listings`;
    
    const response = await fetchWithToken( getProfileListingsURL )

    return await response.json();
}

export async function getProfilesListings() {
    const profileName = storage.load("profile");

    const getProfilesListingsURL = `${API_AUCTION_URL}${action}/${profileName.name}/listings`;
  
    const response = await fetchWithToken( getProfilesListingsURL )

    return await response.json();
}
