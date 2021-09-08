const Web3 = require("web3");
let provider = null;
const infuraLink =
  "https://rinkeby.infura.io/v3/b5ead668b0f543bf918b2b6a7cc74135";

try {
  console.log('setting up web3');
  provider = window.ethereum;
} catch (error) {
  console.log('setting up web3 - failed; going for alternate solution');
  provider = new Web3(new Web3.providers.HttpProvider(infuraLink));
  console.log('web3 setup done.');
  console.error(error);
}

const web3 = new Web3(provider);

export default web3;
