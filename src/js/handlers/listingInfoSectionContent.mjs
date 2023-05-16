import { getListing } from "../api/listings/get.mjs";



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

export async function getListingInfo() {

const listingInfo = await getListing(id);

const itemInfo = document.querySelector("#itemInfo");
const sellerInfo = document.querySelector("#sellerInfo");
const bidInfo = document.querySelector("#bidInfo");
const contentContainer = document.querySelector("#listingInfoSectionContent");

const apiDate = listingInfo.created;
const date = new Date(apiDate);
const format = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = date.toLocaleDateString('en-GB', format);

let sellerWins = 0;
if ( listingInfo.seller.wins.length > 0) {
    sellerWins = listingInfo.seller.wins;
}

itemInfo.addEventListener("click", (event) => {
    event.preventDefault();

    sellerInfo.style.fontWeight = "normal";
    itemInfo.style.fontWeight = "bold";
    bidInfo.style.fontWeight = "normal";

    itemInfo.style.textDecoration = "underline";
    bidInfo.style.textDecoration = "none";
    sellerInfo.style.textDecoration = "none";

    contentContainer.innerHTML = `<div id="ItemContainer">
    <div>
    <span> <b>Item ID:</b></span>
    <span> ${listingInfo.id} </span>
    </div>

    <div>
    <span> <b>Number of Bids:</b></span>
    <span> ${listingInfo._count.bids} </span>
    </div>

    <div>
    <span><b>Bid increment:</b></span>
    <span> 1$ </span>
    </div>

    <div>
    <span> <b>Ends On:</b></span>
    <span> ${formattedDate} </span>
    </div>
    
    </div>`
})

sellerInfo.addEventListener("click", (event) => {
    event.preventDefault();

    sellerInfo.style.fontWeight = "bold";
    itemInfo.style.fontWeight = "normal";
    bidInfo.style.fontWeight = "normal";

    itemInfo.style.textDecoration = "none";
    bidInfo.style.textDecoration = "none";
    sellerInfo.style.textDecoration = "underline";

    contentContainer.innerHTML = `<div class="mb-5" id="ItemContainer">
    <div class="mb-3">
    <span class="fs-4"> <strong>Seller:</strong></span>
    </div>
    <div>
        <img id="listingSellerImg" src="${listingInfo.seller.avatar}"
    </div>
    <div class="d-flex flex-column">
    
    <span><strong>Name:</strong> ${listingInfo.seller.name} </span>
    <span><b>Email:</b> ${listingInfo.seller.email} </span>
    <span id="sellerWins"><b>Wins:</b> ${sellerWins} </span>

    </div>

    </div>`
})

bidInfo.addEventListener("click", (event) => {
    event.preventDefault();
    sellerInfo.style.fontWeight = "normal";
    itemInfo.style.fontWeight = "normal";
    bidInfo.style.fontWeight = "bold";

    itemInfo.style.textDecoration = "none";
    bidInfo.style.textDecoration = "underline";
    sellerInfo.style.textDecoration = "none";

    contentContainer.innerHTML = `
    <div class="mt-4 d-flex justify-content-center">
      <div class="border border-end-0 w-100 border-start-0 border-buttom-3 border-top-0 mb-2" id="bidHistoryContainer">
        <div class="d-flex justify-content-between w-100">
          <span><strong>Bidder</strong></span> <span><strong>Bid Amount</strong></span><span><strong>Time of last bid</strong></span>
        </div>
      </div>`;

      const bids = listingInfo.bids;
      const sortedBidsByNewest = bids.sort((a, b) => new Date(b.created) - new Date(a.created));

      for (let i = 0; i < bids.length; i++) {
        const sortedBid = sortedBidsByNewest[i];
        const bidderName = sortedBid.bidderName;
        const bidAmount = sortedBid.amount;
        const bidTime = new Date(sortedBid.created).toLocaleString();

        contentContainer.innerHTML +=
      `<div class="d-flex flex-column" id="bidHistoryContainer2">
        <div class="mb-2 border border-end-0 border-start-0 border-top-0" id="biddingInfo">
            <div class="biddingRow-name d-flex">
                <span id="bidderName">${bidderName}</span>
            </div>

            <div class="biddingRow-amount d-flex justify-content-center">
                <span>${bidAmount}</span>
            </div>

            <div class="biddingRow-time d-flex justify-content-end">
                <span>${bidTime}</span>
            </div>
        </div>
          </div>
         `;
}
})

      

}

