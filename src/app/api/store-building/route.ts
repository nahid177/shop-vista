import { NextResponse } from 'next/server';
import { StoreBuilding, StoreFloor, Store, ProductType, Category, Product } from '@/models/Market';
import dbConnect from '@/lib/dbConnect';
import { StoreBuildingData, StoreData, FloorData, ProductTypeData, CategoryData, ProductData } from '@/types/types';
export async function POST(req: Request) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse incoming data
    const data = await req.json();

    // Iterate through store buildings to save data
    const storeBuildingPromises = data.storeBuildings.map(async (building: StoreBuildingData) => {
      const { buildingName, image, floors } = building;

      // Save the StoreBuilding document
      const buildingDoc = await StoreBuilding.create({
        buildingName,
        image, // Image URL (optional)
        floors: [], // Empty array for now
      });

      // Iterate through the floors to save each StoreFloor
      const floorPromises = floors.map(async (floor: FloorData) => {
        const { floorName, stores } = floor;

        // Save the StoreFloor document
        const floorDoc = await StoreFloor.create({
          floorName,
          stores: [], // Empty stores array for now
        });

        // Iterate through the stores on each floor
        const storePromises = stores.map(async (store: StoreData) => {
          const { storeName, image, productTypes } = store;

          // Save the Store document
          const storeDoc = await Store.create({
            storeName,
            image, // Image URL (optional)
            productTypes: [], // Empty array for now
          });

          // Iterate through the product types and save them
          const productTypePromises = productTypes.map(async (productType: ProductTypeData) => {
            const { productTypeName, categories } = productType;

            // Save the ProductType document
            const productTypeDoc = await ProductType.create({
              productTypeName,
              categories: [], // Empty categories array for now
            });

            // Iterate through the categories and save them
            const categoryPromises = categories.map(async (category: CategoryData) => {
              const { categoryName, products } = category;

              // Save the Category document
              const categoryDoc = await Category.create({
                categoryName,
                products: [], // Empty products array for now
              });

              // Iterate through the products and save them
              const productPromises = products.map(async (product: ProductData) => {
                const { productName, productSize, color, quantity, price, image } = product;

                // Save the Product document
                const productDoc = await Product.create({
                  productName,
                  productSize,
                  color,
                  quantity,
                  price,
                  image, // Image URL (optional)
                });

                categoryDoc.products.push(productDoc._id);
                await categoryDoc.save();
              });

              await Promise.all(productPromises);
              productTypeDoc.categories.push(categoryDoc._id);
              await productTypeDoc.save();
            });

            await Promise.all(categoryPromises);
            storeDoc.productTypes.push(productTypeDoc._id);
            await storeDoc.save();
          });

          await Promise.all(productTypePromises);
          floorDoc.stores.push(storeDoc._id);
          await floorDoc.save();
        });

        await Promise.all(storePromises);
        buildingDoc.floors.push(floorDoc._id);
        await buildingDoc.save();
      });

      await Promise.all(floorPromises);
    });

    // Wait for all store buildings to be saved
    await Promise.all(storeBuildingPromises);

    return NextResponse.json({ message: 'Data saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ message: 'Error saving data', error: error.message }, { status: 500 });
  }
}
