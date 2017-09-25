

import DonForm from '../components/don-form';

export default {
  
  components: {
    'don-form': DonForm
  },
  
  data() {
    return {
      params: []
    };
  },
  
  watch: {
    '$route.params.id'() { this.load(); }
  },
  
  created() {
    //jshint ignore: start
    APP.updateDons(this.load);
    //jshint ignore: end
  },
  
  methods: {
    //jshint ignore: start
    async load(refetch) {
      const { id } = this.$route.params;
      if (!id) return;
      const don = APP.currentDon = APP.donMap[id];
      if (!don) return;
      
      //set params
      this.params = APP.donParams[id];
      if (refetch) this.params = APP.donParams[id] = await don.getParameters.call();
      
      //force update
      this.$forceUpdate();
    },
    async submit(params) {
      const tx = await APP.currentDon.update(...params, { from: APP.account });
      this.$root.snack('Donatti Updated');
      this.load(true);
    }
    //jshint ignore: end
  },
  
  template: `
    <div class="page">
      <md-layout md-align="center" :md-gutter="true">
        <md-layout md-flex="80" md-align="center">
            
          <md-layout md-flex="100" md-align="center">
            <h2>Donatti</h2>
          </md-layout>
            
          <md-layout md-flex="50" md-flex-xsmall="90" md-align="center">
            <md-whiteframe elevation="1" class="width-100 padding-16">
              <don-form :parent="this" :params="params"></don-form>
            </md-whiteframe>
          </md-layout>
        
        </md-layout>
      </md-layout>
    </div>
  `
};