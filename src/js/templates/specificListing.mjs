import { API_AUCTION_URL } from "../api/constants.mjs";
import { fetchWithToken } from "../api/authFetch.mjs";


const specificListingContainer = document.querySelector("#specificListing");

const action = "/listings";

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
        
        for (let i = 0; i < bids.length; i++) {
        const bid = bids[i];
        const lastBid = `$${bid.amount}`;
        const minimumBid = `$${bid.amount + 1}`;

        console.log(bid.amount);

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
                    <span> <b>${lastBid}</b> </span>
                </div>
                <div class="minimumBid mt-4">
                    <span> Minimum Bid: </span>
                    <span> ${minimumBid} </span>
                </div>
                <div class="MakeYourBid mt-4">
                    <span> Make Your Bid: </span>
                    <input class="BidInput border" placeholder= "$0.00">  </input>
                </div>
                <button class="bidButton border border-0 text-white">Place My Bid</button>
                                                  
            </div>
        </div>`
    }
    }
    createListingHTML(specificListing); 
  };

 

