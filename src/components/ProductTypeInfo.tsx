import { FC } from "react";

interface ProductTypeInfoProps {
  productTypeName: string;
  onProductTypeNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductTypeInfo: FC<ProductTypeInfoProps> = ({ productTypeName, onProductTypeNameChange }) => {
  return (
    <div className="space-y-6">
      <h4 className="text-md font-semibold">Product Type: {productTypeName}</h4>
      <div className="flex flex-col">
        <label htmlFor="productTypeName" className="font-medium text-gray-700">Product Type Name</label>
        <input
          type="text"
          name="productTypeName"
          id="productTypeName"
          value={productTypeName}
          onChange={onProductTypeNameChange}
          className="p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    </div>
  );
};

export default ProductTypeInfo;
