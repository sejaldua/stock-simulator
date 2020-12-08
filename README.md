#stock-simulator

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
* `Line.js`: real-time plotting of the stock fluctuations

## Notes

Implementation Time: 4-5 hours (visualization wasn't fully working)  
Total Time: 6-7 hours (switched from D3 --> react-chart-js2)  
The code is messy! If I had more time, I would clean it up and refactor.  
This was fun!  
