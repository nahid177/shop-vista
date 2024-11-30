import { FC } from "react";

interface ProductInfoProps {
  productName: string;
  onProductNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  productSize: string;
  onProductSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color: string;
  onColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  quantity: number;
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  price: number;
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductInfo: FC<ProductInfoProps> = ({ productName, onProductNameChange, productSize, onProductSizeChange, color, onColorChange, quantity, onQuantityChange, price, onPriceChange }) => {
  return (
    <div className="space-y-4">
      <h6 className="font-medium text-gray-700">Product</h6>

      <div className="flex flex-col">
        <label htmlFor="productName" className="font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          name="productName"
          id="productName"
          value={productName}
          onChange={onProductNameChange}
          className="p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="productSize" className="font-medium text-gray-700">Product Size</label>
        <input
          type="text"
          name="productSize"
          id="productSize"
          value={productSize}
          onChange={onProductSizeChange}
          className="p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="color" className="font-medium text-gray-700">Color</label>
        <input
          type="text"
          name="color"
          id="color"
          value={color}
          onChange={onColorChange}
          className="p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="quantity" className="font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={quantity}
          onChange={onQuantityChange}
          className="p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="price" className="font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          value={price}
          onChange={onPriceChange}
          className="p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    </div>
  );
};

export default ProductInfo;
