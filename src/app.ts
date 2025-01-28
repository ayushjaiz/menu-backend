import express from "express";
import authRoutes from "./routes/auth.route"
import itemRoutes from "./routes/item.route"
import categoryRoutes from "./routes/category.route"
import subcategoryRoutes from "./routes/subcategory.route"
import cookieParser from 'cookie-parser'

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_, res) => {
    res.send('Health Check')
})

// app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subcategoryRoutes);
app.use("/api/item", itemRoutes);

export default app;