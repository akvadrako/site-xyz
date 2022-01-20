
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
    // media or class
    // https://windicss.org/features/dark-mode.html
    darkMode: 'media',
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
    //variants: {},
    plugins: [
        require('windicss/plugin/typography'),
        require('windicss/plugin/forms'),
    ],
}
