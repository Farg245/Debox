# Debox

## Table of Contents

- [Project Description](#project-description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Time](#time)

## Project Description

Debox is the backend of an online delivery application that allows guest users to view items and submit orders. It also includes a simple web page in plain HTML for the admin to view and manage orders. The backend is built with Node.js, and the database used is MongoDB hosted on MongoDB Atlas.

## Prerequisites

Before running the application, make sure you have the following prerequisites:

- Node.js
- Postman Desktop Application for testing API endpoints. You can use the [Postman Collection](https://www.postman.com/winter-astronaut-614435/workspace/debox/collection/18021096-f018896d-0696-45ca-80c8-a9c5c67b6f67?action=share&creator=18021096) provided and make sure to choose the Debox environment on the top right of the Postman app so that authentication works as intended.


## Installation

To install and run the application, follow these steps:

1. Clone the repository to your local machine.
2. Open a terminal and navigate to the project directory.
3. Run the following command:
  npm run install-run

  This script will install the dependencies specified in the package.json file and start the application using nodemon.

Make sure you have Node.js and npm installed on your machine with the versions specified in the engines section of the package.json file.

## API Documentation

This node.js project runs locally on port 8000. Please ensure that port is not in use on your machine. The application is connected to an online MongoDB database and makes axios calls to the fixer.io API for currency conversions (free tier). If the API calls run out, the app may crash.

The API endpoints can be tested using an application like Postman. If you follow the [Postman Collection link](https://www.postman.com/winter-astronaut-614435/workspace/debox/collection/18021096-f018896d-0696-45ca-80c8-a9c5c67b6f67?action=share&creator=18021096), make sure to choose the Debox environment on the top right of the Postman app so that logins work as intended.

### Food API

- `GET /food`: Retrieves all the food items from the MongoDB food collection.
- `GET /food/:category`: Retrieves food items by category (Beverages, Main Dishes, Appetizers).
- `GET /food/vegan`: Retrieves only vegan food items.
- `GET /food/allergenfree`: Retrieves only allergen-free food items.
- To convert the food price to a different currency, append `?currency=<desired_currency>` to the URL. For example, `GET /food/?currency=USD` converts the food price to USD from the default currency (EUR).

### User API

- `POST /user/signup`: Sign up a new user by providing the necessary details in the request body.
- `POST /user/login`: Log in as a user by providing the email and password in the request body. Credentials are provided for test purposes.
- `GET /user/profile`: Get the profile of the currently logged-in user.
- `GET /user/cart/:id`: Add an item with the given `id` to the user's cart.
- `POST /user/cart/:id/qty`: Edit the quantity of an item in the user's cart.
- `POST /user/add-order`: Add the contents of the user's cart to the order collection. Supports currency conversion by appending `?currency=<desired_currency>` as a request query parameter.
- `GET /user/order`: View all the orders made by the user.

### Admin/Merchant API

- Admin/Merchant login is done from `/authlogin.html`.
- `POST /auth/login`: Log in as an admin/merchant by providing the necessary credentials.
- `GET /merchant/viewall`: Get all the orders in the collection.
- `GET /merchant/pendingorders`: Get the pending orders.
- `GET /merchant/completedorder/:orderID`: Mark the order with the specified `orderID` as completed.

Web app link: http://localhost:8000/authlogin.html

Again, all these endpoints can be tested from Postman using the provided [Postman Collection](https://www.postman.com/winter-astronaut-614435/workspace/debox/collection/18021096-f018896d-0696-45ca-80c8-a9c5c67b6f67?action=share&creator=18021096). If you follow the link, make sure to choose the Debox environment on the top right of the Postman app so that logins work as intended.

## Deployment

Currently, there is no cloud deployment for this project. Deployment to a cloud service is planned for the future.

## Time

This project was built from scratch, and it took approximately 12-15 hours to complete.
