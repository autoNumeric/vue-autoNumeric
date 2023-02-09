declare module 'vue-autonumeric' {
    import Vue from 'vue';

    export default class VueAutonumeric extends Vue {
        public value: number | null | string;
        public options: object | string | object[] | string[];
        public resetOnOptions: boolean;
        public placeholder: string;
        public tag: string;
    }
}
