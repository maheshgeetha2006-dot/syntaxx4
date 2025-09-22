import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3, Users, Heart, AlertTriangle, MapPin, Calendar, Phone, LogOut } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Active Cases', value: '12', icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-50' },
    { label: 'Successful Rescues', value: '47', icon: Heart, color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Reports Filed', value: '23', icon: BarChart3, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'NGO Connections', value: '8', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50' }
  ];

  const recentCases = [
    {
      id: 'DOG001234',
      type: 'Emergency Report',
      status: 'In Progress',
      location: 'Connaught Place, Delhi',
      date: '2024-01-20',
      urgency: 'high'
    },
    {
      id: 'DOG001235',
      type: 'Adoption Request',
      status: 'Approved',
      location: 'Mumbai, Maharashtra',
      date: '2024-01-18',
      urgency: 'low'
    },
    {
      id: 'DOG001236',
      type: 'Emergency Report',
      status: 'Resolved',
      location: 'Bangalore, Karnataka',
      date: '2024-01-15',
      urgency: 'critical'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access your dashboard</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
                <p className="text-gray-600 capitalize">
                  {user.role} • {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={stat.color} size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'cases', 'profile'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors duration-200 ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentCases.map((case_) => (
                      <div key={case_.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${getUrgencyColor(case_.urgency)}`}></div>
                          <div>
                            <p className="font-medium text-gray-900">{case_.type}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <MapPin size={14} />
                              <span>{case_.location}</span>
                              <span>•</span>
                              <Calendar size={14} />
                              <span>{case_.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(case_.status)}`}>
                            {case_.status}
                          </span>
                          <span className="text-sm text-gray-500">#{case_.id}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Quick Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full text-left p-2 text-blue-800 hover:bg-blue-100 rounded">
                        📋 File New Report
                      </button>
                      <button className="w-full text-left p-2 text-blue-800 hover:bg-blue-100 rounded">
                        💬 Contact NGO
                      </button>
                      <button className="w-full text-left p-2 text-blue-800 hover:bg-blue-100 rounded">
                        🗺️ View Safe Zones
                      </button>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Emergency Contacts</h4>
                    <div className="space-y-2 text-green-800">
                      <p className="flex items-center text-sm">
                        <Phone size={14} className="mr-2" />
                        Animal Helpline: 1800-123-4567
                      </p>
                      <p className="flex items-center text-sm">
                        <Phone size={14} className="mr-2" />
                        Vet Emergency: +91-9876543210
                      </p>
                      <p className="flex items-center text-sm">
                        <Phone size={14} className="mr-2" />
                        NGO Support: +91-9876543211
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cases' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">All Cases</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Case ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Urgency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentCases.map((case_) => (
                        <tr key={case_.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-mono">#{case_.id}</td>
                          <td className="py-3 px-4 text-sm">{case_.type}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{case_.location}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(case_.status)}`}>
                              {case_.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{case_.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${getUrgencyColor(case_.urgency)}`}></div>
                              <span className="text-sm capitalize">{case_.urgency}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="max-w-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={user.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                      type="text"
                      value={user.role}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent capitalize"
                      readOnly
                    />
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Update Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;