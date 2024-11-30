"use client"; // Ensure this is a client-side component

import { useState } from "react";
import { useRouter } from "next/navigation";  // use 'next/navigation' in Next.js 13+
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  FormHelperText,
} from "@mui/material";

export default function CreateBuilding() {
  // Form state and error state management
  const [formData, setFormData] = useState({
    buildingName: "",
    floorName: "",
    storeName: "",
    productTypeName: "",
    categoryName: "",
    productName: "",
    productSize: "",
    color: "",
    quantity: 0,
    price: 0,
  });

  const [errors, setErrors] = useState({
    buildingName: "",
    floorName: "",
    storeName: "",
    productTypeName: "",
    categoryName: "",
    productName: "",
    productSize: "",
    color: "",
    quantity: "",
    price: "",
  });

  // Router for navigation
  const router = useRouter();

  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tempErrors = { ...errors };
    let formIsValid = true;

    // Validation
    if (!formData.buildingName) {
      tempErrors.buildingName = "Building name is required";
      formIsValid = false;
    } else {
      tempErrors.buildingName = "";
    }

    if (!formData.storeName) {
      tempErrors.storeName = "Store name is required";
      formIsValid = false;
    } else {
      tempErrors.storeName = "";
    }

    if (!formData.productTypeName) {
      tempErrors.productTypeName = "Product type is required";
      formIsValid = false;
    } else {
      tempErrors.productTypeName = "";
    }

    // Set errors state
    setErrors(tempErrors);

    if (formIsValid) {
      const formattedData = {
        buildingName: formData.buildingName,
        floors: [
          {
            floorName: formData.floorName,
            stores: [
              {
                storeName: formData.storeName,
                productTypes: [
                  {
                    productTypeName: formData.productTypeName,
                    categories: [
                      {
                        categoryName: formData.categoryName,
                        products: [
                          {
                            productName: formData.productName,
                            productSize: formData.productSize,
                            color: formData.color,
                            quantity: formData.quantity,
                            price: formData.price,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };

      try {
        const response = await fetch("/api/building", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        });

        if (response.ok) {
          router.push("/success");  // Redirect to success page
        } else {
          console.error("Error creating building");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: 4 }}>
      <Typography variant="h4" gutterBottom>Create New Building</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Building Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Building Name"
              variant="outlined"
              fullWidth
              name="buildingName"
              value={formData.buildingName}
              onChange={handleInputChange}
              error={Boolean(errors.buildingName)}
              helperText={errors.buildingName}
            />
          </Grid>

          {/* Floor Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Floor Name"
              variant="outlined"
              fullWidth
              name="floorName"
              value={formData.floorName}
              onChange={handleInputChange}
              error={Boolean(errors.floorName)}
              helperText={errors.floorName}
            />
          </Grid>

          {/* Store Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Store Name"
              variant="outlined"
              fullWidth
              name="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
              error={Boolean(errors.storeName)}
              helperText={errors.storeName}
            />
          </Grid>

          {/* Product Type */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Type"
              variant="outlined"
              fullWidth
              name="productTypeName"
              value={formData.productTypeName}
              onChange={handleInputChange}
              error={Boolean(errors.productTypeName)}
              helperText={errors.productTypeName}
            />
          </Grid>

          {/* Category Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              error={Boolean(errors.categoryName)}
              helperText={errors.categoryName}
            />
          </Grid>

          {/* Product Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              error={Boolean(errors.productName)}
              helperText={errors.productName}
            />
          </Grid>

          {/* Product Size */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Size"
              variant="outlined"
              fullWidth
              name="productSize"
              value={formData.productSize}
              onChange={handleInputChange}
              error={Boolean(errors.productSize)}
              helperText={errors.productSize}
            />
          </Grid>

          {/* Color */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Color"
              variant="outlined"
              fullWidth
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              error={Boolean(errors.color)}
              helperText={errors.color}
            />
          </Grid>

          {/* Quantity */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity"
              variant="outlined"
              fullWidth
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              error={Boolean(errors.quantity)}
              helperText={errors.quantity}
              type="number"
            />
          </Grid>

          {/* Price */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              error={Boolean(errors.price)}
              helperText={errors.price}
              type="number"
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
