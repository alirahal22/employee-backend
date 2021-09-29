import Joi from 'joi';

export const branchCreationScheme = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      country: Joi.string().required(),
      city: Joi.string().required(),
    })
    .unknown(false),
};

export const branchPatchScheme = {
  params: Joi.object()
    .keys({
      id: Joi.string().alphanum().hex().length(24).optional(),
    })
    .unknown(false),
  body: Joi.object()
    .keys({
      name: Joi.string().optional(),
      country: Joi.string().optional(),
      city: Joi.string().optional(),
    })
    .min(1)
    .unknown(false),
};
