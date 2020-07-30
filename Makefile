#
# Env
#
-include .env

MAIN_CONTAINER := koa
DEFAULT_CONTAINER := koa
EXECUTOR = docker exec -i $(PROJECT_NAME)-$(DEFAULT_CONTAINER) /bin/sh -c

# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := logs term restart
SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS))
ifneq "$(SUPPORTS_MAKE_ARGS)" ""
    # use the rest as arguments for the command
    COMMAND_ARGS := $(or $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS)),$(DEFAULT_CONTAINER))
    # ...and turn them into do-nothing targets
    $(eval $(COMMAND_ARGS):;@:)
endif

#
##@ HELP
#

.PHONY: help
help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
.DEFAULT_GOAL := help

#
##@ DOCKER MASTER COMMANDS
#

install: ## Fully install the project with docker, then run a container
install:
	@${MAKE} checkenv; \
	 ${MAKE} vhosts; \
	 ${MAKE} build; \
	 ${MAKE} start-install;

start: ## Start container
start: stop docker-compose-up ${MAKE} logs;

start-install: ## Install vendors and then start
start-install: stop vendors docker-compose-up

stop: ## Stop container
stop: docker-compose-down

restart: ## Restart container
restart:
	docker-compose restart $(COMMAND_ARGS)

rl: ## Restart main container &
rl:
	@${MAKE} restart $(DEFAULT_CONTAINER); \
	 ${MAKE} logs $(DEFAULT_CONTAINER); \

#
##@ DOCKER UNIT COMMANDS
#

docker-compose-up: # Start a container
	@echo "Starting container...";
	@if [ "$(shell docker ps | grep $(PROJECT_NAME)-$(MAIN_CONTAINER))" != "" ]; then \
		echo "Container already up. Skipping."; \
	else \
		docker-compose up -d --force-recreate $(MAIN_CONTAINER); \
	fi;

docker-compose-down: # Stop a container
	@echo "Stopping container...";
	@if [ "$(shell docker ps | grep $(PROJECT_NAME)-$(MAIN_CONTAINER))" != "" ]; then \
		docker-compose down --remove-orphans --volumes; \
	else \
		echo "No container up. Skipping."; \
	fi;

vendors: # Install vendors
	@echo "Installing vendors...";
	@if [ -d node_modules ]; then \
		echo "Vendors already installed. Skipping."; \
	else \
		docker-compose up --build vendors; \
	fi; \

build: # Build docker image
	@echo "Building docker image..."
	docker-compose build

logs: ## Show & follow koa container logs
	docker logs --tail=50 -f $(PROJECT_NAME)-$(COMMAND_ARGS)

term: ## Enter in container terminal as root
	docker-compose exec -u root $(COMMAND_ARGS) /bin/sh

prettier:
	$(EXECUTOR) "npm run prettier"

cterm:
	docker-compose run koa /bin/sh
