import { NextResponse } from 'next/server';

// Dynamic incident generator
class IncidentGenerator {
  private static incidentId = 1;
  private static cameraId = 1;
  
  private static cameras = [
    { id: 1, name: "Main Entrance", location: "Building A" },
    { id: 2, name: "Parking Lot", location: "Building B" },
    { id: 3, name: "Loading Dock", location: "Building C" },
    { id: 4, name: "Security Gate", location: "Building D" },
    { id: 5, name: "Employee Entrance", location: "Building E" },
    { id: 6, name: "Server Room", location: "Building F" },
    { id: 7, name: "Warehouse", location: "Building G" },
    { id: 8, name: "Perimeter Fence", location: "Building H" }
  ];

  private static incidentTypes = [
    "Motion Detected",
    "Unauthorized Access",
    "Suspicious Activity",
    "Perimeter Breach",
    "Vehicle Intrusion",
    "Person Loitering",
    "Door Forced Open",
    "Window Tampering",
    "Equipment Theft",
    "Fire Alarm Triggered",
    "Smoke Detected",
    "Water Leak Detected",
    "Power Outage",
    "Network Intrusion",
    "Card Reader Failure"
  ];

  private static thumbnails = [
    "/thumbnails/thumb1.jpg",
    "/thumbnails/thumb2.jpg",
    "/thumbnails/thumb3.jpg"
  ];

  static generateIncident() {
    const now = new Date();
    const randomMinutes = Math.floor(Math.random() * 30) + 5; // 5-35 minutes ago
    const startTime = new Date(now.getTime() - randomMinutes * 60000);
    const endTime = new Date(startTime.getTime() + (Math.random() * 10 + 2) * 60000); // 2-12 minutes duration

    const camera = this.cameras[Math.floor(Math.random() * this.cameras.length)];
    const incidentType = this.incidentTypes[Math.floor(Math.random() * this.incidentTypes.length)];
    const thumbnail = this.thumbnails[Math.floor(Math.random() * this.thumbnails.length)];

    return {
      id: this.incidentId++,
      type: incidentType,
      tsStart: startTime.toISOString(),
      tsEnd: endTime.toISOString(),
      thumbnailUrl: thumbnail,
      resolved: false,
      camera: camera
    };
  }

  static generateInitialIncidents(count: number = 8) {
    const incidents = [];
    for (let i = 0; i < count; i++) {
      incidents.push(this.generateIncident());
    }
    return incidents;
  }

  static addNewIncident() {
    return this.generateIncident();
  }
}

// Initialize with some incidents
let mockIncidents = IncidentGenerator.generateInitialIncidents(12);

export async function GET() {
  try {
    // Ensure we always have at least 5-8 unresolved incidents
    const unresolvedIncidents = mockIncidents.filter(incident => !incident.resolved);
    
    // If we have less than 5 unresolved incidents, add new ones
    if (unresolvedIncidents.length < 5) {
      const needed = 8 - unresolvedIncidents.length;
      for (let i = 0; i < needed; i++) {
        mockIncidents.push(IncidentGenerator.addNewIncident());
      }
    }

    // Return only unresolved incidents, sorted by most recent first
    const currentUnresolved = mockIncidents
      .filter(incident => !incident.resolved)
      .sort((a, b) => new Date(b.tsStart).getTime() - new Date(a.tsStart).getTime());

    return NextResponse.json(currentUnresolved);
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

    // Mark the incident as resolved
    mockIncidents[incidentIndex].resolved = true;
    
    // Add a new incident to replace the resolved one
    const newIncident = IncidentGenerator.addNewIncident();
    mockIncidents.push(newIncident);

    // Clean up old resolved incidents (keep only last 20 resolved)
    const resolvedIncidents = mockIncidents.filter(inc => inc.resolved);
    if (resolvedIncidents.length > 20) {
      const toRemove = resolvedIncidents.slice(0, resolvedIncidents.length - 20);
      mockIncidents = mockIncidents.filter(inc => !toRemove.includes(inc));
    }

    return NextResponse.json({
      resolved: mockIncidents[incidentIndex],
      newIncident: newIncident
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating incident:", error);
    return NextResponse.json(
      { error: "Failed to resolve incident" },
      { status: 500 }
    );
  }
}
