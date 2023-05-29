build:
	docker build -t tgbot .

run:
	docker run -d -p 8080:8080 --name tgbot --rm tgbot
