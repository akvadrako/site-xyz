# Wall to Wall Site

- [netlify](https://app.netlify.com/sites/lucid-hodgkin-cc7294/overview)

## TODO

- https://github.com/sw-yx/swyxkit

## TOC

static
- admin
    - config.yml -- CMS config
    - index.html -- CMS entrypoint
- favicon.png
- uploads
    - CMS-editable images

src
- routes
    - *.md -- CMS-editable mdsvex files
- comp
    - *.svelte -- components
- layouts
    - default.svelte -- default template

root
- /netlify.toml -- config

## Usage

Prereqs:
- git LFS
- npm

Develop locally:

```
npm install
npm run dev -- --open
npm run build
npm run preview
```

Deploy:

- git commit

## TODO

- tailwind
    - https://strapi.io/blog/how-to-create-a-blog-with-svelte-kit-strapi
- prerendering
    - https://app.netlify.com/sites/lucid-hodgkin-cc7294/settings/deploys
- forms
    - https://docs.netlify.com/site-deploys/post-processing/form-detection/
- sitemap
- large media
    - https://app.netlify.com/sites/lucid-hodgkin-cc7294/large-media
- catch errors globally?
- monitoring / analytics

## Technical Intro

Mdsvex
- <https://mdsvex.com/docs>
- links?
    - https://github.com/landakram/remark-wiki-link
- embedded js:

    > ```js exec
    > <script>
    > <script context="module">

- https://github.com/jxnblk/vim-mdx-js

- <https://github.com/rehypejs/rehype/blob/main/doc/plugins.md>
- <https://github.com/remarkjs/remark/blob/main/doc/plugins.md>

i18n
- https://github.com/sveltejs/kit/issues/553

Related
- https://github.com/rodneylab/sveltekit-blog-mdx
- Based on sveltekit-netlify-cms.

## One-time Setup

Docs
- [LFS setup](https://docs.netlify.com/large-media/setup/)

Netlify
1. Go to Settings > Identity, and select Enable Identity service.

  - Under Registration preferences, Invite-Only
  - External Providers -> Github -> One Click Login

2. Services > Git Gateway -> Enable Git Gateway. 

In repo

    netlify link
    netlify lm:setup
    git lfs track "static/media/**"
    git lfs ls-files
