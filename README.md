# 1 Day Chat App Front End Project

This is the front end of 1 Day Chat App. It was created using [Next.js](https://nextjs.org) & [Emotion](https://emotion.sh).

You can choose username & channel that you want to chat. Or just skim throught the messages list to see what's people currently discussed.

## Project Structure

The logic of the project is in the `src` directory. The following are the sub directories inside of it:
- `api` this contains the setup of `ApolloClient` and `ChatApi`
- `components` contains chat app components
- `constants` contains the constants that used in this project
- `graphql` contains `queries` and `mutations` to use with `ApolloClient`
- `hooks` contains the custom hooks in this project
- `icons` SVG components
- `models` contains models that shared across project
- `utils` contains all of utilities for this project

## Install

Run below command to install all dependencies

```bash
yarn
```

or if you using NPM

```bash
npm install
```

## Start Development Server

Yarn

```bash
yarn dev
```

NPM

```bash
npm run dev
```

## Online Example

I deploy the [example here](https://wteja-1daychat.netlify.app)