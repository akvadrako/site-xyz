
const typography = require('windicss/plugin/typography')

export default {
    scan: {
        dirs: ['src'],
        fileExtensions: ['mdx', 'svelte'],
    },
    alias: {
        'hstack': 'flex items-center',
        'vstack': 'flex flex-col',
        'icon': 'w-6 h-6 fill-current',
        'app': 'text-red',
        'app-border': 'border-gray-200 dark:border-dark-300',
    },
    //darkMode: 'class',
    theme: {
        extend: {
            // typography: theme => ({
            //     DEFAULT: {
            //         css: {
            //             '--tw-prose-bullets': theme('colors.black'),
            //         }
            //     }
            // })
            fontFamily: {
                sans: ['Graphik', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            },
        }
    },
    variants: {},
    plugins: [
        //typography,
        require('windicss/plugin/forms'),
    ],
    //plugins: [require('@tailwindcss/typography')]
}
