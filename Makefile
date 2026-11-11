# Root Makefile for Polyglot Service Monorepo
# Standard targets: help, setup, dev, test, check, clean

.PHONY: help setup dev test check clean sync-types up down build

# Default target
.DEFAULT_GOAL := help

# Colors
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[1;33m
RED := \033[0;31m
NC := \033[0m

help: ## Show this help message
	@echo "$(BLUE)Available targets across all services:$(NC)"
	@awk 'BEGIN {FS = ":.*##"; printf "\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@echo ""
	@echo "$(YELLOW)Services present:$(NC)"
	@ls -d services/* 2>/dev/null || echo "  (no services found)"

setup: ## Install dependencies and prepare environment for all services
	@echo "$(BLUE)⚙️  Setting up all services...$(NC)"
	@for service in services/*; do \
		if [ -d "$$service" ] && [ -f "$$service/Makefile" ]; then \
			echo "$(GREEN)--> Setting up $$service$(NC)"; \
			$(MAKE) -C "$$service" setup || exit 1; \
		fi \
	done
	@echo "$(GREEN)✅ All services initialized successfully!$(NC)"

dev: ## Start dev servers (displays usage or runs concurrently)
	@echo "$(BLUE)🚀 Starting development environment...$(NC)"
	@echo "$(YELLOW)Run individual services with:$(NC)"
	@for service in services/*; do \
		if [ -d "$$service" ]; then \
			name=$$(basename "$$service"); \
			echo "  make -C $$service dev   # (starts $$name)"; \
		fi \
	done

build: ## Build all services for production
	@echo "$(BLUE)🔨 Building all services...$(NC)"
	@for service in services/*; do \
		if [ -d "$$service" ] && [ -f "$$service/Makefile" ]; then \
			echo "$(GREEN)--> Building $$service$(NC)"; \
			$(MAKE) -C "$$service" build || exit 1; \
		fi \
	done
	@echo "$(GREEN)✅ All services built successfully!$(NC)"

test: ## Run test suites across all services
	@echo "$(BLUE)🧪 Running tests across all services...$(NC)"
	@for service in services/*; do \
		if [ -d "$$service" ] && [ -f "$$service/Makefile" ]; then \
			echo "$(GREEN)--> Testing $$service$(NC)"; \
			$(MAKE) -C "$$service" test || exit 1; \
		fi \
	done
	@echo "$(GREEN)✅ All tests passed!$(NC)"

check: ## Run linting, formatting, and type checks across all services
	@echo "$(BLUE)🔍 Running lint and type checks across all services...$(NC)"
	@for service in services/*; do \
		if [ -d "$$service" ] && [ -f "$$service/Makefile" ]; then \
			echo "$(GREEN)--> Checking $$service$(NC)"; \
			$(MAKE) -C "$$service" check || exit 1; \
		fi \
	done
	@echo "$(GREEN)✅ All checks passed!$(NC)"

clean: ## Clean build artifacts, temporary caches, and logs across all services
	@echo "$(BLUE)🧹 Cleaning up build artifacts across all services...$(NC)"
	@for service in services/*; do \
		if [ -d "$$service" ] && [ -f "$$service/Makefile" ]; then \
			echo "$(GREEN)--> Cleaning $$service$(NC)"; \
			$(MAKE) -C "$$service" clean || true; \
		fi \
	done
	@rm -rf logs/*.log
	@echo "$(GREEN)✅ Clean completed!$(NC)"

up: ## Start backing infrastructure (docker-compose)
	@if [ -f "docker-compose.yml" ]; then \
		echo "$(BLUE)🐳 Starting backing containers...$(NC)"; \
		docker compose up -d; \
	fi

down: ## Stop backing infrastructure (docker-compose)
	@if [ -f "docker-compose.yml" ]; then \
		echo "$(BLUE)🛑 Stopping backing containers...$(NC)"; \
		docker compose down; \
	fi

sync-types: ## Sync OpenAPI schema from API service to frontend TypeScript types
	@if [ -d "services/web" ] && [ -d "services/api" ]; then \
		echo "$(BLUE)🔄 Syncing API OpenAPI types to web service...$(NC)"; \
		curl -s http://localhost:8000/openapi.json > services/web/src/types/openapi.json || (echo "$(RED)Failed to fetch openapi.json. Ensure API is running on :8000$(NC)" && exit 1); \
		npx --yes openapi-typescript services/web/src/types/openapi.json -o services/web/src/types/api.d.ts; \
		echo "$(GREEN)✅ Types synced to services/web/src/types/api.d.ts$(NC)"; \
	else \
		echo "$(YELLOW)Skipping sync-types: requires both services/api and services/web$(NC)"; \
	fi
