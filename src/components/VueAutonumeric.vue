<!--
              vue-autonumeric

@version      1.0.0
@date         2017-09-19 UTC 08:00

@author       Alexandre Bonneau
@copyright    2016 © Alexandre Bonneau <alexandre.bonneau@linuxfr.eu>

@summary      A Vue.js component that wraps the awesome autoNumeric
              input formatter library

Please report any bugs to https://github.com/autoNumeric/vue-autoNumeric

@license      Released under the MIT License
@link         http://www.opensource.org/licenses/mit-license.php

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sub license, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
-->

<template>
	<input
			type="text"
			ref="autoNumericInput"
			@keydown="setUserInteraction"
			@paste="setUserInteraction"
			@wheel="setUserInteraction"
			@drop="setUserInteraction"

			@keyup="resetUserInteraction"
			@blur="resetUserInteraction"
			:placeholder="placeholder"
			v-on:autoNumeric:rawValueModified="updateVModel"
	>
</template>

<script type="text/babel">
    import AutoNumeric from 'AutoNumeric';

    // Custom default autoNumeric option can be set here to override the default autoNumeric ones
    const defaultOptions = {};

    /**
     * The AutoNumeric component can be instantiated like so :
     * @example
     * <autonumeric
     *      v-model="autoNumericComponentValue"
     *      :options="{ digitGroupSeparator: '.', decimalCharacter: ',', decimalCharacterAlternative: '.', currencySymbol: '\u00a0€', currencySymbolPlacement: 's', roundingMethod: 'U', minimumValue: '0' }"
     *  />
     *
     *  <autonumeric
     *      v-model="autoNumericComponentValue"
     *      :options="'French'"
     *  />
     *
     *  Note that directly setting a `:value='42'` will break this component. Do NOT do that. :
     *  <autonumeric
     *      v-model="autoNumericComponentValue"
     *      :options="{ digitGroupSeparator: '.', decimalCharacter: ',', decimalCharacterAlternative: '.', currencySymbol: '\u00a0€', currencySymbolPlacement: 's', roundingMethod: 'U', minimumValue: '0' }"
     *      :value="42042.69"
     *  />
     */
    export default {
        //TODO If an html value attribute is set in the source, then the 'linked' component sharing the same v-model are not updated with the value nor formatted on load (it takes precedence over the changes made by other inputs, and always keep `value` to the initial value)
        name: 'VueAutonumeric',

        props: {
            value: {
                type    : Number,
                required: false,
            },

            options: {
                type    : [Object, String, Array],
                required: false,
                default() {
                    return defaultOptions;
                },
            },

            placeholder: { // The <input> placeholder text. This is only used if the generated element is an <input>.
                type    : String,
                required: false,
            },
        },

        data() {
            return {
                // Store the reference to the AutoNumeric object
                anElement      : null,

                // Keep tracks if a change is initiated by the user (via the keyup/paste/wheel/drop events),
                // or by another script (useful to know when to update the `v-model` when the value change from an outside script)
                userInteraction: false,
            };
        },

        mounted() {
            // Manage the options
            /*
             * Currently, the allowed format for the `options` property are :
             * - a string (predefined options)
             * - an object (the option object)
             * - an array of strings and/or objects
             */
            let options;
            if (Array.isArray(this.options)) {
                // This allows the user to use multiple options (strings or objects) in an array, and overwrite the previous one with the next option element ; this is useful to tune the wanted format
                let optionObjects = {};
                this.options.forEach(optionElement => {
                    options       = this.manageOptionElement(optionElement);
                    optionObjects = Object.assign(optionObjects, options); // Merge each options objects one after the other
                });

                options = optionObjects;
            } else {
                options = this.manageOptionElement(this.options);
            }

            // Initialize the autoNumeric input
            this.anElement = new AutoNumeric(this.$refs.autoNumericInput, options);
            if (this.value !== null && this.value !== '') {
                this.anElement.set(this.value);
                // The `v-model` must be updated with that default value on startup
                this.updateVModel(); //FIXME Send the `event.timeStamp` info here
                this.resetUserInteraction(); // Do not forget to set back the user interaction tracking variable to `false`!
            }
        },

        methods: {
            /**
             * Update the v-model value and make the parent aware of that change.
             *
             * @param {Event} event This is needed if we want to use the `event.timeStamp` attribute
             */
            updateVModel(event) {
                if (this.anElement !== null) {
                    this.$emit('input', this.anElement.getNumber(), event);
                }
            },

            /**
             * The user is currently editing the value manually.
             * This function keep track of that state.
             */
            setUserInteraction() {
                this.userInteraction = true;
            },

            /**
             * Reset the user interaction indicator to its default state.
             */
            resetUserInteraction() {
                this.userInteraction = false;
            },

            /**
             * Return an option object, whatever the type of `optionElement`.
             * If `optionElement` is as string, then we retrieve the predefined option object, if it's an object, we use it as is.
             *
             * @param {object|string} optionElement
             * @returns {object}
             */
            manageOptionElement(optionElement) {
                let options;
                if (typeof optionElement === 'string' || optionElement instanceof String) {
                    options = AutoNumeric.getPredefinedOptions()[optionElement];
                    if (options === void(0) || options === null) {
                        // If the given `optionElement` does not exist, we switch back to the default options
                        console.warn(`The given pre-defined options [${optionElement}] is not recognized by autoNumeric.\nSwitching back to the default options.`);
                        options = defaultOptions; // Default value
                    }
                } else { // A `settings` object
                    options = optionElement;
                }

                return options;
            },
        },

        /*
         * Here we need to be extra careful when using `watch`, in order to
         * prevent chain reactions when 'linked' v-model starts to change each
         * other when only one is modified, including the very one the user
         * interacts with.
         *
         * In order to prevent this kind of behavior, I keep track if the
         * change comes from a user interaction (which means
         * `this.userInteraction` is set to `true` on `keyup`, `paste`, `wheel`
         * and `drop`, or `false` if the v-model is modified by a script.
         *
         * The new value detected by `watch` is then only `set` if it comes
         * from a script, effectively preventing updating the input that is
         * currently edited by the user.
         */
        watch: {
            //FIXME If multiple components share the same v-model, this means 'set' here will be called as many times as there is an input that is not being used my a human interaction ; find a way to prevent that
            value(newValue, oldValue) {
                try { // I need to catch any errors here, otherwise if 'set()' fails, `this.userInteraction` is not set back to `false`
                    if (!this.userInteraction) {
                        // Make sure this is only called when the value is set by an external script, and not from a user input
                        // The modification comes from a script, so we need to reformat the new value `newValue`
                        if (newValue !== oldValue) {
                            // Compare the 'newValue' with the current 'oldValue' so we do not `set` it again if it's not needed
                            this.anElement.set(newValue);
                        }
                    }
                } catch (error) {
                    console.error(error);
                }

                // After each watch call, reset the 'manually modified' tracking state to `false`
                this.resetUserInteraction();
            },
        },

        //TODO Allow the AutoNumeric component to generate other (allowed) html tags, and not only <input> like currently, with the 'contenteditable' attribute set to `true` -> Use a `render` function
    };
</script>
