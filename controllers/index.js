const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// This second router.use catches all passthroughs and 404s them.
router.use((req, res)=> {
    res.status(404).end();
});


module.exports = router;