  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  
  export function listingTemplate(listingData) {
  
    const dateListingEnds = listingData.endsAt;
  
    const now = new Date().getTime();
          const listingEnds = new Date(dateListingEnds);
          const timeRemaining = listingEnds - now;
          const timeLeftListing = getTimeLeft(timeRemaining);
      
      function getTimeLeft(timeDiff) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      
          return `${days}d ${hours}h`;
      }
      
    const title = document.createElement("h1")
    const imageBackground = document.querySelector("#listingImageBackground");
    const titleAndDescriptionContainer = document.querySelector("#titleAndDescriptionContainer");
    const carouselContainer = document.createElement("div");
    const currrentPriceContainer = document.querySelector("#currentPriceContainer");
    const currrentPrice = document.createElement("span");
    const description = document.createElement("span");
    const timeLeftAndBidsContainer = document.querySelector("#timeLeftContainer");
    const timeLeft = document.createElement("span");
    const numberOfBids = document.createElement("span");
    const minimumBid = document.createElement("span");
    const minimumBidContainer = document.querySelector("#minimumBidContainer");
    const listingImg = document.createElement("img");
    const bidInput = document.querySelector("#bidAmountInput");
    const bidButton = document.querySelector("#placeBidButton");

    title.classList.add("listingTitle", "mb-3");
    description.classList.add("listingDescription")
    listingImg.classList.add("listingImg");
    carouselContainer.classList.add("carouselContainer");

    if (timeRemaining < 0) {
        timeLeft.innerText = "Auction has ended " ;
        timeLeft.classList.add("auction-ended");
        numberOfBids.innerText =  `| Bids: ${listingData._count.bids}`;
        bidInput.disabled = true;
        bidInput.style.backgroundColor = 'lightgray';
        bidButton.disabled = true;
        bidButton.style.backgroundColor = 'lightgray';  
    } else {
        timeLeft.innerText =`Time Left: ${timeLeftListing} |`;
        numberOfBids.innerText =  ` Bids: ${listingData._count.bids}`;
    }
    
    title.innerText = listingData.title;
    description.innerText = listingData.description;
      
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
  
      if (listingData.media) {
        for ( const imageUrl of listingData.media) {
          const carouselItem = document.createElement("div");
          carouselItem.classList.add("carousel-item");
          listingImg.classList.add("singleListingImg");

          listingImg.src = imageUrl;
          listingImg.alt = `Image from ${listingData.title}`;

          imageBackground.appendChild(listingImg);
          
          
        }
        
        
      }

      titleAndDescriptionContainer.appendChild(title);
      titleAndDescriptionContainer.appendChild(description);
  
      timeLeftAndBidsContainer.appendChild(timeLeft);
      timeLeftAndBidsContainer.appendChild(numberOfBids);
  
      currrentPriceContainer.appendChild(currrentPrice);
      minimumBidContainer.appendChild(minimumBid);
  
  }
  export function renderListingTemplate(listingTemplateData, parent) {
    const listingElement = listingTemplate(listingTemplateData);
    if (listingElement) {
        parent.append(listingElement);
    }
    };



