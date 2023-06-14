<p align="center">
  <img src="https://storage.googleapis.com/meongku/logo-app/meongku-logo.png" alt="Meongku Logo" width="250" height="250" />
</p>

<h1 align="center">Meongku Web Service API</h1>

<div align="center">

[![CC Member](https://img.shields.io/github/contributors/arisafriyanto/meongku-api?color=blue)](#cc-member)
[![Dependency](https://img.shields.io/node/v/@hapi/hapi)](#dependency)
[![Issue](https://img.shields.io/github/issues/arisafriyanto/meongku-api)](https://github.com/arisafriyanto/meongku-api/issues)
[![Pull Request](https://img.shields.io/github/issues-pr/arisafriyanto/meongku-api)](https://github.com/arisafriyanto/meongku-api/pulls)
[![License](https://img.shields.io/github/license/arisafriyanto/meongku-api?color=blue)](https://github.com/arisafriyanto/meongku-api/blob/main/LICENSE)

</div>

Meongku Web Service API is a web service that can accurately identify cat breeds, provide breed-specific information, and recommend food products. This service is designed to help pet owners understand their cats better and provide care that suits their pets' needs.

The first thing you need to know is that the service requires authentication to access each service. You need to register to use the service. You can register on the service register. You can register using your name, email, password, and phone number. After successfully registering, you can use the email and password you registered to log in. If you have any ideas to improve the security of this service, please contact us.

> Base url of this service is: http://localhost:3000

## Installation

- Clone repository with the following command: \
  `git clone https://github.com/arisafriyanto/meongku-api.git`

- Move to the repository directory with the command: \
  `cd meongku-api`

- Run the following command to install the depedency: \
  `npm install`

- Save `serviceAccountKey.json` in the root directory obtained from your Firebase project.

- Edit file `.env` in the root directory and make sure the configuration values match your Firebase project.

  <pre>
  PORT=3000
  API_KEY=YOUR_API_KEY
  AUTH_DOMAIN=YOUR_AUTH_DOMAIN
  PROJECT_ID=YOUR_PROJECT_ID
  STORAGE_BUCKET=YOUR_STORAGE_BUCKET
  MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
  APP_ID=YOUR_APP_ID
  MEASUREMENT_ID=YOUR_MEASUREMENT_ID
  NODE_ENV=localhost</pre>

## The service available

- **Authentications**

  | Endpoint  | Method |                    Description                     |
  | :-------: | :----: | :------------------------------------------------: |
  | /register |  POST  |    HTTP POST REQUEST post data to our Firestore    |
  |  /login   |  POST  | HTTP POST REQUEST to login with email and password |
  |  /logout  |  POST  |       HTTP POST REQUEST to logging out user        |

  <pre>POST /register</pre>
  <pre>POST /login</pre>
  <pre>POST /logout</pre>

- **Home**

  | Endpoint | Method |              Description              |
  | :------: | :----: | :-----------------------------------: |
  |    /     |  GET   |           HTTP GET REQUEST            |
  | /{any\*} |  GET   | HTTP GET REQUEST to url not available |

  <pre>GET /</pre>
  <pre>GET /{any*}</pre>

- **Users**

  |          Endpoint          | Method |              Description               |
  | :------------------------: | :----: | :------------------------------------: |
  |        /users/{uid}        |  GET   |            HTTP GET REQUEST            |
  |        /users/{uid}        |  PUT   | HTTP PUT REQUEST to edit profile user  |
  | /users/{uid}/edit-password |  PUT   | HTTP PUT REQUEST to edit user password |

  <pre>GET /users/{uid}</pre>
  <pre>PUT /users/{uid}</pre>
  <pre>PUT /users/{uid}/edit-password</pre>

- **Articles**

  |    Endpoint    | Method |              Description              |
  | :------------: | :----: | :-----------------------------------: |
  |   /articles    |  GET   |           HTTP GET REQUEST            |
  | /articles/{id} |  GET   | HTTP GET REQUEST to get article by id |

  <pre>GET /articles</pre>
  <pre>GET /articles/{id}</pre>

- **Cats**

  |  Endpoint  | Method |            Description            |
  | :--------: | :----: | :-------------------------------: |
  |   /cats    |  GET   |         HTTP GET REQUEST          |
  | /cats/{id} |  GET   | HTTP GET REQUEST to get cat by id |

  <pre>GET /cats</pre>
  <pre>GET /cats/{id}</pre>

- **Cat Food Recommendations**

  |         Endpoint          | Method |                       Description                        |
  | :-----------------------: | :----: | :------------------------------------------------------: |
  | /cat-food-recommendations |  POST  | HTTP POST REQUEST to get cat food product recommendation |

  <pre>POST /cat-food-recommendations</pre>

## Authentications

This service uses a id token that is created as a session cookie to more easily create an expired token in Firebase for authentication. You must have an account to access this service. First, if you do not have an account, create a new account. Then, login to get a session id for authentication. You need to authenticate yourself with your email and password. If the authentication is valid, you can use this session id to access the protected service. Otherwise, you will get an error message and be expected to log in.

## Dependency

- [Hapi Server](https://www.npmjs.com/package/@hapi/hapi)
- [Hapi Boom](https://www.npmjs.com/package/@hapi/boom)
- [Firebase](https://www.npmjs.com/package/firebase)
- [Firebase Admin](https://www.npmjs.com/package/firebase-admin)
- [DotEnv](https://www.npmjs.com/package/dotenv)
- [Joi](https://www.npmjs.com/package/joi)
- [Nodemon](https://www.npmjs.com/package/nodemon)

## Testing

This Web service uses Postman to test.

You can download the Postman documentation <a href="https://documenter.getpostman.com/view/27795742/2s93sWAGPe" target="_blank">here</a>
