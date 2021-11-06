# Iulias Site

based on: Hugo template for Netlify CMS with Netlify Identity

## Usage

prereqs: python2, yarn

```
yarn install
yarn start
```

## Layouts

site/layouts/partials

- The template uses a custom fork of Tachyons and PostCSS with cssnext and cssnano
- src/css/imports/_variables.css

## SVG

All SVG icons stored in `site/static/img/icons`

```
<svg width="16px" height="16px" class="db">
  <use xlink:href="#SVG-ID"></use>
</svg>
```
