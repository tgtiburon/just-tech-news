const router = require('express').Router();

const { User, Post, Vote }= require('../../models');


// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    // equivalent to SELECT * FROM users;
    User.findAll({
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


// GET /api/users/1
router.get('/:id', (req, res) => {
    // SELECT * FROM users WHERE id = 1
    // TODO:   might be broken
    User.findOne({
        // attributes: { exclude: ['password'] },
        // where:{
        //     id: req.params.id
        // }
        include: [
            {
                model: Post,
                attributes: [
                    'id',
                    'title',
                    'post_url',
                    'created_at'
                ]
            },
            {
                model: Post,
                attributes: ['title'],
                through: Vote,
                as: 'voted_posts'
            }
        ]
    })
    .then(dbUserData=> {
        if(!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

// POST /api/users
// INSERT INTO users
// (username, email,password)
// VALUES
// ("username", "email@gmail.com", "password1234");
router.post('/', (req, res) => {
    // expects {username:'username', email: 'email@gmail.com', password:'password1234' }
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        res.json(dbUserData)
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json(err);
    });
});


// Login uses post because it is in the req.body instead of the url
router.post('/login', (req, res) => {
    // Query operation
    // expects {email: 'email@gmail.com', password: 'password1243'}
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({ message: 'No user with the email address!'});
            return;
        }
      
        // Verify user
        const validPassword = dbUserData.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(400).json({ message: 'Incorrect Password!' });
            return;
        }
        res.json({ user: dbUserData, message: 'You are now logged in!'});


    });


});

// PUT  /api/users/1
// UPDATE users
// SET username = "username", email="email@gmail.com", password = "password1234"
// WHERE id = 1;
router.put('/:id', (req, res) => {
     // expects {username:'username', email: 'email@gmail.com', password:'password1234' }
     
     // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
     User.update(req.body, {
         individualHooks: true, 
         where: {
             id:req.params.id
         }
     })
     .then(dbUserData=> {
         if(!dbUserData[0]) {
             res.status(404).json({ message: 'No user found with this id'});
             return;
         }
         res.json(dbUserData);
     })
     .catch(err => {
         console.log(err);
         res.status(500).json(err);
     });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData=> {
        if(!dbUserData){
            res.status(404).json({ message: "No user found with this id"});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;