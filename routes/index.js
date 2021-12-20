const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// This second router.use catches all passthroughs and 404s them.
router.use((req, res)=> {
    res.status(404).end();
});


module.exports = router;