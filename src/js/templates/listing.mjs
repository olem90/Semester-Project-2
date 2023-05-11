// import { API_AUCTION_URL } from "../api/constants.mjs";
// import { fetchWithToken } from "../api/authFetch.mjs";
// import { createListingBid } from "../api/listings/create.mjs";


//const specificListingContainer = document.querySelector("#listingContainer");

//const action = "/listings";
/*
export async function specificListingTemplate() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    const getListingURL = `${API_AUCTION_URL}${action}/${id}?_bids=true&_seller=true`;
    
    const response = await fetchWithToken(getListingURL);
    const specificListing = await response.json();

    console.log(specificListing)

    function createListingHTML(listing) {


        const now = new Date().getTime();
        const listingEnds = new Date(specificListing.endsAt);
        const timeDiff = listingEnds - now;
        const timeLeft = getTimeLeft(timeDiff);
          
        function getTimeLeft(timeDiff) {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    
            return `${days}d ${hours}h`;
          }

        const bids = listing.bids;
        let highestBid = 0;
        let lastBid = 0;

        for (let i = 0; i < bids.length; i++) {
            const bid = bids[i];
            const bidAmount = bid.amount;
            
          
            if (bidAmount > highestBid) {
              highestBid = bidAmount;
            }
          
            lastBid = bidAmount;
            const minimumBid = `$${highestBid + 1}`;

        specificListingContainer.innerHTML = 
        `<div class="specificListingContainer">
            <div class="imageContainer me-4">
                <img class="specificListingImg" src="${listing.media[0]}">
            </div>
            <div class="specificListingInfo mt-5">
                <h1>${listing.title}</h1>
                <span>${listing.description}</span>
                <div class="timeNBids border border-bottom-2 border-start-0 border-end-0 border-top-2 py-1 mt-3 d-flex flex-row">
                <span> Time Left: ${timeLeft} |</span>
                <span class="ms-3"> Bids: <a href="#">${listing._count.bids}</a></span> 
                </div>
                <div class="currrentPrice mt-4">
                    <span> <b>Current Price:</b> </span>
                    <span> <b>${highestBid}</b> </span>
                </div>
                <div class="minimumBid mt-4">
                    <span> Minimum Bid: </span>
                    <span> ${minimumBid} </span>
                </div>
                <form class="MakeYourBid mt-4" id="BidForm">
                    <span> Make Your Bid: </span>
                    <input class="BidInput border" name=bidInput type=number placeholder= "$0.00" id="bidInput" required></input>
                    <button class="bidButton border border-0 text-white" id=bidButton> Place My Bid </button>
                </form>                             
            </div>
        </div>`
    }
    }
    createListingHTML(specificListing); 
  };
*/
 

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  
  export function listingTemplate(listingData) {
       
    console.log(listingData);
  
    const dateListingEnds = listingData.endsAt;

      console.log(dateListingEnds);
  
    const now = new Date().getTime();
          const listingEnds = new Date(dateListingEnds);
          const timeDiff = listingEnds - now;
          const timeLeftListing = getTimeLeft(timeDiff);
      
      function getTimeLeft(timeDiff) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      
          return `${days}d ${hours}h`;
      }
  
    const title = document.createElement("h1")
    const listingInfoContainer = document.querySelector("#listingInfoContainer");
    const imageContainer = document.querySelector("#listingImgContainer");
    const imageBackground = document.querySelector("#listingImageBackground");
    const titleAndDescriptionContainer = document.querySelector("#titleAndDescriptionContainer");
    //const pageContainer = document.createElement("div");
    const currrentPriceContainer = document.querySelector("#currentPriceContainer");
    const currrentPrice = document.createElement("span");
    const description = document.createElement("span");
    const timeLeftAndBidsContainer = document.querySelector("#timeLeftContainer");
    const timeLeft = document.createElement("span");
    const numberOfBids = document.createElement("span");
    const minimumBid = document.createElement("span");
    const minimumBidContainer = document.querySelector("#minimumBidContainer");
    //   const MakeYourBidContainer = document.createElement("div");
      const listingImg = document.createElement("img");
    //   const bidInput = document.createElement("input");
    //   const bidButton = document.createElement("button");
    //   const makeYourBid = document.createElement("span");

    title.classList.add("listingTitle", "mb-3");
    description.classList.add("listingDescription")
    //   pageContainer.classList.add("singleListingContainer", "d-flex", "flex-row", "mt-4");
    //   imageContainer.classList.add("listingImg-container", "d-flex", "flex-column", "justify-content-center");
    //   listingInfoContainer.classList.add("listingInfoContainer", "ms-5");
    //   currrentPriceContainer.classList.add("mt-3", "fw-bold");
    //   timeLeftAndBidsContainer.classList.add("timeLeftAndBidsContainer" ,"border", "border-start-0", "border-end-0", "border-top-2", "border-bottom-2", "d-flex", "flex-row", "mt-2");
    //   numberOfBids.classList.add("ms-3");
    //   minimumBidContainer.classList.add("mt-3");
    //   MakeYourBidContainer.classList.add("mt-3", "MakeYourBidContainer");
    //   bidButton.classList.add("bidButton", "mt-5");
    //   imageBackground.classList.add("listingImageBackground", "d-flex");
    //   bidInput.classList.add("bidInput", "ms-5");
    listingImg.classList.add("listingImg");

    //   bidButton.innerText = "Place Your Bid";
    timeLeft.innerText =`Time Left: ${timeLeftListing} |`;
    numberOfBids.innerText =  ` Bids: ${listingData._count.bids}`;
    title.innerText = listingData.title;
    description.innerText = listingData.description;
    //   makeYourBid.innerText = `Make Your Bid:`;
      
      const bids = listingData.bids;
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
  
    //   pageContainer.appendChild(imageContainer);
    //   pageContainer.appendChild(listingInfoContainer);
  
      if (listingData.media) {
          listingImg.classList.add("singleListingImg");
          listingImg.src = listingData.media;
          listingImg.alt = `Image from ${listingData.title}`;
          imageBackground.appendChild(listingImg);
      }
  
    //   listingInfoContainer.appendChild(description);
    //   listingInfoContainer.appendChild(timeLeftAndBidsContainer);
    //   listingInfoContainer.appendChild(currrentPriceContainer);
      //listingInfoContainer.appendChild(minimumBidContainer);
      //listingInfoContainer.appendChild(MakeYourBidContainer);
    //listingInfoContainer.appendChild(bidButton);

      titleAndDescriptionContainer.appendChild(title);
      titleAndDescriptionContainer.appendChild(description);
  
      timeLeftAndBidsContainer.appendChild(timeLeft);
      timeLeftAndBidsContainer.appendChild(numberOfBids);
  
      currrentPriceContainer.appendChild(currrentPrice);
      minimumBidContainer.appendChild(minimumBid);

    //   MakeYourBidContainer.appendChild(makeYourBid);
    //   MakeYourBidContainer.appendChild(bidInput);
  
     
  }
  export function renderListingTemplate(listingTemplateData, parent) {
      parent.append(listingTemplate(listingTemplateData))
      };