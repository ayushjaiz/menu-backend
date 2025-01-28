import { body } from 'express-validator';

export const editCategoryValidator = [
    body('name')
        .optional()
        .isString()
        .withMessage('Category name must be a string.'),

    body('image')
        .optional()
        .isString()
        .withMessage('Image must be a valid URL.'),

    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string.'),

    body('tax_applicability')
        .optional()
        .isBoolean()
        .withMessage('Tax applicability must be a boolean value.'),

    body('tax')
        .optional()
        .custom((value, { req }) => {
            if (req.body.tax_applicability && value === undefined) {
                throw new Error('Tax is required when tax_applicability is true.');
            }
            return true;
        })
        .isInt({ min: 0 })
        .withMessage('Tax must be a number greater than or equal to 0.'),

    body('tax_type')
        .optional()
        .isString()
        .withMessage('Tax type must be a string.')
        .custom((value, { req }) => {
            if (req.body.tax_applicability && !value) {
                throw new Error('Tax type is required when tax_applicability is true.');
            }
            if (value && !(value === 'GST' || value === 'VAT')) {
                throw new Error('Tax category can only be VAT or GST.');
            }
            return true;
        }),
];