import React from 'react';
import { Solution } from '../types';
import RecipeCard from './RecipeCard';

interface SolutionViewProps {
  solution: Solution;
  index: number;
}

const SolutionView: React.FC<SolutionViewProps> = ({ solution }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="bg-slate-50 px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h3 className="text-xl font-bold text-slate-800 flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 mr-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
                  </span>
                  {solution.strategyName}
                </h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed ml-11">{solution.rationale}</p>
            </div>
            <div className="flex-shrink-0 ml-11 md:ml-0">
                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white shadow-sm">
                    专家推荐方案
                 </span>
            </div>
        </div>
      </div>
      
      <div className="p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RecipeCard recipe={solution.ncMembraneBuffer} type="nc" />
          <RecipeCard recipe={solution.conjugateDiluent} type="conjugate" />
          <RecipeCard recipe={solution.samplePadBuffer} type="sample" />
        </div>
      </div>
    </div>
  );
};

export default SolutionView;