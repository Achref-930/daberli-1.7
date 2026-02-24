import { ArrowRight, Briefcase, Car, Home, Wrench } from 'lucide-react';
import React from 'react';
import { Category } from '../types';

interface ServiceGridProps {
  onCategorySelect: (category: Category) => void;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ onCategorySelect }) => {
  const services = [
    {
      id: 'auto',
      title: 'Rent a Vehicle',
      description: 'Cars, trucks, and transport for any trip.',
      icon: <Car className="w-10 h-10" />,
      color: 'bg-blue-50 text-blue-600',
      hoverColor: 'group-hover:bg-blue-600 group-hover:text-white',
    },
    {
      id: 'real-estate',
      title: 'Real Estate',
      description: 'Find apartments, villas, and studios.',
      icon: <Home className="w-10 h-10" />,
      color: 'bg-emerald-50 text-emerald-600',
      hoverColor: 'group-hover:bg-emerald-600 group-hover:text-white',
    },
    {
      id: 'jobs',
      title: 'Find a Job',
      description: 'Career opportunities across 58 wilayas.',
      icon: <Briefcase className="w-10 h-10" />,
      color: 'bg-purple-50 text-purple-600',
      hoverColor: 'group-hover:bg-purple-600 group-hover:text-white',
    },
    {
      id: 'services',
      title: 'Services',
      description: 'Hire verified plumbers, electricians, and more.',
      icon: <Wrench className="w-10 h-10" />,
      color: 'bg-orange-50 text-orange-600',
      hoverColor: 'group-hover:bg-orange-600 group-hover:text-white',
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
          <p className="text-gray-500 mt-2">Everything you need, organized for you.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div 
              key={service.id}
              onClick={() => onCategorySelect(service.id as Category)}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-1"
            >
              <div className={`p-4 rounded-2xl mb-4 transition-colors duration-300 ${service.color} ${service.hoverColor}`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-500 text-sm mb-6">{service.description}</p>
              
              <div className="mt-auto flex items-center text-daberli-blue font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Explore <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceGrid;