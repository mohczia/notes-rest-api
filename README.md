# Notes REST API

A RESTful API for managing notes with authentication, authorization, and collaboration features.

---

## 🚀 Features
- User Authentication (Register & Login)
- CRUD Notes (Create, Read, Update, Delete)
- Notes Collaboration (share notes with other users)
- Authorization (only owner/collaborator can access notes)

---

## 🛠 Tech Stack
- Node.js
- Express.js
- PostgreSQL

---

## 📦 Installation

Clone this repository:

git clone https://github.com/mohczia/notes-rest-api.git

Install dependencies:

npm install

Run the server:

npm run start:dev

---

## 📡 API Endpoints

### Notes
- GET /notes → Get all notes
- POST /notes → Create a new note
- GET /notes/{id} → Get note by ID
- PUT /notes/{id} → Update note
- DELETE /notes/{id} → Delete note

---

## 📁 Project Structure

src/
 ├── exceptions/
 ├── middlewares/
 ├── routes/
 ├── security/
 ├── server/
 ├── services/
 ├── utils/
 └── server.js

---

## 🧪 API Testing

Postman is available in:
Notes API Test.postman_collection.json
postman/Notes API Test.postman_environment.json

---

## 👤 Author

M.ZIAULHAQ