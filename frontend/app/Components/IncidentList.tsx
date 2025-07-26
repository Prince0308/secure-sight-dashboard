"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Incident {
  id: number;
  timestamp: string;
  thumbnailUrl: string;
  resolved: boolean;
}

export default function IncidentList() {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    async function fetchIncidents() {
      const res = await fetch("/api/incidents?resolved=false");

      if (!res.ok) {
        console.error("Failed to fetch incidents:", res.status, await res.text());
        return;
      }

      const data = await res.json();
      setIncidents(data);
    }

    fetchIncidents();
  }, []);

  async function resolveIncident(id: number) {
    try {
      const res = await fetch(`/api/incidents`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        console.error("Failed to resolve incident:", res.status, await res.text());
        return;
      }

      // Optimistically update UI
      setIncidents((prev) =>
        prev.map((inc) =>
          inc.id === id ? { ...inc, resolved: true } : inc
        )
      );
    } catch (error) {
      console.error("Error resolving incident:", error);
    }
  }

  return (
    <div className="bg-zinc-900 rounded-xl p-4 h-full w-full overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-white">Incident List</h2>
      <ul className="space-y-3">
        {incidents.map((incident) => (
          <li
            key={incident.id}
            className="flex items-center gap-4 bg-zinc-800 p-3 rounded-lg"
          >
            <Image
              src={incident.thumbnailUrl}
              alt="Incident thumbnail"
              width={64}
              height={64}
              className="w-16 h-16 rounded object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/thumbnails/placeholder.jpg";
              }}
            />
            <div className="flex flex-col">
              <p className="text-white font-medium">
                Incident #{incident.id}
              </p>
              <p className="text-sm text-gray-400">{incident.timestamp}</p>
              <p
                className={`text-xs font-bold mt-1 ${
                  incident.resolved ? "text-green-400" : "text-red-400"
                }`}
              >
                {incident.resolved ? "Resolved" : "Unresolved"}
              </p>

              {!incident.resolved && (
                <button
                  onClick={() => resolveIncident(incident.id)}
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm"
                >
                  Mark Resolved
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
