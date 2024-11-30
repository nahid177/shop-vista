// src/types/types.ts

export interface ProductData {
    productName: string;
    productSize: string;
    color: string;
    quantity: number;
    price: number;
    image: string;
  }
  
  export interface CategoryData {
    categoryName: string;
    products: ProductData[];
  }
  
  export interface ProductTypeData {
    productTypeName: string;
    categories: CategoryData[];
  }
  
  export interface StoreData {
    storeName: string;
    image: string;
    productTypes: ProductTypeData[];
  }
  
  export interface FloorData {
    floorName: string;
    stores: StoreData[];
  }
  
  export interface StoreBuildingData {
    buildingName: string;
    image: string;
    floors: FloorData[];
  }
  