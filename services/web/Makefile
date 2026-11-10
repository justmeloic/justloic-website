# Makefile for Web Service
# Implements the standard 5 service targets: setup, dev, test, check, clean

.PHONY: help setup env-check dev build test lint check clean

help:
	@echo "Web Service targets: setup, dev, test, check, clean"

setup: env-check ## Install dependencies and prepare environment
	@npm install

env-check:
	@if [ ! -f ".env.local" ] && [ -f ".env.example" ]; then cp .env.example .env.local; fi

dev: env-check ## Run development server
	@npm run dev

build: ## Build for production
	@npm run build

test: ## Run tests
	@npm run test

lint: ## Run linter
	@npm run lint

check: lint test ## Run full checks

clean: ## Clean build output
	@rm -rf .next out node_modules/.cache
