<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <button @click="connectionWallet">Connect Metamask</button>
    <div>User's address: {{ $store.state.wallet.address }}</div>
    <div>Chain's name: {{ $store.state.wallet.chain }}</div>
    <div>Chain's id: {{ $store.state.wallet.chainId }}</div>
  </div>
  <div>
    <div>
      <input v-model="to" placeholder="enter recipient address" />
    </div>
    <div>
      <input v-model="value" placeholder="enter value" />
    </div>
    <button @click="sendTx">Send</button>
  </div>
  <div>
    <button @click="deployContract">Deploy contract</button>
  </div>
  <div>
    <div>
      <input v-model="number" placeholder="enter number" />
    </div>
    <div>
      <input v-model="cAddress" placeholder="enter address" />
    </div>
    <button @click="sNumber">set</button>
  </div>
  <div>
    <div>
      <input v-model="cAddress" placeholder="enter address" />
    </div>
    <button @click="gNumber">get</button>
    Number = {{ ans }}
  </div>

  <div>
    <div>
      <input v-model="number" placeholder="enter number" />
    </div>
    <div>
      <input v-model="cAddress" placeholder="enter address" />
    </div>
    <button @click="sData">set</button>
  </div>
  <div>
    <div>
      <input v-model="cAddress" placeholder="enter address" />
    </div>
    <button @click="gData">get</button>
    Number = {{ data }}
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      to: '',
      value: '',
      number: '',
      ans: '',
      cAddress: '',
      data: [],
    };
  },
  mounted() {
    // this.connectionWallet();
  },
  methods: {
    ...mapActions({
      connectionWallet: 'connectionWallet',
      sendTransaction: 'sendTransaction',
      deployContract: 'deployContract',
      setNumber: 'setNumber',
      getNumber: 'getNumber',
      addToData: 'addToData',
      getData: 'getData',
    }),
    async sendTx() {
      await this.sendTransaction(this.to, this.value);
      this.to = '';
      this.value = '';
    },
    async sNumber() {
      await this.setNumber([this.cAddress, this.number]);
    },
    async gNumber() {
      this.ans = await this.getNumber(this.cAddress);
    },
    async sData() {
      await this.addToData([this.cAddress, this.number]);
    },
    async gData() {
      this.data = await this.getData(this.cAddress);
    },
  },
};
</script>

<style></style>
// 0xd5a42d3f377Fc5f1aBEF7e6a49F58B811ae41805
