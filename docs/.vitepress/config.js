module.exports = {
  lang: 'zh-CN',
  title: '付海亮的个人博客',
  description: 'Vite & Vue powered static site generator.',
  base: '/blog/',
  themeConfig: {
    // repo: 'vuejs/vitepress',
    docsDir: 'docs',

    // editLinks: true,
    // editLinkText: 'Edit this page on GitHub',
    lastUpdated: '最近更新时间',

    // algolia: {
    //   apiKey: 'c57105e511faa5558547599f120ceeba',
    //   indexName: 'vitepress'
    // },

    // carbonAds: {
    //   carbon: 'CEBDT27Y',
    //   custom: 'CKYD62QM',
    //   placement: 'vuejsorg'
    // },

    nav: [
      { text: '面试整理', link: '/', activeMatch: '^/$|^/interview/' },
      {
        text: '算法学习',
        link: '/algorithm/basics',
        activeMatch: '^/algorithm/'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/Hooole/blog'
      }
    ],

    sidebar: {
      '/interview/': getInterviewSidebar(),
      '/algorithm/': getAlgorithmSidebar(),
      '/': getInterviewSidebar()
    }
  }
}

function getInterviewSidebar() {
  return [
    {
      text: '面试整理',
      children: [
        { text: '解释一下原型链', link: '/' },
        { text: 'instanceof原理', link: '/interview/instanceof' },
        { text: '如何实现一个深拷贝', link: '/interview/copy' },
        { text: 'Asset Handling', link: '/guide/assets' },
        { text: 'Markdown Extensions', link: '/guide/markdown' },
        { text: 'Using Vue in Markdown', link: '/guide/using-vue' },
        { text: 'Deploying', link: '/guide/deploy' }
      ]
    },
    {
      text: '测试',
      children: [
        { text: 'Frontmatter', link: '/guide/frontmatter' },
        { text: 'Global Computed', link: '/guide/global-computed' },
        { text: 'Global Component', link: '/guide/global-component' },
        { text: 'Customization', link: '/guide/customization' },
        {
          text: 'Differences from Vuepress',
          link: '/guide/differences-from-vuepress'
        }
      ]
    }
  ]
}

function getAlgorithmSidebar() {
  return [
    {
      text: '栈',
      children: [{ text: 'Basics', link: '/algorithm/basics' }]
    },
    {
      text: 'Theme Config',
      children: [
        { text: 'Homepage', link: '/config/homepage' },
        { text: 'Algolia Search', link: '/config/algolia-search' },
        { text: 'Carbon Ads', link: '/config/carbon-ads' }
      ]
    }
  ]
}
