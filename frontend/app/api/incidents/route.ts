import { NextResponse } from 'next/server';

// Mock data for development
const mockIncidents = [
  {
    id: 1,
    type: "Motion Detected",
    tsStart: "2024-01-15T14:30:00Z",
    tsEnd: "2024-01-15T14:35:00Z",
    thumbnailUrl: "/thumbnails/thumb1.jpg",
    resolved: false,
    camera: {
      id: 1,
      name: "Main Entrance",
      location: "Building A"
    }
  },
  {
    id: 2,
    type: "Unauthorized Access",
    tsStart: "2024-01-15T15:20:00Z",
    tsEnd: "2024-01-15T15:25:00Z",
    thumbnailUrl: "/thumbnails/thumb2.jpg",
    resolved: false,
    camera: {
      id: 2,
      name: "Parking Lot",
      location: "Building B"
    }
  },
  {
    id: 3,
    type: "Suspicious Activity",
    tsStart: "2024-01-15T16:10:00Z",
    tsEnd: "2024-01-15T16:15:00Z",
    thumbnailUrl: "/thumbnails/thumb3.jpg",
    resolved: true,
    camera: {
      id: 3,
      name: "Loading Dock",
      location: "Building C"
    }
  }
];

export async function GET() {
  try {
    // Return only unresolved incidents
    const unresolvedIncidents = mockIncidents.filter(incident => !incident.resolved);
    return NextResponse.json(unresolvedIncidents);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch incidents' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // Find and update the incident in mock data
    const incidentIndex = mockIncidents.findIndex(inc => inc.id === parseInt(id));
    if (incidentIndex === -1) {
      return NextResponse.json({ error: "Incident not found" }, { status: 404 });
    }

    mockIncidents[incidentIndex].resolved = true;
    
    return NextResponse.json(mockIncidents[incidentIndex], { status: 200 });
  } catch (error) {
    console.error("Error updating incident:", error);
    return NextResponse.json(
      { error: "Failed to resolve incident" },
      { status: 500 }
    );
  }
}
