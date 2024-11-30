import { FC } from "react";

interface StoreInfoProps {
  storeName: string;
  onStoreNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StoreInfo: FC<StoreInfoProps> = ({ storeName, onStoreNameChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="storeName" className="font-medium text-gray-700">Store Name</label>
      <input
        type="text"
        name="storeName"
        id="storeName"
        value={storeName}
        onChange={onStoreNameChange}
        className="p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
};

export default StoreInfo;
