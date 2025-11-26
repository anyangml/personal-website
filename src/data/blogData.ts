import { getResourcePath } from '../utils/pathUtils';

export interface BlogPost {
  title: string;
  date: string;
  summary: string;
  markdownFile: string;
  link?: string;
}

export const blogData: BlogPost[] = [
  {
    title: 'Two Axioms of AI',
    date: '2025-09-01',
    summary: 'Physics has the three laws of thermodynamics—principles so universal that they form the foundation of the field. Artificial intelligence, though much younger, is also accumulating its own guiding principles. Among them, two stand out as particularly fundamental: "the bitter lesson," articulated by Rich Sutton, and "the second half," proposed by YS.',
    markdownFile: getResourcePath('/static/markdown/blog/two-axioms-of-ai.md'),
  },
  {
    title: 'A Brief History of Modern LLMs',
    date: '2025-11-02',
    summary: 'This post explores the evolution of large language models (LLMs) over the past few years from a model architecture perspective.',
    markdownFile: getResourcePath('/static/markdown/blog/a-brief-history-of-modern-llms.md'),
  }
];
