import Joi from 'joi';

export const departmentCreationScheme = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
    })
    .unknown(false),
};

export const departmentPatchScheme = {
  params: Joi.object()
    .keys({
      id: Joi.string().alphanum().hex().length(24).optional(),
    })
    .unknown(false),
  body: Joi.object()
    .keys({
      name: Joi.string().optional(),
      description: Joi.string().optional(),
    })
    .min(1)
    .unknown(false),
};
