import Joi from 'joi';

export const departmentCreationScheme = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
    })
    .unknown(false),
};
