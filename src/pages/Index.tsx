
import React, { useState } from 'react';
import VideoWidget from '@/components/VideoWidget/VideoWidget';
import { cn } from '@/lib/utils';

const Index = () => {
  const [activeContext, setActiveContext] = useState('design');
  
  // Sample contexts to demonstrate the widget's context-awareness
  const contexts = [
    { name: 'Design', value: 'design' },
    { name: 'Technology', value: 'technology' },
    { name: 'Animation', value: 'animation' },
    { name: 'Context-Aware', value: 'context' },
    { name: 'Responsive', value: 'responsive' }
  ];

  // Function to update context and send message to widget
  const updateContext = (context: string) => {
    setActiveContext(context);
    
    // Send message to widget
    window.postMessage(
      { type: 'UPDATE_CONTEXT', context },
      window.location.origin
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Hero section */}
      <header className="w-full py-16 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-medium mb-6 animate-slide-down" style={{ animationDelay: '0.1s' }}>
            Smart Video Context Widget
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slide-down" style={{ animationDelay: '0.2s' }}>
            Context-Aware Video Recommendations
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto animate-slide-down" style={{ animationDelay: '0.3s' }}>
            A beautiful, draggable widget that delivers relevant video content based on page context or user preferences.
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center mb-12 animate-slide-down" style={{ animationDelay: '0.4s' }}>
            {contexts.map((context) => (
              <button
                key={context.value}
                onClick={() => updateContext(context.value)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-300",
                  activeContext === context.value
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                )}
              >
                {context.name}
              </button>
            ))}
          </div>
        </div>
      </header>
      
      {/* Feature section */}
      <section className="w-full px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Smart video widget */}
      <VideoWidget initialContext={activeContext} />
    </div>
  );
};

// Feature icons
const ContextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="18" r="3"></circle>
    <circle cx="6" cy="6" r="3"></circle>
    <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
    <path d="M11 18H8a2 2 0 0 1-2-2V9"></path>
  </svg>
);

const DraggableIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 9l4-4 4 4"></path>
    <path d="M5 15l4 4 4-4"></path>
    <path d="M19 5l-4 4 4 4"></path>
  </svg>
);

const IntegrationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 16h6"></path>
    <path d="M19 13v6"></path>
    <path d="M12 15V3"></path>
    <rect x="2" y="15" width="8" height="6" rx="1"></rect>
  </svg>
);

const ResponsiveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"></rect>
    <line x1="8" x2="16" y1="21" y2="21"></line>
    <line x1="12" x2="12" y1="17" y2="21"></line>
  </svg>
);

const AIIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8z"></path>
    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
  </svg>
);

const DesignIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 2a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9"></path>
    <line x1="12" x2="12" y1="2" y2="22"></line>
  </svg>
);

// Features data
const features = [
  {
    title: 'Context-Aware',
    description: 'Analyzes page content and user data to deliver the most relevant video recommendations.',
    icon: <ContextIcon />
  },
  {
    title: 'Draggable Interface',
    description: 'Users can position the widget anywhere on screen for a non-intrusive experience.',
    icon: <DraggableIcon />
  },
  {
    title: 'Easy Integration',
    description: 'Simple to add to any website with iframe or as a React component with minimal configuration.',
    icon: <IntegrationIcon />
  },
  {
    title: 'Responsive Design',
    description: 'Adapts beautifully to any screen size while maintaining functionality and aesthetics.',
    icon: <ResponsiveIcon />
  },
  {
    title: 'AI-Powered',
    description: 'Uses machine learning to continuously improve recommendation relevance over time.',
    icon: <AIIcon />
  },
  {
    title: 'Minimal Aesthetics',
    description: 'Clean, elegant design follows Apple-inspired principles for a premium feel.',
    icon: <DesignIcon />
  }
];

export default Index;
