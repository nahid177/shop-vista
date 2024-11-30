// src/models/Building.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IProduct {
  productName: string;
  productSize: string;
  color: string;
  quantity: number;
  price: number;
}

interface ICategory {
  categoryName: string;
  products: IProduct[];
}

interface IProductType {
  productTypeName: string;
  categories: ICategory[];
}

interface IStore {
  storeName: string;
  productTypes: IProductType[];
}

interface IFloor {
  floorName: string;
  stores: IStore[];
}

interface IBuilding {
  buildingName: string;
  floors: IFloor[];
}

interface IBuildingModel extends IBuilding, Document {}

const productSchema = new Schema<IProduct>({
  productName: { type: String, required: true },
  productSize: { type: String, required: true },
  color: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const categorySchema = new Schema<ICategory>({
  categoryName: { type: String, required: true },
  products: { type: [productSchema], required: true },
});

const productTypeSchema = new Schema<IProductType>({
  productTypeName: { type: String, required: true },
  categories: { type: [categorySchema], required: true },
});

const storeSchema = new Schema<IStore>({
  storeName: { type: String, required: true },
  productTypes: { type: [productTypeSchema], required: true },
});

const floorSchema = new Schema<IFloor>({
  floorName: { type: String, required: true },
  stores: { type: [storeSchema], required: true },
});

const buildingSchema = new Schema<IBuildingModel>({
  buildingName: { type: String, required: true },
  floors: { type: [floorSchema], required: true },
});

// Avoid re-compiling the model if it's already defined
const Building = mongoose.models.Building || mongoose.model<IBuildingModel>('Building', buildingSchema);

export default Building;
