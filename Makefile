SHELL := /usr/bin/env bash

####################
## Stach Commands ##
####################

setup: bundle-install pull-images

install-docker-compose:
	curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)"  -o /usr/local/bin/docker-compose && \
	mv ./docker-compose /usr/bin/docker-compose && \ 
	chmod +x /usr/bin/docker-compose
	
deploy: pull-images build start-prod 

build:
	docker-compose build && docker volume create --name=netflux-sync

setup-build: rebuild

rebuild: bundle-install build

bundle-install:
	bundle install --path .bundle/gems

start:
	bundle exec docker-sync-stack start

enter:
	docker exec -it netflux /bin/bash

start-dev:
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml up

start-prod: 
	docker-compose -f docker-compose.yml up 

start-sync:
	bundle exec docker-sync start --foreground

clean:
	bundle exec docker-sync-stack clean

pull-images:
	docker-compose pull

push-images:
	docker-compose push
