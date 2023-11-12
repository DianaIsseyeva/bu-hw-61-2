<template>
  <div>Block's number: {{ block.number }}</div>
  <div>Block's hash: {{ block.hash }}</div>
  <button @click="$router.push(`/block/${block.number}`)">Open block's page</button>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'block',
  props: {
    block: {
      type: Object,
      requirde: true,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
