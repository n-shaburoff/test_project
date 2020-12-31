const Joi = require('Joi');
const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name: {
        type: String
    },
    link: {
        type: String,
    }
});

const Channel = mongoose.model('Channel', channelSchema);


function validateChannel(channel) {
    const schema = Joi.object({
        name: Joi.string(),
        link: Joi.string().uri()
    });
    return schema.validate(channel);
}

exports.Channel = Channel; 
exports.validateChannel = validateChannel;