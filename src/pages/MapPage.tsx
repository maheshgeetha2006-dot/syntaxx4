import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Plus, Home, Utensils, Guitar as Hospital } from 'lucide-react';

interface MapLocation {
  id: string;
  name: string;
  type: 'shelter' | 'feeding' | 'hospital' | 'safe_zone';
  latitude: number;
  longitude: number;
  address: string;
  contact?: string;
  verified: boolean;
}

const MapPage: React.FC = () => {
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    // Mock data - replace with actual Supabase query
    setLocations([
      {
        id: '1',
        name: 'Happy Tails Shelter',
        type: 'shelter',
        latitude: 28.6139,
        longitude: 77.2090,
        address: 'Connaught Place, New Delhi',
        contact: '+91-9876543210',
        verified: true
      },
      {
        id: '2',
        name: 'Street Dog Feeding Point',
        type: 'feeding',
        latitude: 28.6129,
        longitude: 77.2295,
        address: 'India Gate, New Delhi',
        verified: true
      },
      {
        id: '3',
        name: 'Animal Care Hospital',
        type: 'hospital',
        latitude: 28.6345,
        longitude: 77.2245,
        address: 'Khan Market, New Delhi',
        contact: '+91-9876543211',
        verified: true
      },
      {
        id: '4',
        name: 'Safe Zone Alpha',
        type: 'safe_zone',
        latitude: 28.6289,
        longitude: 77.2065,
        address: 'Rajpath, New Delhi',
        verified: false
      }
    ]);

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Delhi
          setUserLocation({ lat: 28.6139, lng: 77.2090 });
        }
      );
    }
  }, []);

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'shelter': return <Home className="safe-zone-marker" size={24} />;
      case 'feeding': return <Utensils className="feeding-marker" size={24} />;
      case 'hospital': return <Hospital className="hospital-marker" size={24} />;
      default: return <MapPin className="safe-zone-marker" size={24} />;
    }
  };

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'shelter': return 'border-green-500 bg-green-50';
      case 'feeding': return 'border-yellow-500 bg-yellow-50';
      case 'hospital': return 'border-red-500 bg-red-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  const filteredLocations = selectedType === 'all' 
    ? locations 
    : locations.filter(loc => loc.type === selectedType);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Safety Map</h1>
          <p className="text-gray-600">Find shelters, feeding points, hospitals, and safe zones near you</p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {['all', 'shelter', 'feeding', 'hospital', 'safe_zone'].map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                } border border-gray-200`}
              >
                {type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="map-container bg-gray-200 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MapPin size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">Interactive Map</p>
                <p className="text-sm">Connect to Supabase to enable real map functionality</p>
                <div className="mt-4 text-xs text-gray-400">
                  <p>📍 Current location: {userLocation ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}` : 'Loading...'}</p>
                </div>
              </div>
            </div>
            
            {/* Add Location Button */}
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 w-full md:w-auto flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <Plus size={20} className="mr-2" />
              Add Safe Location
            </button>
          </div>

          {/* Locations List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Nearby Locations ({filteredLocations.length})</h2>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className={`p-4 rounded-lg border-l-4 ${getLocationColor(location.type)} bg-white shadow-sm hover:shadow-md transition-shadow duration-200`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getLocationIcon(location.type)}
                        <h3 className="font-semibold text-gray-900">{location.name}</h3>
                        {location.verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{location.address}</p>
                      {location.contact && (
                        <p className="text-sm text-blue-600">{location.contact}</p>
                      )}
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 p-2">
                      <Navigation size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Location Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Add Safe Location</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Happy Paws Shelter"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="shelter">Shelter</option>
                    <option value="feeding">Feeding Point</option>
                    <option value="hospital">Hospital</option>
                    <option value="safe_zone">Safe Zone</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Full address..."
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    Add Location
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;