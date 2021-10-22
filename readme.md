# Tailwind Font Awesome Plugin
This plugin for Tailwind adds Font Awesome font faces and classes to your CSS output dynamically.

## Installation

```
npm install --save-dev tailwindcss-fa
```

Or if you use __yarn__ then:

```
yarn add --dev tailwindcss-fa
```

You will require the Font Awesome fonts to be available in the file system for your project.

## Configuration
Add to your __tailwind.config.js__:

```javascript
const fontawesome = require('tailwindcss-fa');

module.exports = {
    theme: {
        // other configuration
    },
    plugins:[
        fontawesome({ version: '5.15.4' })
    ]
};
```

## Options
The plugin takes a configuration object with the following keys with the default settings show below:

```javascript
{
    brands: false, // enable brand icons
    duotone: false, // enable duotone icons (pro only)
    light: false, // enable light icons (pro only)
    path: null, // path for your font location
    pro: false, // enable pro icon output (free otherwise)
    regular: true, // enable regular icons
    solid: true, // enable solid icons
    thin: false, // enable thin icons (pro v6 only)
    version: '6.0.0-beta2' // font awesome version
}
```
This plugin supports Font Awesome version __5.0.1__ and upwards and can support the free or pro varities.