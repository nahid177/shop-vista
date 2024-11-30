import { FC } from "react";
import Image from "next/image"; // Import Next.js Image component

interface BuildingInfoProps {
  buildingName: string;
  onBuildingNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buildingImageUrl: string;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BuildingInfo: FC<BuildingInfoProps> = ({
  buildingName,
  onBuildingNameChange,
  buildingImageUrl,
  onImageUpload
}) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Building Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Building Name Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="buildingName" className="font-medium text-gray-700">Building Name</label>
          <input
            type="text"
            name="buildingName"
            id="buildingName"
            value={buildingName}
            onChange={onBuildingNameChange}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            required
            placeholder="Enter building name"
          />
        </div>

        {/* Building Image Upload */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="image" className="font-medium text-gray-700">Building Image</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={onImageUpload}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
            accept="image/*"
          />
          
          {/* Image Preview */}
          {buildingImageUrl && (
            <div className="mt-4 flex justify-center">
              <Image
                src={buildingImageUrl}
                alt="Building preview"
                width={128}
                height={128}
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuildingInfo;
