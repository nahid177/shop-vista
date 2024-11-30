'use client';

import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const StoreBuildingForm = () => {
  const [buildingName, setBuildingName] = useState('');
  const [image, setImage] = useState('');
  const [floors, setFloors] = useState([
    {
      floorName: '',
      stores: [
        {
          storeName: '',
          storeImage: '', // Store image state
          productTypes: [
            {
              productTypeName: '',
              categories: [
                {
                  categoryName: '',
                  products: [
                    {
                      productName: '',
                      productSize: '',
                      color: '',
                      quantity: 0,
                      price: 0,
                      productImage: '', // Product image state
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]);

  // Handle input changes for floor, store, product type, category, and product
  const handleFloorChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFloors = [...floors];
    updatedFloors[index].floorName = e.target.value;
    setFloors(updatedFloors);
  };

  const handleStoreChange = (floorIndex: number, storeIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].stores[storeIndex].storeName = e.target.value;
    setFloors(updatedFloors);
  };

  const handleProductTypeChange = (
    floorIndex: number,
    storeIndex: number,
    productTypeIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].stores[storeIndex].productTypes[productTypeIndex].productTypeName = e.target.value;
    setFloors(updatedFloors);
  };

  const handleCategoryChange = (
    floorIndex: number,
    storeIndex: number,
    productTypeIndex: number,
    categoryIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].stores[storeIndex].productTypes[productTypeIndex].categories[categoryIndex].categoryName =
      e.target.value;
    setFloors(updatedFloors);
  };

  const handleProductChange = (
    floorIndex: number,
    storeIndex: number,
    productTypeIndex: number,
    categoryIndex: number,
    productIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedFloors = [...floors];
    const product = updatedFloors[floorIndex].stores[storeIndex].productTypes[productTypeIndex].categories[categoryIndex].products[productIndex];
    const { name, value } = e.target;

    if (name === 'productName') product.productName = value;
    if (name === 'productSize') product.productSize = value;
    if (name === 'color') product.color = value;
    if (name === 'quantity') product.quantity = parseInt(value, 10);
    if (name === 'price') product.price = parseFloat(value);
    if (name === 'productImage') product.productImage = value;

    setFloors(updatedFloors);
  };

  // Add new floor, store, product type, category, and product
  const addFloor = () => {
    setFloors([
      ...floors,
      {
        floorName: '',
        stores: [
          {
            storeName: '',
            storeImage: '', // Store image state
            productTypes: [
              {
                productTypeName: '',
                categories: [
                  {
                    categoryName: '',
                    products: [
                      {
                        productName: '',
                        productSize: '',
                        color: '',
                        quantity: 0,
                        price: 0,
                        productImage: '', // Product image state
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]);
  };

  const addStore = (floorIndex: number) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].stores.push({
      storeName: '',
      storeImage: '', // Store image state
      productTypes: [
        {
          productTypeName: '',
          categories: [
            {
              categoryName: '',
              products: [
                {
                  productName: '',
                  productSize: '',
                  color: '',
                  quantity: 0,
                  price: 0,
                  productImage: '', // Product image state
                }
              ]
            }
          ]
        }
      ]
    });
    setFloors(updatedFloors);
  };

  const addProductType = (floorIndex: number, storeIndex: number) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].stores[storeIndex].productTypes.push({
      productTypeName: '',
      categories: [
        {
          categoryName: '',
          products: [
            {
              productName: '',
              productSize: '',
              color: '',
              quantity: 0,
              price: 0,
              productImage: '', // Product image state
            }
          ]
        }
      ]
    });
    setFloors(updatedFloors);
  };

  const addCategory = (
    floorIndex: number,
    storeIndex: number,
    productTypeIndex: number
  ) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].stores[storeIndex].productTypes[productTypeIndex].categories.push({
      categoryName: '',
      products: [
        {
          productName: '',
          productSize: '',
          color: '',
          quantity: 0,
          price: 0,
          productImage: '', // Product image state
        }
      ]
    });
    setFloors(updatedFloors);
  };

  const addProduct = (
    floorIndex: number,
    storeIndex: number,
    productTypeIndex: number,
    categoryIndex: number
  ) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].stores[storeIndex].productTypes[productTypeIndex].categories[categoryIndex].products.push({
      productName: '',
      productSize: '',
      color: '',
      quantity: 0,
      price: 0,
      productImage: '', // Product image state
    });
    setFloors(updatedFloors);
  };

  // Remove floor, store, product type, category, or product
  const removeFloor = (index: number) => {
    const updatedFloors = floors.filter((_, i) => i !== index);
    setFloors(updatedFloors);
  };

  const removeStore = (floorIndex: number, storeIndex: number) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].stores = updatedFloors[floorIndex].stores.filter((_, i) => i !== storeIndex);
    setFloors(updatedFloors);
  };

  const removeProductType = (floorIndex: number, storeIndex: number, productTypeIndex: number) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].stores[storeIndex].productTypes = updatedFloors[floorIndex].stores[storeIndex].productTypes.filter((_, i) => i !== productTypeIndex);
    setFloors(updatedFloors);
  };

  const removeCategory = (floorIndex: number, storeIndex: number, productTypeIndex: number, categoryIndex: number) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].stores[storeIndex].productTypes[productTypeIndex].categories = updatedFloors[floorIndex].stores[storeIndex].productTypes[productTypeIndex].categories.filter((_, i) => i !== categoryIndex);
    setFloors(updatedFloors);
  };

  const removeProduct = (floorIndex: number, storeIndex: number, productTypeIndex: number, categoryIndex: number, productIndex: number) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].stores[storeIndex].productTypes[productTypeIndex].categories[categoryIndex].products = updatedFloors[floorIndex].stores[storeIndex].productTypes[productTypeIndex].categories[categoryIndex].products.filter((_, i) => i !== productIndex);
    setFloors(updatedFloors);
  };

  // Handle file upload to S3
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
    floorIndex: number,
    storeIndex: number,
    productTypeIndex: number,
    categoryIndex: number,
    productIndex: number
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('files', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const { urls } = await res.json();

      if (field === 'storeImage') {
        const updatedFloors = [...floors];
        updatedFloors[floorIndex].stores[storeIndex].storeImage = urls[0];
        setFloors(updatedFloors);
      } else if (field === 'productImage') {
        const updatedFloors = [...floors];
        updatedFloors[floorIndex].stores[storeIndex].productTypes[productTypeIndex].categories[categoryIndex].products[productIndex].productImage = urls[0];
        setFloors(updatedFloors);
      }
    } else {
      alert('Error uploading image');
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/store-building', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storeBuildings: [{ buildingName, image, floors }] }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Store building data submitted successfully!');
      } else {
        alert('Failed to submit data');
      }
    } catch (error) {
      alert('An error occurred');
    }
  };

  return (
    <Box>
      <Typography variant="h4">Store Building Form</Typography>
      <form onSubmit={handleSubmit}>
        {/* Building Name */}
        <TextField
          label="Building Name"
          variant="outlined"
          value={buildingName}
          onChange={(e) => setBuildingName(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* Image Upload for Building */}
        <Button variant="contained" component="label">
          Upload Building Image
          <input
            type="file"
            hidden
            onChange={(e) => handleImageUpload(e, 'buildingImage', 0, 0, 0, 0, 0)}
          />
        </Button>
        {image && <Typography>Building image uploaded: {image}</Typography>}

        {/* Floor Management */}
        {floors.map((floor, floorIndex) => (
          <div key={floorIndex}>
            <TextField
              label={`Floor Name ${floorIndex + 1}`}
              variant="outlined"
              value={floor.floorName}
              onChange={(e) => handleFloorChange(floorIndex, e)}
              fullWidth
              margin="normal"
            />
            <Button onClick={() => addStore(floorIndex)}>Add Store</Button>
            <Button onClick={() => removeFloor(floorIndex)} color="error">Remove Floor</Button>

            {/* Store Management */}
            {floor.stores.map((store, storeIndex) => (
              <div key={storeIndex}>
                <TextField
                  label={`Store Name ${storeIndex + 1}`}
                  variant="outlined"
                  value={store.storeName}
                  onChange={(e) => handleStoreChange(floorIndex, storeIndex, e)}
                  fullWidth
                  margin="normal"
                />
                <Button onClick={() => addProductType(floorIndex, storeIndex)}>Add Product Type</Button>
                <Button onClick={() => removeStore(floorIndex, storeIndex)} color="error">Remove Store</Button>

                {/* Store Image Upload */}
                <Button variant="contained" component="label">
                  Upload Store Image
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleImageUpload(e, 'storeImage', floorIndex, storeIndex, 0, 0, 0)}
                  />
                </Button>
                {store.storeImage && <Typography>Store image uploaded: {store.storeImage}</Typography>}

                {/* Product Type Management */}
                {store.productTypes.map((productType, productTypeIndex) => (
                  <div key={productTypeIndex}>
                    <TextField
                      label={`Product Type ${productTypeIndex + 1}`}
                      variant="outlined"
                      value={productType.productTypeName}
                      onChange={(e) => handleProductTypeChange(floorIndex, storeIndex, productTypeIndex, e)}
                      fullWidth
                      margin="normal"
                    />
                    <Button onClick={() => addCategory(floorIndex, storeIndex, productTypeIndex)}>
                      Add Category
                    </Button>
                    <Button onClick={() => removeProductType(floorIndex, storeIndex, productTypeIndex)} color="error">
                      Remove Product Type
                    </Button>

                    {/* Category Management */}
                    {productType.categories.map((category, categoryIndex) => (
                      <div key={categoryIndex}>
                        <TextField
                          label={`Category Name ${categoryIndex + 1}`}
                          variant="outlined"
                          value={category.categoryName}
                          onChange={(e) => handleCategoryChange(floorIndex, storeIndex, productTypeIndex, categoryIndex, e)}
                          fullWidth
                          margin="normal"
                        />
                        <Button onClick={() => addProduct(floorIndex, storeIndex, productTypeIndex, categoryIndex)}>
                          Add Product
                        </Button>
                        <Button onClick={() => removeCategory(floorIndex, storeIndex, productTypeIndex, categoryIndex)} color="error">
                          Remove Category
                        </Button>

                        {/* Product Management */}
                        {category.products.map((product, productIndex) => (
                          <div key={productIndex}>
                            <TextField
                              label="Product Name"
                              variant="outlined"
                              value={product.productName}
                              onChange={(e) => handleProductChange(floorIndex, storeIndex, productTypeIndex, categoryIndex, productIndex, e)}
                              fullWidth
                              margin="normal"
                              name="productName"
                            />
                            <TextField
                              label="Product Size"
                              variant="outlined"
                              value={product.productSize}
                              onChange={(e) => handleProductChange(floorIndex, storeIndex, productTypeIndex, categoryIndex, productIndex, e)}
                              fullWidth
                              margin="normal"
                              name="productSize"
                            />
                            <TextField
                              label="Color"
                              variant="outlined"
                              value={product.color}
                              onChange={(e) => handleProductChange(floorIndex, storeIndex, productTypeIndex, categoryIndex, productIndex, e)}
                              fullWidth
                              margin="normal"
                              name="color"
                            />
                            <TextField
                              label="Quantity"
                              variant="outlined"
                              value={product.quantity}
                              onChange={(e) => handleProductChange(floorIndex, storeIndex, productTypeIndex, categoryIndex, productIndex, e)}
                              fullWidth
                              margin="normal"
                              name="quantity"
                              type="number"
                            />
                            <TextField
                              label="Price"
                              variant="outlined"
                              value={product.price}
                              onChange={(e) => handleProductChange(floorIndex, storeIndex, productTypeIndex, categoryIndex, productIndex, e)}
                              fullWidth
                              margin="normal"
                              name="price"
                              type="number"
                            />

                            {/* Product Image Upload */}
                            <Button variant="contained" component="label">
                              Upload Product Image
                              <input
                                type="file"
                                hidden
                                onChange={(e) => handleImageUpload(e, 'productImage', floorIndex, storeIndex, productTypeIndex, categoryIndex, productIndex)}
                              />
                            </Button>
                            {product.productImage && <Typography>Product image uploaded: {product.productImage}</Typography>}
                            <Button onClick={() => removeProduct(floorIndex, storeIndex, productTypeIndex, categoryIndex, productIndex)} color="error">
                              Remove Product
                            </Button>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
        <Button type="submit" variant="contained">Submit</Button>
      </form>
    </Box>
  );
};

export default StoreBuildingForm;
