# Eater UI

[Live version](https://eater-ui.netlify.app/)

## setup

install dependencies

```
npm install
```

run development environment

```
npm run dev
```

## storybook

```
npm run storybook
```

## deployment

### UI

App is hosted on Netlify.

Merge to `master` branch triggers build for the main app.

Preview deploys are created for PRs.

### Backend

Pipeline builds container image, which is deployed to Heroku.

[URL](https://eater-api.herokuapp.com/)
