/*******************************
 * Treehouse Techdegree Project 5 - Public API Requests
******************************/

/*****************************
 * Collecting DOM Elements and Variable Declaration
*****************************/
const searchContainer = document.querySelector(".search-container");
const galleryDiv = document.querySelector("#gallery");

const url = "https://randomuser.me/api/?results=12&nat=us";

const buttons = document.querySelectorAll("button");

const galleryDivs = galleryDiv.children;

const apiData = [];

let modals = [];

// Add SearchBar



const searchbar = document.querySelector(".search-container");
searchbar.innerHTML = `
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;

const searchButton = document.querySelector("#search-submit");
const inputValue = document.querySelector("#search-input");


/******************************
 * Functions
 *****************************/
function performSearch(inputValue, names) {
   let arrayAccept = [];
   const profiles = names[0].results;
   for (let i = 0; i < profiles.length; i++) {
      let fullName = `${profiles[i].name.first.toLowerCase()} ${profiles[i].name.last.toLowerCase()}`;
      if (fullName.includes(inputValue) ) {
         arrayAccept.push(profiles[i]);
      }
   }
   return arrayAccept;
}


 /**
  * createGallery Function
  * Description: Creates a gallery of 12 profiles from API data. Including
  *                 1. Creates card for each object returned from the API
  *                 2. Calls the modalWindow function
  *                 3. Listens to click event on each created card
  * 
  * @param {json} data - Recieved JSON from the API call
  * @returns - Creates and displays gallery of 12 people
  */

function createGallery(data) {
    galleryDiv.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.innerHTML = `
            <div class="card-img-container">
                <img class="card-img" src="${data[i].picture.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                <p class="card-text">${data[i].email}</p>
                <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
            </div>
        `;
        galleryDiv.insertAdjacentElement('beforeend', cardDiv);         // appends to div

         // modalWindow call
        modals.push(modalWindow(data[i]));
        
        // Event Listener
        cardDiv.addEventListener("click", () => {
            cardDiv.nextElementSibling.hidden = false;              // Every other div is a modal
        });  
    }

    // remove first previous and last next buttons
    removeNextandPrevious(modals);
    console.log(modals);

    // Note. We are adding to the modals everytime, we need to refresh the modal list
    
    // This below will allow to go to the NEXT or PREVIOUS modal

    for (let i = 0; i < modals.length; i++) {
        const buttonContainer = modals[i].lastElementChild;
        buttonContainer.addEventListener("click", e => {
            if (e.target.tagName === "BUTTON") {
                const previousProfile = modals[i-1];
                const nextProfile = modals[i+1];
                modals[i].hidden = true;
                if (e.target.id === "modal-prev") {
                    previousProfile.hidden = false;
                } else {
                    nextProfile.hidden = false;
                }
            }
        });
    }

 

}

/**
 * modalWindow Function
 * Description: Creates a modal window for each of the profiles from the API. Function includes
 *              1. Creates the modal and appends to the DOM using template literals
 *              2. Collects the button from the created DIV, and adds an event listener. This closes the modal window
 */

// Function that connects to the DOM
function modalWindow(person) {
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-container";
    modalContainer.hidden = true;
    modalContainer.innerHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${person.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="modal-text">${person.email}</p>
                <p class="modal-text cap">${person.location.state}</p>
                <hr>
                <p class="modal-text">${person.cell.substring(0, 5)} ${person.cell.substring(6, 14)}</p>
                <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
                <p class="modal-text">Birthday: ${reformatDOB(person.dob.date.substring(0, 10))}</p>
            </div>
        </div> 
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    `;
    galleryDiv.insertAdjacentElement('beforeend', modalContainer);  

    // Button Event Listener to close modal window
    const closeBtn = modalContainer.querySelector("#modal-close-btn");
    closeBtn.addEventListener("click", () => {
        modalContainer.hidden = true;
    });

    
    // // Next and Prev Event Listener
    // const buttonContainer = modalContainer.lastElementChild;
    // buttonContainer.addEventListener("click", e => {
    //     if (e.target.tagName === "BUTTON") {
    //         const previousProfile = modalContainer.previousElementSibling.previousElementSibling;
    //         const nextProfile = modalContainer.nextElementSibling.nextElementSibling;
    //         if (!nextProfile || previousProfile === null) {
    //             modalContainer.hidden = true;
    //         } else {
    //             modalContainer.hidden = true;
    //             if (e.target.id === "modal-prev") {
    //                 previousProfile.hidden = false;  
    //             } else if (e.target.id === "modal-next") {
    //                 nextProfile.hidden = false;
    //             } 
    //         }
    //     } 
    // });

    return modalContainer;
}

// Function to return reformatted DOB
function reformatDOB(dob) {
    const regex = /^(\d{4})-(\d{2})-(\d{2})$/;          // REGEX that matches phone number
    const replacement = "$2/$3/$1";                     // Replacement Groups
    return dob.replace(regex, replacement);             // Return Replacement   
}

function removeNextandPrevious(modals) {
    modals[0].lastElementChild.firstElementChild.style.display = "none";
    modals[modals.length - 1].lastElementChild.lastElementChild.style.display = "none";
}



/**
 * Fetching data
 */

// This function tests the respose of the fetch request. If not 200, throws an error and activates catch
function checkFetchStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}


// Fetchs JSON from API request, then launches the createGallery function

fetch(url)
    .then(checkFetchStatus)
    .then(response => response.json())
    .then(data => {
        createGallery(data.results)
        apiData.push(data);
    })
    .catch(error => console.log("Error:", error))
 
// Notes for Extra Credit
// Filter things already on the page
// Regex for the number and DOB
   
// Event Listeners
searchButton.addEventListener("click", () => {
    modals = [];
    const newArray = performSearch(inputValue.value.toLowerCase(), apiData);
    createGallery(newArray);
    if (newArray.length === 0) {
        galleryDiv.innerHTML = "No results to dispay";
    } 
});

inputValue.addEventListener("keyup", () => {
    modals = [];
    const newArray = performSearch(inputValue.value.toLowerCase(), apiData);
    createGallery(newArray);
    if (newArray.length === 0) {
        galleryDiv.innerHTML = "No results to dispay";
    } 
});
    




