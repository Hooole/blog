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
      { text: '学习笔记', link: '/', activeMatch: '^/$|^/interview/' },
      {
        text: 'type-challenges',
        link: '/typeChallenges/pick',
        activeMatch: '^/typeChallenges/'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/Hooole/blog'
      }
    ],

    sidebar: {
      '/interview/': getInterviewSidebar(),
      '/typeChallenges/': getAlgorithmSidebar(),
      '/': getInterviewSidebar()
    }
  }
}

function getInterviewSidebar() {
  return [
    {
      text: '学习笔记',
      children: [
        { text: '解释一下原型链', link: '/' },
        { text: 'instanceof原理', link: '/interview/instanceof' },
        { text: '如何实现一个深拷贝', link: '/interview/copy' },
        { text: '实现curry(1)(2)(3)', link: '/interview/curry' },
        { text: '手写Promise', link: '/interview/promise' },
        { text: '排序', link: '/interview/sort' },
        { text: 'ESLint', link: '/interview/ESLint' },
        { text: 'rollup', link: '/interview/rollup' },
        { text: 'Babel', link: '/interview/Babel' }
      ]
    }
    // {
    //   text: '测试',
    //   children: [
    //     { text: 'Frontmatter', link: '/guide/frontmatter' },
    //     { text: 'Global Computed', link: '/guide/global-computed' },
    //     { text: 'Global Component', link: '/guide/global-component' },
    //     { text: 'Customization', link: '/guide/customization' },
    //     {
    //       text: 'Differences from Vuepress',
    //       link: '/guide/differences-from-vuepress'
    //     }
    //   ]
    // }
  ]
}

function getAlgorithmSidebar() {
  return [
    {
      text: '实现Pick',
      children: [{ text: 'Pick', link: '/typeChallenges/pick' }]
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
