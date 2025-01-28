import { Request, Response } from "express";
import { CategoryModel } from "../models/category.model";
import { SubcategoryModel } from "../models/subcategory.model";
import { ItemModel } from "../models/item.model";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const existingCategory = await CategoryModel.findOne({ name: req.body.name }, { _id: 1 });
        if (existingCategory) {
            throw new Error(`Category with name ${req.body.name} already esists`)
        }
        const newCategory = new CategoryModel(req.body);
        await newCategory.save();

        res.send({
            status: true,
            message: "Category created sucessfully",
            data: newCategory,
        });
    } catch (error: any) {
        res.status(400).send({ status: false, error: error.message });
    }
};

export const getCategory = async (req: Request, res: Response) => {
    try {
        const { identifier } = req.params;

        const category = await CategoryModel.findOne({
            $or: [{ _id: identifier }, { name: identifier }],
        });

        res.send({
            status: true,
            message: "Category fetched sucessfully",
            data: category,
        });
    } catch (error: any) {
        res.status(400).send({ status: false, error: error.message });
    }
};

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await CategoryModel.find();

        res.send({
            status: true,
            message: "Category fetched sucessfully",
            data: categories,
        });
    } catch (error: any) {
        res.status(400).send({ status: false, error: error.message });
    }
};

export const editCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const category = await CategoryModel.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });
        res.send({
            status: true,
            message: "Category edited sucessfully",
            data: category,
        });
    } catch (error: any) {
        res.status(400).send({ status: false, error: error.message });
    }
};

export const getSubcategoriesUnderCategory = async (req: Request, res: Response) => {
    try {
        const { identifier } = req.params;

        const category = await CategoryModel.findOne({
            $or: [{ _id: identifier }, { name: identifier }],
        });

        const subcategories = await SubcategoryModel.find(
            { category_id: category?._id },
        );

        res.send({
            status: true,
            message: "Subcategories fetched sucessfully",
            data: subcategories,
        });
    } catch (error: any) {
        res.status(400).send({ status: false, error: error.message });
    }
};

export const getItemsUnderCategory = async (req: Request, res: Response) => {
    try {
        const { identifier } = req.params;

        const category = await CategoryModel.findOne({
            $or: [{ _id: identifier }, { name: identifier }],
        });

        const subcategories = await SubcategoryModel.find({ category_id: category?._id });

        console.log(subcategories);

        const subcategoryIds = subcategories.map((subcategory) => subcategory._id);

        const items = await ItemModel.find({ subcategory_id: { $in: subcategoryIds } });

        res.send({
            status: true,
            message: "Subcategories fetched sucessfully",
            data: items,
        });
    } catch (error: any) {
        res.status(400).send({ status: false, error: error.message });
    }
};
