import type { RouteLocationRaw } from "vue-router";

export const siteName = "//PST-CORP";

export const colorNameAt = 5;


type FooterMenuItem = {
  title: string;
  links: Array<{
    text: string;
    url?: string;
    to?: RouteLocationRaw;
  }>
}


export const siteSubName = "Predict, Bet & Play with Blockchain";

export const footerMenuItems: FooterMenuItem[] = [
  {
    title: 'Product',
    links: [
      { text: 'Overview', to: '/' },
      // { text: 'Pricing', url: '#' },
      // { text: 'Marketplace', url: '#' },
      // { text: 'Features', url: '#' },
      // { text: 'Integrations', url: '#' },
      // { text: 'Pricing', url: '#' },
    ],
  },
  // {
  //   title: 'Company',
  //   links: [
  //     { text: 'About', url: '#' },
  //     { text: 'Team', url: '#' },
  //     { text: 'Blog', url: '#' },
  //     { text: 'Careers', url: '#' },
  //     { text: 'Contact', url: '#' },
  //     { text: 'Privacy', url: '#' },
  //   ],
  // },
  {
    title: 'Resources',
    links: [
      { text: 'Documentation', to: '/info/documentation' },
      { text: 'GitHub', url: 'https://github.com/' },
      // { text: 'Advertise', url: '#' },
    ],
  },
  // {
  //   title: 'Social',
  //   links: [
  //     { text: 'Twitter', url: '#' },
  //     { text: 'Instagram', url: '#' },
  //     { text: 'LinkedIn', url: '#' },
  //   ],
  // },
]


export const homeCards = {
  tagline: 'Latest Updates',
  heading: 'What we work on',
  description:
    'Transparent, Decentralized, open source applications that leverage the power of blockchain technology to provide secure and efficient solutions for users worldwide.',
  cards: [
    {
      id: 'card-1',
      title: 'Bet on Future Events with Blockchain',
      summary:
        "Predict future events. Harness the power of collective intelligence and blockchain technology to make informed decisions .",
      image: '/img/blockchain.png',
    },
    {
      id: 'card-2',
      title: 'No Human Involved, AI will answer your predictions, according to most trusted sources',
      summary:
        "AI will check the facts, analyze the data, and give the best possible answer.",
      image: '/img/openai.png',
    },
    {
      id: 'card-3',
      title: 'No Signup Just Connect Your Wallet, ',
      summary:
        'Connect your wallet and start using our platform without the hassle of creating an account.',
      image: '/img/wallet.png',
    },
  ],
}


export const statsContent = {
  heading: 'Platform Statistics',
  description: 'Transparent and reliable blockchain-based predictions',
  stats: [
    {
      id: 'stat-1',
      value: '100%',
      label: 'Blockchain-verified predictions',
    },
    {
      id: 'stat-2',
      value: '0.1%',
      label: 'Platform transaction fee',
    },
    {
      id: 'stat-3',
      value: '24/7',
      label: 'Automated AI prediction resolution',
    },
    {
      id: 'stat-4',
      value: '100K+',
      label: 'Predictions processed',
    },
  ],
}
