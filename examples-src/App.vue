<template>
	<div id="app">
		<div class="fixed top-0 w-100 z-1 flex-none flex flex-row items-center pv3 ph4 white headerToolbar">
			<div class="flex-fill">
				<a :href="`https://github.com/autoNumeric/vue-autoNumeric/releases/tag/v${version}`" class="white no-underline underline-hover">vue-autoNumeric v{{ version }}</a>
				<span class="with">with <a :href="`https://github.com/autoNumeric/autoNumeric/releases/tag/${autoNumericVersion}`" class="white no-underline underline-hover">autoNumeric {{ autoNumericVersion }}</a></span>
			</div>
			<div class="flex-none">
				<a href="https://github.com/autoNumeric/vue-autoNumeric" rel="noopener" target="_blank" title="View on Github">
					<svg xmlns="http://www.w3.org/2000/svg" fill="white" width="32" height="32" viewBox="0 0 16 16">
						<path d="M8 .198c-4.418 0-8 3.582-8 8 0 3.535 2.292 6.533 5.47 7.59.4.075.548-.173.548-.384 0-.19-.008-.82-.01-1.49-2.227.485-2.696-.943-2.696-.943-.364-.924-.888-1.17-.888-1.17-.726-.497.055-.486.055-.486.802.056 1.225.824 1.225.824.714 1.223 1.872.87 2.328.665.072-.517.28-.87.508-1.07-1.776-.202-3.644-.888-3.644-3.954 0-.874.313-1.588.824-2.148-.083-.202-.357-1.015.077-2.117 0 0 .672-.215 2.2.82.64-.177 1.323-.266 2.003-.27.68.004 1.365.093 2.004.27 1.527-1.035 2.198-.82 2.198-.82.435 1.102.162 1.916.08 2.117.512.56.822 1.274.822 2.147 0 3.072-1.872 3.748-3.653 3.946.288.248.544.735.544 1.48 0 1.07-.01 1.933-.01 2.196 0 .213.145.462.55.384 3.178-1.06 5.467-4.057 5.467-7.59 0-4.418-3.58-8-8-8z"></path>
					</svg>
				</a>
			</div>
		</div>
		<div class="flex-fill" style="padding-bottom: 10rem">
			<!-- allow a 3rem padding when resizing browser horizontally and approaching Tachyon's large media breakpoint (60em) -->
			<div class="mb5 center" style="max-width: 57rem">
				<div class="pt5 nb5" id="basic-vue-autonumeric">
					<a href="#basic-vue-autonumeric" :class="headerClasses">
						<h2 class="ma0 pb2 f2 fw4 lh-1">Autonumeric component usage examples</h2>
						<p class="ma0 lh-copy f6">Vue-Autonumeric as the flexibility and power of its <a href="https://github.com/autoNumeric/autoNumeric" class="repoLink">AutoNumeric parent library</a>. It can be configured as you like.</p>
					</a>
					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">Default vue-autonumeric</div>
						<div class="inputAndRawValue">
							<vue-autonumeric :options="''" v-model="autoNumericModel"/>
							<div class="rawValue">{{ autoNumericModel }}</div>
						</div>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">With the <code>'euro'</code> option</div>

						<div class="inputAndRawValue">
							<vue-autonumeric :options="'euro'" v-model="autoNumericModel"/>
							<div class="rawValue">{{ autoNumericModel }}</div>
						</div>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">With the <code>'dollar'</code> option</div>

						<div class="inputAndRawValue">
							<vue-autonumeric :options="'dollar'" v-model="autoNumericModel"/>
							<div class="rawValue">{{ autoNumericModel }}</div>
						</div>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">With the <code>'integer'</code> option</div>

						<div class="inputAndRawValue">
							<vue-autonumeric :options="'integer'" v-model="autoNumericModel"/>
							<div class="rawValue">{{ autoNumericModel }}</div>
						</div>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">With the <code>'integerPos'</code> option</div>

						<div class="inputAndRawValue">
							<vue-autonumeric :options="'integerPos'" v-model="autoNumericModel"/>
							<div class="rawValue">{{ autoNumericModel }}</div>
						</div>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">With the <code>'French'</code> predefined language and a placeholder</div>

						<div class="inputAndRawValue">
							<vue-autonumeric
									:options="'French'"
									:placeholder="'Enter € here'"
									v-model="autoNumericModel"
							/>
							<div class="rawValue">{{ autoNumericModel }}</div>
						</div>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">With the <code>'NorthAmerican'</code> predefined language</div>

						<div class="inputAndRawValue">
							<vue-autonumeric
									:options="'NorthAmerican'"
									v-model="autoNumericModel"
							/>
							<div class="rawValue">{{ autoNumericModel }}</div>
						</div>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">With the custom option <code>{
    currencySymbol : 'Ω',
    decimalCharacter : ',',
    digitGroupSeparator : '.'
}</code></div>

						<div class="inputAndRawValue">
							<vue-autonumeric
								:options="{
						            currencySymbol : 'Ω',
								    decimalCharacter : ',',
								    digitGroupSeparator : '.'
								}"
								v-model="autoNumericModel"
							/>
							<div class="rawValue">{{ autoNumericModel }}</div>
						</div>
					</div>

					<div :class="boxClasses" :style="boxStyle" ref="parentListener">
						<div :class="labelClasses">The custom events are bubbling up to the parent</div>

						<div class="inputAndRawValue">
							<vue-autonumeric
								:options="'euro'"
								v-model="anModel"
							/>
							<div class="rawValue">{{ anModel }}</div>
						</div>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">The `id` and `name` passed as props are added onto the generated element</div>

						<div class="inputAndRawValue">
							<vue-autonumeric
								:options="'euro'"
								id="thisGoesOnTheAnDomElement"
								name="andThisIsTheName"
								v-model="autoNumericModel"
							/>
							<div class="rawValue">{{ autoNumericModel }}</div>
						</div>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">Non-input element with the `contenteditable` attribute</div>

						<div class="inputAndRawValue">
							<vue-autonumeric
								options="euro"
								v-model="autoNumericModel"
								tag="p"
							/>
							<div class="rawValue">{{ autoNumericModel }}</div>
						</div>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">The `placeholder` attribute is passed as a prop too</div>

						<div class="inputAndRawValue">
							<vue-autonumeric
								:options="'euro'"
								placeholder="This is the placeholder"
								v-model="autoNumericModel"
							/>
							<div class="rawValue">{{ autoNumericModel }}</div>
						</div>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">The `options` attribute can be modified <i>on the fly</i>. Click <span class="repoLink" @click="optionsToggle = !optionsToggle">here</span> to toggle it.</div>

						<div class="inputAndRawValue">
							<vue-autonumeric
								:options="options"
								placeholder="This is the placeholder"
								v-model="autoNumericModel"
							/>
							<div class="rawValue">{{ autoNumericModel }}</div>
						</div>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">The `decimalPlaces` option is <strong>NOT</strong> saved between options updates. Click <span class="repoLink" @click="options2Toggle = !options2Toggle">here</span> to toggle between the states.<br>In order to keep the correct precision, you need to specify the `decimalPlacesRawValue` option for both states.</div>

						<div class="inputAndRawValue">
							<vue-autonumeric
								:options="options2"
								placeholder="This is the placeholder"
								v-model="autoNumericModel2"
							/>
							<div class="rawValue">{{ autoNumericModel2 }}</div>
						</div>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">Modify the option to 'percentageEU3dec' then set a small value by clicking <span class="repoLink" @click="setOptionsAndValue">here</span>. This <strong>works</strong> even though we do not use a single object to update both options and value at the same time, because the v-model is <strong>not</strong> shared with components having different options.</div>

						<div class="inputAndRawValue">
							<vue-autonumeric
									:options="options3b"
									placeholder="This is the placeholder"
									v-model="autoNumericModel3"
							/>
							<div class="rawValue">{{ autoNumericModel3 }}</div>
						</div>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">Modify the option to 'percentageEU3dec' then set a small value by clicking <span class="repoLink" @click="setOptionsAndValueFail">here</span>. This <strong>fails</strong> since we do not use a single object to update both options and value at the same time, while the v-model is shared with components having different options.</div>
						<div class="inputAndRawValue">
							<vue-autonumeric
								:options="options3"
								placeholder="This is the placeholder"
								v-model="autoNumericModel"
							/>
							<div class="rawValue">{{ autoNumericModel }}</div>
						</div>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<h5 :class="labelClasses">Real world use case when using an object to change both the value and options</h5>
						<div :class="labelClasses">
							<span class='repoLink reset' @click="reset">Reset to the default value</span>
							<span class='repoLink fail' @click="setBoth">Set both the value and options at once</span>
						</div>

						<div class="inputAndRawValue">
							<vue-autonumeric
								:options="obj.options"
								v-model="obj.val"
							/>
							<div class="rawValue">{{ obj.val }}</div>
						</div>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">Linked vue-autonumeric elements; if you change one, the other is updated...</div>
						<div class="inputAndRawValue">
							<vue-autonumeric :options="''" v-model="anValue"/>
							<div class="rawValue">{{ anValue }}</div>
						</div>
						<div :class="labelClasses">...even if it uses different options (here <code>'euro'</code>)</div>
							<div class="inputAndRawValue">
							<vue-autonumeric :options="'euro'" v-model="anValue"/>
							<div class="rawValue">{{ anValue }}</div>
						</div>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">Initialization with an empty value</div>

						<div class="inputAndRawValue">
							<vue-autonumeric
									id="inputToEmpty"
									options="euro"
									v-model="emptyValue"
									:placeholder="'Enter your value here'"
							/>
							<div class="rawValue">{{ emptyValue }}</div>
							<button class="controls" @click="clearValue">Clear the value with `clear()`</button>
							<button class="controls" @click="setToEmptyString">Set to the empty string</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
    import VueAutonumeric from '../src/components/VueAutonumeric.vue';

    export default {
        name: 'app',

        components: {
            VueAutonumeric,
        },

        data() {
            return {
                autoNumericModel : 221456.72, // Default value for the examples
                autoNumericModel2: 12468.642,
                autoNumericModel3: 221226.44,
                anModel          : 42.01,
                emptyValue       : '',
                optionsToggle    : true,
                options2Toggle   : true,
                options3         : 'euro',
                options3b        : 'euro',

                obj    : {
                    val    : 123456.78,
                    options: 'euro',
                },
                anValue: 123.457,
            };
        },

        mounted() {
            this.$refs.parentListener.addEventListener('autoNumeric:rawValueModified', e => {
                console.log(`autoNumeric:rawValueModified event detected`, e); //DEBUG
            });

            this.$refs.parentListener.addEventListener('autoNumeric:formatted', e => {
                console.log(`autoNumeric:formatted event detected`, e); //DEBUG
            });
        },

        computed  : {
            version() {
                /* eslint no-undef : 0 */
                return VERSION;
            },

            headerClasses() {
                return 'db mt5 pb3 dark-gray hover-blue lh-1 no-underline';
            },

            boxClasses() {
                return 'db pt3 pb5 ph3 ph0-l bt b--black-10 relative';
            },

            boxStyle() {
                return 'min-height: 100px';
            },

            labelClasses() {
                return 'mb4 f6 fw6 dark-gray';
            },

            autoNumericVersion() {
                return `v${AutoNumeric.version()}`;
            },

            options() {
                if (this.optionsToggle) {
                    return 'euro';
                }

                return ['dollar', { decimalPlaces: 0 }];
            },

            options2() {
                if (this.options2Toggle) {
                    return 'euro';
                }

                return ['dollar', { decimalPlaces: 5 }];
            },
        },

        methods: {
            setOptionsAndValue() {
                this.options3b         = 'percentageEU3dec';
                this.autoNumericModel3 = 0.00123456;
            },

            setOptionsAndValueFail() {
                //XXX This way of changing the value/option *may* not work correctly if another vue-autonumeric component uses the same v-model with *different* options
                //XXX This is due to the fact that vue-autonumeric detect a value change, and `set()` it since it does not come from a user interaction. However if one of the vue-autonumeric component has a `decimalPlaces` option set to `2`, and another set to `5`, then the first will drop the additional decimal places when using `set()`..which in turn will make the other component aware of the value change, which will then use the cropped value as well.
                this.options3         = 'percentageEU3dec';
                this.autoNumericModel = 0.00123456;
                // this.$nextTick(() => {
                //     this.autoNumericModel3 = 0.00123456;
                // });
            },

            setBoth() {
                this.obj = {
                    options : 'percentageEU3dec',
                    val     : 0.00123456,
                };
            },

            reset() {
                this.obj.val = 123456.78;
                this.obj.options = AutoNumeric.getDefaultConfig();
            },

            clearValue() {
                AutoNumeric.getAutoNumericElement('#inputToEmpty').clear(true);
            },

            setToEmptyString() {
                AutoNumeric.getAutoNumericElement('#inputToEmpty').set('');
            },
        },
    };
</script>

<style lang="scss">
	$transitionShortDuration : 0.3s;
	$linkColor     : #0094ff;
	$linkColorHover: #0068B7;

	html, body {
		font-family : 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-size   : 100%;
	}

	html {
		height : 100%;
	}

	body {
		overflow         : auto;
		position         : relative;
		background-color : white;
		color            : #333;
	}

	.headerToolbar {
		background-color: $linkColor;
	}

	.flex-fill {
		flex       : 1 1;
		min-width  : 0;
		min-height : 0;
	}

	.with {
		font-size   : 0.7rem;
		color       : #BCE1FF;
		margin-left : 1rem;
	}

	.lh-1 {
		line-height : 1;
	}

	$boxShadow       : 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
	input {
		background-color : white;
		border           : 1px solid #B1B1B1;
		color            : #333;
		padding          : 0.5rem;
		border-radius    : 4px;
		transition       : all $transitionShortDuration ease;

		&:hover {
			box-shadow : $boxShadow;
		}

		&:focus {
			border-color : #6B819F;
			box-shadow   : $boxShadow;
		}
	}

	code:not(.javascript) {
		font-size        : 85%;
		font-family      : SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
		font-weight      : 300;
		padding          : .2rem 0;
		margin           : 0;
		border-radius    : 3px;
		background-color : rgba(27, 31, 35, .05);
	}

	.repoLink {
		text-decoration: none;
		color          : $linkColor;
		cursor         : pointer;

		&:hover {
			text-decoration: underline;
			color          : $linkColorHover;
		}
	}

	.inputAndRawValue {
		display : flex;
	}

	.rawValue {
		font-family      : monospace;
		background-color : #f3f3f3;
		color            : #9C9C9C;
		padding          : 0.6rem;
		margin-left      : 2rem;
		border-radius    : 3px;
		font-size        : 0.9rem;
	}

	.controls {
		background-color : $linkColor;
		border           : 1px solid $linkColorHover;
		color            : white;
		padding          : 0.5rem;
		border-radius    : 4px;
		transition       : all $transitionShortDuration ease;
		margin-left      : 2rem;
		cursor           : pointer;

		&:hover {
			box-shadow       : $boxShadow;
			background-color : dodgerblue;
			border-color     : darkblue;
		}

		&:focus {
			border-color : #6B819F;
			box-shadow   : $boxShadow;
		}
	}
</style>
