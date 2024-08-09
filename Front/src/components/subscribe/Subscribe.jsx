import React from 'react';

const Subscribe = () => {
  return (
    <div className='subscribe w-full my-10 md:my-20'>
      <div className=''>
        <h1 className='text-xl md:text-4xl lg:text-5xl font-semibold'>
          Subscribe to our newsletter
        </h1>
      </div>
      <div className='flex flex-col md:flex-row justify-between items-center'>
        <div className='w-full md:w-2/5 mt-4 md:mt-0'>
          <p>
            Enter your email address to receive regular updates, as well as new
            on upcoming events and specific offers.
          </p>
        </div>
        <div className='w-full md:w-1/3 mt-4 md:mt-0'>
          <form>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="border w-full md:w-2/3 p-2"
                required
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-[#ccb196] hover:bg-orange-700 text-sm text-white py-3 px-8 w-full md:w-auto"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;