# Makefile for Python API Service
# Implements the standard 5 service targets: setup, dev, test, check, clean

.PHONY: help setup install env-check dev test check clean lint format typecheck build

VENV := .venv
PYTHON := $(VENV)/bin/python
UVICORN := $(VENV)/bin/uvicorn
PYTEST := $(VENV)/bin/pytest
RUFF := $(VENV)/bin/ruff
MYPY := $(VENV)/bin/mypy

help:
	@echo "API Service targets: setup, dev, test, check, clean"

setup: install env-check ## Install dependencies and setup environment

install:
	@which uv >/dev/null 2>&1 || (echo "Please install uv: brew install uv" && exit 1)
	@if [ ! -d "$(VENV)" ]; then uv venv; fi
	@uv pip install -e ".[dev]"

env-check:
	@if [ ! -f ".env" ] && [ -f ".env.example" ]; then cp .env.example .env; fi

dev: env-check ## Run development server with auto-reload
	@$(UVICORN) src.main:app --reload --host 0.0.0.0 --port 8000

build: ## Build API service (no-op)
	@echo "API Service requires no build step"

test: ## Run unit and integration tests
	@$(PYTEST) tests/

lint: ## Run linter
	@$(RUFF) check src/ tests/

format: ## Format code
	@$(RUFF) format src/ tests/

typecheck: ## Type check with mypy
	@$(MYPY) src/

check: lint typecheck test ## Run full quality checks

clean: ## Clean build and cache files
	@find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	@rm -rf .pytest_cache .ruff_cache .mypy_cache htmlcov .coverage
