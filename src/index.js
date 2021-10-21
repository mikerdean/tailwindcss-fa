const plugin = require('tailwindcss/plugin');

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

module.exports = function(options) {

    const opts = Object.assign({}, defaultOptions, options);
    // validate options here?

    return plugin(({ addBase, addUtilities }) => {
        addBaseConfiguration(opts, addBase, addUtilities);
    });

};

function addBaseConfiguration(options, addBase, addUtilities) {

    const fontConfiguration = createFontConfiguration(options);
    const fontFaces = [];
    const fontClasses = [];

    for (let key in fontConfiguration) {
        const type = fontConfiguration[key];

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
        fontFamily,
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