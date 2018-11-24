
# Movie App

This project use **Ruby on rails as Backend**, **React as Frontend** and **Postgres as Database**

## Running App

Create, migrate and seed database

	docker-compose run backend rails db:setup
	
Reset and re-seed database

	docker-compose run backend rails db:setup

Build backend and frontend application

	docker-compose up --build
