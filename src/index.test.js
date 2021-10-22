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

    t.is(result.root.nodes[0].type, 'atrule');
    t.is(result.root.nodes[0].name, 'font-face');
    t.is(result.root.nodes[0].nodes.length, 5);
    t.is(result.root.nodes[0].nodes[0].value, '"Font Awesome 6 Free"');
    t.is(result.root.nodes[1].type, 'atrule');
    t.is(result.root.nodes[1].name, 'font-face');
    t.is(result.root.nodes[1].nodes.length, 5);
    t.is(result.root.nodes[2].type, 'rule');
    t.is(result.root.nodes[2].selector, '.far');
    t.is(result.root.nodes[2].nodes.length, 2);
    t.is(result.root.nodes[3].type, 'rule');
    t.is(result.root.nodes[3].selector, '.fas');
    t.is(result.root.nodes[3].nodes.length, 2);

});

test('plugin with default settings for pro', async t => {

    const css = postcss(tailwind({
        corePlugins: false,
        plugins: [ fontawesome({ pro: true }) ]
    }));

    const result = await css.process('@tailwind base;\n@tailwind utilities;', { from: undefined });

    t.truthy(result.css);

    t.is(result.root.nodes[0].type, 'atrule');
    t.is(result.root.nodes[0].name, 'font-face');
    t.is(result.root.nodes[0].nodes.length, 5);
    t.is(result.root.nodes[0].nodes[0].value, '"Font Awesome 6 Pro"');
    t.is(result.root.nodes[1].type, 'atrule');
    t.is(result.root.nodes[1].name, 'font-face');
    t.is(result.root.nodes[1].nodes.length, 5);
    t.is(result.root.nodes[2].type, 'rule');
    t.is(result.root.nodes[2].selector, '.far');
    t.is(result.root.nodes[2].nodes.length, 2);
    t.is(result.root.nodes[3].type, 'rule');
    t.is(result.root.nodes[3].selector, '.fas');
    t.is(result.root.nodes[3].nodes.length, 2);

});

test('plugin with default settings for version 5', async t => {

    const css = postcss(tailwind({
        corePlugins: false,
        plugins: [ fontawesome({ version: '5.15.4' }) ]
    }));

    const result = await css.process('@tailwind base;\n@tailwind utilities;', { from: undefined });

    t.truthy(result.css);

    t.is(result.root.nodes[0].type, 'atrule');
    t.is(result.root.nodes[0].name, 'font-face');
    t.is(result.root.nodes[0].nodes.length, 5);
    t.is(result.root.nodes[0].nodes[0].value, '"Font Awesome 5 Free"');
    t.is(result.root.nodes[1].type, 'atrule');
    t.is(result.root.nodes[1].name, 'font-face');
    t.is(result.root.nodes[1].nodes.length, 5);
    t.is(result.root.nodes[2].type, 'rule');
    t.is(result.root.nodes[2].selector, '.far');
    t.is(result.root.nodes[2].nodes.length, 2);
    t.is(result.root.nodes[3].type, 'rule');
    t.is(result.root.nodes[3].selector, '.fas');
    t.is(result.root.nodes[3].nodes.length, 2);

});

test('plugin with duotone settings', async t => {

    const css = postcss(tailwind({
        corePlugins: false,
        plugins: [ fontawesome({ duotone: true, pro: true }) ]
    }));

    const result = await css.process('@tailwind base;\n@tailwind utilities;', { from: undefined });

    t.truthy(result.css);

    t.is(result.root.nodes[0].type, 'atrule');
    t.is(result.root.nodes[0].name, 'font-face');
    t.is(result.root.nodes[0].nodes.length, 5);
    t.is(result.root.nodes[0].nodes[0].value, '"Font Awesome 6 Duotone"');
    /*t.is(result.root.nodes[1].type, 'atrule');
    t.is(result.root.nodes[1].name, 'font-face');
    t.is(result.root.nodes[1].nodes.length, 5);
    t.is(result.root.nodes[2].type, 'rule');
    t.is(result.root.nodes[2].selector, '.far');
    t.is(result.root.nodes[2].nodes.length, 2);
    t.is(result.root.nodes[3].type, 'rule');
    t.is(result.root.nodes[3].selector, '.fas');
    t.is(result.root.nodes[3].nodes.length, 2);
    t.is(result.root.nodes[4].type, 'rule');
    t.is(result.root.nodes[4].selector, '.fad');
    t.is(result.root.nodes[4].nodes.length, 2);*/

});