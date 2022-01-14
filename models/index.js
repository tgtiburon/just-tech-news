const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
const Comment = require('./Comment');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'//,
   // onDelete: 'SET NULL'
});

// The below two functions allow user and
// post models to query each others information
// in the context of the Vote
// We want the foreign key in vote
// which aligns with the fields in the model
// note model should be shown as 'voted_posts'

// because user_id and post_id pairings are unique one person
// can't vote multiple times for the same post
// this is called foreign key constraint
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'//,
   // onDelete: 'SET NULL'   
});
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'//,
   // onDelete: 'SET NULL'
});



// TO see the total number of votes on a post we need to 
// directly connect Post and Vote models
Vote.belongsTo(User, {
    foreignKey: 'user_id'//,
   // onDelete: 'SET NULL'
});
Vote.belongsTo(Post, {
    foreignKey: 'post_id'//,
   // onDelete: 'SET NULL'
});
User.hasMany(Vote, {
    foreignKey: 'user_id'
});
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});


// Take care of comment associations
Comment.belongsTo(User, {
    foreignKey: 'user_id'//,
   // onDelete: 'SET NULL'
});
User.hasMany(Comment, {
    foreignKey: 'user_id'//,
   // onDelete: 'SET NULL'
});


// POST NEEDS TO COME FIRST OR A CONSTRAINT ERROR
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});


Comment.belongsTo(Post, {
    foreignKey: 'post_id'//,
   // onDelete: 'SET NULL'
});




module.exports = { User, Post, Vote, Comment};



