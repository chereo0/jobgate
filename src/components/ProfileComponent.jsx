import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../api/AuthAPI';
import { toast } from 'react-toastify';

export default function ProfileComponent() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        setProfileData(profile);
        setAboutText(profile.headline || '');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveAbout = async () => {
    try {
      setSaving(true);
      await updateUserProfile({ headline: aboutText });
      setProfileData({ ...profileData, headline: aboutText });
      setIsEditingAbout(false);
      toast.success('About section updated successfully');
      setSaving(false);
    } catch (error) {
      console.error('Error updating about:', error);
      toast.error('Failed to update about section');
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setAboutText(profileData.headline || '');
    setIsEditingAbout(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a66c2] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">No profile data found</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="px-6 py-2 bg-[#0a66c2] text-white rounded-lg hover:bg-[#004182]"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Get first letter for avatar
  const avatarLetter = profileData.name?.charAt(0).toUpperCase() || 'U';

  const handleDownloadCV = () => {
    if (profileData.cvFileName) {
      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = profileData.cvFileName; // This should be the actual file URL
      link.download = profileData.cvFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('CV download started');
    } else {
      toast.error('No CV file available');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start gap-6">
            {profileData.imageLink ? (
              <img
                src={profileData.imageLink}
                alt={profileData.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-[#0a66c2]"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#0a66c2] to-[#004182] flex items-center justify-center border-4 border-[#0a66c2] shadow-lg">
                <span className="text-white text-5xl font-bold">{avatarLetter}</span>
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
              <p className="text-lg text-gray-600 mt-1">{profileData.headline || 'Professional'}</p>
              <p className="text-sm text-gray-500 mt-2">{profileData.email}</p>
              <div className="mt-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
                  {profileData.role === 'candidate' ? 'Job Seeker' : profileData.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={profileData.name || ''}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={profileData.email || ''}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
              <input
                type="text"
                value={profileData.userID || ''}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                type="text"
                value={profileData.role || ''}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* CV Information */}
        {profileData.cvFileName && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">CV / Resume</h2>
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex-shrink-0">
                <svg className="w-12 h-12 text-[#0a66c2]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{profileData.cvFileName}</p>
                <p className="text-sm text-gray-600">Uploaded CV/Resume</p>
              </div>
              <button
                onClick={handleDownloadCV}
                className="px-4 py-2 bg-[#0a66c2] text-white rounded-lg hover:bg-[#004182] transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        )}

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">About</h2>
            {!isEditingAbout && (
              <button
                onClick={() => setIsEditingAbout(true)}
                className="px-4 py-2 text-[#0a66c2] border border-[#0a66c2] rounded-lg hover:bg-blue-50 transition-colors"
              >
                Edit
              </button>
            )}
          </div>
          {isEditingAbout ? (
            <div>
              <textarea
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
                placeholder="Tell us about yourself..."
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleSaveAbout}
                  disabled={saving}
                  className="px-6 py-2 bg-[#0a66c2] text-white rounded-lg hover:bg-[#004182] transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={saving}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 whitespace-pre-wrap">
              {profileData.headline || 'No description provided'}
            </p>
          )}
        </div>

        {/* Account Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
              <input
                type="text"
                value={profileData.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : 'N/A'}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
              <input
                type="text"
                value={profileData.updatedAt ? new Date(profileData.updatedAt).toLocaleDateString() : 'N/A'}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
