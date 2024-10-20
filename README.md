Steps to Run the Node.js Server:

1) Ensure MongoDB is Running: Make sure you have MongoDB installed and running on your system.
If MongoDB is not installed, follow the MongoDB installation guide.
To start MongoDB, run:
mongod

2) Setup Project Directory:

Save your code in a directory (e.g., healthcare-service-api).

3) Initialize Node.js Project:
Open a terminal or command prompt in your project directory and run:
npm init -y
This will generate a package.json file.

4) Install Required Dependencies:

Install Express, Mongoose, Joi, and Body-Parser by running:
npm install express mongoose joi body-parser

5) Run the Server:
Once everything is set up, run the server using the following command:
node App.js
(Assuming your file is named App.js.)

6) Check MongoDB Connection:
In the terminal, you should see MongoDB connected if the connection is successful. If there is an error, check your MONGO_URI and MongoDB status.

7) Install Postman:
Download and install Postman to test the API.

Testing API Endpoints using Postman

1. Add a New Service (POST Request)
Endpoint: POST http://localhost:5000/api/services
An example screenshot is attached

When the service already exists, the following will be displayed
{
  "message": "Service with this name already exists"
}

2. Get All Services (GET Request)
Endpoint: GET http://localhost:5000/api/services
An example screenshot is attached

4. Update a Service (PUT Request)
Endpoint: PUT http://localhost:5000/api/services/<service_id>
Replace <service_id> with the actual ID of the service you want to update.

5. Delete a Service (DELETE Request)
Endpoint: DELETE http://localhost:5000/api/services/<service_id>

MongoDB Connection Issues:

Ensure MongoDB is running.
Make sure your MONGO_URI is correct. It should be mongodb://localhost:27017/healthcareServices.
Invalid JSON in Postman: Ensure that your POST, PUT requests are in the correct JSON format (not form-data or x-www-form-urlencoded).

By following these steps, you should be able to run and test your healthcare services API using Node.js, Express, MongoDB, and Postman!
