/* eslint-disable no-unused-vars */
import { ABI } from '@/contracts/Example.abi';
import { bytecode } from '@/contracts/Example.bin';
import { createStore } from 'vuex';
import Web3 from 'web3';
const ethers = require('ethers');
const web3 = new Web3('wss://eth-goerli.g.alchemy.com/v2/FY02V0D1h9LCi7Gox4qpJHREU5tNAIaq');
const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-goerli.g.alchemy.com/v2/FY02V0D1h9LCi7Gox4qpJHREU5tNAIaq'
);
export default createStore({
  state: {
    provider: {},
    web3Wallet: {},
    wallet: {
      address: '',
      chain: '',
      chainId: '',
    },
    contractAddress: '',
  },
  getters: {},
  mutations: {
    addBlock(state, newBlock) {
      state.blocks.unshift(newBlock);
    },
  },
  actions: {
    // async newBlockHeaders({ commit }) {
    //   web3.eth.subscribe('newBlockHeaders').on('data', block => {
    //     let newBlock = {
    //       number: block.number,
    //       hash: block.hash,
    //     };
    //     commit('addBlock', newBlock);
    //   });
    // },
    async getBlock({ commit }, blockNumberOrHash) {
      if (!ethers.utils.isBytesLike(blockNumberOrHash)) {
        blockNumberOrHash = Number(blockNumberOrHash);
      }
      return await this.state.provider.getBlock(blockNumberOrHash);
    },
    async getTransaction(txHash) {
      return await this.state.provider.getTransaction(txHash);
    },
    async connectionWallet({ state }) {
      if (typeof window.ethereum !== 'undefined') {
        console.log('Ethereum client installed!');
        // eslint-disable-next-line no-undef
        if (ethereum.isMetaMask === true) {
          console.log('Metamask installed!');
          // eslint-disable-next-line no-undef
          if (ethereum.isConnected() !== true) {
            console.log('Metamask is not connected!');
            // eslint-disable-next-line no-undef
            await ethereum.enable();
          }
          console.log('Metamask connected!');
        } else {
          alert('Metamask is not installed!');
        }
      } else {
        alert('Ethereum client is not installed!');
      }
      // connect account
      // eslint-disable-next-line no-undef
      await ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        state.wallet.address = accounts[0];
        console.log(`Account ${state.wallet.address} connected`);
      });
      //create provider
      // eslint-disable-next-line no-undef
      state.provider = new ethers.providers.Web3Provider(ethereum);
      // get chain's parametres
      console.log(state.provider);
      let network = await provider.getNetwork();
      state.wallet.chainId = network.chainId;
      state.wallet.chain = network.name;

      // eslint-disable-next-line no-undef
      ethereum.on('accountsChanged', accounts => {
        state.wallet.address = accounts[0];
        console.log(`accounts changed to ${state.wallet.address}`);
      });
      // eslint-disable-next-line no-undef
      ethereum.on('chainChanged', async chainId => {
        // eslint-disable-next-line no-undef
        //create provider
        // eslint-disable-next-line no-undef
        state.provider = new ethers.providers.Web3Provider(ethereum);
        // get chain's parametres
        let network = await provider.getNetwork();
        state.wallet.chainId = network.chainId;
        state.wallet.chain = network.name;
        console.log(`chainID changed to ${state.wallet.chainId}`);
        console.log(`chain changed to ${state.wallet.chain}`);
      });
    },
    async sendTransaction({ state }, args) {
      let [to, value] = args;
      value = ethers.BigNumber.from(value);
      value = value.toHexString();
      // eslint-disable-next-line no-undef
      await ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: state.wallet.address,
              to: to,
              value: value,
            },
          ],
        })
        .then(hash => {
          console.log(`Tx hash ${hash}`);
        });
    },
    async deployContract({ state }) {
      // eslint-disable-next-line no-undef
      await ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: state.wallet.address,
              data: bytecode,
            },
          ],
        })
        .then(hash => {
          console.log(`Tx hash ${hash}`);
        });
    },
    async setNumber({ state }, contractAddress, number) {
      let iface = new ethers.utils.Interface(ABI);
      let txData = iface.encodeFunctionData('setNumber', [number]);

      // eslint-disable-next-line no-undef
      ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: state.wallet.address,
              to: contractAddress,
              data: txData,
            },
          ],
        })
        .then(hash => {
          console.log(`Tx hash ${hash}`);
        });
    },
    async getNumber({ state }, contractAddress) {
      let myContract = new ethers.Contract(contractAddress, ABI, state.provider);
      let result = await myContract.getNumber();
      return result;
    },

    // async addToData({ state }, contractAddress, number) {
    //   let myContract = new state.web3Wallet.eth.Contract(ABI, contractAddress);
    //   let txData = myContract.methods.addToData(number).encodeABI();
    //   // eslint-disable-next-line no-undef
    //   ethereum
    //     .request({
    //       method: 'eth_sendTransaction',
    //       params: [
    //         {
    //           from: state.wallet.address,
    //           to: contractAddress,
    //           data: txData,
    //         },
    //       ],
    //     })
    //     .then(hash => {
    //       console.log(`Tx hash ${hash}`);
    //     });
    // },
    // async getData({ state }, contractAddress) {
    //   let myContract = new state.web3Wallet.eth.Contract(ABI, contractAddress);
    //   // eslint-disable-next-line no-undef
    //   let number = await myContract.methods.getData().call({ from: state.wallet.address });
    //   return number;
    // },
  },
  modules: {},
});
