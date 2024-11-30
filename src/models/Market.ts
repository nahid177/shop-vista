import mongoose, { Schema, Document, Types } from "mongoose";

// Product Schema
interface IProduct extends Document {
  productName: string;
  productSize: string;
  color: string;
  quantity: number;
  price: number;
}

const ProductSchema: Schema = new Schema({
  productName: { type: String, required: true },
  productSize: { type: String, required: true },
  color: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

// Category Schema
interface ICategory extends Document {
  categoryName: string;
  products: Types.Array<IProduct>;
}

const CategorySchema: Schema = new Schema({
  categoryName: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

// ProductType Schema
interface IProductType extends Document {
  productTypeName: string;
  categories: Types.Array<ICategory>;
}

const ProductTypeSchema: Schema = new Schema({
  productTypeName: { type: String, required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

// Store Schema
interface IStore extends Document {
  storeName: string;
  productTypes: Types.Array<IProductType>;
}

const StoreSchema: Schema = new Schema({
  storeName: { type: String, required: true },
  productTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductType" }],
});

// Floor Schema
interface IFloor extends Document {
  floorName: string;
  stores: Types.Array<IStore>;
}

const FloorSchema: Schema = new Schema({
  floorName: { type: String, required: true },
  stores: [{ type: mongoose.Schema.Types.ObjectId, ref: "Store" }],
});

// Building Schema
interface IBuilding extends Document {
  buildingName: string;
  floors: Types.Array<IFloor>;
}

const BuildingSchema: Schema = new Schema({
  buildingName: { type: String, required: true },
  floors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Floor" }],
});

// Model definitions
const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
const Category = mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
const ProductType = mongoose.models.ProductType || mongoose.model<IProductType>("ProductType", ProductTypeSchema);
const Store = mongoose.models.Store || mongoose.model<IStore>("Store", StoreSchema);
const Floor = mongoose.models.Floor || mongoose.model<IFloor>("Floor", FloorSchema);
const Building = mongoose.models.Building || mongoose.model<IBuilding>("Building", BuildingSchema);

export { Product, Category, ProductType, Store, Floor, Building };
