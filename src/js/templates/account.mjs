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

    name.innerText = `Name: ${accountData.name}`;
    email.innerText = `Email: ${accountData.email}`;
    credits.innerText = `Credits: ${accountData.credits}`;
    edit.innerText = "Edit";
    edit.href = "/profile/edit/edit.html" + `?id=${accountData.id}`;
    myListings.innerText = "My Listings";
    myListings.href = "/profile/myListings/myListings.html";

    profileInfoContainer.classList.add("d-flex", "profileInfoContainer");
    accountImg.classList.add("accountImage", "my-2");
    accountInfo.classList.add("d-flex", "flex-column", "ms-3", "w-100", "py-4");
    div.classList.add("edit-div", "d-flex", "flex-column", "w-100", "py-4");
    email.classList.add("email", "my-1");
    myListings.classList.add("mt-5", "fw-bold");

    profileInfoContainer.appendChild(div);

    if (accountData.avatar) {
        accountImg.src = accountData.avatar;
        div.appendChild(accountImg);
    }

    div.appendChild(edit);
    div.appendChild(myListings);
    profileInfoContainer.appendChild(accountInfo);
    
    accountInfo.appendChild(name);
    accountInfo.appendChild(email);
    accountInfo.appendChild(credits);
    
    return profileInfoContainer;

}

export function renderAccountTemplate(accountData, parent) {
    parent.append(accountTemplate(accountData))
    };
    
   