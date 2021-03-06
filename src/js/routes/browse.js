

export default {

  data() {
    return {
      dons: [],
      test: true,
      loaded: false
    };
  },

  created() {
    this.$root.title = 'Recent Dons';
  },
  
  mounted() {
    this.$root.showLoader(true);
    if (!APP.userDonsLoaded) this.$root.snack('Loading Dons');
    APP.getPublicDons(() => {
      this.dons = APP.publicDonList;
      this.loaded = true;
      this.$root.hideLoader(true);
      this.$forceUpdate();
    });
  },

  methods: {

  },

  template: `

    <md-table v-if="dons.length > 0">
      <md-table-header>
        <md-table-row>
          <md-table-head>Name</md-table-head>
          <md-table-head>ID</md-table-head>
          <md-table-head>Raised</md-table-head>
          <md-table-head>Goal</md-table-head>
          <md-table-head>Start</md-table-head>
          <md-table-head>End</md-table-head>
        </md-table-row>
      </md-table-header>
    
      <md-table-body>
        <md-table-row v-for="id in dons">
          <md-table-cell>
            <router-link :to="'/don/' + id">{{ APP.donParamsObj[id].name }}</router-link>
          </md-table-cell>
          <md-table-cell>{{ id }}</md-table-cell>
          <md-table-cell>{{ APP.donCollected[id] }}</md-table-cell>
          <md-table-cell>{{ APP.donParamsObj[id].goal }}</md-table-cell>
          <md-table-cell>{{ APP.donParamsObj[id].start }}</md-table-cell>
          <md-table-cell>{{ APP.donParamsObj[id].end }}</md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
    
    
    <div v-else-if="loaded">
      <p>You currently have no Dons, try creating a Don by clicking below</p>
      <md-layout md-align="center">
        <router-link to="/create"><md-button class="md-raised">Create</md-button></router-link>
      </md-layout>
    </div>
  `
};