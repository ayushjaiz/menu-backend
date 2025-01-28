import mongoose, { Document, Schema } from 'mongoose';

export interface ISubcategory {
    name: string;
    image: string;
    description: string;
    tax_applicability: boolean;
    tax?: number;
    category_id: mongoose.Types.ObjectId;
}

export interface ISubcategoryDocument extends ISubcategory, Document { }

const SubcategorySchema = new Schema(
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
            required: function (this: ISubcategory) {
                return this.tax_applicability;
            },
            min: 0,
            default: 0,
        },
        category_id: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export const SubcategoryModel = mongoose.model<ISubcategoryDocument>(
    'Subcategory',
    SubcategorySchema
);
