// import mount      from 'cypress-vue-unit-test';
const mountVue = require('cypress-vue-unit-test');
// import AutoNumeric    from '../../node_modules/autonumeric/dist/autoNumeric'; //FIXME Finish this
import VueAutonumeric from '../../src/components/VueAutonumeric.vue'; //FIXME Fails

describe('Declarative rendering', () => {
    // Vue code from https://vuejs.org/v2/guide/#Declarative-Rendering
    const template = `<div id="app">{{ message }}</div>`;

    const data = {
        message: 'Hello Vue!',
    };

    // that's all you need to do
    beforeEach(mountVue({ template, data }));

    it('shows hello', () => {
        cy.contains('Hello Vue!');
    });

    it('changes message if data changes', () => {
        // mounted Vue instance is available under Cypress.vue
        Cypress.vue.message = 'Vue rocks!';
        cy.contains('Vue rocks!');
    });
});

describe('VueAutonumeric.vue', () => {
    // beforeEach(mountVue(VueAutonumeric));

    // fit('should generate an input by default', () => {
    //     const wrapper = mountVue(VueAutonumeric);
    //     expect(wrapper.is('input')).toBe(true);
    //     expect(wrapper.attributes().type).toEqual('text');
    //     expect(wrapper.attributes().value).toEqual('');
    //     expect(wrapper.isEmpty()).toBe(true);
    // });

    /*
    it('should correctly be formatted', () => {
        const wrapper = mount(VueAutonumeric, {
            propsData: {
                options: 'euro',
                value  : 1234567.78,
            },
        });
        expect(wrapper.is('input')).toBe(true);
        expect(wrapper.vm.anElement.rawValue).toEqual('1234567.78');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('1.234.567,78 €');
    });

    it('should correctly be formatted after its value is modified by a user interaction', () => {
        const wrapper = mount(VueAutonumeric, {
            propsData: {
                options: 'euro',
                value  : 1234567.78,
            },
        });
        expect(wrapper.vm.anElement.rawValue).toEqual('1234567.78');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('1.234.567,78 €');
        const input = wrapper.find('input');
        expect(input.element.value).toEqual('1.234.567,78 €');

        // Test inputting a number
        input.trigger('click'); //FIXME Is this really needed? Isn't the focus already on the input since it's the generated DOM element?
        input.trigger('keydown.home');
        input.trigger('keydown', { //FIXME Fails (see https://github.com/vuejs/vue-test-utils/issues/484)
            key: '1',
            keyCode: 49,
            which: 49,
        });
        expect(input.element.value).toEqual('11.234.567,78 €');
        expect(wrapper.vm.anElement.rawValue).toEqual('11234567.78');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('11.234.567,78 €');
    });

    it('should correctly be formatted after its value is modified without a user interaction, via setting the input `value`', () => {
        const wrapper = mount(VueAutonumeric, {
            propsData: {
                options: 'euro',
                value  : 1234567.78,
            },
        });
        expect(wrapper.vm.anElement.rawValue).toEqual('1234567.78');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('1.234.567,78 €');

        // Modify the input value programmatically
        const input = wrapper.find('input');
        input.element.value = 221100;
        expect(wrapper.element.value).toEqual('221.100,00 €'); //FIXME Fails : received 221100; this is not formatted and the `rawValue` is not updated
        expect(wrapper.vm.value).toEqual('221100'); //FIXME Fails
        expect(wrapper.vm.anElement.rawValue).toEqual('221100'); //FIXME Fails
        expect(wrapper.vm.anElement.getFormatted()).toEqual('221.100,00 €');
    });

    it('should correctly be formatted after its value is modified without a user interaction, via props', () => {
        const wrapper = mount(VueAutonumeric, {
            propsData: {
                options: 'euro',
                value  : 1234567.78,
            },
        });
        expect(wrapper.vm.anElement.rawValue).toEqual('1234567.78');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('1.234.567,78 €');

        wrapper.setProps({ value: '221100' });
        expect(wrapper.vm.value).toEqual('221100');
        expect(wrapper.element.value).toEqual('221.100,00 €');
        expect(wrapper.vm.anElement.rawValue).toEqual('221100');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('221.100,00 €');
    });

    it('should correctly be formatted after multiple option updates', () => {
        const wrapper = mount(VueAutonumeric, {
            propsData: {
                options: 'euro',
                value  : 1234567.78,
            },
        });
        expect(wrapper.vm.anElement.rawValue).toEqual('1234567.78');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('1.234.567,78 €');

        wrapper.setProps({ options: 'dollar' });
        expect(wrapper.vm.anElement.rawValue).toEqual('1234567.78');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('$1,234,567.78');

        wrapper.setProps({ options: 'euro' });
        expect(wrapper.vm.anElement.rawValue).toEqual('1234567.78');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('1.234.567,78 €');

        wrapper.setProps({ options: ['euro', { currencySymbol: '#' }] });
        expect(wrapper.vm.anElement.rawValue).toEqual('1234567.78');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('1.234.567,78#');
    });

    it('should correctly set the decimal place precision when updating the options, then the value', () => {
        const wrapper = mount(VueAutonumeric, {
            propsData: {
                options: 'euro',
                value  : 1234567.7812,
            },
        });
        expect(wrapper.vm.anElement.rawValue).toEqual('1234567.78');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('1.234.567,78 €');

        wrapper.setProps({ options: 'percentageEU3dec' });
        expect(wrapper.vm.anElement.rawValue).toEqual('1234567.78');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('1.234.567.780,000 %'); //FIXME Fails

        wrapper.setProps({ value: 0.00123456 }); //FIXME Fails
        expect(wrapper.vm.anElement.rawValue).toEqual('0.001234');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('0,123 %');
    });

    it('should save the maximal `decimalPlaces` option between options updates in order to keep the correct precision', () => {
        const wrapper = mount(VueAutonumeric, {
            propsData: {
                options: 'euro',
                value  : 221456.72,
            },
        });
        expect(wrapper.vm.anElement.rawValue).toEqual('221456.72');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('221.456,72 €');

        wrapper.setProps({ options: ['dollar', { decimalPlaces: 5 }] });
        expect(wrapper.vm.anElement.rawValue).toEqual('221456.72');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('$221,456.72000');

        // Then modify the decimal places
        const input = wrapper.find('input');
        input.trigger('click'); //FIXME Is this really needed? Isn't the focus already on the input since it's the generated DOM element?
        input.trigger('keydown.end');
        input.trigger('keydown.left');
        input.trigger('keydown.left');
        input.trigger('keydown.left'); // Position ourselves here: '$221,456.72|000'
        input.trigger('keydown', { //FIXME Fails (see https://github.com/vuejs/vue-test-utils/issues/484)
            key: '8',
            keyCode: 56,
            which: 56,
        });
        input.trigger('keydown', {
            key: '2',
            keyCode: 50,
            which: 50,
        });
        input.trigger('keydown', {
            key: '2',
            keyCode: 50,
            which: 50,
        });
        expect(wrapper.vm.anElement.rawValue).toEqual('221456.72882');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('$221,456.72882');

        // Switch back to option that have a lesser number of decimal places
        wrapper.setProps({ options: ['euro'] });
        expect(wrapper.vm.anElement.rawValue).toEqual('221456.72882');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('221.456,72 €');

        // ...then finally switch back to the option with 5 decimal places; that data should not have been 'deleted' when switching to the previous options
        wrapper.setProps({ options: ['dollar', { decimalPlaces: 5 }] });
        expect(wrapper.vm.anElement.rawValue).toEqual('221456.72882');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('$221,456.72882');
    });

    it('should correctly update the options and value when using a single object to change those two at the same time', () => {
        // It should correctly set the decimal place precision during a combined option and value update
        let obj = {
            val    : 123456.78,
            options: 'euro',
        };

        const wrapper = mount(VueAutonumeric, {
            propsData: {
                options: obj.options,
                value  : obj.val,
            },
        });
        expect(wrapper.vm.anElement.rawValue).toEqual('123456.78');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('123.456,78 €');

        // Update the options and value at the same time:
        obj = {
            options : 'percentageEU3dec',
            val     : 0.00123456,
        };
        expect(wrapper.vm.anElement.rawValue).toEqual('0.001234'); //FIXME Fails
        expect(wrapper.vm.anElement.getFormatted()).toEqual('1,234 %');

        // And back the original options/values
        obj.val = 123456.78;
        obj.options = 'euro';
        expect(wrapper.vm.anElement.rawValue).toEqual('123456.78');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('123.456,78 €');
    });

    it('should be generated with the `id` and `name` passed as attributes', () => {
        const id = 'theIdToUse';
        const name = 'theInputName';
        const wrapper = mount(VueAutonumeric, {
            attrs: {
                id,
                name,
            },
        });
        expect(wrapper.is('input')).toBe(true);
        expect(wrapper.attributes().id).toEqual(id); //FIXME Fails (see https://github.com/vuejs/vue-test-utils/issues/483)
        expect(wrapper.attributes().name).toEqual(name); //FIXME Fails
    });

    it('should be generated with the `placeholder` attribute passed as a prop', () => {
        const placeholderText = 'This is my placeholder';
        const wrapper = mount(VueAutonumeric, {
            propsData: {
                placeholder: placeholderText,
            },
        });
        expect(wrapper.is('input')).toBe(true);
        expect(wrapper.attributes().placeholder).toEqual(placeholderText);
    });

    it('should correctly generate a `div` element when using the `tag` prop, and set the `contenteditable` attribute', () => {
        const wrapper = mount(VueAutonumeric, {
            propsData: {
                tag: 'div',
            },
        });
        expect(wrapper.is('input')).toBe(false);
        expect(wrapper.is('div')).toBe(true);
        expect(wrapper.attributes().contenteditable).toBeTruthy();
    });

    it('should correctly generate a `p` element when using the `tag` prop, and set the `contenteditable` attribute', () => {
        const wrapper = mount(VueAutonumeric, {
            propsData: {
                tag: 'p',
            },
        });
        expect(wrapper.is('input')).toBe(false);
        expect(wrapper.is('p')).toBe(true);
        expect(wrapper.attributes().contenteditable).toBeTruthy();
    });

    it('should bubble up the AutoNumeric events to the parent', () => {
        const wrapper = mount(VueAutonumeric, {
            propsData: {
                options: 'euro',
                value  : 1234567.78,
            },
        });
        expect(wrapper.vm.anElement.rawValue).toEqual('1234567.78');
        expect(wrapper.vm.anElement.getFormatted()).toEqual('1.234.567,78 €');
        const input = wrapper.find('input');
        expect(input.element.value).toEqual('1.234.567,78 €');

        // Test inputting a number
        input.trigger('click'); //FIXME Is this really needed? Isn't the focus already on the input since it's the generated DOM element?
        input.trigger('keydown.home');
        input.trigger('keydown', { //FIXME Fails (see https://github.com/vuejs/vue-test-utils/issues/484)
            key: '1',
            keyCode: 49,
            which: 49,
        });
        //FIXME Finish this: How to test that the native AutoNumeric events are correctly bubbling up?
        expect(wrapper.emittedByOrder()[2].args[0]).toEqual('11234567.78'); //FIXME Fails
        expect(wrapper.vm.anElement.getFormatted()).toEqual('11.234.567,78 €');
    });

    xit('should correctly format the input value when a shared v-model is modified by another instance of VueAutonumeric', () => { //FIXME Finish this
        const wrapper = mount(VueAutonumeric);
        expect(wrapper.is('input')).toBe(true);
    });
    */

    //FIXME Finish this: test the `resetOnOptions` and `tag` props
});
