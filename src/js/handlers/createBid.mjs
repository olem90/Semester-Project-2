import { createListingBid } from "../api/listings/create.mjs";

export function createBidListener() {
    const bidButton = document.querySelector("#placeBidButton");
    const bidInput = document.querySelector('input[name="bidInput"]');
    
    bidButton.addEventListener("click", (event) => {
        event.preventDefault();
            
        const bidAmount = bidInput.value;
        const bidAmountNumber = parseInt(bidAmount);
                    
        if (createListingBid) {
            createListingBid(bidAmountNumber); 
        }
        setTimeout(function routeHome() {
            {
                location.reload();               
            }          
            },1000);
        })
};

