import { API_AUCTION_URL } from "../constants.mjs";
import { fetchWithToken } from "../authFetch.mjs";
import * as storage from "../../storage/storage.mjs";

const action = "/profiles";
const profileName = storage.load("profile");

export async function getProfiles() {

    const getProfilesURL = `${API_AUCTION_URL}${action}`
    const response = await fetchWithToken( getProfilesURL )
    return await response.json();
}

export async function getProfile(name) {
    if (!name) {
        throw new Error("GET requires a name")
    }
    const getProfileURL = `${API_AUCTION_URL}${action}/${name}`;
    const response = await fetchWithToken( getProfileURL )
    return await response.json();
}

export async function getProfileListing(name) {
    if (!name) {
        throw new Error("GET requires a name")
    }
    const getProfileListingURL = `${API_AUCTION_URL}${action}/${profileName.name}/listings?_bids=true&_seller=true`;
    const response = await fetchWithToken( getProfileListingURL )
    return await response.json();
}

export async function getProfilesListings() {
    
    const getProfilesListingsURL = `${API_AUCTION_URL}${action}/${profileName.name}/listings`;
    const response = await fetchWithToken( getProfilesListingsURL )
    return await response.json();
}
