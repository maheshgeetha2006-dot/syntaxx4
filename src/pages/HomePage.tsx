import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, AlertTriangle, MessageCircle, Shield, Users, Stethoscope } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: AlertTriangle,
      title: 'Emergency Reports',
      description: 'Report injured or abandoned street dogs instantly with location tracking',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      link: '/report'
    },
    {
      icon: MapPin,
      title: 'Safe Zone Map',
      description: 'Find nearby shelters, feeding points, and veterinary hospitals',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/map'
    },
    {
      icon: Heart,
      title: 'Adopt a Friend',
      description: 'Browse adoptable dogs and give them a loving home',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      link: '/adoption'
    },
    {
      icon: MessageCircle,
      title: 'Connect Instantly',
      description: 'Chat directly with NGOs and veterinarians for immediate help',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/chat'
    }
  ];

  const stats = [
    { value: '2,847', label: 'Dogs Rescued', icon: Shield },
    { value: '1,203', label: 'Successful Adoptions', icon: Heart },
    { value: '156', label: 'Partner NGOs', icon: Users },
    { value: '89', label: 'Veterinarians', icon: Stethoscope }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="gradient-bg py-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-6">
            Street Dog Safety Network
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Connecting communities to rescue, rehabilitate, and rehome street dogs through technology and compassion
          </p>
          <Link
            to="/report"
            className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 urgent-pulse mr-4 mb-4"
          >
            <AlertTriangle className="mr-2" size={24} />
            Emergency Report
          </Link>
          <Link
            to="/adoption"
            className="inline-flex items-center bg-white hover:bg-gray-100 text-purple-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 mb-4"
          >
            <Heart className="mr-2" size={24} />
            Find Your Friend
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <stat.icon className="text-purple-600" size={28} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Help</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform brings together citizens, NGOs, and veterinarians to create a comprehensive safety net for street dogs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className={feature.color} size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-5xl mb-4">🐕</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Rescue</h3>
              <p className="text-gray-600">Swift response to emergency reports with coordinated rescue operations</p>
            </div>
            <div className="p-6">
              <div className="text-5xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Rehabilitate</h3>
              <p className="text-gray-600">Medical care, vaccination, and recovery support for injured dogs</p>
            </div>
            <div className="p-6">
              <div className="text-5xl mb-4">🏡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Rehome</h3>
              <p className="text-gray-600">Connecting healthy dogs with loving families for permanent adoption</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 emergency-gradient text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Every Second Counts</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our network of compassionate citizens making a difference in street dogs' lives
          </p>
          <div className="space-x-4">
            <Link
              to="/report"
              className="inline-block bg-white text-red-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Report Emergency
            </Link>
            <Link
              to="/chat"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-600 transition-colors duration-200"
            >
              Get Help Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;