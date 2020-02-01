# [Backend part of the "Mesto" project](https://api.mesto-olgamiliukova.ml)

## Description
The package is a Yandex Praktikum project which contains the implementation of backend part of the [Mesto project](https://mesto-olgamiliukova.ml) - [https://api.mesto-olgamiliukova.ml](https://mesto-olgamiliukova.ml)

The latest release [https://github.com/olgamiliukova/13-rest-api-mesto/releases/latest](https://github.com/olgamiliukova/13-rest-api-mesto/releases/latest)

## Install
```
git clone https://github.com/olgamiliukova/13-rest-api-mesto.git
```
```
# npm
npm install -y
# or yarn
yarn install
```
## Configure .env
```
# cat
cat .env.dist > .env
# or cp
cp .env.dist .env
```
## Setup secret to .env
```
# npm
npm run secret
# or yarn
yarn run secret
```
## Setup seeds 
```
# npm
npm run seed
# or yarn
yarn run seed
```
## Development
```
# npm
npm run dev
# or yarn
yarn run dev
```
## Linting
```
# npm
npm run eslint
# or yarn
yarn run eslint
```
## Production
```
# npm
npm run start
# or yarn
yarn run start
```
## Authentication
### HTTP Methods
Signup user
```
POST /signup
```
Signin user
```
POST /signin
```
## API Resource "Cards"
#### JSON Schema
```
{
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: User,
    required: true,
  },
  likes: {
    type: [User],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}
```
### HTTP Methods
Get card list
```
GET /cards
```
Get card by id
```
GET /cards/:id
```
Create new card
```
POST /cards
```
Update card by id
```
PUT /cards/:id
```
Delete card by id
```
DELETE /cards/:id
```
Make like to a card
```
PUT /cards/:id/likes
```
Make unlike to a card
```
DELETE /cards/:id/likes
```
## API Resource "Users"
#### JSON Schema
```
{
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 30,
  },
  salt: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  }
}
```
### HTTP Methods
Get user list
```
GET /users
```
Get current/authenticated user
```
GET /users/me
```
Get user by id
```
GET /users/:id
```
Create new user
```
POST /users
```
Update current/authenticated user
```
PATCH /users/me
```
Update user by id
```
PUT /users/:id
```
Delete user by id
```
DELETE /users/:id
```
