const router = require('express').Router();
const { Comment } = require('../../models');


router.get('/', (req, res) => {
     // Access our User model and run .findAll() method)
    // equivalent to SELECT * FROM users;
    Comment.findAll({
        // we are telling it to exclude the password column
        // you can exclude multiple columns
       /////// attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

router.post('/', (req, res) => {

    // check the session
    if(req.session) {

        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            // use the id from the session
            user_id: req.session.user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err=> {
            console.log(err);
            res.status(400).json(err);
        });



    }
   

});
//TODO: needs to be checked
router.delete('/', (req, res) => {
    Comment.destroy({
        where: {
            id:req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id'});
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});



module.exports = router;