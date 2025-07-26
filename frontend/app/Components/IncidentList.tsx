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
  const [isResolving, setIsResolving] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    async function fetchIncidents() {
      const res = await fetch("/api/incidents");

      if (!res.ok) {
        console.error("Failed to fetch incidents:", res.status, await res.text());
        return;
      }

      const data = await res.json();
      setIncidents(data);
    }

    fetchIncidents();

    // Refresh incidents every 45 seconds to show new ones
    const interval = setInterval(fetchIncidents, 45000);

    return () => clearInterval(interval);
  }, []);

  async function resolveIncident(id: number) {
    setIsResolving(id);
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

      const data = await res.json();
      
      // Remove the resolved incident and add the new one
      setIncidents((prev) => {
        const filtered = prev.filter((inc) => inc.id !== id);
        return [data.newIncident, ...filtered];
      });

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error resolving incident:", error);
    } finally {
      setIsResolving(null);
    }
  }

  return (
    <div className="bg-zinc-900 rounded-xl p-4 h-full w-full overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-white">Incident List</h2>
      
      {showSuccess && (
        <div className="mb-4 p-3 bg-green-600 text-white rounded-lg text-sm">
          ✅ Incident resolved! New incident generated.
        </div>
      )}
      
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
                  disabled={isResolving === incident.id}
                  className={`mt-2 px-2 py-1 rounded text-sm ${
                    isResolving === incident.id
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white`}
                >
                  {isResolving === incident.id ? 'Resolving...' : 'Mark Resolved'}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
