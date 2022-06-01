import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      // {
      //   label: t('Contact'),
      //   href: 'https://docs.pancakeswap.finance/contact-us',
      // },
      // {
      //   label: t('Brand'),
      //   href: 'https://docs.pancakeswap.finance/brand',
      // },
      // {
      //   label: t('Blog'),
      //   href: 'https://medium.com/pancakeswap',
      // },
      // {
      //   label: t('Community'),
      //   href: 'https://docs.pancakeswap.finance/contact-us/telegram',
      // },
      {
        label: t('S33D token'),
        href: 'https://docs.s33d.app/the-s33d-project/tokenomics/s33d',
      },
      // {
      //   label: '—',
      // },
      // {
      //   label: t('Online Store'),
      //   href: 'https://pancakeswap.creator-spring.com/',
      //   isHighlighted: true,
      // },
    ],
  },
  // {
  //   label: t('Help'),
  //   items: [
  //     {
  //       label: t('Customer Support'),
  //       href: 'https://docs.pancakeswap.finance/contact-us/customer-support',
  //     },
  //     {
  //       label: t('Troubleshooting'),
  //       href: 'https://docs.pancakeswap.finance/help/troubleshooting',
  //     },
  //     {
  //       label: t('Guides'),
  //       href: 'https://docs.s33d.app/get-started',
  //     },
  //   ],
  // },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/TheS33DProject',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.s33d.app',
      },
      // {
      //   label: t('Bug Bounty'),
      //   href: 'https://docs.pancakeswap.finance/code/bug-bounty',
      // },
      // {
      //   label: t('Audits'),
      //   href: 'https://docs.pancakeswap.finance/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited',
      // },
      // {
      //   label: t('Careers'),
      //   href: 'https://docs.pancakeswap.finance/hiring/become-a-chef',
      // },
    ],
  },
]
