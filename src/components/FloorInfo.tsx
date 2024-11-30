import { FC } from "react";

interface FloorInfoProps {
  floorName: string;
  onFloorNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FloorInfo: FC<FloorInfoProps> = ({ floorName, onFloorNameChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="floorName" className="font-medium text-gray-700">Floor Name</label>
      <input
        type="text"
        name="floorName"
        id="floorName"
        value={floorName}
        onChange={onFloorNameChange}
        className="p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
};

export default FloorInfo;
