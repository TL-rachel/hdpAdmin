import SearchForm from './SearchForm';
const components = [
    SearchForm
];
const install = (Vue) => {
    components.map(component => {
        Vue.component(component.name, component);
    });
};
export default {
    install
};
