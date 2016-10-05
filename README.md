# horvtavla
Web app for registering pledges for the canvas print

## Tech stack:

 * Node/Express
 * MongoDB/Mongoose
 * Email-as-a-service
 * Pushover push notifications (optional)
 * AngularJS w/ Bootstrap and a little jQuery
 
## Boot

Create a Heroku app and provision a MongoDB from a cheap provider (mLab for example) and Email with an API, I used Postmark.

Locally, run `npm install` and manually create a text file called `.env` in the project root (next to index.js and package.json).
In that file, save the following keys:

    POSTMARK_API_KEY=
    POSTMARK_API_TOKEN=
    MONGODB_URI=
    PUSHOVER_APP=
    PUSHOVER_USER=

Add the keys provided to the Heroku app (found in the environment variable list) or by the service provider (specifically Pushover). 
There are a few other keys to be saved in that file, but you create or generate them yourself:

    MAGIC_EMAIL=
    REGISTER_DEADLINE=
    PAYMENT_DEADLINE=
    PAYMENT_APP_TOKEN=
    
`MAGIC_EMAIL` should be your email that you want to use for testing purposes. the two deadline keys define JS Timestamps (with milliseconds)
for when certain actions are permitted and related data is displayed on the website. `PAYMENT_APP_TOKEN` is related to the companion
mobile app, and defines the single accepted pass token for authenticating the app. App code not included in this repository.
