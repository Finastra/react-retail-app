
## Installation

Install my-project with npm

```bash
  npm i 
```

This project contains 2 apps, the server and the client.
You have to firstly build the client side by running the following command:

```bash
  yarn nx build retail-app
  npm nx build retail-app
```
And then serving the api by the following command:

```bash
  yarn nx serve api
  npm nx serve api
```
## Environement variables

| Variable         | Default value                                     |
| :--------------- | :------------------------------------------------ |
| `OIDC_CLIENT_ID` |                                                   |
| `CLIENT_SECRET`  |                                                   |
| `SESSION_SECRET` | Generated uiid                                    |
| `FFDC`           | `https://api.fusionfabric.cloud`                  |
| `PORT`           | `3000`                                            |
| `OIDC_ISSUER`    | `https://api.fusionfabric.cloud/login/v1/sandbox` |
| `OIDC_SCOPES`    | `openid`                                  |
| `OIDC_ORIGIN`    | `http://localhost:3000`                           |

## How to access

- Make sure to navigate your way through localhost:3000/login, and login with one of the following
  credentials:

| `Username`   | `Password`  |
| `ffdcuser1`  | 123456      |
