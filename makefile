test:
	./node_modules/.bin/mocha --reporter list

watch:
	./node_modules/.bin/mocha --reporter list --watch

.PHONY: test
.PHONY: watch