# Wall to Wall Site

CMS On Netlify
- https://lucid-hodgkin-cc7294.netlify.app/admin/index.html
- dev: http://localhost:5173/admin/index.html

Netlify Admin Page
- https://app.netlify.com/sites/lucid-hodgkin-cc7294/overview


## TODO

- tailwind
- sitemap
- catch errors globally?
- monitoring
- analytics
- comments?

## TOC

static
- admin
    - config.yml -- CMS config
    - index.html -- CMS entrypoint
- favicon.png
- uploads
    - CMS-editable images

doc
- source markdown files

src
- routes - svelte routes
- comp
    - *.svelte -- components
- layouts
    - default.svelte -- default template

root
- /netlify.toml -- config

## Usage

Prereqs:
- npm

Develop locally:

```
npm install
npm run dev
npm run build
npm run preview
```

Deploy:

```
git commit
```

## Technical Intro

Style
- tailwind - https://tailwindcss.com/docs/guides/sveltekit
- windicss
    - https://windicss.org/guide/configuration.html
    - `npx windicss-analysis`
- flowbite - https://flowbite.com/docs/getting-started/introduction/

Mdsvex
- <https://mdsvex.com/docs>
- links - https://github.com/landakram/remark-wiki-link
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
    
Netlify
- forms: https://docs.netlify.com/site-deploys/post-processing/form-detection/
- large media: https://app.netlify.com/sites/lucid-hodgkin-cc7294/large-media

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

3. Alternative to Git Gateway

Add Github to Access 
- https://docs.netlify.com/visitor-access/oauth-provider-tokens/

## Obsolete

    git lfs track "static/media/**"
    git lfs ls-files
