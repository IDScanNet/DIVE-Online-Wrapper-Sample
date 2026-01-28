import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy';

export default defineConfig({
    build: {
        minify: false,
        terserOptions: {
            compress: {
                dead_code: false,
                drop_debugger: false,
                keep_fargs: true,
                keep_fnames: true,
            },
            mangle: false,
        },
    },
    plugins: [
        copy({
            targets: [
                { src: 'node_modules/@idscan/idvc2/dist/networks/*', dest: 'public/networks' },
            ],
            hook: 'writeBundle',
        }),
    ],
});
