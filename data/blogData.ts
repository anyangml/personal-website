import { getResourcePath } from '../utils/pathUtils';

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  image: string;
  summary: string;
  date: string;
  markdownFile: string;
}

export const blogData: BlogPost[] = [
  {
    id: 1,
    title: 'Data-Driven vs. Physics-Based Modeling of Oil Bending: A Comparative Study',
    category: 'Data Science',
    image: getResourcePath('/static/images/blog/oil-blending/cover.jpg'),
    summary: 'The accurate prediction of distillation profiles of crude oil blends is crucial for refining operations. This project compares the performance of data-driven and physics-driven oil-bending models, providing insights into the strengths and limitations of each approach.',
    date: '2022',
    markdownFile: getResourcePath('/static/markdown/blog/oil-blending.md'),
  },
  {
    id: 2,
    title: 'Two Axioms of AI',
    category: 'Artificial Intelligence',
    image: getResourcePath('/static/images/blog/two-axioms-of-ai.jpg'),
    summary: 'Physics has the three laws of thermodynamics—principles so universal that they form the foundation of the field. Artificial intelligence, though much younger, is also accumulating its own guiding principles. Among them, two stand out as particularly fundamental: "the bitter lesson," articulated by Rich Sutton, and "the second half," proposed by YS.',
    date: 'Sep 01, 2025',
    markdownFile: getResourcePath('/static/markdown/blog/two-axioms-of-ai.md'),
  },
  {
    id: 3,
    title: 'A Brief History of Modern LLMs',
    category: 'Artificial Intelligence',
    image: getResourcePath('/static/images/blog/a_brief_history_of_modern_llms/cover.png'),
    summary: 'This post explores the evolution of large language models (LLMs) over the past few years from a model architecture perspective.',
    date: 'Nov 02, 2025',
    markdownFile: getResourcePath('/static/markdown/blog/a-brief-history-of-modern-llms.md'),
  }
];