import { getResourcePath } from '../utils/pathUtils';

export const homeData = {
  news: [
    {
      date: 'Jul 2025',
      content: `We received the <a href="http://www.zcz-award.org.cn/index/shows?catid=6&id=39" target="_blank" rel="noopener noreferrer">ZCZ Award</a>, which honors teams and individuals who have made significant breakthroughs in fundamental research, cutting-edge technologies, and application innovations in artificial intelligence.`,
      image: getResourcePath('/static/images/news/zcz.jpg'),
    },
    {
      date: 'Jun 2025',
      content: `We've released the latest version of DPA-3, an advanced interatomic potential built on a message passing architecture. As a large atomistic model (LAM), DPA-3 is designed to integrate and train on datasets spanning multiple scientific disciplines, capturing a wide range of chemical and materials systems. DPA-3 placed second in the <a href="https://matbench-discovery.materialsproject.org/" target="_blank" rel="noopener noreferrer">Matbench Discovery Challenge</a>, outperformed only by a significantly larger model developed by Meta. Details can be found in our <a href="https://arxiv.org/abs/2506.01686" target="_blank" rel="noopener noreferrer">preprint</a>.`,
      image: getResourcePath('/static/images/news/DPA3-matbench.png'),
    },
    {
      date: 'May 2025',
      content: `We've released LAMBench, a comprehensive, fully automated, and highly modular benchmark platform for evaluating large atomistic models. Details can be found in our <a href="https://arxiv.org/abs/2504.19578" target="_blank" rel="noopener noreferrer">preprint</a>.`,
      image: getResourcePath('/static/images/news/LAMBench.png'),
    },
    {
      date: 'Jan 2025',
      content: `The <a href="https://bohrium.dp.tech/competitions/8821838186?tab=introduce" target="_blank" rel="noopener noreferrer">OpenLAM Challenge: LAM Crystal Philately</a> competition has successfully concluded. We collected nearly 20 million crystal structures in our database, including approximately 350,000 on the OpenLAM convex hull—advancing the frontiers of generative modeling and materials science applications.`,
    },
    {
      date: 'Jan 2024',
      content: `I've joined the <a href="https://www.aisi.ac.cn/#/" target="_blank" rel="noopener noreferrer">AI for Science Institute, Beijing</a> as a Machine Learning Research Scientist.`,
    }
  ],
  experience: [
    {
      role: 'Machine Learning Research Scientist',
      company: 'AI for Science Institute',
      duration: 'Jan 2024 - Present',
      location: 'Beijing, China',
      logo: getResourcePath('/static/images/logos/aisi_logo.png'),
      details: [
        'Developed and maintained open-source deep learning frameworks for interatomic potentials with multi-backend support, broadening adoption and accessibility.',
        'Built automated MLOps pipelines for large-scale training and evaluation, maximizing GPU cluster utilization and throughput.',
        'Trained foundation models on 200M+ materials, molecules, and proteins, surpassing benchmarks from Microsoft and DeepMind.',
        'Led a team to build a data pipeline that collected 20M+ crystal structures through competitions, accelerating materials discovery.'
      ],
    },
    {
      role: 'Data Scientist',
      company: 'Validere',
      duration: 'Nov 2022 - Oct 2023',
      location: 'Toronto, Canada',
      logo: getResourcePath('/static/images/logos/validere_logo.png'),
      details: [
        'Spearheaded the design, implementation, and maintenance of generative ML models and computer vision algorithms to convert unstructured data into structured formats.',
        'Engineered software solutions that streamlined the development of emission calculator services, cutting product release timelines significantly.',
        'Developed and operationalized ML workflows combining probabilistic modeling with emissions data integration, driving higher accuracy in carbon accounting.',
        'Delivered and fine-tuned probabilistic models for oil industry clients, enabling data-driven optimization of blending operations.'
      ],
    },
    {
      role: 'Research Associate',
      company: 'Northwestern University',
      duration: 'Feb 2020 - Nov 2022',
      location: 'Evanston, IL, USA',
      logo: getResourcePath('/static/images/logos/northwestern_logo.svg'),
      details: [
        'Conducted first-principles simulations using spin-polarized DFT+U to quantify CO₂ adsorption energies across diverse metal oxide solid solutions.',
        'Designed and validated regression models to reveal relationships between metal oxide basicity and key chemical properties.',
        'Disseminated research outcomes through peer-reviewed publications in distinguished academic journals.'
      ],
    },
  ],
  education: [
    {
      degree: 'Ph.D. in Chemical Engineering',
      university: 'Northwestern University',
      duration: '2014 - 2019',
      location: 'Evanston, IL, USA',
      logo: getResourcePath('/static/images/logos/northwestern_logo.svg'),
    },
    {
      degree: 'B.Sc. in Chemistry (Honors | Highest Distinction)',
      university: 'Purdue University - West Lafayette',
      duration: '2012 - 2014',
      location: 'West Lafayette, IN, USA',
      logo: getResourcePath('/static/images/logos/purdue_logo.svg'),
    },
  ],
  publications: [
    {
      title: 'Graph neural network model for the era of large atomistic models',
      authors: ["Duo Zhang", "Anyang Peng", "Chun Cai", "Wentao Li", "Yuanchang Zhou", "Jinzhe Zeng", "Mingyu Guo", "Chengqian Zhang", "Bowen Li", "Hong Jiang", "Tong Zhu", "Weile Jia", "Linfeng Zhang", "Han Wang"],
      date: 'Jun 2025',
      journal: 'Preprint',
      link: 'https://arxiv.org/abs/2506.01686',
    },
    {
      title: 'The OpenLAM Challenges: LAM Crystal Philately Competition',
      authors:['Anyang Peng', 'Xinzijian Liu', 'Ming-Yu Guo', 'Linfeng Zhang', 'Han Wang'],
      date: 'Jun 2025',
      journal: 'Mach. Learn.: Sci. Technol. 6 020701',
      link: 'https://iopscience.iop.org/article/10.1088/2632-2153/add3bf'
    },
    {
      title: 'DeePMD-kit v3: A Multiple-Backend Framework for Machine Learning Potentials',
      authors: ['Jinzhe Zeng', 'Duo Zhang', 'Anyang Peng', 'Xiangyu Zhang', 'Sensen He', 'Yan Wang', 'Xinzijian Liu', 'Hangrui Bi', 'Yifan Li', 'Chun Cai', 'Chengqian Zhang', 'Yiming Du', 'Jia-Xin Zhu',' Pinghui Mo', 'Zhengtao Huang', 'Qiyu Zeng', 'Shaochen Shi', 'Xuejian Qin', 'Zhaoxi Yu', 'Chenxing Luo', 'Ye Ding', 'Yun-Pei Liu', 'Ruosong Shi', 'Zhenyu Wang', 'Sigbjørn Løland Bore', 'Junhan Chang', 'Zhe Deng', 'Zhaohan Ding', 'Siyuan Han', 'Wanrun Jiang', 'Guolin Ke', 'Zhaoqing Liu', 'Denghui Lu', 'Koki Muraoka', 'Hananeh Oliaei', 'Anurag Kumar Singh', 'Haohui Que', 'Weihong Xu', 'Zhangmancang Xu', 'Yong-Bin Zhuang', 'Jiayu Dai', 'Timothy J Giese', 'Weile Jia', 'Ben Xu', 'Darrin M York', 'Linfeng Zhang', 'Han Wang'],
      date: 'May 2025',
      journal: 'J. Chem. Theory Comput. 2025, 21, 9, 4375–4385',
      link: 'https://pubs.acs.org/doi/abs/10.1021/acs.jctc.5c00340',
    },
    {
      title: 'LAMBench: A Benchmark for Large Atomic Models',
      authors: ['Anyang Peng', 'Chun Cai', 'Mingyu Guo', 'Duo Zhang', 'Chengqian Zhang', 'Antoine Loew', 'Linfeng Zhang', 'Han Wang'],
      date: 'May 2025',
      journal: 'Preprint',
      link: 'https://arxiv.org/abs/2504.19578',
    },
    {
      title: 'DPA-2: a large atomic model as a multi-task learner',
      authors: ['Duo Zhang', 'Xinzijian Liu', 'Xiangyu Zhang', 'Chengqian Zhang', 'Chun Cai', 'Hangrui Bi', 'Yiming Du', 'Xuejian Qin', 'Anyang Peng', 'Jiameng Huang', 'Bowen Li', 'Yifan Shan', 'Jinzhe Zeng', 'Yuzhi Zhang', 'Siyuan Liu', 'Yifan Li', 'Junhan Chang', 'Xinyan Wang', 'Shuo Zhou', 'Jianchuan Liu', 'Xiaoshan Luo', 'Zhenyu Wang', 'Wanrun Jiang', 'Jing Wu', 'Yudi Yang', 'Jiyuan Yang', 'Manyi Yang', 'Fu-Qiang Gong', 'Linshuang Zhang', 'Mengchao Shi', 'Fu-Zhi Dai', 'Darrin M York', 'Shi Liu', 'Tong Zhu', 'Zhicheng Zhong', 'Jian Lv', 'Jun Cheng', 'Weile Jia', 'Mohan Chen', 'Guolin Ke', 'Weinan E', 'Linfeng Zhang', 'Han Wang'],
      date: 'Dec 2024',
      journal: 'npj Comput Mater 10, 293 (2024)',
      link: 'https://www.nature.com/articles/s41524-024-01493-2',
    },
    {
      title: 'Computational Chemistry and Machine Learning-Assisted Screening of Supported Amorphous Metal Oxide Nanoclusters for Methane Activation',
      authors: ['Xijun Wang', 'Kaihang Shi', 'Anyang Peng', 'Randall Q Snurr'],
      date: 'Dec 2024',
      journal: 'ACS Catal. 2024, 14, 24, 18708–18721',
      link: 'https://pubs.acs.org/doi/abs/10.1021/acscatal.4c04021',
    },
    {
      title: 'Molecular Tuning of Reactivity of Zeolite Protons in HZSM-5',
      authors: ['Yaxin Chen', 'Xinyou Ma', 'John H Hack', 'Shuhao Zhang', 'Anyang Peng', 'James P Dombrowski', 'Gregory A Voth', 'Andrei Tokmakoff', 'Mayfair C Kung', 'Harold H Kung'],
      date: 'Apr 2024',
      journal: 'J. Am. Chem. Soc. 2024, 146, 15, 10342–10356',
      link: 'https://pubs.acs.org/doi/abs/10.1021/jacs.3c12680',
    },
    {
      title: 'Probing the structure–property relationships of supported copper oxide nanoclusters for methane activation',
      authors: ['Xijun Wang', 'Kaihang Shi', 'Anyang Peng', 'Randall Q Snurr'],
      date: 'Feb 2024',
      journal: 'EES Catal., 2024, 2, 351-364',
      link: 'https://pubs.rsc.org/en/content/articlehtml/2024/ey/d3ey00234a',
    },
    {
      title: 'Effect of Composition and Local Environment on CO2 Adsorption on Nickel and Magnesium Oxide Solid Solutions',
      authors: ['Anyang Peng', 'Andrew S Rosen', 'Randall Q Snurr', 'Harold H Kung'],
      date: 'Nov 2022',
      journal: 'J. Phys. Chem. C 2022, 126, 46, 19705–19714',
      link: 'https://pubs.acs.org/doi/abs/10.1021/acs.jpcc.2c05799',
    },
    {
      title: 'The role of Co-ZSM-5 catalysts in aerobic oxidation of ethylbenzene',
      authors: ['Anyang Peng', 'Mayfair C Kung', 'Matthew O Ross', 'Brian M Hoffman', 'Harold H Kung'],
      date: 'Jul 2020',
      journal: ' Top Catal 63, 1708–1716 (2020)',
      link: 'https://link.springer.com/article/10.1007/s11244-020-01305-z',
    },
    {
      title: 'Noncontact catalysis: Initiation of selective ethylbenzene oxidation by Au cluster-facilitated cyclooctene epoxidation',
      authors: ['Anyang Peng', 'Mayfair C Kung', 'Robert RO Brydon', 'Matthew O Ross', 'Linping Qian', 'Linda J Broadbelt', 'Harold H Kung'],
      date: 'Jan 2020',
      journal: 'Sci. Adv.6,eaax6637(2020)',
      link: 'https://www.science.org/doi/full/10.1126/sciadv.aax6637',
    },
    {
      title: 'In situ formed Co clusters in selective oxidation of α-CH bond: Stabilizing effect from reactants',
      authors: ['Zhijie Wang', 'Anxiang Guan', 'Mayfair C Kung', 'Anyang Peng', 'Harold H Kung', 'Ximeng Lv', 'Gengfeng Zheng', 'Linping Qian'],
      date: 'Jun 2019',
      journal: 'Molecular Catalysis 2019, 470, 1.',
      link: 'https://www.sciencedirect.com/science/article/abs/pii/S2468823119301348',
    },
    {
      title: 'Microkinetic modeling of homogeneous and gold nanoparticle-catalyzed oxidation of cyclooctene',
      authors: ['Robert RO Brydon', 'Anyang Peng', 'Linping Qian', 'Harold H Kung', 'Linda J Broadbelt'],
      date: 'March 2018',
      journal: 'Ind. Eng. Chem. Res. 2018, 57, 14, 4832–4840',
      link: 'https://pubs.acs.org/doi/abs/10.1021/acs.iecr.8b00315',
    }
  ]
};