import VueAutonumeric from './components/VueAutonumeric.vue';

// Expose component to global scope
/* eslint no-undef : 0 */
if (typeof window !== 'undefined' && window.Vue) {
    Vue.component('vue-autonumeric', VueAutonumeric);
}

export { VueAutonumeric };

export default {
    install (app) {
        app.component('vue-autonumeric', VueAutonumeric)
    }
}