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

## Linting

### Eslint/Prettier

Run eslint on all js and jsx files in src folder

```
npm run lint
```

Fix all potentially fixable eslint errors and warnings

```
npm run lint:fix
```

### Stylelint

Run stylelint on all scss files in src folder

```
Npm run style
```

Fix all potentially fixable stylelint errors and warnings

```
npm run style:fix
```

### VSCode Extensions

It's preferred to install:
- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)