const fontawesome = require('./index.js');
const postcss = require('postcss');
const tailwind = require('tailwindcss');
const test = require('ava');

test('plugin with default settings', async t => {

    const css = postcss(tailwind({
        corePlugins: false,
        plugins: [ fontawesome() ]
    }));

    const result = await css.process('@tailwind base;\n@tailwind utilities;', { from: undefined });

    t.truthy(result.css);

});