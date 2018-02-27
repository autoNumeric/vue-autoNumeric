## Changelog for vue-autoNumeric

### 1.0.6
+ Fix issue #8 Add a new `resetOnOptions` props so that updating the `options` one first reset to the default options
+ Add a `resetOnOptions` props set the `true` by default so that updating the `options` prop first call `.options.reset()`
  + This is useful when using predefined option names that do not declare all the options. For instance when switching from `'integer'` to `'euro'`, the `decimalPlaces` was not set from `0` to `2` and you had to first update to the default configuration.
  + Now by default all options update will reset to the default options first. This can be avoided by setting `resetOnOptions` to false before changing the `options` value.

### 1.0.5
+ Fix issue #2 Allow the component to generate any supported Html element instead of only `<input>`

### 1.0.4
+ Fix the component size issue which bundled the whole `AutoNumeric` library
+ Update the documentation with how to install the component, depending if the AutoNumeric library should be bundled or not

### 1.0.3
+ Fix importing issues with the `AutoNumeric` library
+ Complete the documentation on how to install and use the component
+ Add a link to the examples page and its source in the Readme
+ Fix the example script imports by removing the unneeded AutoNumeric link
+ Fix issue #4 Error when building with webpack 2 on linux

### 1.0.2
+ Fix issue #3 Update the value when the `:options` prop is modified

### 1.0.1
+ Rename the component source from `Autonumeric` to `VueAutonumeric` to prevent confusion with the `AutoNumeric` library
+ Update the examples source accordingly
+ Update the readme with badges
+ Update the readme with more detailed installation instructions
+ Fix the examples in the readme and update the Codepen link

### 1.0.0
+ Release the version `v1.0.0` of the vue-autoNumeric component
