import * as storage from "../storage/storage.mjs";

const profileName = storage.load("profile");

export function accountTemplate(accountData) {

    const profileInfoContainer = document.createElement("div");
    const name = document.createElement("span");
    const email = document.createElement("span");
    const credits = document.createElement("span");
    const edit = document.createElement("a");
    const myListings = document.createElement("a");
    const accountImg =  document.createElement("img"); 
    const accountInfo = document.createElement("div");
    const div = document.createElement("div");

    name.innerHTML =  `<b>Name:</b> ${accountData.name}`;
    email.innerHTML = `<b>Email:</b> ${accountData.email}`;
    credits.innerHTML = `<b>Credits:</b> ${accountData.credits}`;
    edit.innerText = "Edit";
    edit.href = "/profile/edit/edit.html" + `?id=${accountData.id}`;
    myListings.innerText = "My Listings";
    myListings.href = "/profile/profileListings/profileListings.html";
    
    profileInfoContainer.classList.add("d-flex", "profileInfoContainer");
    name.classList.add("fs-5", "fw-semibold");
    accountImg.classList.add("accountImage", "my-2");
    accountInfo.classList.add("d-flex", "flex-column", "w-100", "py-4");
    div.classList.add("edit-div", "d-flex", "flex-column", "w-100", "py-4");
    email.classList.add("email", "my-1", "fs-5", "fw-semibold");
    myListings.classList.add("mt-5", "fw-semibold", "fs-5");
    edit.classList.add("ProfileListingEdit", "fs-5", "fw-semibold");
    credits.classList.add("fs-5", "fw-semibold");
    
    profileInfoContainer.appendChild(div);

    if (accountData.avatar) {
        accountImg.src = accountData.avatar;
        div.appendChild(accountImg);
    }
    console.log(accountData);

    div.appendChild(accountInfo)
    div.appendChild(edit);
    div.appendChild(myListings);
    // profileInfoContainer.appendChild(accountInfo);
    
     accountInfo.appendChild(name);
     accountInfo.appendChild(email);
     accountInfo.appendChild(credits);
    
    return profileInfoContainer;
}

export function renderAccountTemplate(accountData, parent) {
    parent.append(accountTemplate(accountData))
    };
    
   