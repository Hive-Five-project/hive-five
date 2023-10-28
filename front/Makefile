# --------------------------------#
# "make" command
# --------------------------------#

-include ../make/text.mk
-include ../make/help.mk
-include ../make/url.mk

.SILENT:
.PHONY: build

## Setup - Install dependencies
install:
	npm install

## Setup - Update dependencies
update:
	npm update

## Serve - Serve the whole app
serve: export APP_RUNTIME_ENV ?= development
serve:
	npx vite

## Build - Build
build: export APP_RUNTIME_ENV ?= development
build:
	npx tsc && npx vite build

## Tests - Lint
lint: lint.eslint lint.tsc

lint.eslint:
	npx eslint . --fix --ext ts,tsx --report-unused-disable-directives --max-warnings 0

lint.tsc:
	npx tsc --noemit
