<!-- ![Logo of the project](./images/logo.sample.png) -->

# 46brew &middot;

> A simple app to help you brew the perfect cup ☕️

Inspired by the 4:6 brewing method I wanted to create a simple tool that would help me along the way, giving me the stats I need while I brew my coffee ☕️ 👷‍♂️

## Installing / Getting started

```shell
yarn install
yarn start
```

This runs the server in production.

## Developing

### Built With

This project uses [Next.js](nextjs.org) which makes it easy to create React apps with zero config. Styling is done with [Tachyons](http://tachyons.io/), and custom stuff is achieved with Next's built in [Styled JSX](https://www.npmjs.com/package/styled-jsx). Check out [the NextJS blog](https://nextjs.org/blog/styling-next-with-styled-jsx) for a good primer.

### Prerequisites

A fresh Node version (I think 11 is the minimum requirement).

### Setting up Dev

1. To start developing, first clone the repo

```shell
git clone https://github.com/rix1/46brew.git 46brew
cd 46brew/
yarn install
```

2. Set local environment variables by copying the `dev-template.env` template file to `.env`:

```shell
cp dev-template.env .env
```

That's it! To fire up a local dev server, do:

```shell
yarn dev
```

See additional scripts in `package.json`.

### Building

To build a production ready application, do:

```shell
yarn build
```

Nextjs is set up with Webpack(?) and Babel, and takes care of bundeling everyhing for us.

### Deploying / Publishing

The [46brew.app site](https://46brew.app/) is kept up to date with the `master` branch due to Vercel's Github integration.
This integration also deploy previews of all branches.

I found it useful to do semantic versioning and tag major releases to make improve the analytics experience.

To do this, I've set up [np](https://github.com/sindresorhus/np) to create new releases. However, as
this app isn't available on NPM, we've configured it to skip the actual publishing. This way, the tool only helps me
bump version numbers, tag stuff correctly and use [Github's releases page](https://github.com/rix1/46brew/releases) with specific notes.

## Tests

I'm thinking about using Jest, but I guess I'll with installing this until I need it.

## Style guide

Using Prettier for formatting, Eslint for linting and Flowtype for static type checking.

## Licensing

Not yet decided, so for now it's free for anyone to do whatever 🙃
