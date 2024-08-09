import React from 'react';

const Services = () => {
  return (
    <section className="py-16" aria-label="services">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div key={index} className='flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
              <div className='bg-orange-100 p-6 mb-4 rounded-full flex items-center justify-center'>
                <img src={service.icon} alt={service.title} className='w-20 h-20 object-contain' />
              </div>
              <h3 className='text-xl font-semibold text-center'>{service.title}</h3>
              <p className='text-sm text-gray-500 text-center'>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const servicesData = [
  {
    title: 'Free Shipping',
    description: 'Order over $20',
    icon: '/images/icons/delivery-truck.svg',
  },
  {
    title: 'Best Price',
    description: 'Guaranteed Price',
    icon: '/images/icons/best-price.svg',
  },
  {
    title: 'Free Returns',
    description: 'Within 30 days returns',
    icon: '/images/icons/return-box.svg',
  },
];

export default Services;
