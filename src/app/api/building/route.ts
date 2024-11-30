// src/app/api/building/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';  // Import your dbConnect function
import Building from '@/models/Building';  // Import your Building model

// Named export for POST method
export async function POST(req: NextRequest) {
  try {
    // Ensure that the database is connected
    await dbConnect();

    // Parse the body of the request
    const buildingData = await req.json();

    // Create a new building document in the database
    const newBuilding = new Building(buildingData);

    // Save the new building document
    await newBuilding.save();

    // Return a success response with the created building data
    return NextResponse.json({
      message: 'Building created successfully',
      building: newBuilding,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating building:", error);
    return NextResponse.json({
      message: 'Error creating building',
      error: error.message,
    }, { status: 500 });
  }
}
