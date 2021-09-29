import Joi from 'joi';

/**
 * Require all information related to departments.
 * Reject any unknown fields.
 */
export const departmentCreationScheme = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
    })
    .unknown(false),
};

/**
 * Require at least one of the fields of the department in the request body.
 * Reject the request if an attempt to change the _id.
 * Reject any unknown fields.
 */
export const departmentPatchScheme = {
  params: Joi.object()
    .keys({
      id: Joi.string().alphanum().hex().length(24).required(),
    })
    .unknown(false),
  body: Joi.object()
    .keys({
      _id: Joi.forbidden(),
      name: Joi.string().optional(),
      description: Joi.string().optional(),
    })
    .min(1)
    .unknown(false),
};
