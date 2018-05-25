## vue-autoNumeric

A Vue.js component that wraps the awesome [AutoNumeric](https://github.com/autoNumeric/autoNumeric/) input formatter library

[![NPM][nodei-image]][nodei-url]
<br>
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
<br><br>
Get in touch on [![Gitter chat][gitter-image]][gitter-url]

---

vue-autoNumeric wraps the awesome AutoNumeric library and generate an `<input>` element managed by [AutoNumeric](https://github.com/autoNumeric/autoNumeric/).

**Checkout the [demo](https://codepen.io/AnotherLinuxUser/pen/pWgOrZ?editors=1010)!**

Alternatively you can check the [examples](#examples) directly in your browser to see how to integrate the component with Vue and AutoNumeric.

### Installation

```sh
yarn add vue-autonumeric
# or
npm install vue-autonumeric --save
```

*Note: In order to minimize the size of the vue-autoNumeric component, the AutoNumeric library dependency **is not** bundled with it.*

This means you **need** to link the [AutoNumeric](https://github.com/autoNumeric/autoNumeric/) library with either ways:
 
#### ...in your html `<head>` tag directly

```html
<!-- locally... -->
<script src="../node_modules/autonumeric/dist/autonumeric.min.js"></script>
<!-- ...or by using a CDN -->
<script src="https://unpkg.com/autonumeric"></script>
```

Then you need to tell Webpack to treat the `AutoNumeric` dependency as [external](https://webpack.js.org/configuration/externals/) so that it does not try to bundle it.<br>Here is a really simple `webpack.config.js` example that does that:

```js
module.exports = {
    entry  : './src/vueAutonumericTest.js',
    output : {
        filename: './dist/bundle.js'
    },
    externals: {
        autonumeric: 'AutoNumeric',
    },
};
```

#### ...or by importing it directly as an ES6 module

You can choose to directly import the AutoNumeric library in your source code.<br>First, install the `autonumeric` dependency so that Webpack can find it using:

```sh
yarn add autonumeric
# or
npm install autonumeric --save
```

You will as usual be able to use the `vue-autonumeric` component in your Vue components using:
```js
import VueAutonumeric from '../src/components/VueAutonumeric.vue';

export default {
    name      : 'myComponent',

    components: {
        VueAutonumeric,
    },
}
```

However, when doing that if you want to be able to bundle all the scripts together with Webpack, you'll **need to define an alias for the `AutoNumeric` library in your Webpack config**, otherwise Webpack will complain about the npm package `autonumeric` case.

The alias that you need to declare in your Webpack configuration:
```js
module.exports = {
    entry  : './src/vueAutonumericTest.js',
    output : {
        filename: './dist/bundle.js'
    },
    resolve: {
        alias: {
            AutoNumeric: 'node_modules/autonumeric/dist/autoNumeric.min',
        },
    },
};
```

### How to use?

The AutoNumeric component can be instantiated the same way `AutoNumeric` can.

With an option object:
```html
<vue-autonumeric
     v-model="myValue"
     :options="{
         digitGroupSeparator: '.',
         decimalCharacter: ',',
         decimalCharacterAlternative: '.',
         currencySymbol: '\u00a0€',
         currencySymbolPlacement: 's',
         roundingMethod: 'U',
         minimumValue: '0'
     }"
></vue-autonumeric>
```

With a predefined option name:
```html
<vue-autonumeric
    v-model="myValue"
    :options="'French'"
></vue-autonumeric>
```

With multiple option objects/predefined options:
```html
<vue-autonumeric
    v-model="myValue"
    :options="['euro', { minimumValue: '0' }]"
></vue-autonumeric>
```

#### Other props

##### Placeholder

You can define the input placeholder using:
```html
<vue-autonumeric
    v-model="myValue"
    :options="'euro'"
    :placeholder="'Enter your value here'"
></vue-autonumeric>
```

##### Tag

You can also specify the type of html tag (within the [AutoNumeric supported list](https://github.com/autoNumeric/autoNumeric/tree/next#on-other-dom-elements)) this component should generate using the `tag` prop.
By default, an `<input>` element is generated, but if you want a `<div>` element, you can use:
```html
<vue-autonumeric
    v-model="myValue"
    options="euro"
    tag="div"
></vue-autonumeric>
```

*Note: this will automatically set the `contenteditable` attribute to `true` for that generated element.*

#### Integration with other scripts & events support

This wrapper supports setting the AutoNumeric options via an `:options` [prop](https://vuejs.org/v2/guide/components.html#Props).<br>
**It also supports external value changes** (via `aNElement.set(42)` for instance) and update the formatting *and* the [`v-model`](https://vuejs.org/v2/guide/components.html#Customizing-Component-v-model) accordingly.

The `paste`, `drop` and `wheel` events are supported as well.

Moreover, if you modify the `:options` prop, the AutoNumeric settings will be automatically updated with the new options. 

### Caveats

Please note that directly setting a `:value='42'` on the `<vue-autonumeric>` component **will break it** (really!).<br>
Do **NOT** do that:
```html
<vue-autonumeric
    v-model="myValue"
    :options="{ minimumValue: '0' }"
    :value="42042.69" <!-- This fails -->
></vue-autonumeric>
```

### Demo

The official AutoNumeric [documentation](http://autonumeric.org/#/guide) is using this component extensively :)<br>
<br>
An editable live example is available [on Codepen](https://codepen.io/AnotherLinuxUser/pen/pWgOrZ?editors=1010).

#### Examples

You can also check the [shipped examples](https://github.com/autoNumeric/vue-autoNumeric/blob/master/examples/index.html) in your browser, and study their [source here](https://github.com/autoNumeric/vue-autoNumeric/tree/master/examples-src).<br>To do so, first compile the example using:
```bash
# this will build the component *and* the examples
yarn build 
```
Then check the resulting html file in your browser using:
```bash
firefox ./examples/index.html # or `chrome`
```

### Requirements

- [AutoNumeric](https://github.com/autoNumeric/autoNumeric) `^v4`
- [Vue.js](https://github.com/vuejs/vue) `^v2`

### Browser support

This supports the same browsers than AutoNumeric supports:
- Firefox and
- Chrome

*(latest 2 versions)*<br><br>
If you use IE/Edge/Safari/Opera, this *might* work ;)

### Contributing

Whenever you change the source code, you can check how it affects the default examples by first building those in `examples/index.html` with:
```sh
yarn build:examples
```

The [contribution guidelines](https://github.com/autoNumeric/autoNumeric/blob/next/doc/CONTRIBUTING.md) for vue-autoNumeric are the same than for the parent [AutoNumeric](https://github.com/autoNumeric/autoNumeric) project.

### Support

As always, if you find this useful, please consider [supporting its development](https://www.patreon.com/user?u=4810062)!<br>
Huge Thanks :)

### License

`vue-autoNumeric` is open source and released under the [MIT License](https://github.com/autoNumeric/vue-autoNumeric/blob/master/LICENSE).

<br>Copyright © 2016-2018 Alexandre Bonneau

> PS:<br>
I would love to know how you're using vue-autonumeric.<br>
Contact and tell me! :)


[downloads-image]: http://img.shields.io/npm/dm/vue-autonumeric.svg
[downloads-url]: http://badge.fury.io/js/vue-autonumeric
[gitter-image]: https://img.shields.io/badge/gitter-autoNumeric%2FautoNumeric-brightgreen.svg
[gitter-url]: https://gitter.im/autoNumeric/vue-autoNumeric
[npm-image]: https://img.shields.io/npm/v/vue-autonumeric.svg
[npm-url]: https://npmjs.org/package/vue-autonumeric
[nodei-image]: https://nodei.co/npm/vue-autonumeric.png?downloads=true&downloadRank=true&stars=true
[nodei-url]: https://nodei.co/npm/vue-autonumeric
[snyk-image]: https://snyk.io/test/github/autoNumeric/vue-autoNumeric/badge.svg
[snyk-url]: https://snyk.io/test/github/autoNumeric/vue-autoNumeric
