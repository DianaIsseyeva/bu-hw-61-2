<template>
  <button @click="$router.push('/')">Main</button>
  <input v-model="blockNumberOrHash" placeholder="enter block's number or hash" />
  <button @click="$router.push(`/block/${this.blockNumberOrHash}`)">Open</button>
  <input v-model="txHash" placeholder="enter transaction's hash" />
  <button @click="$router.push(`/transaction/${this.txHash}`)">Open</button>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'navbar',
  data() {
    return {
      blockNumberOrHash: '',
      txHash: '',
    };
  },
};
</script>

<style></style>
