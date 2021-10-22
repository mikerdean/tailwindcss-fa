const manifests = require('../manifests/index.js');
const plugin = require('tailwindcss/plugin');

const latest = (function() {
    const keys = Object.keys(manifests);
    return keys[keys.length - 1];
})();

const defaultOptions = Object.freeze({
    brands: false,
    duotone: false,
    light: false,
    path: null,
    pro: false,
    regular: true,
    solid: true,
    thin: false,
    version: latest
});

module.exports = plugin.withOptions(function(options) {
    
    return function({ addBase, addUtilities }) {

        const opts = createOptionsObject(options);
        const manifest = getManifest(opts.version);

        addBaseConfiguration(opts, addBase, addUtilities);
        addIcons(opts, manifest, addUtilities);

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

function addIcons(options, manifest, addUtilities) {

    const type = options.pro ? 'pro' : 'free';
    
    for(const icon of manifest.release.icons) {

        let add = false;
        let duotone = icon.membership[type].includes('duotone');

        for(const style of icon.membership[type]) {
            if (options[style]) {
                add = true;
                break;
            }
        }

        if (add) {
            addIconClasses(addUtilities, icon.id, icon.unicode, duotone, options.version);
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
        const duoClassName = `.fad.fa-${id}:after`;
        const duoClassValue = this.major === 5 ? 
            '\\10' + unicode :
            ('\\' + unicode).repeat(2);

        addUtilities({
            [duoClassName]: {
                content: `"${duoClassValue}"`
            }
        });
    }
}

function getManifest(version) {
 
    const manifest = manifests[version];
    if (!manifest) {
        throw Error(`Could not find manifest for ${version}`);
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

    const fontName = `Font Awesome ${options.major}`;
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

function createOptionsObject(options) {

    const opts = Object.assign({}, defaultOptions, options);

    Object.defineProperty(opts, 'major', {
        get() {
            return parseInt(this.version.substring(0, this.version.indexOf('.')));
        }
    });

    return opts;

}