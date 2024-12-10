import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faBed,
  faBath,
  faCar,
  faRuler,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import TransactionSteps from '../components/TransactionSteps';

// Define possible user roles
type UserRole = 'buyer' | 'seller' | 'fsh';

const PropertyDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const property = location.state?.property;

  // Get user role from cookies or default to 'buyer'
  const userRole: UserRole = (Cookies.get('userRole') as UserRole) || 'buyer';

  const handleBack = () => {
    navigate(-1);
  };

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>Property not found</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 w-full md:pl-72">
        <div className="p-8">
          <button
            onClick={handleBack}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            <span>Back to Properties</span>
          </button>

          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {property.property_name || property.address}
              </h1>
              <p className="text-xl text-green-600 mt-2">
                $
                {property.price
                  ? property.price.toLocaleString()
                  : 'Price not available'}
              </p>

              {/* Key Statistics */}
              <div className="flex gap-6 mt-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faBed} />
                  <span>{property.bedrooms || 0} Beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faBath} />
                  <span>{property.bathrooms || 0} Baths</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCar} />
                  <span>{property.parking ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
            {userRole === 'buyer' ? (
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
                <span>PURCHASE THIS PROPERTY</span>
              </button>
            ) : null}
          </div>

          {/* Image and Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Property Image */}
            <div className="relative rounded-xl overflow-hidden h-[400px]">
              <img
                src={
                  property.image_url || 'https://via.placeholder.com/400x300'
                }
                alt={property.property_name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Property Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Property Type</p>
                    <p className="text-xl font-semibold">
                      {property.property_type}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Build Date</p>
                    <p className="text-xl font-semibold">
                      {property.build_date}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Kitchen</p>
                    <p className="text-xl font-semibold">
                      {property.kitchen_type}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Bathroom</p>
                    <p className="text-xl font-semibold">
                      {property.bathroom_type}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Features */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Additional Features</h2>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Gated Community: {property.gated_community ? 'Yes' : 'No'}
                  </p>
                  <p className="text-gray-600">
                    Pool: {property.pool ? 'Yes' : 'No'}
                  </p>
                  <p className="text-gray-600">
                    Current Occupancy: {property.current_occupancy}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-gray-600">{property.property_description}</p>
              </div>
            </div>
          </div>

          {/* <TransactionSteps userRole={userRole} /> */}
        </div>
      </main>
    </div>
  );
};

export default PropertyDetails;
