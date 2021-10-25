# Eater API

## local setup

update `.env` file based on provided example

### dependencies

install dependencies

```
npm i
```

### database

run Postgres

```
docker-compose up
```

apply migrations

```
npm run prisma:migrate
```

### app

generate Prisma client

```
npm run prisma:generate
```

run tsc with watch flag

```
npm run watch
```

run watcher to refresh the server after

```
npm run dev
```
