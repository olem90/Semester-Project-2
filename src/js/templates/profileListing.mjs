/*
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

export function ProfileListingTemplate(listing) {

    const profileListing = listing.find(
        (listing) => listing.id === id);

        console.log(profileListing);

    const dateListingEnds = profileListing.endsAt;

    const now = new Date().getTime();
        const listingEnds = new Date(dateListingEnds);
        const timeDiff = listingEnds - now;
        const timeLeftListing = getTimeLeft(timeDiff);
    
    function getTimeLeft(timeDiff) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    
        return `${days}d ${hours}h`;
    }

    const title = document.createElement("h1");
    const listingInfoContainer = document.createElement("div");
    const imageContainer = document.createElement("div");
    const imageBackground = document.createElement("div");
    const pageContainer = document.createElement("div");
    const currrentPriceContainer = document.createElement("div");
    const currrentPrice = document.createElement("span");
    const description = document.createElement("span");
    const timeAndBidsContainer = document.createElement("div");
    const timeLeft = document.createElement("span");
    const numberOfBids = document.createElement("span");
    const minimumBid = document.createElement("span");
    const minimumBidContainer = document.createElement("div");
    const MakeYourBidContainer = document.createElement("div");
    const listingImg = document.createElement("img");
    const editProfileListing = document.createElement("a");

    pageContainer.classList.add("singleProfileListingContainer", "d-flex", "flex-row", "mt-4");
    imageContainer.classList.add("profileListingImg-container", "d-flex", "flex-column", "justify-content-center");
    listingInfoContainer.classList.add("profileListingInfoContainer", "ms-3");
    currrentPriceContainer.classList.add("mt-3");
    timeAndBidsContainer.classList.add("timeAndBidsContainer" ,"border", "border-start-0", "border-end-0", "border-top-2", "border-bottom-2", "d-flex", "flex-row", "mt-2");
    numberOfBids.classList.add("ms-3");
    minimumBidContainer.classList.add("mt-3");
    MakeYourBidContainer.classList.add("mt-3");
    editProfileListing.classList.add("editProfileListing", "me-0");
    
    timeLeft.innerText =`Time Left: ${timeLeftListing} |`;
    numberOfBids.innerText =  `Bids: ${profileListing._count.bids}`;
    title.innerText = profileListing.title;
    description.innerText = profileListing.description;
    imageBackground.classList.add("imageBackground", "d-flex")
    editProfileListing.innerText = "Edit";
    editProfileListing.href = "/listing/edit/editListing.html" + `?id=${profileListing.id}`;

    const bids = profileListing.bids;
        let highestBid = 0;
        let lastBid = 0;

        if (bids.length > 0) {
            for (let i = 0; i < bids.length; i++) {
              const bid = bids[i];
              const bidAmount = bid.amount;
              
              if (bidAmount > highestBid) {
                highestBid = bidAmount;
              }
              
              lastBid = bidAmount;
            }
            
            const minimumListingBid = `$${highestBid + 1}`;
            currrentPrice.innerText = `Current Price: $${highestBid}`;
            minimumBid.innerText = `Minimum Bid: ${minimumListingBid}`;
            } else {
            currrentPrice.innerText = `Current price: $1`; 
            minimumBid.innerText = "Minimum Bid: $2";
            }

    pageContainer.appendChild(imageContainer);
    pageContainer.appendChild(listingInfoContainer);

    if (profileListing.media) {
        listingImg.classList.add("singleListingImg");
        listingImg.src = profileListing.media;
        listingImg.alt = `Image from ${profileListing.title}`;
        imageContainer.appendChild(imageBackground);
        imageBackground.appendChild(listingImg);
    }

    listingInfoContainer.appendChild(title);
    listingInfoContainer.appendChild(description);
    listingInfoContainer.appendChild(timeAndBidsContainer);
    listingInfoContainer.appendChild(currrentPriceContainer);
    listingInfoContainer.appendChild(minimumBidContainer);
    listingInfoContainer.appendChild(editProfileListing);

    timeAndBidsContainer.appendChild(timeLeft);
    timeAndBidsContainer.appendChild(numberOfBids);

    currrentPriceContainer.appendChild(currrentPrice);
    minimumBidContainer.appendChild(minimumBid);

    return pageContainer;
}
export function renderProfileListingTemplate(profileListingTemplateData, parent) {
    parent.append(ProfileListingTemplate(profileListingTemplateData))
    };
    */