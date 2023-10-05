const express = require('express');
const app = express();
const port = 8000;

const cookieParser = require('cookie-parser');

const expressLayouts = require('express-ejs-layouts'); // accessing layouts
// const { urlencoded } = require('body-parser');

const db = require('./config/mongoose');
 
const session = require('express-session'); // this is for creating the session, means it helps to store the id in cookie
const passport = require('passport'); // for authentication
const passportLocal = require('./config/passport-local-strategy');// it's a strategy, that passport using  it for authentication

const mongoStore = require('connect-mongo')(session);  // for keep all the user loged-in permanently even if server is restarted.`
// -------------------------------
 
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets')); //telling in which folder should be located for static files

// extract style and script from sub pages into the layout in the headder not in the body.
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(expressLayouts); //launching layouts before router 


//setting view engine
app.set('view engine', 'ejs');//setting ejs
app.set('views', './views');//defining ejs path

// A middle ware that takes the session cookie and then encriptb it, before the storing in the browser.----------------
app.use(session(
    {
        name: 'codeial',
        secret: 'blahsomething', // change the secret, before deploying in production mode.
        saveUninitialized: false, // if user is not loged-in then user cookie should not set in the browser.  
        resave: false, // if user is loged-in and older cookie is already present in the browser then it should not resave/replace
                       // with new cookie again and again, it shoult use previous cookie, that's why it's false. 
        cookie: {
            maxAge: (100 * 60 * 100) // after the 'time-in-milliSecond' the session will automatically expired/deleted
                                    // then user will loged-out.
        },
        store: new mongoStore(
            {
                mongooseConnection : db,
                autoRemove: 'disabled'
            }
        )
        
    }
));
app.use(passport.initialize());// inbuilt in passport
app.use(passport.session()); // inbuilt in passport
app.use(passport.setAuthenticatedUser); // from 'passport-local-strategy
// -----------------------------------

app.use('/', require('./routes/index')); // use express router************************************************

//----------------------------------
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${port}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
})