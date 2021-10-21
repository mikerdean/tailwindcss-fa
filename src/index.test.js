const fontawesome = require('./index.js');
const postcss = require('postcss');
const tailwind = require('tailwindcss');
const test = require('ava');

test('plugin with default settings', async t => {

    const css = postcss(tailwind({
        corePlugins: false,
        plugins: [ fontawesome(85) ]
    }));

    const result = await css.process('@tailwind base;\n@tailwind utilities;', { from: undefined });

    console.log(result.css);
    t.truthy(result.css);

    t.true(result.css.includes('font-family: Font Awesome 6 Free'));
    t.true(result.css.includes('.far {'));
    t.true(result.css.includes('.fas {'));

});