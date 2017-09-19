<template>
	<div id="app">
		<div class="fixed top-0 w-100 z-1 flex-none flex flex-row items-center pv3 ph4 white headerToolbar">
			<div class="flex-fill">
				<a :href="'https://github.com/autoNumeric/vue-autoNumeric/releases/tag/v'+version" class="white no-underline underline-hover">vue-autoNumeric {{version}}</a>
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
						<vue-autonumeric :options="''" v-model="autoNumericModel"></vue-autonumeric>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">With the <code>'euro'</code> option</div>
						<vue-autonumeric :options="'euro'" v-model="autoNumericModel"></vue-autonumeric>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">With the <code>'dollar'</code> option</div>
						<vue-autonumeric :options="'dollar'" v-model="autoNumericModel"></vue-autonumeric>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">With the <code>'integer'</code> option</div>
						<vue-autonumeric :options="'integer'" v-model="autoNumericModel"></vue-autonumeric>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">With the <code>'integerPos'</code> option</div>
						<vue-autonumeric :options="'integerPos'" v-model="autoNumericModel"></vue-autonumeric>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">With the <code>'French'</code> predefined language and a placeholder</div>
						<vue-autonumeric
								:options="'French'"
								:placeholder="'Enter € here'"
								v-model="autoNumericModel"
						></vue-autonumeric>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">With the <code>'NorthAmerican'</code> predefined language</div>
						<vue-autonumeric
								:options="'NorthAmerican'"
								v-model="autoNumericModel"
						></vue-autonumeric>
					</div>

					<div :class="boxClasses" :style="boxStyle">
						<div :class="labelClasses">With the custom option <code>{
    currencySymbol : 'Ω',
    decimalCharacter : ',',
    digitGroupSeparator : '.'
}</code></div>
						<vue-autonumeric
								:options="{
						            currencySymbol : 'Ω',
								    decimalCharacter : ',',
								    digitGroupSeparator : '.'
								}"
								v-model="autoNumericModel"
						></vue-autonumeric>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
    import VueAutonumeric from '../src/components/VueAutonumeric.vue';

    export default {
        name      : 'app',

        components: {
            VueAutonumeric,
        },

        data() {
            return {
                autoNumericModel : 221456.72, // Default value for the examples
            };
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
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss">
	$transitionShortDuration : 0.3s;

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
		background-color: #0094ff;
	}

	.flex-fill {
		flex       : 1 1;
		min-width  : 0;
		min-height : 0;
	}

	.lh-1 {
		line-height : 1;
	}

	input {
		background-color : white;
		border           : 1px solid #B1B1B1;
		color            : #333;
		padding          : 0.5rem;
		border-radius    : 4px;
		transition       : all $transitionShortDuration ease;

		$boxShadow       : 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
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
		color          : #0094ff;

		&:hover {
			text-decoration: underline;
			color          : #0068B7;
		}
	}
</style>
