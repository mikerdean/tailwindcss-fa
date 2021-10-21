const plugin = require('tailwindcss/plugin');

const manifests = Object.freeze({
    v5free: require('./v5free.json'),
    v5pro: require('./v5pro.json'),
    v6free: require('./v6free.json'),
    v6pro: require('./v6pro.json')
});

const defaultOptions = Object.freeze({
    brands: false,
    duotone: false,
    light: false,
    path: null,
    pro: false,
    regular: true,
    solid: true,
    thin: false,
    version: 6
});

module.exports = plugin.withOptions(function(options) {
    
    return function({ addBase, addUtilities }) {

        const opts = Object.assign({}, defaultOptions, options);

        addBaseConfiguration(opts, addBase, addUtilities);
        addIcons(opts, addBase, addUtilities);

    };

});

function addBaseConfiguration(options, addBase, addUtilities) {

    const fontConfiguration = createFontConfiguration(options);
    const fontFaces = [];
    const fontClasses = [];

    for (const [key, type] of Object.entries(fontConfiguration)) {

        if (!options[key]) {
            continue;
        }

        if (type.pro && !options.pro) {
            continue;
        }

        fontFaces.push(createFontFace(type.fontFamily, key, type.fontWeight, options.path));
        fontClasses.push(createFontClass(type.className, type.fontFamily, type.fontWeight));
    }

    addBase({ '@font-face': fontFaces });
    fontClasses.forEach(x => addUtilities(x));
}

function addIcons(options, addBase, addUtilities) {

    const manifestName = `v${options.version}${options.pro ? 'pro' : 'free'}`;
    const manifest = manifests[manifestName];
    if (!manifest) {
        throw Error(`Could not find manifest for ${manifestName}`);
    }

    for(const [key, value] of Object.entries(manifest)) {

        const className = `.fa-${key}:before`;
        addUtilities({
            [className]: {
                content: `"${value}"`
            }
        });

    }

}

function createFontClass(className, fontFamily, fontWeight) {
    return {
        [className]: {
            fontFamily,
            fontWeight 
        }
    };
}

function createFontFace(fontFamily, name, fontWeight, path, fontStyle = 'normal', fontDisplay = 'block') {

    const filename = `${path || ''}fa-${name}-${fontWeight}`;

    return {
        fontFamily: `"${fontFamily}"`,
        fontWeight,
        fontStyle,
        fontDisplay,
        src: `url('${filename}.woff2') format('woff2'), url('${filename}.ttf') format('truetype')`
    };
}

function createFontConfiguration(options) {

    const fontName = `Font Awesome ${options.version}`;
    const fontFamily = `${fontName} ${options.pro ? 'Pro' : 'Free'}`;

    return {
        brands: {
            className: '.fab',
            fontFamily: `${fontName} Brands`,
            fontWeight: 400,
            pro: false
        },
        duotone: {
            className: '.fad',
            fontFamily: `${fontName} Duotone`,
            fontWeight: 900,
            pro: true
        },
        light: {
            className: '.fal',
            fontFamily,
            fontWeight: 300,
            pro: true
        },
        regular: {
            className: '.far',
            fontFamily,
            fontWeight: 400,
            pro: false
        },
        solid: {
            className: '.fas',
            fontFamily,
            fontWeight: 900,
            pro: false
        },
        thin: {
            className: '.fat',
            fontFamily,
            fontWeight: 100,
            pro: true
        }
    };
}