import mongoose, { Document, Schema } from 'mongoose';

export interface IItem {
    name: string;
    image: string;
    description: string;
    tax_applicability: boolean;
    tax?: number;
    base_amount: number;
    discount: number;
    subcategory_id: mongoose.Types.ObjectId;
}

export interface IItemDocument extends IItem, Document { }

const ItemSchema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            required: true,
        },
        image: {
            type: Schema.Types.String,
            required: true
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
            required: function (this: IItem) {
                return this.tax_applicability;
            },
            min: 0,
        },
        base_amount: {
            type: Schema.Types.Number,
            required: true,
            min: 0,
        },
        discount: {
            type: Schema.Types.Number,
            required: true,
            min: 0,
            default: 0,
        },
        subcategory_id: {
            type: Schema.Types.ObjectId,
            ref: 'Subcategory',
            required: true,
        },
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export const ItemModel = mongoose.model<IItemDocument>('Item', ItemSchema);
