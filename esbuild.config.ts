import * as esbuild from 'esbuild'
//src/index.ts  --bundle --outfile=build/index.mjs --format=esm --platform=node
await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'build/index.mjs',
    format: 'esm',
    target: 'esnext',
    platform: 'node',
    banner: {
        js: `
        const { require, __filename,__dirname } = await (async () => {
            const { createRequire } = await import('node:module');
            const { fileURLToPath } = await import('node:url');
            return {
                require: createRequire(import.meta.url),
                __filename: fileURLToPath(import.meta.url),
                __dirname: fileURLToPath(new URL('.', import.meta.url)),
            };
        })();
        `,
    },
})
