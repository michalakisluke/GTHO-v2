const User = require('./User');
const Destination = require('./Destination');
const Review = require('./Review');

//Associations
User.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Review.belongsTo(User);

Destination.hasMany(Review, {
    foreignKey: 'destination_id',
    onDelete: 'cascade'
});

Review.belongsTo(Destination);

module.exports = { User, Review, Destination };