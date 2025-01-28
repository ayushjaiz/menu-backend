import { body } from 'express-validator';

export const editSubcategoryValidator = [
    body('name')
        .optional()
        .isString()
        .withMessage('Name must be a string'),

    body('image')
        .optional()
        .isURL()
        .withMessage('Image must be a valid URL'),

    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),

    body('tax_applicability')
        .optional()
        .isBoolean()
        .withMessage('Tax applicability must be a boolean'),

    body('tax')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Tax must be a number greater than or equal to 0')
        .custom((value, { req }) => {
            if (req.body.tax_applicability && value === undefined) {
                throw new Error('Tax is required when tax_applicability is true');
            }
            return true;
        }),

    body('category_id')
        .optional()
        .isMongoId()
        .withMessage('Category ID must be a valid MongoDB ObjectId'),
];
