export function profileListingsTemplate(profileListingData) {
    const clickableListing = document.createElement("a");
    const listing = document.createElement("div");
    const title = document.createElement("strong");
    const description = document.createElement("p");
    const listingImage = document.createElement("img");
    const listingCard = document.createElement("div");
    const tags = document.createElement("span");
    const listingInfoContainer = document.createElement("div");
    const imageBackground = document.createElement("div");

    tags.classList.add("fs-6", "text-wrap", "listing-tags");
    listingCard.classList.add("listingCard", "w-100", "row");
    listingImage.classList.add("listings-img");
    title.classList.add("fs-6", "listing-title");
    description.classList.add("text-wrap", "w-100", "listings-description");
    title.innerText = profileListingData.title;
    description.innerText = profileListingData.description;
    listing.classList.add("my-3", "all-listings", "d-flex", "flex-column");
    tags.innerText = profileListingData.tags;
    listingInfoContainer.classList.add("listing-info", "mt-3");
    imageBackground.classList.add("image-background");
    clickableListing.classList.add("clickableListing", "text-decoration-none");

    clickableListing.appendChild(listingCard);
    listingCard.appendChild(listing);
    listing.appendChild(imageBackground);

    if (profileListingData.media) {
        const img = document.createElement("img");
        img.classList.add("listings-img");
        img.src = profileListingData.media;
        img.alt = `Image from ${profileListingData.title}`;
        img.loading = "lazy"; 
        imageBackground.appendChild(img);
    }

    listing.appendChild(listingInfoContainer);
    listingInfoContainer.appendChild(title);
    listingInfoContainer.appendChild(description);
    listingInfoContainer.appendChild(tags);

    clickableListing.addEventListener('click', (e) => {
        e.preventDefault(); 
        const listingId = profileListingData.id;
        const url = `/profile/profileListings/specificProfileListing.html?id=${listingId}&from=profile`;
        window.location.href = url;
      });
     
    return clickableListing; 
}
export function renderProfileListingTemplates(usersListingDataList, parent) {
    parent.append(...usersListingDataList.map(data => { 
       return profileListingsTemplate(data)
    }))
}

   