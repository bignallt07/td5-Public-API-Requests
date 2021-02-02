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



/******************************
 * Functions
 *****************************/

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
    console.log(data);
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
        modalWindow(data[i]);
       
        // Event Listener
        cardDiv.addEventListener("click", () => {
            cardDiv.nextElementSibling.hidden = false;              // Every other div is a modal
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
            <p class="modal-text">${person.cell}</p>
            <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
            <p class="modal-text">Birthday: ${person.dob.date.substring(0, 10)}</p>
        </div>
    </div> 
    `;
    galleryDiv.insertAdjacentElement('beforeend', modalContainer);  

    // Button Event Listener to close modal window
    const modalBtn = modalContainer.querySelector("button");
    modalBtn.addEventListener("click", () => {
        modalContainer.hidden = true;
    });
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
    .then(data => createGallery(data.results))
    .catch(error => console.log("Error:", error))


    
// Notes for Extra Credit
// I think that the search will need to set another fetch request for ALL the data
                    
   
    





/*  ADD TO MODAL

 // IMPORTANT: Below is only for exceeds tasks 
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
</div> */