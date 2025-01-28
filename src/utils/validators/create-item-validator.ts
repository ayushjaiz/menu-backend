import { body } from 'express-validator';

export const createItemValidator = [
    body('name')
        .notEmpty()
        .withMessage('Item name is required.')
        .isString()
        .withMessage('Item name must be a string.')
    ,

    body('image')
        .notEmpty()
        .withMessage('Image URL is required.')
        .isURL()
        .withMessage('Image must be a valid URL.')
    ,

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
        .isFloat({ min: 0 })
        .withMessage('Tax must be a number greater than or equal to 0.')
        .custom((value, { req }) => {
            if (req.body.tax_applicability && value === undefined) {
                throw new Error('Tax is required when tax_applicability is true.');
            }
            return true;
        }),

    body('base_amount')
        .notEmpty()
        .withMessage('Base amount is required.')
        .isFloat({ min: 0 })
        .withMessage('Base amount must be a number greater than or equal to 0.')
    ,

    body('discount')
        .notEmpty()
        .withMessage('Discount is required.')
        .isFloat({ min: 0 })
        .withMessage('Discount must be a number greater than or equal to 0.')
    ,

    body('subcategory_id')
        .notEmpty()
        .withMessage('Subcategory ID is required.')
        .isMongoId()
        .withMessage('Subcategory ID must be a valid MongoDB ObjectId.')
    ,
];
