const express = require('express');
const passport = require('passport');
const { JWTStrategy } = require('@sap/xssec');
const xsenv = require('@sap/xsenv');

const app = express();

// XSUAA Middleware
passport.use(new JWTStrategy(xsenv.getServices({ uaa: { tag: 'xsuaa' } }).uaa));

app.use(passport.initialize());
app.use(passport.authenticate('JWT', { session: false }));

// Serve Static Applications
app.use('/CFOHome', checkReadScope, express.static(__dirname + '/CFOHome', { index: 'story.html' }));
app.use('/101History', checkReadScope, express.static(__dirname + '/101History', { index: 'story.html' }));
app.use('/Form101', checkReadScope, express.static(__dirname + '/Form101', { index: 'story.html' }));


app.get('/home', checkReadScope, getProducts);

function getProducts(req, res) {
    res.send('Product list would go here');
}

// Scope check
function checkReadScope(req, res, next) {
    if (req.authInfo.checkLocalScope('read')) {
        return next();
    } else {
        console.log('Missing the expected scope');
        res.status(403).end('Forbidden');
    }
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});