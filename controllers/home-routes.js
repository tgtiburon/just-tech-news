const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


const router = require('express').Router();

router.get('/', (req, res)=> {
    console.log(req.session);
    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        // we need to serialize the entire dbPostData array
        const posts = dbPostData.map(post => post.get({ plain: true }));
        // pass a single post object into the homepage template
         // .render('homepage.handlebars')
    res.render('homepage', { posts });   
    

    })
    .catch(err => {
        console.log(err);
        console.log(dbPostData[0]);
        res.status(500).json(err);
    });
   
});
router.get('/login', (req, res)=> {
    // if they are logged in redirect to a homepage if one exists.
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // no variables need to be passed so only the page name
    res.render('login');
});


module.exports = router;