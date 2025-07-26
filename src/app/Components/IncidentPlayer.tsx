'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Camera = {
  id: number;
  name: string;
  location: string;
};

type Incident = {
  id: number;
  type: string;
  tsStart: string;
  tsEnd: string;
  camera: Camera;
  thumbnailUrl: string;
};

export default function IncidentPlayer() {
  const [incident, setIncident] = useState<Incident | null>(null);

  useEffect(() => {
    // Fetch the latest incident (unresolved) to display in player
    fetch('/api/incidents?resolved=false')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setIncident(data[0]); // Show the most recent one
        }
      });
  }, []);

  if (!incident) {
    return (
      <div className="bg-[#1E1E1E] text-white p-4 rounded-lg shadow-lg w-full h-[400px] flex items-center justify-center">
        <p className="text-gray-400">Loading incident player...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1E1E1E] text-white p-4 rounded-lg shadow-lg w-full">
      {/* Timestamp and type */}
      <div className="mb-2">
        <h2 className="text-lg font-semibold">{incident.type}</h2>
        <p className="text-sm text-gray-400">
          {new Date(incident.tsStart).toLocaleTimeString()} - {new Date(incident.tsEnd).toLocaleTimeString()}
        </p>
        <p className="text-sm text-yellow-400 mt-1">{incident.camera.name}</p>
      </div>

      {/* Large video/image frame */}
      <div className="mb-4">
        <Image
          src={incident.thumbnailUrl}
          alt="Incident Video Frame"
          width={800}
          height={400}
          className="rounded-lg object-cover w-full h-64"
        />
      </div>

      {/* Mini thumbnail strip of other cameras */}
      <div className="flex gap-3">
        <Image
          src="/thumbnails/thumb2.jpg"
          alt="Camera 2"
          width={100}
          height={60}
          className="rounded-md border border-gray-700"
        />
        <Image
          src="/thumbnails/thumb3.jpg"
          alt="Camera 3"
          width={100}
          height={60}
          className="rounded-md border border-gray-700"
        />
      </div>
    </div>
  );
}
