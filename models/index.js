const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
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
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'   
});

// TO see the total number of votes on a post we need to 
// directly connect Post and Vote models
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});
User.hasMany(Vote, {
    foreignKey: 'user_id'
});
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});



module.exports = { User, Post, Vote};



// This file imports the User model and exports a User object.