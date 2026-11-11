# Common tasks. The web app lives in services/web; every target runs there.
WEB := services/web
NPM := npm --prefix $(WEB)

.PHONY: help setup dev build preview lint format typecheck test verify clean
.DEFAULT_GOAL := help

help: ## Show available targets
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[32m%-10s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

setup: ## Install dependencies and git hooks
	@$(NPM) ci
	@command -v pre-commit >/dev/null || { echo "Install pre-commit first: brew install pre-commit"; exit 1; }
	@pre-commit install --install-hooks

dev: ## Start the dev server on http://localhost:3000
	@$(NPM) run dev

build: ## Build the static site into services/web/out
	@$(NPM) run build

preview: build ## Build, then serve the static export locally
	@$(NPM) run preview

lint: ## Run ESLint
	@$(NPM) run lint

format: ## Format all files with Prettier
	@$(NPM) run format

typecheck: ## Type-check with TypeScript
	@$(NPM) run typecheck

test: ## Run unit tests
	@$(NPM) test

verify: ## Run everything CI and Netlify run (format, lint, types, tests, build, export check)
	@$(NPM) run verify

clean: ## Remove build output and caches
	@rm -rf $(WEB)/.next $(WEB)/out $(WEB)/tsconfig.tsbuildinfo
