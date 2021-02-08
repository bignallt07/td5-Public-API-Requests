# td5-Public-API-Requests
This app uses a public API from randomuser.me to display 12 random profiles on the page with some contact information. Upon clicking on one of the profiles a model window will appear which you have the ability to navigate through. You can also refine your search by using the search bar to check for specific names.

## Motivation 

This project was designed in line with project 5 of the Treehouse TechDegree and as a part of my developer portfolio

## Build Status

This piece is completed, meeting the exceeds standards of the Treehouse techdegree.

## Code Style

JavaScript

## Features 
1. Fetches API from randomuser.me and generates HTML of 12 profiles
2. Each profile is clickable, which opens a modal window
3. The modal can be navigated through by clicking the previous and next buttons
4. Use the search bar to refine your search within the 12 profiles

Important Note: On scripts line 231, I have purposely left the console.error in the code to show visitors the details of the error


## CSS Changes
1. class: card - Removed the solid border and added a box shadow to add a popping effect to the cards
2. body - background color changed to a warmer gray
3. header h1 - color changed to work with the background color of the body
4. Class: modal-container background color changed to match body background - but less transparency
5. Animation added to go from body background color to modal container background color on modal clicks

## Contribution

If you have any suggestions to improve this app, please reach out to me on github

Next steps for this app...

## Credits 
Curriculum at teamtreehouse.com
API Fetched from: https://randomuser.me/
w3schools.com

### Notes from reviewer to improve:
Here's a few tips for you. Right now, you're creating a modal for each user. That's not the worst thing in this small app. But imagine if there a thousand or more employees in this directory. Ideally, you should only create a single modal, add it to the DOM once, and then just update, hide and display it as needed. And for your card hover styles. You're adding a border to the card on hover. You can't animate or transition the creation of a border. So it creates or sort of sketchy experience for the user as they hover on and off of cards. So a little trick is to add a transparent border to the cards, and then in the hover rule, just change the color of the border. And as long as you have a nice transition property on the card, you'll get a really smooth experience with the updating border on hover. Hope that helps. :thumbsup:



