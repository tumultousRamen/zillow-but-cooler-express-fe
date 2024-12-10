import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // For managing cookies
// import Sidebar from "../components/Sidebar";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast from '../components/Toast';

const PostProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false); // New state for image upload
  const [showDialog, setShowDialog] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    email: '',
    propertyType: '',
    builtDate: '',
    currentOccupants: '',
    kitchenType: '',
    bathroomType: '',
    livingRoomType: '',
    exteriorType: '',
    sellingTimeline: '',
    reasonToSell: '',
    price: '',
    homeDetails: { bedrooms: '', bathrooms: '' },
    additionalFeatures: [],
    image_url: '', // Changed from imageBase64 to image_url
  });

  // Handle input changes
  const handleInputChange = (key, value) => {
    if (key === 'price') {
      const numericValue = value === '' ? '' : Number(value);
      setFormData((prevData) => ({
        ...prevData,
        [key]: numericValue,
      }));
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Handle homeDetails changes
  const handleHomeDetailsChange = (key, value) => {
    setFormData({
      ...formData,
      homeDetails: {
        ...formData.homeDetails,
        [key]: value,
      },
    });
  };

  // Handle file selection and upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Only the first file
    if (!file) return;

    try {
      setUploadingImage(true);
      // Prepare form data for Django API
      const data = new FormData();
      data.append('file', file);
      data.append('property', ''); // Provide property ID or related info if needed
      data.append('title', file.name);
      data.append('document_type', 'deed'); // Use a valid choice for document_type

      // Upload the image to the Django API
      const response = await fetch(
        'https://django-project-tn9e.onrender.com/api/documents/',
        {
          method: 'POST',
          body: data,
        }
      );

      if (response.ok) {
        const responseData = await response.json();

        // Handle single object response
        if (responseData && responseData.file) {
          setFormData((prevData) => ({
            ...prevData,
            image_url: responseData.file, // Use the file URL from the response
          }));
          console.log('Image uploaded successfully:', responseData.file);
        } else {
          console.error('Unexpected response format:', responseData);
          alert('Failed to upload image. Please try again.');
        }
      } else {
        const errorData = await response.json();
        console.error('Error uploading image:', errorData);
        alert('Error uploading image. Please try again.');
      }
    } catch (error) {
      console.error('Error during image upload:', error);
      alert('An unexpected error occurred while uploading the image.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle form submission
  const handleSubmission = async () => {
    const sellerId = Cookies.get('authToken'); // Get the seller ID from cookies
    if (!sellerId) {
      navigate('/login');
      return;
    }

    // Validate that image_url is present
    if (!formData.image_url) {
      alert('Please upload a property image before submitting.');
      return;
    }

    // Construct the payload
    const payload = {
      seller_id: sellerId,
      property_name: 'Property Name', // Replace with an actual field if available
      property_description: 'Property Description', // Replace with an actual field if available
      address: formData.address,
      property_type: formData.propertyType,
      build_date: formData.builtDate,
      kitchen_type: formData.kitchenType,
      bathroom_type: formData.bathroomType,
      livingroom_type: formData.livingRoomType,
      exterior_type: formData.exteriorType,
      selling_timeline: formData.sellingTimeline,
      reason_to_sell: formData.reasonToSell,
      bathrooms: Number(formData.homeDetails.bathrooms),
      bedrooms: Number(formData.homeDetails.bedrooms),
      current_occupancy: formData.currentOccupants,
      gated_community: formData.additionalFeatures.includes('Gated Community'),
      pool: formData.additionalFeatures.includes('Pool'),
      parking: formData.additionalFeatures.includes('Parking'),

      image_url: formData.image_url, // Use the uploaded image URL
      price: Number(formData.price),
    };

    console.log('Payload being sent:', payload); // Debugging payload

    try {
      setLoading(true);
      const response = await fetch(
        'https://homekey-backend.vercel.app/api/createProperty',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        // Redirect to the property list page after successful submission
        setShowToast(true);
        // Wait briefly for the toast to be visible before redirecting
        setTimeout(() => {
          navigate('/property_list');
        }, 2000); // Increased time for better UX
      } else {
        const errorData = await response.json();
        console.error('Error during property submission:', errorData);
        alert(
          'Failed to submit property. Please check your inputs and try again.'
        );
      }
    } catch (error) {
      console.error('Error during property submission:', error);
      alert('An unexpected error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  // Handle back navigation with confirmation if form has data
  const handleBack = () => {
    if (hasFormData()) {
      setShowDialog(true);
    } else {
      navigate('/property_list');
    }
  };

  const handleConfirmBack = () => {
    setShowDialog(false);
    navigate('/property_list');
  };

  // Check if form has any data entered
  const hasFormData = () => {
    const emptyForm = {
      address: '',
      email: '',
      propertyType: '',
      builtDate: '',
      currentOccupants: '',
      kitchenType: '',
      bathroomType: '',
      livingRoomType: '',
      exteriorType: '',
      sellingTimeline: '',
      reasonToSell: '',
      price: '',
      homeDetails: { bedrooms: '', bathrooms: '' },
      additionalFeatures: [],
      image_url: '',
    };

    return JSON.stringify(formData) !== JSON.stringify(emptyForm);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar /> */}

      <main className="flex-1 w-full md:pl-72 lg:pl-72">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200 w-full">
          <div className="px-8 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Add New Property
                </h1>
                <p className="text-sm text-gray-500">
                  Fill in the details to list your property
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="p-8">
          <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 space-y-8">
              {/* 1. Contact Info */}
              <section className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange('address', e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter complete address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter contact email"
                    />
                  </div>
                </div>
              </section>

              {/* 2. Property Basics */}
              <section className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Property Basics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) =>
                        handleInputChange('propertyType', e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select type</option>
                      {[
                        'Single Family Home',
                        'Condominium',
                        'Townhouse',
                        'Vacant Lot',
                        'Mobile Home',
                        'Other',
                      ].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year Built
                    </label>
                    <select
                      value={formData.builtDate}
                      onChange={(e) =>
                        handleInputChange('builtDate', e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select year</option>
                      {[
                        '2000 or later',
                        '1990s',
                        '1980s',
                        '1970s',
                        '1960s',
                        'Before 1960',
                      ].map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Occupants
                    </label>
                    <select
                      value={formData.currentOccupants}
                      onChange={(e) =>
                        handleInputChange('currentOccupants', e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select occupants</option>
                      <option value="owner">Owner</option>
                      <option value="tenant">Tenant</option>
                      <option value="vacant">Vacant</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* 3. Rooms and Layouts */}
              <section className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Rooms and Layouts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kitchen Type
                    </label>
                    <select
                      value={formData.kitchenType}
                      onChange={(e) =>
                        handleInputChange('kitchenType', e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select type</option>
                      {[
                        'Fixer Upper',
                        'Dated',
                        'Standard',
                        'New and High End',
                      ].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bathroom Type
                    </label>
                    <select
                      value={formData.bathroomType}
                      onChange={(e) =>
                        handleInputChange('bathroomType', e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select type</option>
                      {[
                        'Fixer Upper',
                        'Dated',
                        'Standard',
                        'New and High End',
                      ].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Living Room Type
                    </label>
                    <select
                      value={formData.livingRoomType}
                      onChange={(e) =>
                        handleInputChange('livingRoomType', e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select type</option>
                      {[
                        'Fixer Upper',
                        'Dated',
                        'Standard',
                        'New and High End',
                      ].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Bedrooms
                      </label>
                      <input
                        type="number"
                        value={formData.homeDetails.bedrooms}
                        onChange={(e) =>
                          handleHomeDetailsChange('bedrooms', e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Bathrooms
                      </label>
                      <input
                        type="number"
                        value={formData.homeDetails.bathrooms}
                        onChange={(e) =>
                          handleHomeDetailsChange('bathrooms', e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. Selling Details */}
              <section className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Selling Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Selling Timeline
                    </label>
                    <select
                      value={formData.sellingTimeline}
                      onChange={(e) =>
                        handleInputChange('sellingTimeline', e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select timeline</option>
                      {[
                        'Immediately',
                        'Within 3 months',
                        '3-6 months',
                        '6+ months',
                      ].map((timeline) => (
                        <option key={timeline} value={timeline}>
                          {timeline}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason to Sell
                    </label>
                    <select
                      value={formData.reasonToSell}
                      onChange={(e) =>
                        handleInputChange('reasonToSell', e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select reason</option>
                      {[
                        'Buy a new home',
                        'Investment property',
                        'Second Home',
                        'Inheritance property',
                        'Other',
                      ].map((reason) => (
                        <option key={reason} value={reason}>
                          {reason}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange('price', e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter price"
                      min="0"
                    />
                  </div>
                </div>
              </section>

              {/* 5. Amenities */}
              <section className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Pool', 'Gated Community', 'Parking'].map((feature) => (
                    <label
                      key={feature}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={formData.additionalFeatures.includes(feature)}
                        onChange={() => {
                          const updatedFeatures =
                            formData.additionalFeatures.includes(feature)
                              ? formData.additionalFeatures.filter(
                                  (f) => f !== feature
                                )
                              : [...formData.additionalFeatures, feature];
                          handleInputChange(
                            'additionalFeatures',
                            updatedFeatures
                          );
                        }}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* 6. Media */}
              <section className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Media
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    disabled={uploadingImage} // Disable input while uploading
                  />
                  {uploadingImage && (
                    <p className="text-sm text-gray-500 mt-2">
                      Uploading image...
                    </p>
                  )}
                  {formData.image_url && (
                    <div className="mt-4">
                      <img
                        src={formData.image_url}
                        alt="Property Preview"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <p className="text-sm text-gray-600 mt-2">
                        Image uploaded successfully.
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => navigate('/property_list')}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmission}
                  disabled={loading || uploadingImage} // Disable if loading or uploading
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Property'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Dialog */}
        <ConfirmDialog
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
          onConfirm={handleConfirmBack}
        />

        {/* Toast Notification */}
        <Toast
          show={showToast}
          message="Property added successfully!"
          onHide={() => setShowToast(false)}
        />
      </main>
    </div>
  );
};

export default PostProperty;
