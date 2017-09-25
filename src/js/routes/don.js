

import DonForm from '../components/don-form';

export default {
  
  components: {
    'don-form': DonForm
  },
  
  data() {
    return {
      params: [],
      balance: 0,
      percent: 0,
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
      
      this.updateBalance();
      
      //force update
      this.$forceUpdate();
    },
    async contribute() {
      const tx = await APP.currentDon.pay(25, { from: APP.account });
      this.$root.snack('Contribution Made');
      this.updateBalance();
    },
    async updateBalance() {
      this.balance = (await APP.currentDon.balance.call()).toNumber();
      this.percent = this.balance / this.params[5].toNumber() * 100;
      
      console.log(this.percent);
    }
    //jshint ignore: end
  },
  
  template: `
    <div class="page">
      <md-layout md-align="center" :md-gutter="true">
        <md-layout md-flex="80" md-align="center">
            
          <md-layout md-flex="100" md-align="center">
            <h2>{{ this.params[0] }}</h2>
          </md-layout>
            
          <md-layout md-flex="50" md-flex-xsmall="90" md-align="center">
            <md-whiteframe elevation="1" class="width-100 padding-16">
              <md-progress md-theme="second" :md-progress="percent"></md-progress>
            </md-whiteframe>
            
            <md-button class="md-raised" v-on:click="contribute">Contribute</md-button>
            
          </md-layout>
        
        </md-layout>
      </md-layout>
    </div>
  `
};