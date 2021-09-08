import lottery from "./lottery";
import web3 from "./web3";

const Helpers = {
  getOwner: async () => {
    return await lottery.methods.manager().call();
  },
  getPlayers: async () => {
    return await lottery.methods.getPlayers().call();
  },
  getTotalEther: async () => {
    return web3.utils.fromWei(
      await web3.eth.getBalance(lottery.options.address),
      "ether"
    );
  },
  getDefaultAccount: async () => {
    const accounts =
      (await web3.eth.getAccounts()) || (await web3.eth.requestAccounts());
    console.log(await web3.eth.getAccounts());
    console.log(await web3.eth.requestAccounts());

    return accounts[0];
  },
  Lottery: {
    Enter: async (from: String, value: String) => {
      const toWeiValue = web3.utils.toWei(value, "ether");
      const objToSend = { from, value: toWeiValue };
      return await lottery.methods.enter().send(objToSend);
    },
    PickWinner: async () => {
      const userAccount = await Helpers.getDefaultAccount();
      await lottery.methods.pickWinner().send({
        from: userAccount,
      });
    },
    getTheWinner: async () => {
      return await lottery.methods.theWinner().call();
    },
  },
};

export default Helpers;
