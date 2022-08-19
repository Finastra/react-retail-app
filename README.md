<h1 align="center">React Retail App</h1>
<h6 align="center"> (Cmpletely resopnsive!)</h6>

<br>
  
<p align="center">
  <img src="https://raw.githubusercontent.com/reactjs/reactjs.org/main/src/icons/logo.svg" alt="Angular Logo" height="75"/>
  <img src="https://nestjs.com/img/logo-small.svg" height="75" alt="Nest Logo" />
  <img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" height="75" alt="Nx Logo">
  <img src="https://developer.fusionfabric.cloud/assets/img/ffdc-logo.png" height="75" alt="FFDC Logo" />
  <br>
  <br>
  <blockquote align="center"><h3></h3></blockquote>
</p>

<div align="center">
    Built with ❤️ using <b>Finastra Design System</b>
</div>

<br>

## 📸 User Interface

![Animation](/assets/Animation.gif)

<br>
<br>


## 🧪 Try me out

> 👉 [ReactRetailApp](https://react-retail-app.herokuapp.com/)

<br>
<br>



## 🗺 Architectural Diagram

<a href="https://www.fusionfabric.cloud/" target="blank"><img src="https://www.fusionfabric.cloud/sites/default/files/styles/banner_standard/public/image/2018-05/Fusion%20Operate%20Cloud%20%283%29.jpg"  alt="FusionFabric.cloud" /></a>

<br>

## 🌟 Features

<h3>
Client
<img src="https://raw.githubusercontent.com/reactjs/reactjs.org/main/src/icons/logo.svg" alt="Angular Logo" height="15"/>
</h3>

- Strict mode
- Smart and pure components pattern
- Self-contained components and encapsulated modules
- Components types (e.g. component, features)
- Amazing directory structure
- Dark mode
  <!-- - Dynamic titles and content meta tags -->
  <!-- - PWA -->
  <!-- - i18n -->

<h3>
Server
<img src="https://nestjs.com/img/logo-small.svg" height="15" alt="Nest Logo" />
</h3>

- Smart Logging (human-readable or JSON if console is not interactive)
- Proxy
- Auth ready

<br>
<br>

## Installation

1. [Register an application on FFDC](https://medium.com/finastra-fintechs-devs/create-an-application-on-finastras-developer-portal-d90ef266cafb)

You need to register an application on [FusionFabric.cloud Developer Portal](https://developer.fusionfabric.cloud) and select the following APIs:

- [Account and Balances - B2C](https://developer.fusionfabric.cloud/api/corporate-accounteinfo-me-v1-831cb09d-cc10-4772-8ed5-8a6b72ec8e01/docs) 
- [Consumer Profile](https://developer.fusionfabric.cloud/api/b2c-profile-v1-93a6ef22-0aa6-43f1-9624-f33ee8022e49/docs)
- [Person to Person Paymenys](https://developer.fusionfabric.cloud/api/b2c-p2p-v1-0ff75e33-5086-40d8-acb2-85d6a4a07698/docs)

2. Setup environment variables

Rename `.env.template` to `.env` and setup `OIDC_CLIENT_ID` , `OIDC_CLIENT_SECRET` , `OIDC_CLIENT_ID_B2B` and `OIDC_CLIENT_SECRET_B2B` from the application created at step 1. 👌🏼

3. Run `npm i`

<br>
<br>

## Build

This application contains 2 applications:

- React Application
- NestJs Application


So you need to run the following 2 commands:

```
npm run dev              # client build in watch mode
npm run start:server     # server build in watch mode
```

Go to http://localhost:3000 and enjoy your demo application 😊

> To build for production, use `npm run build`, which will build both the client and server, and then `npm run start` which will run the application!

<br>
<br>

## Environement variables

| Variable                  | Default value           |
| :-------------            | :---------------------- |
| `PORT`                    | `3000`                  |
| `OIDC_ORIGIN`             | `http://127.0.0.1:3000` |
| `SESSION_SECRET`          | `""`                    |
| `OIDC_SCOPE`              | `openid`                |     
| `OIDC_CLIENT_ID`          | `""`                    |
| `OIDC_CLIENT_SECRET`      | `""`                    |
| `FFDC`                    | `"https://api.fusionfabric.cloud"`                    |


<br>
<br>

## Logging in

| Username                  | Password                |
| :-------------            | :---------------------- |
| `ffdcuser1`               | `123456`                |
| `ffdcuser2`               | `123456`                |

<br>
<br>

## 🧙‍♂️ Commands

| Command        | Description                                                |
| :------------- | :--------------------------------------------------------- |
| `nx`           | See available commands                                     |
| `dev`          | Builds client in watch mode                                |
| `start:server` | Builds the server in watch mode                            |
| `start`        | Builds the client and then starts the server in watch mode |
| `build`   | Builds both client and server in production mode           |

<br>

_Below are some more advanced commands that might speed up your development flow:_

### Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@finastra/mylib`.

### Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

### Running unit tests

Run `npm t` to execute the unit tests via [Jest](https://jestjs.io).

Run `npm run test:cov` to execute the unit tests and output coverage.

Run `nx affected:test` to execute the unit tests affected by a change.

### Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

<br>

## Further help

- [Finastra's Developer Portal](https://developer.fusionfabric.cloud/documentation)
- [Finastra's Design System](https://design.fusionfabric.cloud)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Nx Documentation](https://nx.dev/angular)

<br>

[![Brought to you by Finastra](https://raw.githubusercontent.com/Finastra/finastra-nodejs-libs/develop/media/spread-knowledge-readme-banner%402x.png)](https://www.finastra.com/)