## vue-autoNumeric

A Vue.js component that wraps the awesome autoNumeric input formatter library

[![NPM][nodei-image]][nodei-url]
<br>
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
<br><br>
Get in touch on [![Gitter chat][gitter-image]][gitter-url]

---

vue-autoNumeric wraps the awesome autoNumeric library and generate an `<input>` element managed by [AutoNumeric](https://github.com/autoNumeric/autoNumeric/).

**Checkout the [demo](https://codepen.io/AnotherLinuxUser/pen/pWgOrZ?editors=1010)!**

### Installation

```sh
yarn add vue-autonumeric
# or
npm install vue-autonumeric --save
```

*Note: In order to minimize the size of the vue-autoNumeric component, the AutoNumeric library dependency **is not** bundled with it.*

This means you **need** to link the [AutoNumeric](https://github.com/autoNumeric/autoNumeric/) library with either ways:
 
#### ...in your html `<head>` tag
In the html `<head>` tag directly, or by using a CDN like so:

```html
<script src="../node_modules/autonumeric/dist/autonumeric.min.js"></script>
<!-- or -->
<script src="//unpkg.com/autonumeric"></script>
```

#### ...or by importing it directly as a module
You can choose to directly import the `AutoNumeric` library in your source code using:

```sh
yarn add autonumeric
# or
npm install autonumeric --save
```

You'll then be able to use the `vue-autonumeric` component in your scripts using:
```js
import AutoNumeric from 'autonumeric';
import VueAutonumeric from 'vue-autonumeric';
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

You can define the input placeholder using:
```html
<vue-autonumeric
    v-model="myValue"
    :options="'euro'"
    :placeholder="'Enter your value here'"
></vue-autonumeric>
```

*In the future, you'll be able to define the type of element tag (`<p>`, `<div>`, etc.) you want that component to generate.<br>This will allow you to create any supported tag with the `contenteditable` attribute set to `true`, instead of `<input>` one as it is for now.*

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

Moreover, you can check the [shipped examples](https://github.com/autoNumeric/vue-autoNumeric/blob/master/examples/index.html) in your browser, and study its [source here](https://github.com/autoNumeric/vue-autoNumeric/tree/master/examples-src).

### Requirements

- [AutoNumeric](https://github.com/autoNumeric/autoNumeric) `^v4`
- [Vue.js](https://github.com/vuejs/vue) `^v2`

### Browser support

This supports the same browsers than AutoNumeric supports:
- Firefox and
- Chrome

*(latest 2 versions)*<br><br>
If you use IE/Edge/Safari/Opera, this *might* work ;)

### License

`vue-autoNumeric` is open source and released under the [MIT License](https://github.com/autoNumeric/vue-autoNumeric/blob/master/LICENSE).

### Support

As always, if you find this useful, please consider [supporting its development](https://www.patreon.com/user?u=4810062)!<br>
Huge Thanks :)


<br>Copyright © 2016 Alexandre Bonneau

> PS:<br>
I would love to know how you're using vue-autonumeric.<br>
Contact me! :)


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
