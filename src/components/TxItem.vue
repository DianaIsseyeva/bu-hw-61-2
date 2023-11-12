<template>
  <div>
    <div>Block's number:</div>
    <router-link :to="`/block/${transaction.blockNumber}`">{{ transaction.blockNumber }}</router-link>
  </div>
  <div>Transaction's hash: {{ transaction.hash }}</div>
  <div>From: {{ transaction.from }}</div>
  <div>To: {{ transaction.to }}</div>
  <div>Ether send: {{ transaction.value }}</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'tx-item',
  data() {
    return {
      transaction: {},
    };
  },
  props: {
    txHash: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      getTransaction: 'getTransaction',
    }),
  },
  async mounted() {
    this.transaction = await this.getTransaction(this.txHash);
  },
  watch: {
    async txHash() {
      this.transaction = await this.getTransaction(this.txHash);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
