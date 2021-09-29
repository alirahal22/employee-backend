import Joi from 'joi';

/**
 * The base scheme used for all GET requests by id.
 */
export const defaultGetScheme = {
  params: Joi.object()
    .keys({
      id: Joi.string().alphanum().hex().length(24).required(),
    })
    .unknown(false),
};

/**
 * The base scheme for all GET requests that retrieve all data of a resource.
 * Pagination, sorting and filtering are taken into consideration.
 */
export const defaultGetAllScheme = {
  query: Joi.object()
    .keys({
      page: Joi.number().min(1).optional(),
      // allow pageSize only when page was specified.
      pageSize: Joi.number().min(1).max(50).when('page', {
        is: Joi.exist(),
        then: Joi.optional(),
        otherwise: Joi.forbidden(),
      }),
      sortBy: [
        Joi.array()
          //Format needs to be <property_name>.(asc|desc), anything else is invalid.
          .items(Joi.string().regex(/^[^.]+\.(asc|desc)$/i))
          .optional(),
        // in case only one sorting param sent.
        Joi.string().regex(/^[^.]+\.(asc|desc)$/i),
      ],
    })
    .unknown(false),
};

/**
 * The base scheme used for all DELETE requests by id.
 */
export const defaultDeleteScheme = {
  params: Joi.object()
    .keys({
      id: Joi.string().alphanum().hex().length(24).required(),
    })
    .unknown(false),
};
