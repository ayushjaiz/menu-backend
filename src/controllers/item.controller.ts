import { Request, Response } from "express";
import { ItemModel } from "../models/item.model";

export const createItem = async (req: Request, res: Response) => {
    try {
        const existingItem = await ItemModel.findOne({ name: req.body.name }, { _id: 1 });
        if (existingItem) {
            throw new Error(`Item with name ${req.body.name} already esists`)
        }
        const newItem = new ItemModel(req.body);
        await newItem.save();

        res.send({
            status: true,
            message: "Item created sucessfully",
            data: newItem,
        });
    } catch (error: any) {
        res.status(400).send({ status: false, error: error.message });
    }
};

export const getItem = async (req: Request, res: Response) => {
    try {
        const { identifier } = req.params;

        const item = await ItemModel.findOne({
            $or: [{ _id: identifier }, { name: identifier }],
        });

        res.send({
            status: true,
            message: "Item fetched sucessfully",
            data: item,
        });
    } catch (error: any) {
        res.status(400).send({ status: false, error: error.message });
    }
};

export const getAllItems = async (req: Request, res: Response) => {
    try {
        const items = await ItemModel.find();

        res.send({
            status: true,
            message: "Item fetched sucessfully",
            data: items,
        });
    } catch (error: any) {
        res.status(400).send({ status: false, error: error.message });
    }
};

export const editItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const item = await ItemModel.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });
        res.send({
            status: true,
            message: "Item edited sucessfully",
            data: item,
        });
    } catch (error: any) {
        res.status(400).send({ status: false, error: error.message });
    }
};

