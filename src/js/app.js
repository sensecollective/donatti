

//app.js
import donatti from './donatti';
import router from './router';
import Theme from './theme';

Vue.use(VueRouter);
Vue.use(VueMaterial);

Theme.init();

/**************************************
* VUE APP
**************************************/

const VueApp = new Vue({
  el: '#app',
  router,
  
  data: {
    router,
    menu: router.options.routes,
    snackbar: {
      message: 'message',
      duration: 3000
    },
    title: 'Donatti'
  },
  
  watch: {
    $route() {
      this.closeNav();
    }
  },
  
  mounted() {
    setTimeout(() => APP.init(), 500);
    this.hideLoader();
    this.$refs.snackWrap.classList.remove('hidden');
  },
  
  methods: {
    showLoader() {
      this.$refs.loader.classList.remove('hidden');
      this.$refs.content.classList.add('hidden');
    },
    hideLoader() {
      this.$refs.loader.classList.add('hidden');
      this.$refs.content.classList.remove('hidden');
    },
    closeNav() {
      this.$refs.leftSidenav.close();
    },
    toggleNav() {
      this.$refs.leftSidenav.toggle();
    },
    snack(msg, dur = 3000) {
      this.snackbar.message = msg;
      this.snackbar.duration = dur;
      if (!this.$refs.snackbar.active) this.$refs.snackbar.open();
    },
  }
});
