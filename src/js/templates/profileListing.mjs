
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
    const makeYourBidContainer = document.createElement("div");
    const listingImg = document.createElement("img");
    const editProfileListingContainer = document.createElement("div");
    const editProfileListing = document.createElement("a");
    const profileListingBidsContainer = document.querySelector("#profileListingBids");
    const bidsValues = document.createElement("div");
    const bidAmountLabel = document.createElement("strong");
    const bidTimeLabel = document.createElement("strong");
    const bidNameLabel = document.createElement("strong");
    const profileListingBids = document.createElement("div");
    const bidName = document.createElement("span");
    const bidAmount = document.createElement("span");
    const bidTime = document.createElement("span");
    
    pageContainer.classList.add("singleProfileListingContainer", "d-flex", "flex-row", "mt-4");
    imageContainer.classList.add("profileListingImg-container", "d-flex", "flex-column", "justify-content-center");
    listingInfoContainer.classList.add("profileListingInfoContainer", "ms-3");
    currrentPriceContainer.classList.add("mt-4");
    timeAndBidsContainer.classList.add("timeAndBidsContainer" ,"border", "border-start-0", "border-end-0", "border-top-2", "border-bottom-2", "d-flex", "flex-row", "mt-5");
    numberOfBids.classList.add("ms-3");
    minimumBidContainer.classList.add("mt-3");
    makeYourBidContainer.classList.add("mt-3");
    editProfileListing.classList.add("editProfileListing");
    editProfileListingContainer.classList.add("editProfileListingContainer");
    bidsValues.classList.add("bidsValues", "border", "border-end-0", "border-start-0", "border-bottom-5", "border-top-0");
    profileListingBids.classList.add("profileListingBids", "border", "border-bottom-3","border-end-0", "border-start-0", "border-top-0" )
    
    timeLeft.innerText =`Time Left: ${timeLeftListing} |`;
    numberOfBids.innerText =  `Bids: ${profileListing._count.bids}`;
    title.innerText = profileListing.title;
    description.innerText = profileListing.description;
    imageBackground.classList.add("imageBackground", "d-flex")
    editProfileListing.innerText = "Edit Listing";
    editProfileListing.href = "/listing/edit/editListing.html" + `?id=${profileListing.id}`;
    bidAmountLabel.innerHTML = "Bid Amount";
    bidTimeLabel.innerHTML = "Time of last bid";
    bidNameLabel.innerHTML = "Bidder";

    const bids = profileListing.bids;
    const sortedBidsByNewest = bids.sort((a, b) => new Date(b.created) - new Date(a.created));

      for (let i = 0; i < bids.length; i++) {
        const sortedBid = sortedBidsByNewest[i];
        const bidderName = sortedBid.bidderName;
        const bidsAmount = sortedBid.amount;
        const bidsTime = new Date(sortedBid.created).toLocaleString();
        
        bidName.innerText = `${bidderName}`;
        bidAmount.innerText = `${bidsAmount}`;
        bidTime.innerText = `${bidsTime}`;
}

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
    listingInfoContainer.appendChild(editProfileListingContainer);
    editProfileListingContainer.appendChild(editProfileListing);
    timeAndBidsContainer.appendChild(timeLeft);
    timeAndBidsContainer.appendChild(numberOfBids);
    currrentPriceContainer.appendChild(currrentPrice);
    minimumBidContainer.appendChild(minimumBid);

    profileListingBidsContainer.appendChild(bidsValues);
    profileListingBidsContainer.appendChild(profileListingBids);
    
    bidsValues.appendChild(bidNameLabel);
    bidsValues.appendChild(bidAmountLabel);
    bidsValues.appendChild(bidTimeLabel);

    profileListingBids.appendChild(bidName);
    profileListingBids.appendChild(bidAmount);
    profileListingBids.appendChild(bidTime);

    return pageContainer;
}
export function renderProfileListingTemplate(profileListingTemplateData, parent) {
    parent.append(ProfileListingTemplate(profileListingTemplateData))
    };
  