const Joi = require('joi');

const cartValidation = {};
cartValidation.priceCaculate = (data) =>
  Joi.object({
    cartItems: Joi.array().min(1).items(
      Joi.object({
        name: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.number().positive().required(),
        amount: Joi.number().integer().min(1).required()
      })
    ).required(),

    campaigns: Joi.array().items(
      Joi.alternatives().try(
        Joi.object({
          type: Joi.string().valid('coupon').required(),
          subtype: Joi.string().valid('percent', 'amount').required(),
          amount: Joi.number().positive().required()
        }),
        Joi.object({
          type: Joi.string().valid('ontop').required(),
          subtype: Joi.string().valid('category').required(),
          category: Joi.string().required(),
          percent: Joi.number().min(0).max(100).required()
        }),
        Joi.object({
          type: Joi.string().valid('seasonal').required(),
          threshold: Joi.number().positive().required(),
          discountPerThreshold: Joi.number().positive().required()
        })
      )
    ).optional(),

    customerPoints: Joi.number().integer().min(0).optional()
  }).validate(data);

module.exports = cartValidation;