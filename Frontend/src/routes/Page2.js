import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faSort,
  faUserCircle,
  faBed,
  faBath,
  faRuler,
} from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import Sidebar from '../components/Sidebar';

const ListProperties = () => {
  const [filter, setFilter] = useState('All');
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userRole = Cookies.get('userRole');

  useEffect(() => {
    const fetchProperties = async () => {
      const authToken = Cookies.get('authToken');

      if (!authToken) {
        alert('You are not logged in!');
        navigate('/login');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          'https://homekey-backend.vercel.app/api/listProperties',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            'Failed to fetch properties. Please try again later.'
          );
        }

        const result = await response.json();

        if (Array.isArray(result.data)) {
          if (userRole === 'seller') {
            const userProperties = result.data.filter(
              (property) => property.seller_id === authToken
            );
            setProperties(userProperties);
            setFilteredProperties(userProperties);
          } else if (userRole === 'buyer') {
            setProperties(result.data);
            setFilteredProperties(result.data);
          } else {
            throw new Error('Invalid user type.');
          }
        } else {
          throw new Error('Unexpected response structure from server.');
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('An error occurred while fetching properties.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [navigate, userRole]);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(
        properties.filter((property) => property.status === filter)
      );
    }
  }, [filter, properties]);

  const handlePostProperty = () => {
    navigate('/post_property');
  };

  const handlePropertyClick = (property) => {
    navigate(`/property/${property._id}`, { state: { property } });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center h-16">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
              </div>
              <div className="flex items-center space-x-4">
                {userRole !== 'buyer' && (
                  <button
                    onClick={handlePostProperty}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                    <span>Add Property</span>
                  </button>
                )}
              </div>
            </div>

            {/* Filters Bar */}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="p-6">
          <div className="w-full">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center text-gray-500">
                <p className="text-lg font-semibold">No properties listed.</p>
                <p>Start adding properties using the "Add Property" button.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <div
                    key={property._id || property.id}
                    onClick={() => handlePropertyClick(property)}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="relative h-48">
                      <img
                        src={
                          property.image_url ||
                          'https://via.placeholder.com/400x300'
                        }
                        alt={property.title || 'Property Image'}
                        className="w-full h-full object-cover"
                      />
                      {userRole !== 'buyer' && (
                        <span className="absolute top-4 left-4 px-3 py-1.5 bg-green-500 text-white text-sm font-medium rounded-full">
                          {property.status}
                        </span>
                      )}
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {property.address}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {'Property address'}
                        </p>
                      </div>
                      <div className="text-xl font-bold text-indigo-600">
                        $
                        {Number(property.price).toLocaleString() ||
                          'Price not available'}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <FontAwesomeIcon
                            icon={faBed}
                            className="w-4 h-4 text-gray-400"
                          />
                          <span>{property.bedrooms} beds</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FontAwesomeIcon
                            icon={faBath}
                            className="w-4 h-4 text-gray-400"
                          />
                          <span>{property.bathrooms} baths</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListProperties;
