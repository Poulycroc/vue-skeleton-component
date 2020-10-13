CURRENT_DATE=`date +%Y-%m-%d.%H:%M:%S`

build:
	npm run build-lib

audit:
	npm audit fix

clean-install:
	rm package-lock.json
	rm -rf node_modules/
	npm i

release:
	make build
	git add .
	git commit -m "release _ $(CURRENT_DATE)"
	git push
	
