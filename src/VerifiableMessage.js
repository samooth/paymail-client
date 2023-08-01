class VerifiableMessage {
  constructor (parts, bsv = null) {
    if (bsv === null) {
      bsv = require('bsv')
    }
    this.bsv = bsv
    const concatenated = Buffer.from(parts.join(''))
    this.message = new bsv.Bsm(concatenated)
  }

  static forBasicAddressResolution ({
    senderHandle,
    amount,
    dt,
    purpose
  }) {
    if (dt.toISOString) {
      dt = dt.toISOString()
    }

    return new VerifiableMessage([
      senderHandle,
      amount || '0',
      dt,
      purpose
    ])
  }

  sign (privateKey) {
    return this.bsv.Bsm.sign(this.message.messageBuf, this.bsv.KeyPair.fromPrivKey(privateKey))
  }

  verify (signature, keyAddress) {
    return this.bsv.Bsm.verify(this.message.messageBuf, signature, keyAddress)
  }
}

export { VerifiableMessage }
