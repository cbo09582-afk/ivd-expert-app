import React from 'react';
import { BufferRecipe } from '../types';

interface RecipeCardProps {
  recipe: BufferRecipe;
  type: 'nc' | 'conjugate' | 'sample';
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, type }) => {
  const getHeaderColor = () => {
    switch (type) {
      case 'nc': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'conjugate': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'sample': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100';
    }
  };

  const getHeaderTitle = () => {
    switch(type) {
        case 'nc': return 'NC膜包被液';
        case 'conjugate': return '标记物稀释液';
        case 'sample': return '样本垫处理液';
        default: return 'Buffer Recipe';
    }
  }

  const getIcon = () => {
    switch(type) {
        case 'nc': return (
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        );
        case 'conjugate': return (
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
        );
        case 'sample': return (
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
        );
    }
  }

  return (
    <div className={`rounded-lg border ${getHeaderColor().split(' ')[2]} overflow-hidden bg-white shadow-sm h-full flex flex-col`}>
      <div className={`px-4 py-3 border-b flex items-center font-semibold text-sm ${getHeaderColor()}`}>
        {getIcon()}
        {getHeaderTitle()}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-3 text-sm text-gray-700">
            <span className="font-semibold text-gray-900">缓冲体系: </span> {recipe.bufferSystem}
            <span className="mx-2 text-gray-300">|</span>
            <span className="font-semibold text-gray-900">pH值: </span> {recipe.ph}
        </div>
        
        <div className="flex-1">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">配方成分</h4>
            <ul className="space-y-2">
            {recipe.ingredients.map((ing, idx) => (
                <li key={idx} className="flex justify-between items-start text-sm border-b border-gray-50 pb-1 last:border-0">
                <span className="text-gray-800 font-medium">{ing.name}</span>
                <span className="text-blue-700 font-bold whitespace-nowrap ml-2">{ing.concentration}</span>
                </li>
            ))}
            </ul>
        </div>
        
        {recipe.notes && (
            <div className="mt-4 pt-3 border-t border-dashed border-gray-200">
                <p className="text-xs text-gray-500 italic">注：{recipe.notes}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;