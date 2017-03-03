# express-webpack-react Starter Kit
RADION TEAM make a couple changes and add some more modules,
this starter kit is originally from tylerevans, please go check his github on: (https://github.com/tylerevans/express-webpack-react/)

Starter Kit for Express Webpack and React SPA including SCSS.

  - Express
  - Handlebars
  - Webpack
  - Babel (es6)
  - React
  - SCSS
  - ESlint using Airbnb Configuration.
  - Asset Fingerprinting
  - socket
  - ORM

In order to run the application:

First install node modules

```
$ npm install
```

Then using 2 terminals, run the following:

```
$ npm run watch
$ nodemon server
```

For production, build the assets and start the server

```
$ npm run prod
```

By default, this will start up on

```
http://localhost:3010
```

---
NOTES:
    -  If you want to use database, simply uncomment lines 32 - 41
on server/config/env.js
    -  If you want to use socket (socket.io), uncomment line 24 on server.js