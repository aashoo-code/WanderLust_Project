const joi = require('joi'); 
const review = require('./models/review');

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        price: joi.number().required().min(0),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
         image: joi.string().uri().optional()
    }).required()
}); 

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        body: joi.string().required(),
    }).required()
});