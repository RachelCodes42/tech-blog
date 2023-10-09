const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// relationship between User and Blog //
User.hasMany(Blog, {
  foreignKey: 'user_id'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});


// relationship between User and Comment
User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});


// relationship between Blog and Comment
Blog.hasMany(Comment, {
  foreignKey: 'blog_id'
});

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id'
});

module.exports = { User, Blog, Comment };