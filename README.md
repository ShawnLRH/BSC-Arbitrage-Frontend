# Project Intro

The Frontend of the BSC Arbitrage Tracker

## Project Structure

A list of folders and what to expect

- client - contains all frontend code
- server - contains all backend code

### `client folder structure`

- src - The main folder
- src > App.js - Entry point of the app
- src > App.css - All app styles
- src > assets - All images
- src > components - All child components used in parent components
- src > config - All custom functions, table columns, etc.
- src > pages - All app pages
- src > redux - All store slices for global state management
- src > .env - All environment urls for accessing the backend api.

### `server folder structure`

- index - The main api file
- .env - Database variables

## Installation Guide

1. Download project file
2. Unzip project file (You should see client and server folders)
3. Create a MAIN folder for the sub-folders (client and server)
4. Open the MAIN folder in VScode or any code editor
5. Open terminal window and split the terminal window
6. On the left terminal, run the following command to install client dependencies:

NOTE: If you don't have yarn installed, please use npm

- cd client
- yarn install
- yarn start

7. On the right terminal, run the following command to install server dependencies:

- cd server
- yarn install
- yarn run server

8. At this point your frontend and backend should be running. Let's setup the database.
9. Launch your XAMPP software and start the Apache and MySQL services.
10. Go to phpmyadmin on your browser and import the database.sql file located inside the server folder.
