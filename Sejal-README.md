## Usage and Notes

The frontend component of this project is in the folder called `client`.
The backend server component is in the folder called `stock-simulator`.
I was going to link the two using webpack, but I figured it would be 
simplest to just have two terminals open. Please run `npm run start` to 
start the server and `yarn start` to run the frontend React app.

## Key Components

* `App.js`: where most of the codebase lives
* `TopStock.js`: a React Component to display individual stock info (name and relative percent change)
* `SectorFilter.js`: primarily used for the second tab (drop-down menu filter by sector)
* `Chart.js`: broken right now :( but contains a hypothetical D3 Time Series viz

## Notes

Implementation Time: 5 hours  
Functionality: 
- One unfixed bug is related to the scrolling of the resizable window-- it shows up when adjusting the filters for the "By Sector" tab. The height of the container gets shortened, cutting off stock info.
- I sadly wasn't able to get my D3 visualization to link to my React components properly :(, but if you don't mind, I am going to nerd out on this now that I am off the clock :). 