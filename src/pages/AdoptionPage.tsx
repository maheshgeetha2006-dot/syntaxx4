import React, { useState, useEffect } from 'react';
import { Heart, Filter, MapPin, Calendar, Info } from 'lucide-react';

interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: 'male' | 'female';
  size: 'small' | 'medium' | 'large';
  location: string;
  description: string;
  healthStatus: string;
  vaccinated: boolean;
  sterilized: boolean;
  photos: string[];
  adoptionFee: number;
  ngoContact: string;
  dateAdded: string;
}

const AdoptionPage: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [filteredDogs, setFilteredDogs] = useState<Dog[]>([]);
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [filters, setFilters] = useState({
    breed: 'all',
    age: 'all',
    size: 'all',
    location: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Mock data - replace with actual Supabase query
    const mockDogs: Dog[] = [
      {
        id: '1',
        name: 'Buddy',
        breed: 'Indie',
        age: 2,
        gender: 'male',
        size: 'medium',
        location: 'Delhi',
        description: 'Friendly and energetic dog who loves playing fetch. Great with children and other dogs.',
        healthStatus: 'Excellent',
        vaccinated: true,
        sterilized: true,
        photos: [
          'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/1390784/pexels-photo-1390784.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        adoptionFee: 0,
        ngoContact: '+91-9876543210',
        dateAdded: '2024-01-15'
      },
      {
        id: '2',
        name: 'Luna',
        breed: 'Mixed',
        age: 1,
        gender: 'female',
        size: 'small',
        location: 'Mumbai',
        description: 'Sweet and calm puppy who loves cuddles. Perfect lap dog for apartment living.',
        healthStatus: 'Good',
        vaccinated: true,
        sterilized: false,
        photos: [
          'https://images.pexels.com/photos/1124002/pexels-photo-1124002.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        adoptionFee: 0,
        ngoContact: '+91-9876543211',
        dateAdded: '2024-01-20'
      },
      {
        id: '3',
        name: 'Rocky',
        breed: 'Indie',
        age: 4,
        gender: 'male',
        size: 'large',
        location: 'Bangalore',
        description: 'Gentle giant who is great with kids. Needs a yard to run and play.',
        healthStatus: 'Excellent',
        vaccinated: true,
        sterilized: true,
        photos: [
          'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        adoptionFee: 0,
        ngoContact: '+91-9876543212',
        dateAdded: '2024-01-12'
      },
      {
        id: '4',
        name: 'Bella',
        breed: 'Golden Retriever Mix',
        age: 3,
        gender: 'female',
        size: 'medium',
        location: 'Pune',
        description: 'Loving and intelligent dog. Well-trained and house-broken. Loves walks and swimming.',
        healthStatus: 'Excellent',
        vaccinated: true,
        sterilized: true,
        photos: [
          'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        adoptionFee: 0,
        ngoContact: '+91-9876543213',
        dateAdded: '2024-01-18'
      }
    ];

    setDogs(mockDogs);
    setFilteredDogs(mockDogs);
  }, []);

  useEffect(() => {
    let filtered = dogs;

    if (filters.breed !== 'all') {
      filtered = filtered.filter(dog => dog.breed.toLowerCase().includes(filters.breed.toLowerCase()));
    }
    if (filters.age !== 'all') {
      if (filters.age === 'puppy') {
        filtered = filtered.filter(dog => dog.age < 2);
      } else if (filters.age === 'adult') {
        filtered = filtered.filter(dog => dog.age >= 2 && dog.age < 6);
      } else if (filters.age === 'senior') {
        filtered = filtered.filter(dog => dog.age >= 6);
      }
    }
    if (filters.size !== 'all') {
      filtered = filtered.filter(dog => dog.size === filters.size);
    }
    if (filters.location !== 'all') {
      filtered = filtered.filter(dog => dog.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    setFilteredDogs(filtered);
  }, [filters, dogs]);

  const toggleFavorite = (dogId: string) => {
    setFavorites(prev => 
      prev.includes(dogId) 
        ? prev.filter(id => id !== dogId)
        : [...prev, dogId]
    );
  };

  const calculateAge = (age: number) => {
    if (age < 1) return `${Math.round(age * 12)} months`;
    return `${age} ${age === 1 ? 'year' : 'years'}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Companion</h1>
          <p className="text-gray-600">Give a loving home to a rescued street dog</p>
        </div>

        {/* Filter Bar */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {filteredDogs.length} dogs available for adoption
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Breed</label>
                <select
                  value={filters.breed}
                  onChange={(e) => setFilters({...filters, breed: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="all">All Breeds</option>
                  <option value="indie">Indian Breed</option>
                  <option value="mixed">Mixed Breed</option>
                  <option value="golden">Golden Retriever</option>
                  <option value="labrador">Labrador</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <select
                  value={filters.age}
                  onChange={(e) => setFilters({...filters, age: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="all">All Ages</option>
                  <option value="puppy">Puppy (0-2 years)</option>
                  <option value="adult">Adult (2-6 years)</option>
                  <option value="senior">Senior (6+ years)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <select
                  value={filters.size}
                  onChange={(e) => setFilters({...filters, size: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="all">All Sizes</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="all">All Locations</option>
                  <option value="delhi">Delhi</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="pune">Pune</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Dogs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDogs.map((dog) => (
            <div key={dog.id} className="dog-card bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={dog.photos[0]}
                  alt={dog.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(dog.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full ${
                    favorites.includes(dog.id)
                      ? 'bg-pink-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-500'
                  } transition-colors duration-200`}
                >
                  <Heart size={20} fill={favorites.includes(dog.id) ? 'currentColor' : 'none'} />
                </button>
                <div className="absolute bottom-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    dog.gender === 'male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                  }`}>
                    {dog.gender.charAt(0).toUpperCase() + dog.gender.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{dog.name}</h3>
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <MapPin size={16} />
                    <span>{dog.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                  <span>{dog.breed}</span>
                  <span>•</span>
                  <span>{calculateAge(dog.age)}</span>
                  <span>•</span>
                  <span className="capitalize">{dog.size}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{dog.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {dog.vaccinated && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Vaccinated
                    </span>
                  )}
                  {dog.sterilized && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Sterilized
                    </span>
                  )}
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {dog.healthStatus}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedDog(dog)}
                    className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    Learn More
                  </button>
                  <button className="px-4 py-2 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors duration-200">
                    <Info size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dog Detail Modal */}
        {selectedDog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="relative">
                <img
                  src={selectedDog.photos[0]}
                  alt={selectedDog.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedDog(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
                >
                  <span className="text-gray-600">✕</span>
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedDog.name}</h2>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar size={16} />
                    <span className="text-sm">Added {selectedDog.dateAdded}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Breed</label>
                    <p className="text-gray-900">{selectedDog.breed}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Age</label>
                    <p className="text-gray-900">{calculateAge(selectedDog.age)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Size</label>
                    <p className="text-gray-900 capitalize">{selectedDog.size}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Location</label>
                    <p className="text-gray-900">{selectedDog.location}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-500">About {selectedDog.name}</label>
                  <p className="text-gray-900 mt-1">{selectedDog.description}</p>
                </div>
                
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-500 block mb-2">Health Status</label>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                      Health: {selectedDog.healthStatus}
                    </span>
                    {selectedDog.vaccinated && (
                      <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        Fully Vaccinated
                      </span>
                    )}
                    {selectedDog.sterilized && (
                      <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                        Sterilized
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-500">Contact NGO</label>
                  <p className="text-gray-900">{selectedDog.ngoContact}</p>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedDog(null)}
                    className="flex-1 px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 font-medium transition-colors duration-200"
                  >
                    Close
                  </button>
                  <button className="flex-1 px-6 py-3 text-white bg-pink-600 rounded-lg hover:bg-pink-700 font-medium transition-colors duration-200">
                    Apply for Adoption
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionPage;