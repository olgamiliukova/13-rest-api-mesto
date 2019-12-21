# [13-rest-api-mesto](https://olgamiliukova.github.io/13-rest-api-mesto/)

## Description
The package is a Yandex Praktikum project which contains the implementation of backend part of the [Mesto project](https://olgamiliukova.github.io/11-web-app-infrastructure/)

The latest release [https://github.com/olgamiliukova/13-rest-api-mesto/releases/latest](https://github.com/olgamiliukova/13-rest-api-mesto/releases/latest)

## Install
```
git clone https://github.com/olgamiliukova/13-rest-api-mesto.git
```
```
yarn install(npm install -y)
```
## Configure .env
```
cat .env.dist > .env(cp .env.dist .env)
```
## Setup seeds 
```
yarn run seed(npm run seed)
```
## Development
```
yarn run dev(npm run dev)
```
## Production
```
yarn run start(npm run start)
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
    User,
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
