'use client';

import React from 'react';

interface TimelineEvent {
  id: number;
  timestamp: string;
  event: string;
  severity: 'low' | 'medium' | 'high';
}

export default function IncidentTimeLine() {
  const events: TimelineEvent[] = [
    {
      id: 1,
      timestamp: '2024-01-15 14:30:00',
      event: 'Motion detected in restricted area',
      severity: 'medium'
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:32:15',
      event: 'Security alert triggered',
      severity: 'high'
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:35:00',
      event: 'Response team dispatched',
      severity: 'high'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-4 h-full w-full">
      <h2 className="text-xl font-semibold mb-4 text-white">Incident Timeline</h2>
      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-white text-sm">{event.event}</p>
              <p className="text-gray-400 text-xs">{event.timestamp}</p>
              <span className={`text-xs font-medium ${getSeverityColor(event.severity)}`}>
                {event.severity.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
