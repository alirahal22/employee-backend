import Joi from 'joi';

export const defaultGetScheme = {
  params: Joi.object()
    .keys({
      id: Joi.string().length(24).required(),
    })
    .unknown(false),
};
