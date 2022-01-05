# Netlify Notes

## CMS Local Git

    npx netlify-cms-proxy-server
    npm run dev
    http://localhost:3000/admin

## CMS paths

  - name: works
    nested:
      depth: 2
      summary: '{{title}}'
    preview_path: '/en/works/{{dirname}}/{{slug}}'
    meta:
      path: { widget: string, label: 'Path', index_file: 'index' }

