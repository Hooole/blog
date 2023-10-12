module.exports = {
  lang: 'zh-CN',
  title: 'Hoole的博客',
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
  ]
}

function getAlgorithmSidebar() {
  return [
    {
      text: '简单',
      children: [
        { text: '实现Pick', link: '/typeChallenges/pick' },
        { text: '第一个元素', link: '/typeChallenges/first' },
        { text: '获取元组长度', link: '/typeChallenges/length' },
        { text: '实现Exclude', link: '/typeChallenges/exclude' },
        { text: 'Awaited', link: '/typeChallenges/awaited' },
        { text: 'IF', link: '/typeChallenges/if' },
        { text: 'Concat', link: '/typeChallenges/concat' },
        { text: 'Includes', link: '/typeChallenges/includes' },
        { text: 'Push', link: '/typeChallenges/push' },
        { text: 'Unshift', link: '/typeChallenges/unshift' },
        { text: 'Parameters', link: '/typeChallenges/parameters' }
      ],
    },
    {
      text: '中等',
      children: [
        { text: 'ReturnType', link: '/typeChallenges/returnType' },
        { text: 'Omit', link: '/typeChallenges/omit' },
        { text: 'readonly', link: '/typeChallenges/readonly2' }
      ]
    }
  ]
}
