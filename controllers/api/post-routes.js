const router = require('express').Router();
// we need sequelize to show updated post information when we upvote
const sequelize = require('../../config/connection');

const { Post, User, Vote, Comment } = require('../../models');

// get all users
router.get('/', (req, res) => {
    console.log('================');
    Post.findAll({
        //Query configuration
        attributes: [
            'id', 
            'post_url', 
            'title', 
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        order: [['created_at', 'DESC']],
        include: [
            // include comment model here:
            {
                // comment model has the user model itself so it can attach the username to the comment
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req,res) => {
    Post.findOne({
        where: {
            id:req.params.id
        },
        attributes: [
            'id', 
            'post_url', 
            'title', 
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
              // include comment model here:
              {
                // comment model has the user model itself so it can attach the username to the comment
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
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found wit this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
        title: req.body.title,
        post_url:req.body.post_url,
        user_id: req.body.user_id
    })
    .then(dbPostData => {
        res.json(dbPostData);
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json(err);
    });

});

// Voting on a post is technically updating a post data
// so we will use PUT to keep it restful
// This needs to come before router.put('/:id' or 
// Express will thing 'upvote' is a valid :id
// PUT /api/posts/upvote

// TODO: may be an issue
router.put('/upvote', (req, res) => {
    // make sure the session exists first
    if(req.session) {

         // custom static method created in models/Post.js
         // pass session id along with all the destructured properties
         // from req.body

         // can only upvote 1 time as Sequelize relationships don't allow duplicate entries.
        Post.upvote({...req.body, user_id: req.session.user_id}, { Vote, Comment, User  })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err=> {
            console.log(err);
            res.status(400).json(err);
        });



    }
   
});
    // Old way before we created static upvote method in Post.js
    // Vote.create({
    //     user_id: req.body.user_id,
    //     post_id: req.body.post_id
    // })
    // .then(() => {
    //     // then find the post we just voted on
    //     return Post.findOne({
    //         where: {
    //             id: req.body.post_id
    //         },
    //         attributes: [
    //             'id',
    //             'post_url',
    //             'title',
    //             'created_at',
    //             // use raw MySQL aggregate function query to get count of how many 
    //             // votes the post has and return it under the name 'vote_count'
    //             [
    //                 sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
    //                 'vote_count'
    //             ]
    //         ]
    //     })
    //     .then(dbPostData => {
    //         res.json(dbPostData);
    //     })
    //    .catch(err => {
    //     console.log(err);
    //     res.status(400).json(err); 
    //     });
    // });


router.put('/:id', (req,res)=> {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )

    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res)=> {
    Post.destroy({
        where: {
            id:req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;