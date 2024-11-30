import dbConnect from "@/lib/dbConnect";
import { Product, Category, ProductType, Store, Floor, Building } from "@/models/Market";
import { NextApiRequest, NextApiResponse } from "next";

// Define interfaces for the market data
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

interface IMarketData {
  products: IProduct[];
  categories: ICategory[];
  productTypes: IProductType[];
  stores: IStore[];
  floors: IFloor[];
  buildings: IBuilding[];
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const marketData: IMarketData = req.body;

  try {
    // Connect to the database
    await dbConnect();

    // Create products
    const products = await Product.insertMany(marketData.products);

    // Create categories
    const categories = await Category.insertMany(
      marketData.categories.map((category: ICategory) => ({
        categoryName: category.categoryName,
        products: category.products.map((prod: IProduct) => {
          const foundProduct = products.find((product) => product.productName === prod.productName);
          if (!foundProduct) {
            throw new Error(`Product not found: ${prod.productName}`);
          }
          return foundProduct._id;
        }),
      }))
    );

    // Create product types
    const productTypes = await ProductType.insertMany(
      marketData.productTypes.map((type: IProductType) => ({
        productTypeName: type.productTypeName,
        categories: type.categories.map((category: ICategory) => {
          const foundCategory = categories.find((cat) => cat.categoryName === category.categoryName);
          if (!foundCategory) {
            throw new Error(`Category not found: ${category.categoryName}`);
          }
          return foundCategory._id;
        }),
      }))
    );

    // Create stores
    const stores = await Store.insertMany(
      marketData.stores.map((store: IStore) => ({
        storeName: store.storeName,
        productTypes: store.productTypes.map((productType: IProductType) => {
          const foundProductType = productTypes.find((ptype) => ptype.productTypeName === productType.productTypeName);
          if (!foundProductType) {
            throw new Error(`Product Type not found: ${productType.productTypeName}`);
          }
          return foundProductType._id;
        }),
      }))
    );

    // Create floors
    const floors = await Floor.insertMany(
      marketData.floors.map((floor: IFloor) => ({
        floorName: floor.floorName,
        stores: floor.stores.map((store: IStore) => {
          const foundStore = stores.find((st) => st.storeName === store.storeName);
          if (!foundStore) {
            throw new Error(`Store not found: ${store.storeName}`);
          }
          return foundStore._id;
        }),
      }))
    );

    // Create buildings
    const buildings = await Building.insertMany(
      marketData.buildings.map((building: IBuilding) => ({
        buildingName: building.buildingName,
        floors: building.floors.map((floor: IFloor) => {
          const foundFloor = floors.find((fl) => fl.floorName === floor.floorName);
          if (!foundFloor) {
            throw new Error(`Floor not found: ${floor.floorName}`);
          }
          return foundFloor._id;
        }),
      }))
    );

    // Return success response
    return res.status(201).json({ message: "Market data created successfully", buildings });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error inserting data:", error.message);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    } else {
      console.error("Unknown error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default handlePostRequest;
