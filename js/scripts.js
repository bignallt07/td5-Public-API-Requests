/*******************************
 * Treehouse Techdegree Project 5 - Public API Requests
******************************/

/*****************************
 * Collecting DOM Elements and Variable Declaration
*****************************/
const url = "https://randomuser.me/api/?results=12&nat=us";

const searchContainer = document.querySelector(".search-container");
const galleryDiv = document.querySelector("#gallery");

const buttons = document.querySelectorAll("button");
const apiData = [];

let modals = [];


/******************************
 * Functions
 *****************************/

/**
 * performSearch Function
 * Description: Runs through the list of names and compares the input value. Before returning a new array
 * 
 * @param {string} inputValue - value collected in the search bar
 * @param {array} names - An array of data collected from the API. Between 1 - 12 names
 * @returns {array} - A list of names of all profiles that match the input
 */

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
  * "createGallery" Function
  * Description: Creates a gallery of 12 or less profiles from API data. This function is broken into 5 parts:
  *                 1. Resets the gallery UL and creates card for each object returned from the API
  *                 2. Calls the modalWindow function, and adds each modal to the modals array
  *                 3. Creates a click event for each card. This will show the modal
  *                 3. Listens to click event on each created card
  *                 4. After the loop, call the "removeNextandPrevious" function
  *                 5. Create a new loop which allows you to move to the previous or next modal with event listener
  * 
  * @param {json} data - Recieved JSON from the API call
  * @returns - Creates and displays gallery of 12 or less profiles
  */

function createGallery(data) {
    // Part 1
    galleryDiv.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.innerHTML = `
            <div class="card-img-container">
                <img class="card-img" src="${data[i].picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                <p class="card-text">${data[i].email}</p>
                <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
            </div>
        `;
        galleryDiv.insertAdjacentElement('beforeend', cardDiv);         

        // Part 2
        modals.push(modalWindow(data[i]));
        
        // Part 3
        cardDiv.addEventListener("click", () => {
            cardDiv.nextElementSibling.hidden = false;              // Developer Note: Every other DIV UL is a modal div
        });  
    }

    // Part 4
    if (modals.length > 0) {
        removeNextandPrevious(modals);
    }
    
    // Part 5
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
 * "modalWindow" Function
 * Description: Creates a modal window for each of the profiles from the API data. Function includes:
 *              1. Creates the modal and appends to the DOM using template literals
 *              2. Collects the button from the created DIV, and adds an event listener. This closes the modal window
 * 
 * @param {object} - One profile object from the collected API data
 * @returns {variable} - Variable holding the HTML creation for the profile modal 
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

    // Close button Event Listener
    const closeBtn = modalContainer.querySelector("#modal-close-btn");
    closeBtn.addEventListener("click", () => {
        modalContainer.hidden = true;
    });

    return modalContainer;
}

/**
 * "reformatDOB" Function
 * Description: Use regular expression to create groups in the DOB (Date of Birth) parameter, reformat to MM/DD/YYYY format
 * 
 * @param {*} dob - Date of Birth from API data for 1 profile
 * @returns {string} - Reformatted DOB
 */
function reformatDOB(dob) {
    const regex = /^(\d{4})-(\d{2})-(\d{2})$/;          
    const replacement = "$2/$3/$1";                    
    return dob.replace(regex, replacement);              
}

/**
 * "removeNextandPrevious" Function
 * Description: Removes the "Prev" button of the first modal in array and "next" button of last modal in array on each call
 *  
 * @param {array} modals - Array of created modals from the createGallery function
 * @returns - Updates DOM buttons 
 */

function removeNextandPrevious(modals) {
    modals[0].lastElementChild.firstElementChild.style.display = "none";
    modals[modals.length - 1].lastElementChild.lastElementChild.style.display = "none";
}

/**
 * "checkFetchStatus" Function
 * Description: Tests to see whether the API request was successful - 200 status
 * 
 * @param {response} response - From the API Fetch Request 
 * @returns {promise} - resolve promise, or active catch from rejection
 */
function checkFetchStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

/*****************************
 * DOM Creation - Add the Searchbar 
 *****************************/

const searchbar = document.querySelector(".search-container");
searchbar.innerHTML = `
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;

const searchButton = document.querySelector("#search-submit");
const inputValue = document.querySelector("#search-input");

/*****************************
 * Fetching data
 ****************************/
/**
 * Developer Notes for FETCH API Request
 * 
 * 1. Fetch the API using the URL stored in variable
 * 2. Check the status of it. If it is successful:
 *          a) Parse to JSON
 *          b) Then call create gallery function
 *          c) And add fetched data to array
 * 3. If unsuccessful catch the error and console and error
 */

fetch(url)
    .then(checkFetchStatus)
    .then(response => response.json())
    .then(data => {
        createGallery(data.results);
        apiData.push(data);
    })
    .catch(error => {
        console.error("Error:", error);
        galleryDiv.innerHTML = "Error loading profiles, please refresh the page";
    })
    // ADD TO DISPLAY THAT IT DIDN'T WORK
 

/*****************************
 * Event Listeners - Both for the search bar
 ****************************/   

searchButton.addEventListener("click", () => {
    modals = [];
    const newArray = performSearch(inputValue.value.toLowerCase(), apiData);
    createGallery(newArray);
    if (newArray.length < 1) {
        galleryDiv.innerHTML = "No results to display";
    } 
});

inputValue.addEventListener("keyup", () => {
    modals = [];
    const newArray = performSearch(inputValue.value.toLowerCase(), apiData);
    createGallery(newArray);
    if (newArray.length < 1) {
        galleryDiv.innerHTML = "No results to display";
    } 
});
    




