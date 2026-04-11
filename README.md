# Cloud Resource Utilization Management System
Module: B9IS123 - Programming for Information Systems
Organisation: ZS Associates

## About
A web-based system to manage and monitor cloud resources for ZS Associates. Built with Node.js, Express, and a JSON data store. The frontend communicates with the backend through a REST API.

## Features

Add, view, update and delete cloud resources (full CRUD)
Search resources by name, type, region or status
Dashboard with summary statistics
Currency converter using live exchange rates (Frankfurter API)
Input validation on both frontend and backend
## Tech Stack

Backend: Node.js, Express
Data Store: JSON file
Frontend: HTML, CSS, vanilla JavaScript
Testing: Jest, Supertest

## Setup – Local Access

- Install dependencies:  
  `npm install`

- Start the application:  
  `npm start`

- Open in browser:  
  http://localhost:3000


## Setup using EC2 Host

- Launched an AWS EC2 t2.micro (Free Tier) instance in Ireland (eu-west-1) using Amazon Linux 2023  

- Connected securely via SSH:  
  `ssh -i zs-resource-manager-key.pem ec2-user@52.215.183.57`

- Opened required ports (22, 80, 3000) and updated system:  
  `sudo yum update`

- Installed Node.js 18 and PM2 globally  

- Uploaded project files using SCP:  
  `scp -i key-file -r folder ec2-user@52.215.183.57:/home/ec2-user/`

- Installed dependencies:  
  `npm install --production`

- Started the application using PM2:  
  `PORT=3000 pm2 start server.js --name zs-app`

- Saved PM2 configuration:  
  `pm2 save` and `pm2 startup`

- Access the application:  
  http://52.215.183.57:3000

## Run Tests
npm test

42 tests across unit and integration suites.

## Project Structure
backend/
server.js - Express server
operations.js - CRUD functions
routes/resources.js - API route handlers
data/resources.json - Data store
frontend/
index.html - Single-page frontend
tests/
unit.test.js - Unit tests (28 tests)
## API Endpoints

| Method | Endpoint               | Description                           |
|--------|------------------------|---------------------------------------|
| GET    | /api/resources         | List all resources (supports ?search) |
| GET    | /api/resources/:id     | Get resource by ID                    |
| POST   | /api/resources         | Create new resource                   |
| PUT    | /api/resources/:id     | Update resource by ID                 |
| DELETE | /api/resources/:id     | Delete resource by ID                 |
| GET    | /api/rates             | Fetch live USD exchange rates         |

---
*42 tests total - all passing. Run `npm test` to verify.*

## Notes
- All API endpoints return JSON
- Data persists to backend/data/resources.json
- Run npm install before npm start or npm test
