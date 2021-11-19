const User = require('./User');
const Destination = require('./Destination');
const Review = require('./Review');

//Associations
//Need to figure this out, Destination needs to reference User somehow I think. Talk to jonathan
User.hasMany(Review, {
    foreignKey: 'user',
    onDelete: 'cascade'
});

Review.belongsTo(User);

Destination.hasMany(Review, {
    foreignKey: 'destination_id',
    onDelete: 'cascade'
});

Review.belongsTo(Destination);

module.exports = {User, Review, Destination };