import Joi from 'joi';

/**
 * Require all information related to branches.
 * Reject any unknown fields.
 */
export const branchCreationScheme = {
  body: Joi.object()
    .keys({
      _id: Joi.forbidden(),
      name: Joi.string().required(),
      country: Joi.string().required(),
      city: Joi.string().required(),
    })
    .unknown(false),
};

/**
 * Require at least one of the fields of the branch in the request body.
 * Reject the request if an attempt to change the _id.
 * Reject any unknown fields.
 */
export const branchPatchScheme = {
  params: Joi.object()
    .keys({
      id: Joi.string().alphanum().hex().length(24).required(),
    })
    .unknown(false),
  body: Joi.object()
    .keys({
      _id: Joi.forbidden(),
      name: Joi.string().optional(),
      country: Joi.string().optional(),
      city: Joi.string().optional(),
    })
    .min(1)
    .unknown(false),
};
