SHELL := /usr/bin/env bash

####################
## Stach Commands ##
####################

setup: bundle-install pull-images

deploy: pull-images build start-prod 

build:
	docker-compose build --no-cache

setup-build: rebuild

rebuild: bundle-install build

bundle-install:
	bundle install --path .bundle/gems

start:
	docker volume create --name=netflux-sync && bundle exec docker-sync-stack start

enter:
	docker exec -it netflux /bin/bash

start-dev:
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml up

start-prod: 
	docker-compose -f docker-compose.yml up -d

start-sync:
	bundle exec docker-sync start --foreground

test:
	docker exec -it netflux yarn test --forceExit

clean:
	bundle exec docker-sync-stack clean

pull-images:
	docker-compose pull

push-image:
	docker push aminehmida/netflux
	docker tag aminehmida/netflux aminehmida/netflux:${TRAVIS_TAG}
	docker push aminehmida/netflux:${TRAVIS_TAG}
	echo "Push finish"
