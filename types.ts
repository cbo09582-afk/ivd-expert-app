export interface Ingredient {
  name: string;
  concentration: string;
  function?: string;
}

export interface BufferRecipe {
  title: string;
  ph: string;
  bufferSystem: string;
  ingredients: Ingredient[];
  notes?: string;
}

export interface Solution {
  strategyName: string;
  rationale: string;
  ncMembraneBuffer: BufferRecipe;
  conjugateDiluent: BufferRecipe;
  samplePadBuffer: BufferRecipe;
}

export interface DiagnosisResult {
  theoryAnalysis: string; // Analysis based on search results
  priorityComponent: 'nc' | 'conjugate' | 'sample'; // Which component to adjust first
  recipe: BufferRecipe; // The specific recipe for that component
  rationale: string; // Why this specific concentration?
  nextStepSuggestion: string; // What to do if this fails
}