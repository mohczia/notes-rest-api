# Notes API Backend

Simple REST API for a notes application built with Node.js.
This project provides basic CRUD operations for managing notes.

## 🚀 Tech Stack

* Node.js
* REST API
* Postman (API Testing)

## 📂 Project Structure

src/
controller.js
notes.js
routes.js
server.js

* **server.js** → Start the HTTP server
* **routes.js** → Define API routes
* **controller.js** → Handle request logic
* **notes.js** → Store notes data

## ✨ Features

* Create note
* Get all notes
* Get note by ID
* Update note
* Delete note

## 📡 API Endpoints

| Method | Endpoint    | Description     |
| ------ | ----------- | --------------- |
| POST   | /notes      | Create new note |
| GET    | /notes      | Get all notes   |
| GET    | /notes/{id} | Get note by ID  |
| PUT    | /notes/{id} | Update note     |
| DELETE | /notes/{id} | Delete note     |

## ⚙️ Installation

Clone the repository

git clone https://github.com/mohczia/notes-app-back-end-ubuntu.git

Install dependencies

npm install

## ▶️ Run Server

npm run start

Server will run on:

http://localhost:3000

## 🧪 API Testing

API testing is done using Postman collection included in this repository.

Files:

* notes-api-test.postman_collection.json
* notes-api-test.postman_environment.json
