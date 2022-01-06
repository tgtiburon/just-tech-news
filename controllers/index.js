const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes');


router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

// This second router.use catches all passthroughs and 404s them.
router.use((req, res)=> {
    res.status(404).end();
});


module.exports = router;