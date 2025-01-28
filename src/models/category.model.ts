import mongoose, { Document, Schema } from 'mongoose';

export enum TaxType {
    GST,
    VAT
}

export interface ICategory {
    name: string;
    image: string;
    description: string;
    tax_applicability: boolean;
    tax?: number;
    tax_type?: string;
}

export interface ICategoryDocument extends ICategory, Document { }

const CategorySchema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            required: true,
        },
        image: {
            type: Schema.Types.String,
            required: true,
        },
        description: {
            type: Schema.Types.String,
            required: true,
        },
        tax_applicability: {
            type: Schema.Types.Boolean,
            required: true,
            default: false,
        },
        tax: {
            type: Schema.Types.Number,
            required: function (this: ICategory) {
                return this.tax_applicability;
            },
            min: 0,
        },
        tax_type: {
            type: Schema.Types.String,
            required: function (this: ICategory) {
                return this.tax_applicability;
            },
        },
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export const CategoryModel = mongoose.model<ICategoryDocument>(
    'Category',
    CategorySchema
);
