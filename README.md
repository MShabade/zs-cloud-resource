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
## Setup
npm install
npm start

Open http://localhost:3000 in a browser.

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
