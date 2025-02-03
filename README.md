# CarDealers Project

## Description
CarDealers is a web application that allows users to manage car dealerships and their associated vehicles. Users can add, edit, and delete car dealers and cars, as well as manage car features. The project consists of a **Flask backend** and a **React frontend**.

## Features
- Display a list of car dealers on the homepage
- Add, edit, and delete car dealers
- View cars associated with a dealer
- Add, edit, and delete cars
- Assign features to cars


## Technologies Used
### **Frontend:**
- React.js
- React Router
- CSS for styling

### **Backend:**
- Flask
- Flask SQLAlchemy (for database management)
- SQLite/PostgreSQL

## Setup Instructions
### **Backend Setup**
1. Clone the backend repository:
   ```sh
   git clone <backend-repo-url>
   cd backend
   ```
2. Create and activate a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # Mac/Linux
   venv\Scripts\activate  # Windows
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Set up and run the Flask server:
   ```sh
   flask run
   ```

### **Frontend Setup**
1. Clone the frontend repository:
   ```sh
   git clone git@github.com:Fidelis-Muteti/phase-4-CarDealers-project-frontend.git
   cd phase-4-CarDealers-project-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```

## API Endpoints
### **Dealers**
- `GET /dealers` - Get all dealers
- `POST /dealers` - Create a new dealer
- `DELETE /dealers/:id` - Delete a dealer

### **Cars**
- `GET /cars` - Get all cars
- `POST /cars` - Add a new car
- `PATCH /cars/:id` - Edit a car
- `DELETE /cars/:id` - Delete a car

### **Features**
- `GET /features` - Get all available features
- `POST /cars/:id/features` - Assign features to a car

## Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Home.jsx
│   │   ├── Dealers.jsx
│   │   ├── Cars.jsx
│   │   ├── CarForm.jsx
│   │   ├── FeaturesForm.jsx
│   │   ├── CarList.jsx
│   ├── App.jsx
│   ├── index.js
│   ├── App.css
├── public/
│   ├── index.html
├── package.json
backend/
├── app.py
├── models.py
├── routes.py
├── database.db
```

## Contributing
If you want to contribute:
1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit: `git commit -m "Description of changes"`
4. Push the changes: `git push origin feature-branch`
5. Submit a pull request
Deployed backend link: https://phase-4-cardealers-project-backend-flask-x2hc.onrender.com

## Author
**Fidelis Muteti**

## License
This project is licensed under the MIT License.

