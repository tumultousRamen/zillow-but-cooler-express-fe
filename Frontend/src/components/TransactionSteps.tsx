import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faFileContract,
  faClipboard,
  faFile,
  faKey,
} from '@fortawesome/free-solid-svg-icons';

type UserRole = 'buyer' | 'seller' | 'fsh';
type OfferStatus = 'pending' | 'accepted' | 'rejected' | 'countered';

interface Offer {
  id: number;
  buyerName: string;
  amount: number;
  status: OfferStatus;
}

interface OfferMessageProps {
  amount: number;
  status: OfferStatus;
  onAccept: () => void;
  onCounter: () => void;
}

interface Step {
  id: number;
  title: string;
  icon: any; // Using any for FontAwesome icons
}

interface TransactionStepsProps {
  userRole: UserRole;
}

const OfferMessage: React.FC<OfferMessageProps> = ({
  amount,
  status,
  onAccept,
  onCounter,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600">Offered amount:</p>
          <p className="text-xl font-bold">${amount.toLocaleString()}</p>
        </div>
        {status === 'pending' && (
          <div className="flex gap-2">
            <button
              onClick={onAccept}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Accept
            </button>
            <button
              onClick={onCounter}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Counter
            </button>
          </div>
        )}
        {status === 'accepted' && (
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-md">
            Accepted
          </span>
        )}
      </div>
    </div>
  );
};

const TransactionSteps: React.FC<TransactionStepsProps> = ({ userRole }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: 1,
      buyerName: 'John Doe',
      amount: 3500000,
      status: 'pending',
    },
    {
      id: 2,
      buyerName: 'Jane Smith',
      amount: 3400000,
      status: 'pending',
    },
  ]);

  const handleAcceptOffer = (offerId: number): void => {
    setOffers(
      offers.map((offer) => ({
        ...offer,
        status: offer.id === offerId ? 'accepted' : 'rejected',
      }))
    );
    setCurrentStep(2);
  };

  const handleCounterOffer = (offerId: number): void => {
    setOffers(
      offers.map((offer) => ({
        ...offer,
        status: offer.id === offerId ? 'countered' : offer.status,
      }))
    );
  };

  const steps: Step[] = [
    { id: 1, title: 'Offers', icon: faComments },
    { id: 2, title: 'Contract', icon: faFileContract },
    { id: 3, title: 'Inspection', icon: faClipboard },
    { id: 4, title: 'Documents', icon: faFile },
    { id: 5, title: 'Closing', icon: faKey },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {userRole === 'seller' ? (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Offers</h3>
                {offers.map((offer) => (
                  <div key={offer.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">
                          Offer from {offer.buyerName}
                        </p>
                        <p className="text-2xl font-bold">
                          ${offer.amount.toLocaleString()}
                        </p>
                      </div>
                      {offer.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptOffer(offer.id)}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleCounterOffer(offer.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                          >
                            Counter
                          </button>
                        </div>
                      )}
                      {offer.status === 'accepted' && (
                        <span className="bg-green-100 text-green-800 px-4 py-2 rounded-md">
                          Accepted
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-blue-600 p-4 bg-blue-50 rounded-lg">
                Property is now visible to buyers, we will let you know when you
                get an offer
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Contract Review</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Purchase Agreement</h4>
                <p className="text-gray-600 mb-4">
                  Review and sign the purchase agreement
                </p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Review Document
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Property Inspection</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Schedule Inspection</h4>
                <p className="text-gray-600 mb-4">
                  Choose a date for property inspection
                </p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Schedule Now
                </button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Document Review</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Required Documents</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>Title Report</span>
                    <button className="text-indigo-600 hover:text-indigo-800">
                      View
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>Property Disclosures</span>
                    <button className="text-indigo-600 hover:text-indigo-800">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Closing</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Final Steps</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600"
                    />
                    <span>Final walkthrough completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600"
                    />
                    <span>Closing funds transferred</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600"
                    />
                    <span>Documents signed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-xl">
      {/* Steps Progress */}
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex flex-col items-center relative cursor-pointer"
            onClick={() => setCurrentStep(step.id)}
          >
            <div
              className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${currentStep === step.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}
              transition-all duration-200
            `}
            >
              <FontAwesomeIcon icon={step.icon} />
            </div>
            <p className="mt-2 text-sm font-medium text-gray-600">
              {step.title}
            </p>

            {index < steps.length - 1 && (
              <div className="absolute left-[3rem] w-[calc(100%-1.5rem)] h-[2px] top-6 -z-10 bg-gray-200" />
            )}
          </div>
        ))}
      </div>

      {/* Current Step Content */}
      {renderStepContent()}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          className={`px-6 py-2 rounded-md ${
            currentStep === 1
              ? 'bg-gray-200 text-gray-400'
              : 'bg-blue-500 text-white'
          }`}
          onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        <button
          className={`px-6 py-2 rounded-md ${
            currentStep === steps.length
              ? 'bg-gray-200 text-gray-400'
              : 'bg-blue-500 text-white'
          }`}
          onClick={() =>
            currentStep < steps.length && setCurrentStep(currentStep + 1)
          }
          disabled={currentStep === steps.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionSteps;
