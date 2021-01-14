const Joi = require('Joi');
const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name: {
        type: String
    },
    link: {
        type: String,
    },
    categories: {
        type: [String]
    },
    description: String
});

channelSchema.index({description: 'text'});

const Channel = mongoose.model('Channel', channelSchema);

Channel.createIndexes();

function validateChannel(channel) {
    const schema = Joi.object({
        name: Joi.string(),
        link: Joi.string().uri()
    });
    return schema.validate(channel);
}

exports.Channel = Channel; 
exports.validateChannel = validateChannel;