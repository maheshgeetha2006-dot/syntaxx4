import React, { useState, useRef } from 'react';
import { Camera, MapPin, Upload, AlertTriangle, Phone, Send } from 'lucide-react';

interface ReportForm {
  location: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  photos: File[];
  contactNumber: string;
  animalCondition: string;
  additionalInfo: string;
}

const ReportPage: React.FC = () => {
  const [form, setForm] = useState<ReportForm>({
    location: '',
    urgency: 'medium',
    description: '',
    photos: [],
    contactNumber: '',
    animalCondition: '',
    additionalInfo: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // In a real app, you'd reverse geocode this
          setForm(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
          setLocationLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationLoading(false);
        }
      );
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setForm(prev => ({
      ...prev,
      photos: [...prev.photos, ...files].slice(0, 5) // Max 5 photos
    }));
  };

  const removePhoto = (index: number) => {
    setForm(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'border-red-500 bg-red-50 text-red-700';
      case 'high': return 'border-orange-500 bg-orange-50 text-orange-700';
      case 'medium': return 'border-yellow-500 bg-yellow-50 text-yellow-700';
      default: return 'border-green-500 bg-green-50 text-green-700';
    }
  };

  const getUrgencyDescription = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'Life-threatening situation requiring immediate rescue';
      case 'high': return 'Serious injury or dangerous situation';
      case 'medium': return 'Injured but stable, needs medical attention';
      default: return 'Safe but needs assistance';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Mock API call - replace with actual Supabase integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setForm({
          location: '',
          urgency: 'medium',
          description: '',
          photos: [],
          contactNumber: '',
          animalCondition: '',
          additionalInfo: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-4">Report Submitted Successfully!</h2>
          <p className="text-green-700 mb-6">
            Your emergency report has been sent to nearby NGOs and veterinarians. 
            You should receive a response within 30 minutes.
          </p>
          <p className="text-green-600 text-sm">
            Case ID: #DOG{Math.random().toString().substr(2, 6)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="text-red-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Emergency</h1>
          <p className="text-gray-600">Help us save a life - report injured or abandoned street dogs</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline mr-2" size={16} />
                Location *
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) => setForm(prev => ({ ...prev, location: e.target.value }))}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter address or coordinates"
                />
                <button
                  type="button"
                  onClick={getLocation}
                  disabled={locationLoading}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  {locationLoading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <MapPin size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Urgency Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Urgency Level *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['low', 'medium', 'high', 'critical'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, urgency: level }))}
                    className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                      form.urgency === level
                        ? getUrgencyColor(level)
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold capitalize mb-1">{level}</div>
                    <div className="text-xs opacity-75">
                      {getUrgencyDescription(level)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Photos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Camera className="inline mr-2" size={16} />
                Photos (Max 5)
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center text-gray-600 hover:text-gray-800"
                >
                  <Upload size={24} className="mb-2" />
                  <span className="text-sm">Click to upload photos</span>
                </button>
              </div>

              {form.photos.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {form.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Animal Condition */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Animal Condition
              </label>
              <select
                value={form.animalCondition}
                onChange={(e) => setForm(prev => ({ ...prev, animalCondition: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select condition</option>
                <option value="injured">Injured</option>
                <option value="sick">Sick</option>
                <option value="abandoned">Abandoned</option>
                <option value="aggressive">Aggressive/Dangerous</option>
                <option value="pregnant">Pregnant</option>
                <option value="with_puppies">Mother with puppies</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                placeholder="Describe the situation, injuries, and any immediate dangers..."
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline mr-2" size={16} />
                Your Contact Number *
              </label>
              <input
                type="tel"
                required
                value={form.contactNumber}
                onChange={(e) => setForm(prev => ({ ...prev, contactNumber: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="+91-9876543210"
              />
            </div>

            {/* Additional Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                rows={3}
                value={form.additionalInfo}
                onChange={(e) => setForm(prev => ({ ...prev, additionalInfo: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                placeholder="Any other relevant details..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : form.urgency === 'critical'
                  ? 'emergency-gradient hover:shadow-lg urgent-pulse'
                  : 'bg-red-600 hover:bg-red-700 hover:shadow-lg'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner mr-3"></div>
                  Submitting Report...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Send className="mr-2" size={20} />
                  Submit Emergency Report
                </div>
              )}
            </button>
          </form>
        </div>

        {/* Emergency Contacts */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Emergency Contacts</h3>
          <div className="space-y-2 text-blue-800">
            <p>🚑 Animal Emergency Helpline: <strong>1800-123-4567</strong></p>
            <p>🏥 24/7 Vet Clinic: <strong>+91-9876543210</strong></p>
            <p>🆘 NGO Quick Response: <strong>+91-9876543211</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;