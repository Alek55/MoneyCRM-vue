<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small green lighten-2" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div class="row" v-else>
      <HomeBill
              :rates="currency.rates"
      />
      <HomeCurrency
              :rates="currency.rates"
              :date="currency.date"
      />
    </div>
  </div>
</template>

<script>
  import HomeCurrency from "../components/HomeCuurency";
  import HomeBill from "../components/HomeBill";

  export default {
    name: 'home',
    data: () => ({
      loading: true,
      currency: null //валюты
    }),
    async mounted() {
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    },
    components: {
      HomeCurrency, HomeBill
    },
    methods: {
      async refresh() {
        this.loading = true
        this.currency = await this.$store.dispatch('fetchCurrency')
        this.loading = false
      }
    }
  }
</script>
