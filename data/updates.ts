import { getResourcePath } from '../utils/pathUtils';

export interface Update {
  id: number;
  date: string;
  title: string;
  description: string;
  image?: string;
}

export const updatesData: Update[] = [
  {
    id: 1,
    date: 'Jul 2025',
    title: 'ZCZ Award',
    description: `We received the <a href="http://www.zcz-award.org.cn/index/shows?catid=6&id=39" target="_blank" rel="noopener noreferrer">ZCZ Award</a>, which honors teams and individuals who have made significant breakthroughs in fundamental research, cutting-edge technologies, and application innovations in artificial intelligence.`,
    image: getResourcePath('/static/images/updates/zcz.jpg'),
  },
  {
    id: 2,
    date: 'Jun 2025',
    title: 'DPA-3 Release',
    description: `We've released the latest version of DPA-3, an advanced interatomic potential built on a message passing architecture. As a large atomistic model (LAM), DPA-3 is designed to integrate and train on datasets spanning multiple scientific disciplines, capturing a wide range of chemical and materials systems. DPA-3 placed second in the <a href="https://matbench-discovery.materialsproject.org/" target="_blank" rel="noopener noreferrer">Matbench Discovery Challenge</a>, outperformed only by a significantly larger model developed by Meta. Details can be found in our <a href="https://arxiv.org/abs/2506.01686" target="_blank" rel="noopener noreferrer">preprint</a>.`,
    image: getResourcePath('/static/images/updates/DPA3-matbench.png'),
  },
  {
    id: 3,
    date: 'May 2025',
    title: 'LAMBench Release',
    description: `We've released LAMBench, a comprehensive, fully automated, and highly modular benchmark platform for evaluating large atomistic models. Details can be found in our <a href="https://arxiv.org/abs/2504.19578" target="_blank" rel="noopener noreferrer">preprint</a>.`,
    image: getResourcePath('/static/images/updates/LAMBench.png'),
  },
  {
    id: 4,
    date: 'Jan 2025',
    title: 'OpenLAM Challenge',
    description: `The <a href="https://bohrium.dp.tech/competitions/8821838186?tab=introduce" target="_blank" rel="noopener noreferrer">OpenLAM Challenge: LAM Crystal Philately</a> competition has successfully concluded. We collected nearly 20 million crystal structures in our database, including approximately 350,000 on the OpenLAM convex hull—advancing the frontiers of generative modeling and materials science applications.`,
  },
  {
    id: 5,
    date: 'Jan 2024',
    title: 'Joined AISI',
    description: `I've joined the <a href="https://www.aisi.ac.cn/#/" target="_blank" rel="noopener noreferrer">AI for Science Institute, Beijing</a> as a Machine Learning Research Scientist.`,
  }
];