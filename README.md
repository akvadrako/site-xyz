# Metawall

## Usage

```
npm install
npm run dev -- --open
npm run build
npm run preview
```

## TODO

- tailwind
    - https://strapi.io/blog/how-to-create-a-blog-with-svelte-kit-strapi
- prerendering
    - https://app.netlify.com/sites/lucid-hodgkin-cc7294/settings/deploys
- forms
    - https://docs.netlify.com/site-deploys/post-processing/form-detection/

## One-time Setup

Netlify
1. Go to Settings > Identity, and select Enable Identity service.
  - Under Registration preferences, Invite-Only
  - External Providers -> Github -> One Click Login
2. Services > Git Gateway -> Enable Git Gateway. 

## Technical Intro

Docs
- https://mdsvex.com/docs

Tree

static/admin
- config.yml -- CMS config
- index.html -- CMS entrypoint

src/routes
- *.md -- editable files

root
- /netlify.toml -- config

Based on sveltekit-netlify-cms.

A SvelteKit skeleton app with Netlify CMS living in `/admin`. Netlify CMS is
configured to directly edit `/routes/*.md` files, which are preprocessed by
[mdsvex](https://mdsvex.com).

