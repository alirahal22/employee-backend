import Joi from 'joi';

export const defaultGetScheme = {
  params: Joi.object()
    .keys({
      id: Joi.string().length(24).required(),
    })
    .unknown(false),
};

export const defaultGetAllScheme = {
  query: Joi.object()
    .keys({
      page: Joi.number().min(1).optional(),
      pageSize: Joi.number().min(1).max(50).when('page', {
        is: Joi.exist(),
        then: Joi.optional(),
        otherwise: Joi.forbidden(),
      }),
      sortBy: [
        Joi.array()

          .items(Joi.string().regex(/^[^.]+\.(asc|desc)$/i)) //Format needs to be property_name.asc or property_name.desc, anything else is invalid
          .optional(),
        Joi.string().regex(/^[^.]+\.(asc|desc)$/i), // in case only one sorting param sent
      ],
    })
    .unknown(false),
};
