import { getResourcePath } from '../utils/pathUtils';

export const profileData = {
  name: 'Anyang Peng',
  title: 'ML Research Scientist @ AISI',
  imageUrl: getResourcePath('/static/images/profile.png'),
  bio: `Trained as a chemical engineer with a strong background in both experimental and computational chemistry. Brings over six years of experience in machine learning and data science across both academic and industry settings. Skilled across the full ML stack—from data pipeline development to model deployment. Currently focused on developing large-scale foundation models to accelerate scientific discovery in physics, chemistry, and materials science.`,
  socialLinks: {
    googleScholar: 'https://scholar.google.com/citations?user=pDRtjREAAAAJ&hl=en&oi=ao',
    github: 'https://github.com/anyangml',
    linkedin: 'https://www.linkedin.com/in/anyangpeng/',
    email: 'anyangpeng.nu@gmail.com',
  },
}; 