## vue-autoNumeric

A Vue.js component that wraps the awesome autoNumeric input formatter library

---

vue-autoNumeric wrap the awesome autoNumeric library and generate an `<input>` element managed by AutoNumeric.

### Installation

```sh
yarn add vue-autonumeric
# or
npm install vue-autonumeric --save
```

You also need to link the [AutoNumeric](https://github.com/autoNumeric/autoNumeric/) library in your html `<head>` tag like so:
```html
<script src="//unpkg.com/autonumeric"></script>
```

### How to use?

The AutoNumeric component can be instantiated the same way `AutoNumeric` can.

With an option object:
```html
<autonumeric
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
/>
```

With a predefined option name:
```html
<autonumeric
    v-model="myValue"
    :options="'French'"
/>
```

With multiple option objects/predefined options:
```html
<autonumeric
    v-model="myValue"
    :options="['euro', { minimumValue: '0' }]"
/>
```

#### Other props

You can define the input placeholder using:
```html
<autonumeric
    v-model="myValue"
    :options="'euro'"
    :placeholder="'Enter your value here'"
/>
```

*In the future, you'll be able to define the type of element tag (`<p>`, `<div>`, etc.) you want that component to generate.<br>This will allow you to create any supported tag with the `contenteditable` attribute set to `true`, instead of `<input>` one as it is for now.*

#### Integration with other scripts & events support

This wrapper supports setting the AutoNumeric options via an `:options` [prop](https://vuejs.org/v2/guide/components.html#Props).<br>
**It also supports external value changes** (via `aNElement.set(42)` for instance) and update the formatting *and* the [`v-model`](https://vuejs.org/v2/guide/components.html#Customizing-Component-v-model) accordingly.

The `paste`, `drop` and `wheel` events are supported as well.

### Caveats

Please note that directly setting a `:value='42'` on the `<autonumeric>` component **will break it** (really!).<br>
Do **NOT** do that:
```html
<autonumeric
    v-model="myValue"
    :options="{ minimumValue: '0' }"
    :value="42042.69" <!-- This fails -->
/>
```

### Demo

The official AutoNumeric [documentation](https://autonumeric.github.io/guide) ~~is~~ will soon be using this component extensively :)<br>
<br>
An editable live example is available [on Codepen](https://codepen.io/AnotherLinuxUser/pen/pWgOrZ).

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
<br>
Contact me!
