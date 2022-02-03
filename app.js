const path = require('path');
const PORT = process.env.PORT || 3000;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const errorController = require('./controllers/error');
const User = require('./models/user');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({extended: false})); // This will parse the body, goes through the req,res, and next
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false 
}));

app.use((req, res, next) => {
    User.findById('61f3288f0d49e121d2d09ae7')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
    .connect(
        'mongodb+srv://adminuser:user1@cluster0.f9ktm.mongodb.net/shop?retryWrites=true&w=majority'
    )
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User ({
                    name: 'Kelsey',
                    email: 'kelsey@test.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })
        app.listen(PORT);
    }).catch(err => {
        console.log(err);
    });