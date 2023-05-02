import { API_AUCTION_URL } from "../constants.mjs";
import { fetchWithToken } from "../authFetch.mjs";

const action = "/listings";
const method = "post";

export async function createListing(listingData) {
   
    const titleInput = document.querySelector('input[name="title"]');
    const endsAtInput = document.querySelector('input[name="endsAt"]');
    const descriptionInput = document.querySelector('textarea[name="description"]');
    const tagsInput = document.querySelector('input[name="tags[]"]');
    const mediaInputs = document.querySelectorAll('input[name="media[]"]');
    const mediaUrls = Array.from(mediaInputs).map(input => input.value);

    const endsAt = new Date(endsAtInput.value);
    const formattedDate = endsAt.toISOString();
    
    const requestBody = {
      title: titleInput.value,
      endsAt: formattedDate,
      description: descriptionInput.value,
      tags: tagsInput.value.split(',').map(tag => tag.trim()),
      media: mediaUrls
};

    
    console.log(formattedDate);

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
