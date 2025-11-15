import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';

import packageJson from "./package.json" with { type: "json" };

export default [
    {
        input: 'src/index.ts',
        external: [
            'react',
            'react-dom',
            'react/jsx-runtime',
            /@testing-library\/.*/,
            'jest',
            'ts-jest',
            'identity-obj-proxy',
            'jest-environment-jsdom',
            '@fontsource/inter',
            'gsap',
            'gsap/DrawSVGPlugin',
            'gsap/ScrollTrigger',
            'gsap/MorphSVGPlugin',
            'react-router-dom',
            'react-router'
        ],
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true
            }
        ],
        plugins: [
            commonjs(),
            typescript({tsconfig: './tsconfig.json'}),
            postcss({
                extensions: ['.css'],
                inject: true
            })
        ]
    },
    {
        input: 'dist/types/index.d.ts',
        output: [{file: 'dist/index.d.ts', format: 'esm'}],
        plugins: [dts()],
        external: [/\.css$/]
    }
]