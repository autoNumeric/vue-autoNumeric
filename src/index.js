import VueAutonumeric from './components/VueAutonumeric.vue';

// Expose component to global scope
/* eslint no-undef : 0 */

export default {
    install (app) {
        app.component('vue-autonumeric', VueAutonumeric)
    }
}