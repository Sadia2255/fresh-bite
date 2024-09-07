# Fresh Bite

There are errors in this project that I am trying to resolve (such as placing orders and making payments). However, there is already a good amount of functionality! :)

## Project Summary
Fresh Bite is a food delivery service that connects users with fresh, healthy meals. The platform allows users to browse various homemade food options, add items to their cart, and place orders.

## Features
- **User Authentication**: Users can sign up and log in using secure authentication with JWT and bcrypt.
- **Food Listing**: Users can browse available food items with detailed descriptions, prices, and images.
- **Cart Functionality**: Users can add items to their cart, view the total price, and manage the cart items.
- **File Uploads**: Food images can be uploaded for better visualization.
- **MongoDB Integration**: Food items, user data, and cart contents are stored and managed using MongoDB.
- **API Testing**: The project supports API testing through Thunder Client to ensure that all backend functionalities, like login, food listing, and cart updates, work as expected.

## Time Spent Developing
This project took approximately 15 hours to develop, with time spent on both backend and frontend functionality, database integration, and testing.

## Running the Project

### Option 1: Live Deployment
Currently the project is not deployed live as there are additional features I would love to implement.

### Option 2: Running Locally
To run the project locally,

1. Clone the repository:
   git clone https://github.com/Sadia2255/fresh-bite.git

   
2. Navigate into the project directory:

   cd fresh-bite

4. Install the necessary dependencies for both the backend and frontend:
   - For the backend:

     cd backend
     npm install

   - For the frontend:

     cd ../frontend
     npm install


5. Set up environment variables:
   - Create a `.env` file in the `backend` directory and add the following:

     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key

   
6. Start the project:
   - Start the backend server:

     cd backend
     npm run start

   - Start the frontend React app:

     cd ../frontend
     npm start


7. Open your browser and go to `http://localhost:4000` to see the site.

### Option 3: Project Video
You can view a working video of the project at [Insert Video Link Here].
