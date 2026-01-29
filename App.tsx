import React, { useState } from 'react';
import { generateIVDRecipes } from './services/geminiService';
import { DiagnosisResult } from './types';
import StepDiagnosis from './components/StepDiagnosis';

const PRESET_ISSUES = [
  "跑板15分钟后背景偏深，无法读数。",
  "金标垫释放不完全，T线显色弱。",
  "阴性样本出现假阳性（Ghost line）。",
  "层析速度过慢，T线有明显拖尾现象。"
];

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await generateIVDRecipes(inputText);
      setData(result);
    } catch (err) {
      setError("分析失败。请检查您的网络连接及 API Key（需支持 Search Grounding）。");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePresetClick = (issue: string) => {
    setInputText(issue);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                Dx
             </div>
             <h1 className="text-xl font-bold text-slate-800 tracking-tight">IVD <span className="text-blue-600">智能诊断专家</span></h1>
          </div>
          <div className="text-xs text-slate-500 font-medium hidden sm:block">
             Search Grounded • Iterative Diagnosis
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Intro */}
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                层析问题迭代诊断
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                描述您的实验现象。AI 将搜索理论依据，为您提供<span className="text-blue-600 font-bold">第一优先级</span>的调整配方与浓度。
            </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12 border border-slate-100">
            <label htmlFor="problem" className="block text-sm font-medium text-slate-700 mb-2">
                现象描述与当前条件
            </label>
            <div className="relative">
                <textarea
                    id="problem"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="例如：使用 20nm 金胶，在 NC 膜（CN95）上跑板，T 线显色很弱，且背景在 10 分钟后依然很红..."
                    className="w-full h-32 p-4 text-slate-800 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-shadow"
                />
                <button
                    onClick={handleAnalyze}
                    disabled={loading || !inputText.trim()}
                    className={`absolute bottom-4 right-4 inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white 
                    ${loading || !inputText.trim() ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors'}`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            搜索理论并分析...
                        </>
                    ) : (
                        '开始诊断'
                    )}
                </button>
            </div>
            
            {/* Presets */}
            <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs text-slate-500 uppercase font-semibold tracking-wide py-1">快速测试：</span>
                {PRESET_ISSUES.map((issue, idx) => (
                    <button
                        key={idx}
                        onClick={() => handlePresetClick(issue)}
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer border border-transparent hover:border-blue-200"
                    >
                        {issue.length > 20 ? issue.substring(0, 20) + '...' : issue}
                    </button>
                ))}
            </div>
        </div>

        {/* Error State */}
        {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        )}

        {/* Results */}
        {data && (
            <div className="animate-fade-in-up mb-12">
                <StepDiagnosis data={data} />
            </div>
        )}
        
        {!data && !loading && (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                <svg className="w-12 h-12 mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                <p className="text-sm">等待输入...</p>
            </div>
        )}

      </main>
    </div>
  );
};

export default App;
