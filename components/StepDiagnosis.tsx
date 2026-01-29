import React from 'react';
import { DiagnosisResult } from '../types';
import RecipeCard from './RecipeCard';

interface StepDiagnosisProps {
  data: DiagnosisResult;
}

const StepDiagnosis: React.FC<StepDiagnosisProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      
      {/* 1. Theory Section */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm">
        <h3 className="flex items-center text-lg font-bold text-amber-900 mb-3">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          理论分析与文献参考
        </h3>
        <p className="text-amber-800 text-sm leading-relaxed whitespace-pre-wrap">
          {data.theoryAnalysis}
        </p>
      </div>

      {/* 2. Priority Recommendation */}
      <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
        <div className="bg-blue-600 px-6 py-4 border-b border-blue-700">
           <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center">
                    第一阶段：优先调整建议
                </h3>
                <p className="text-blue-100 text-sm mt-1">
                    基于上述分析，核心问题最可能源自：
                    <span className="font-bold ml-1 underline decoration-blue-300 decoration-2 underline-offset-2">
                        {data.priorityComponent === 'nc' ? 'NC膜体系' : 
                         data.priorityComponent === 'conjugate' ? '标记物稀释液' : '样本垫处理液'}
                    </span>
                </p>
              </div>
              <div className="hidden md:block">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white text-blue-700 shadow-sm uppercase tracking-wide">
                    Step 1
                  </span>
              </div>
           </div>
        </div>
        
        <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Left: Recipe Card */}
                <div className="w-full md:w-1/2">
                    <RecipeCard recipe={data.recipe} type={data.priorityComponent} />
                </div>

                {/* Right: Rationale & Details */}
                <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
                    <div className="bg-slate-50 rounded-lg p-5 border border-slate-100 h-full">
                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">配方设计思路</h4>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            {data.rationale}
                        </p>
                        <div className="border-t border-slate-200 pt-4">
                            <span className="text-xs font-semibold text-slate-500 block mb-1">关键浓度点：</span>
                            <div className="flex flex-wrap gap-2">
                                {data.recipe.ingredients.map((ing, i) => (
                                    <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                        {ing.name}: {ing.concentration}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* 3. Next Steps (Feedback Loop) */}
      <div className="bg-slate-100 border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
         <div className="flex-shrink-0 bg-slate-200 p-2 rounded-full">
            <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
         </div>
         <div>
            <h4 className="font-bold text-slate-800 text-sm uppercase">如果是无效怎么办？（下一步计划）</h4>
            <p className="text-slate-600 text-sm mt-1">
                {data.nextStepSuggestion}
            </p>
         </div>
      </div>

    </div>
  );
};

export default StepDiagnosis;
