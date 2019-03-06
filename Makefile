SHELL := /usr/bin/env bash

####################
## Stach Commands ##
####################


setup: bundle-install pull-images pull-dependencies

deploy: setup build start 

build:
	docker-compose build

setup-build: rebuild pull-dependencies

rebuild: bundle-install build

bundle-install:
	bundle install --path .bundle/gems

start-sync:
	bundle exec docker-sync-stack start

start-dev:
	docker volume create --name=netflux-sync && docker-compose -f docker-compose.yml -f docker-compose-dev.yml up

start: 
	docker-compose -f docker-compose.yml up 

start-sync:
	bundle exec docker-sync start --foreground

clean:
	bundle exec docker-sync-stack clean

pull-images:
	docker-compose pull

push-images:
	docker-compose push

pull-dependencies:



