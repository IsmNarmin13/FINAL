import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const CheckoutSteps = ({ showConfirmation }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    mobileNumber: '',
  });

  const handleNextStep = () => {
    if (step < 3) {
      setStep((prevStep) => prevStep + 1);
    } else {
      showConfirmation(true);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='w-full'>

      <div>
        <div className='flex justify-between mb-1'>
          <span className='font-bold text-lg'>Information</span>
          <span className='font-bold text-lg'>Delivery</span>
          <span className='font-bold text-lg'>Payment</span>
        </div>
        <div className='flex justify-between'>
          <span className={`border ${step >= 1 ? 'text-white border-[#ad937c] bg-[#ad937c]' : 'border-gray-500'} text-sm px-2.5 py-1`}>
            {step > 1 ? <FaCheck className='w-2.5 mt-1' /> : '1'}
          </span>
          <span className={`line line-orange`} />
          <span className={`border ${step >= 2 ? 'text-white border-[#ad937c] bg-[#ad937c]' : 'border-gray-500'} text-sm px-2.5 py-1`}>
            {step > 2 ? <FaCheck className='w-2.5 mt-1' /> : '2'}
          </span>
          <span className={`line ${step >= 2 ? 'line-orange' : 'line-gray'}`} />
          <span className={`border ${step >= 3 ? 'text-white border-[#ad937c] bg-[#ad937c]' : 'border-gray-500'} text-sm px-2.5 py-1`}>
            {step > 3 ? <FaCheck className='w-2.5 mt-1' /> : '3'}
          </span>
        </div>
        <div className='my-4'>
          {step === 1 && (
            <form className='flex flex-col space-y-2'>
              <label className='font-bold' htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name*"
                value={formData.name}
                onChange={handleChange}
                className='border border-gray-400 p-2'
              />

              <label className='font-bold' htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Your Last Name*"
                value={formData.lastName}
                onChange={handleChange}
                className='border border-gray-400 p-2'
              />

              <label className='font-bold' htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email*"
                value={formData.email}
                onChange={handleChange}
                className='border border-gray-400 p-2'
              />

              <label className='font-bold' htmlFor="mobileNumber">Mobile Number</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="Your Mobile Number*"
                value={formData.mobileNumber}
                onChange={handleChange}
                className='border border-gray-400 p-2'
              />
              <br />
              <button className='border border-gray-700 p-2 font-bold hover:bg-[#ad937c] hover:text-white hover:border-[#ad937c]' type="button" onClick={handleNextStep}>
                Next Step
              </button>
            </form>
          )}
          {step === 2 && (
            <form className='flex flex-col space-y-2'>
              <label className='font-bold' htmlFor="deliveryMethod">Delivery Method</label>
              <input
                type="text"
                id="deliveryMethod"
                name="deliveryMethod"
                placeholder="Delivery Method*"
                value={formData.deliveryMethod}
                onChange={handleChange}
                className='border border-gray-400 p-2'
              />

              <label className='font-bold' htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City*"
                value={formData.city}
                onChange={handleChange}
                className='border border-gray-400 p-2'
              />

              <label className='font-bold' htmlFor="street">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                placeholder="Street*"
                value={formData.street}
                onChange={handleChange}
                className='border border-gray-400 p-2'
              />

              <label className='font-bold' htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder="Postal Code*"
                value={formData.postalCode}
                onChange={handleChange}
                className='border border-gray-400 p-2'
              />

              <br />

              <button className='border border-gray-700 p-2 font-bold hover:bg-[#ad937c] hover:text-white hover:border-[#ad937c]' type="button" onClick={handleNextStep}>
                Next Step
              </button>
            </form>

          )}
          {step === 3 && (
            <form className='flex flex-col space-y-2'>
              <label className='font-bold' htmlFor="paymentMethod">Payment Method</label>
              <input
                type="text"
                id="paymentMethod"
                name="paymentMethod"
                placeholder="Payment Method*"
                value={formData.paymentMethod}
                onChange={handleChange}
                className='border border-gray-400 p-2'
              />
              <div className='grid grid-cols-2 gap-3'>
                <div className='flex flex-col'>
                  <label className='font-bold' htmlFor="cardInfo">Card Info</label>
                  <input
                    type="text"
                    id="cardInfo"
                    name="cardInfo"
                    placeholder="Number*"
                    value={formData.cardInfo}
                    onChange={handleChange}
                    className='border border-gray-400 p-2'
                  />
                </div>
                <div className='flex flex-col'>
                  <label className='font-bold' htmlFor="expirationDate">Expiration Date</label>
                  <input
                    type="text"
                    id="expirationDate"
                    name="expirationDate"
                    placeholder="MM/YY*"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    className='border border-gray-400 p-2'
                  />
                </div>
                <div className='flex flex-col'>
                  <label className='font-bold' htmlFor="nameOnCard">Name on Card</label>
                  <input
                    type="text"
                    id="nameOnCard"
                    name="nameOnCard"
                    placeholder="Name*"
                    value={formData.nameOnCard}
                    onChange={handleChange}
                    className='border border-gray-400 p-2'
                  />
                </div>
                <div className='flex flex-col'>
                  <label className='font-bold' htmlFor="securityCode">Security Code</label>
                  <input
                    type="text"
                    id="securityCode"
                    name="securityCode"
                    placeholder="CVV / CVC*"
                    value={formData.securityCode}
                    onChange={handleChange}
                    className='border border-gray-400 p-2'
                  />
                </div>
              </div>
              <label className='font-bold'>
                <input
                  type="checkbox"
                  id="termsAndConditions"
                  name="termsAndConditions"
                  checked={formData.termsAndConditions}
                  onChange={handleChange}
                  className='mr-2'
                />
                Agree to Terms and Conditions
              </label>

              <br />

              <button className='border border-gray-700 p-2 font-bold hover:bg-[#ad937c] hover:text-white hover:border-[#ad937c]' type="button" onClick={handleNextStep}>
                Pay and Place Order
              </button>
            </form>

          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
