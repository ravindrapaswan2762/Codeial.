const express = require('express');
const app = express();
const port = 8000;
// -------------------------------

app.use(express.static('./assets')); //telling in which folder should be located for static files

const expressLayouts = require('express-ejs-layouts'); // accessing layouts

// extract style and script from sub pages into the layout in the headder not in the body.
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(expressLayouts); //launching layouts before router 

app.use('/', require('./routes/index')); // use express router

//setting view engine
app.set('view engine', 'ejs');//setting ejs
app.set('views', './views');//defining ejs path






//----------------------------------
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${port}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
})