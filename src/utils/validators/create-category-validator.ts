import { body } from 'express-validator';

export const createCategoryValidator = [
    body('name')
        .notEmpty()
        .withMessage('Category name is required.')
        .isString()
        .withMessage('Category name must be a string.'),

    body('image')
        .notEmpty()
        .withMessage('Image URL is required.')
        .isString()
        .withMessage('Image must be a valid URL.'),


    body('description')
        .notEmpty()
        .withMessage('Description is required.')
        .isString()
        .withMessage('Description must be a string.')
    ,

    body('tax_applicability')
        .notEmpty()
        .withMessage('Tax applicability is required.')
        .isBoolean()
        .withMessage('Tax applicability must be a boolean value.')
    ,

    body('tax')
        .optional()
        .custom((value, { req }) => {
            if (req.body.tax_applicability && value === undefined) {

                throw new Error('Tax is required when tax_applicability is true.');
            }
            console.log(value);
            return true;
        })
        .isInt({ min: 0 })
        .withMessage('Tax must be a number greater than or equal to 0.')
    ,

    body('tax_type')
        .optional()
        .isString()
        .withMessage('Tax type must be a string.')
        .custom((value, { req }) => {
            if (req.body.tax_applicability && !value) {
                throw new Error('Tax type is required when tax_applicability is true.');
            }
            if (!(value === 'GST' || value === 'VAT')) {
                throw new Error('Tax category can be VAT or GST');
            }
            return true;
        }),
];
