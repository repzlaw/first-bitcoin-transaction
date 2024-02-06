const bitcoin = require('bitcoinjs-lib');
const crypto = require('crypto');

// Function to generate redeem script
function generateRedeemScript(preImage) {
  const lockHex = crypto.createHash('sha256').update(preImage, 'utf8').digest('hex');
  return `OP_SHA256 ${lockHex} OP_EQUAL`;
}

// Function to derive address from redeem script
function deriveAddress(redeemScript) {
  const scriptBuffer = bitcoin.script.fromASM(redeemScript);
  const scriptPubKey = bitcoin.payments.p2sh({ redeem: { output: scriptBuffer } }).output;
  return bitcoin.address.fromOutputScript(scriptPubKey, bitcoin.networks.testnet);
}

// Function to construct a transaction that sends Bitcoins to the address
function constructTransaction(address, amount) {
  const txb = new bitcoin.Transaction(bitcoin.networks.testnet);
  txb.addInput('previousTxHash', 0); 
  txb.addOutput(address, amount);
  txb.sign(0, bitcoin.ECPair.fromWIF('privateKey')); 
  return txb.build().toHex();
}

// Function to construct a transaction that spends from the above transaction
function spendTransaction(previousTxHex, unlockingScript, mainOutput, changeOutput) {
  const txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet);
  const tx = bitcoin.Transaction.fromHex(previousTxHex);
  // Add input from the previous transaction
  txb.addInput(tx.getId(), 0);

  // Add main output
  txb.addOutput(mainOutput.address, mainOutput.amount);

  // Add change output
  txb.addOutput(changeOutput.address, changeOutput.amount);

  // Sign the transaction
  txb.sign(0, bitcoin.ECPair.fromWIF('privateKey'));

  return txb.build().toHex();
}


const preImage = 'Btrust Builders';
const redeemScript = generateRedeemScript(preImage);
const address = deriveAddress(redeemScript);

console.log(address);
const txHex = constructTransaction(address, 100000);
// const mainOutput = { address: 'recipientAddress', amount: 90000 }; // Replace 'recipientAddress' with the recipient's address
// const changeOutput = { address: 'changeAddress', amount: 10000 }; // Replace 'changeAddress' with the change address
// const spendTxHex = spendTransaction(txHex, 'unlockingScript', mainOutput, changeOutput);

