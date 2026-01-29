import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DiagnosisResult } from "../types";

const ingredientSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "化学成分名称" },
    concentration: { type: Type.STRING, description: "具体浓度 (e.g., 2% w/v, 50mM)" },
    function: { type: Type.STRING, description: "作用机理" }
  },
  required: ["name", "concentration"]
};

const bufferRecipeSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    ph: { type: Type.STRING },
    bufferSystem: { type: Type.STRING },
    ingredients: { 
      type: Type.ARRAY, 
      items: ingredientSchema 
    },
    notes: { type: Type.STRING }
  },
  required: ["ph", "bufferSystem", "ingredients"]
};

const diagnosisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    theoryAnalysis: { 
      type: Type.STRING, 
      description: "基于搜索结果的理论分析，引用相关原理 (e.g., '根据色谱理论...')" 
    },
    priorityComponent: { 
      type: Type.STRING, 
      enum: ["nc", "conjugate", "sample"],
      description: "当前最优先需要调整的组分 (nc=NC膜, conjugate=标记物, sample=样本垫)"
    },
    recipe: bufferRecipeSchema,
    rationale: { type: Type.STRING, description: "为什么优先调整这个组分，以及浓度设定的依据" },
    nextStepSuggestion: { type: Type.STRING, description: "如果上述方案无效，下一步应该重点调整哪个组分或参数" }
  },
  required: ["theoryAnalysis", "priorityComponent", "recipe", "rationale", "nextStepSuggestion"]
};

export const generateIVDRecipes = async (problemDescription: string): Promise<DiagnosisResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is not set");
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
    你是一位拥有 20 年经验的体外诊断（IVD）免疫层析研发专家。
    任务：针对用户描述的层析问题，利用搜索工具查找相关理论，然后给出**第一步**优先调整的建议。

    逻辑流程：
    1. **搜索分析**：搜索该现象的理论解释（如：层析动力学、非特异性吸附原理）。
    2. **单一归因**：判断哪个组分（NC膜、结合垫或样本垫）最可能是问题的核心来源。
    3. **优先配方**：只提供**该核心组分**的优化配方。不要提供全套配方。
    4. **迭代思维**：给出具体的参考浓度。并说明如果这个调整无效，下一步（Next Step）该排查什么。

    输出要求：
    - 语言：简体中文。
    - 理论分析（theoryAnalysis）必须引用层析原理。
    - "priorityComponent" 必须是 'nc', 'conjugate', 或 'sample' 之一。
    - 必须包含明确的下一步建议（nextStepSuggestion）。
  `;

  try {
    // Note: Google Search tool is enabled to provide theoretical grounding
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: problemDescription,
      config: {
        tools: [{ googleSearch: {} }], 
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: diagnosisSchema,
        temperature: 0.3,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as DiagnosisResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
