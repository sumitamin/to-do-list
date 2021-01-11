Welcome to task manager repo

# Directory information
Backend is located in / (root)  
Frontend is located in /client

# Packages used in backend
bcryptjs - encryt/decrypt user password  
body-parser - make all incoming request body available under req.body  
concurrently - run front end and back end concurrently in one command  
cors - to allow request from another origin  
dotenv - save db credential, key etc. security purpose  
express - node framework for backend application  
jsonwebtoken - assign token for each user and make token based api  
mysql - connect to mysql  
nodemon - restart node on save  

# Packages used in frontend
@material-ui/core - ui package  
@material-ui/icons - ui icon  
@material-ui/lab - ui package  
@react-pdf/renderer - pdf creator and download  
axios - api calls to get login/signup and create/update/delete/archive task  
connected-react-router - sync router state with redux and provides methog back, replace, push etc  
dotenv - set port to 3001  
react - front end react library  
react-dom - convert react javascript to dom element  
react-drag-list - allow task list dragging to set priority  
react-redux - binds react to redux  
react-router - routing to different screen/page in website wrt to url  
react-router-dom - binds react router to dom  
react-router-scroll-4 - add scroll feature  
react-scripts - includes scripts and packages for react  
redux - globall store to save state which can be accessed by project  
redux-logger - consoles each action call for redux, helps in debugging  
redux-saga - middleware for redux, to perform all necessary task to save/update redux  

# .env file
credential and keys are saved in .env file.  
connection string to mongodb is represented by dbUrl in, change it to yours if necessary  

# Steps to set up project
install latest node LTS  
install npm or yarn globally  
git clone https://github.com/sumitamin/to-do-list.git

# From root folder of project go to /client with
cd client  

# Copy environment variable in frontend
cp env.example .env

# Install dependencies for frontend
'yarn install' or 'npm install'  

# Get back to root folder by
cd ..  

# Copy environment variable in backend
cp env.example .env

# Install dependencies for backend
'yarn install' or 'npm install'  

# Run project
'npm run dev' or 'yarn run dev'  

# Project flow
login or sign up to log into application  
add task of your choice  
delete/ edit or set complete task   