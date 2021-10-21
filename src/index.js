const plugin = require('tailwindcss/plugin');

const manifests = Object.freeze({
    v5: require('./v5.json'),
    v6: require('./v6.json')
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
        addIcons(opts, addUtilities);

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

function addIcons(options, addUtilities) {

    const manifest = getManifest(options.version);
    const type = options.pro ? 'pro' : 'free';
    
    for(const icon of manifest.release.icons) {
        for(const style of icon.membership[type]) {
            if (options[style]) {
                addIconClasses(addUtilities, icon.id, icon.unicode, style === 'duotone', options.version);
            }
        }
    }
}

function addIconClasses(addUtilities, id, unicode, duotone, version) {

    const className = `.fa-${id}:before`;
    addUtilities({
        [className]: {
            content: `"\\${unicode}"`
        }
    });

    if (duotone) {
        const duoClassName = `.fad.fa-${key}:after`;
        const duoClassValue = version === 5 ? 
            '\\10' + unicode :
            '\\' + unicode.repeat(2);

        addUtilities({
            [duoClassName]: {
                content: `"${duoClassValue}"`
            }
        });
    }
}

function getManifest(version) {
 
    const manifestName = `v${version}`;
    const manifest = manifests[manifestName];
    if (!manifest) {
        throw Error(`Could not find manifest for ${manifestName}`);
    }

    return manifest;

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