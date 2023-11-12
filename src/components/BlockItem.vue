<template>
  <div>Block's number: {{ block.number }}</div>
  <div>Block's hash: {{ block.hash }}</div>
  <div>Gas: {{ block.gasUsed }}</div>
  <div>Price: {{ block.baseFeePerGas }}</div>
  <div>Transactions:</div>
  <router-link v-for="hash in block.transactions" :to="`/transaction/${hash}`" :key="hash">
    <div>{{ hash }}</div>
  </router-link>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'block-item',
  data() {
    return {
      block: {},
    };
  },
  props: {
    blockNumberOrHash: {
      type: String,
      requirde: true,
    },
  },
  methods: {
    ...mapActions({
      getBlock: 'getBlock',
    }),
  },
  async mounted() {
    this.block = await this.getBlock(this.blockNumberOrHash);
  },
  watch: {
    async blockNumberOrHash() {
      this.block = await this.getBlock(this.blockNumberOrHash);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
