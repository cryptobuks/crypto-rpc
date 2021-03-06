var BitcoinRPC = require('./bitcoin');

class BtcRpc {
  constructor(config) {
    this.rpc = new BitcoinRPC(config);
  }

  cmdlineUnlock(time, cb) {
    this.rpc.cmdlineUnlock(time, cb);
  }

  sendToAddress(address, amount, cb) {
    this.rpc.sendToAddress(address, amount, cb);
  }

  async unlockAndSendToAddress(address, amount, callback, passphrase) {
    this.cmdlineUnlock(10, (err, lock) => {
      this.sendToAddress(address, amount, (err, tx) => {
        this.walletLock((lockErr) => {
          if(lockErr) {
            console.error('Unable to lock wallet');
          } else {
            console.log("Wallet locked");
          }
          callback(err, tx);
        });
      });
    });
  }


  walletLock(cb) {
    this.rpc.walletLock(cb);
  }

  getBalance(address, cb) {
    this.rpc.getWalletInfo(cb);
  }
}

module.exports = BtcRpc;
