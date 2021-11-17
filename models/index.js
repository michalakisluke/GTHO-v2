const User = require('./User');
const Destination = require('./Destination');
const Review = require('./Review');

//Associations
//Need to figure this out, Destination needs to reference User somehow I think. Talk to jonathan
User.hasMany(Review, {
    foreignKey: 'userId',
    onDelete: 'cascade'
});

Review.belongsTo(User);

Destination.hasMany(Review, {
    foreignKey: 'destinationId',
    onDelete: 'cascade'
});

Review.belongsTo(Destination);