SRC := srcs/

all: build up

build: 
	sudo docker-compose build

up: 
	sudo mkdir -p ./volumes/db/data
	sudo docker-compose up -d

start: 
	sudo docker-compose start

stop:
	sudo docker-compose stop

down: 
	sudo docker-compose down

clear: 
	sudo docker-compose down
	sudo rm -rf ./volumes/db/data

re: down build up

.PHONY: all build up start stop down clear re