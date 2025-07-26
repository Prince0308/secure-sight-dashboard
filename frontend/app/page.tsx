import Navbar from './Components/Navbar';
import IncidentList from './Components/IncidentList';
import IncidentPlayer from './Components/IncidentPlayer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area - takes 2/3 of the space */}
          <div className="lg:col-span-2">
            <IncidentPlayer />
          </div>
          
          {/* Sidebar - takes 1/3 of the space */}
          <div className="lg:col-span-1">
            <IncidentList />
          </div>
        </div>
      </main>
    </div>
  );
}
