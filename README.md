# Saoirse
Saoirse Is an end to end encrypted messaging app. Using RSA keys for each user and AES keys to encrypt atual messages, all messages are encryptd and unencrypted on the client side, without the server ever storing the unencrypted keys, meaning even the server won't be able to decrypt your messages, it simply organizes conversations and friendships and stores encrypted strings.

# Getting a dev environment running
#### NOTE: the environments here are only suitable for development, to setup for production you will need to do various things like replacing urls with the urls you will be using and swapping out passwords and keys
## On Windows and MacOS
follow this guide and then continue with the tutorial
[guide](https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-desktop#0)

## Using just nodejs
### Back End
first you will need to have a running mysql database and have its database and config match the settings in `back/config/config.json`.
```# install sequelize-cli to migrate the database
npm install -g sequelize-cli
cd back
sequelize db:migrate
# sync the database to all the relations are set
node sync.js
# install the back end dependencies
npm install
```
create the file `back/.env` and fill the following environment variables
```
JWTKEY=""
PRIVATE_VAPID_KEY=""
PORT=8080
```
you can pick any JWTKEY you want, to generate a vapid keypair:

```
npm i -g web-push

web-push generate-vapid-keys --json
```

use this for the vapid keypair
now just run the express server

`node app.js`

### Front End
set the public vapid key as `base64String` in `front/src/store.ts` and `front/src/views/Settings.vue`
then run

`npm run serve`

now the app will be up and running on localhost:3000 any changes you make to the front end will automatically rebuild but the backend must be restarted manually
To get push notifications and service workers running you will need to run

`npm run build`

you then need to serve the dist folder as a pwa, there are many ways to do this, look into [https://www.npmjs.com/package/http-server-pwa](https://www.npmjs.com/package/http-server-pwa)

## Using Docker
You must have docker and docker-composed installed and working
same as in the previous enviroment, you must setup your vapid keys and other enviroment variables, located in `back/Dockerfile`.
You don't need to change any database settings as docker has everything setup already
now just run

```
docker-compose build
docker-compose up
```

and the app will launch and be available at localhost:3000
any changes made will require rebuild the docker-compose, this will be fixed in the future to update dynamically

## Using Kubernetes
you must setup the Dockerfile and vapid keys same as before
to use with kubernetes, you must already have your kubernetes cluster setup, then use:

```
kubectl apply -f saoirse-back.yml
kubectl apply -f saoirse-front.yml
```

the app will launch at `10.96.1.2`, you can setup an alias in your hosts file if you want
