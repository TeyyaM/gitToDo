# gitToDo
## Project guideline

## Routes

GET - /todos - want all the todos for all the users.
GET - /todos/:userid - Get all the todos for a specific user.
GET - /todos/:userid/:todoid - Get one specifi to to for a specific user.

POST - /todos/:userid - Post new To Do item to the the To Do list of a specific user.
POST - /todos/:userid/:todoid - Update specific To Do that is on a specific user's list to complete. which will timestamp the database, and will remove it from the users list.

## Flow

1. Login page
2. User page with the add To Do feature
3. User page with to do list (FEATURES: delete/complete/edit)
4. Logout at the top header of every page. Brings you back to login page.

## HTML pages

1. Header - contains logo/business name + username && logout button || login button
  * is appended to the top of every HTML pages.
2. Login - Input user name and password + login button.
3. todo-new - page to add new To Do items to the list.
4. todo-index - Page showing all of our to-do list categories.
5. todo-list - Page showing a specific to-do list category.
5. todo-edit - Editing page for delete/complete/edit.

## API

1. Food/eat:
	Documenu (restaurants and menus) https://rapidapi.com/restaurantmenus/api/documenu
	
2. Read: 
	Goodreads https://www.goodreads.com/api

3. watch: 
	Movie Database (IMDB Alternative) - https://rapidapi.com/rapidapi/api/movie-database-imdb-alternative 
	IMDB - https://rapidapi.com/amrelrafie/api/movies-tvshows-data-imdb

4. buy: 
	Axesso (Walmart Data Service) https://rapidapi.com/axesso/api/axesso-walmart-data-service

5. If no match, then set NULL || input from user:
