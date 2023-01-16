export default defineAppConfig({
  docus: {
    title: 'Docus',
    description: 'My Docus Project',
    url: 'http://biaozhun.online',
    image: '/social-card-preview.png',
    socials: {
      twitter: '@docus_',
      github: 'nuxtlabs/docus'
    },
    github: {
      root: 'content',
      edit: true,
      contributors: false
    },
    layout: {
      fluid: false
    },
    aside: {
      level: 1,
      collapsed: false,
      exclude: ['/program/learngit', '/program/learnnode.js']
    },
    header: {
      title: 'Test header.title',
      logo: true,
      showLinkIcon: true,
      exclude: [],
    },
    footer: {
      credits: {
        text: 'Powered by 171H',
        href: 'https://github.com/weiyidechicheng',
      },
      textLinks: [
        {
          text: 'Test textlinks weibo',
          href: 'https://weibo.com/u/2361655911'
        }
      ],
      iconLinks: [
        {
          label: 'Weibo',
          href: 'https://weibo.com/u/2361655911',
          icon: 'ri:weibo-fill',
        },
      ],
    }
  }
})

