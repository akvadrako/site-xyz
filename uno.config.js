// uno.config.ts
import {
    defineConfig,
    presetTypography,
    presetUno,
    presetAttributify,
    transformerDirectives,
    transformerVariantGroup,
    transformerCompileClass,
} from 'unocss'

export default defineConfig({
    presets: [
        presetUno({
            dark: 'media',
        }),
        presetAttributify(),
        presetTypography(),
    ],
    scan: {
        dirs: ['src', 'doc'],
        fileExtensions: ['md', 'svelte'],
    },
    shortcuts: {
        'hstack': 'flex items-center',
        'vstack': 'flex flex-col',
        'icon': 'w-6 h-6 fill-current',
        'app': 'text-red',
        'app-border': 'border-gray-200 dark:border-dark-300',
    },
    rules: [
        [/^xm-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
        [/^xp-(\d+)$/, (match) => ({ padding: `${match[1] / 4}rem` })],
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Graphik', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            },
        },
        breakpoints: {
            sm: '640px',
        },
    },
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
        transformerCompileClass(),
    ],
})
