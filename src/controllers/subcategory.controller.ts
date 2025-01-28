import { Request, Response } from "express";
import { SubcategoryModel } from "../models/subcategory.model";

export const createSubcategory = async (req: Request, res: Response) => {
    try {
        const existingSubcategory = await SubcategoryModel.findOne({ name: req.body.name });
        console.log(existingSubcategory)
        if (existingSubcategory) {
            throw new Error(`Subcategory with name ${req.body.name} already esists`)
        }

        const newSubcategory = new SubcategoryModel(req.body);
        await newSubcategory.save();

        res.send({
            status: true,
            message: "Subcategory created sucessfully",
            data: newSubcategory,
        });
    } catch (error: any) {
        res.status(400).send({ status: false, error: error.message });
    }
};

export const getSubcategory = async (req: Request, res: Response) => {
    try {
        const { identifier } = req.params;

        const subcategory = await SubcategoryModel.findOne({
            $or: [{ _id: identifier }, { name: identifier }],
        });

        res.send({
            status: true,
            message: "Subcategory fetched sucessfully",
            data: subcategory,
        });
    } catch (error: any) {
        res.status(400).send({ status: false, error: error.message });
    }
};

export const getAllSubcategories = async (req: Request, res: Response) => {
    try {
        const categories = await SubcategoryModel.find();

        res.send({
            status: true,
            message: "Subcategories fetched sucessfully",
            data: categories,
        });
    } catch (error: any) {
        res.status(400).send({ status: false, error: error.message });
    }
};

export const editSubcategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const subcategory = await SubcategoryModel.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });
        res.send({
            status: true,
            message: "Subcategory edited sucessfully",
            data: subcategory,
        });
    } catch (error: any) {
        res.status(400).send({ status: false, error: error.message });
    }
};
