import * as getApiData from "../api/profiles/index.mjs";
import { load } from "../storage/storage.mjs";

export async function updateProfileListener() {
    const form =  document.querySelector("#editProfile");

    if (form) {
        const { name, email } = load("profile");
        form.name.value = name;
        form.email.value = email;

        const button = form.querySelector("button");
        button.disabled = true;

        const profile = await getApiData.getProfile(name);
        
        form.avatar.value = profile.avatar;
       
        button.disabled = false;

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const profile = Object.fromEntries(formData.entries());

            profile.name = name;
            profile.email = email;

            console.log(profile)

            //send to api
            if (getApiData.updateProfile) {
                getApiData.updateProfile(profile);

                setTimeout(function routeHome() {
                    {
                        window.location.replace("/profile/account.html");
                    }
                },1000);
            }        
        })
    }
};