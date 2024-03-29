export function listingsTemplate(listingData) {
    const clickable = document.createElement("a");
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
    title.innerText = listingData.title;
    description.innerText = listingData.description;
    listing.classList.add("my-3", "all-listings", "d-flex", "flex-column");
    tags.innerText = listingData.tags;
    listingInfoContainer.classList.add("listing-info", "mt-3");
    imageBackground.classList.add("image-background");
    clickable.classList.add("clickableListings", "text-decoration-none");

    clickable.appendChild(listingCard);
    listingCard.appendChild(listing);
    listing.appendChild(imageBackground);

    if (listingData.media) {
        const img = document.createElement("img");
        img.classList.add("listings-img");
        img.src = listingData.media;
        img.alt = `Image from ${listingData.title}`;
        img.loading = "lazy"; 
        imageBackground.appendChild(img);
    }

    listing.appendChild(listingInfoContainer);
    listingInfoContainer.appendChild(title);
    listingInfoContainer.appendChild(description);
    listingInfoContainer.appendChild(tags);

    clickable.addEventListener('click', (e) => {
        
        window.location.href = `/listing/listing.html?id=${listingData.id}`;
      });
     
    return clickable;
}
export function renderListingTemplates(listingDataList, parent) {
    if (parent) {
        parent.append(...listingDataList.map(data => { 
            return listingsTemplate(data)
        }))
    }
}

