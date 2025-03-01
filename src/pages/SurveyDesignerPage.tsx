
import React from 'react';
import SurveyDesigner from '@/components/SurveyDesigner';
import Navbar from '@/components/Navbar';

const SurveyDesignerPage = () => {
  return (
    <div className="flex">
      <Navbar />
      
      <div className="flex-1 p-8 ml-64 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold tracking-tight mb-6">Survey Designer</h1>
          <SurveyDesigner />
        </div>
      </div>
    </div>
  );
};

export default SurveyDesignerPage;
