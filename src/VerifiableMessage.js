class VerifiableMessage {
  constructor (parts, bsv = null) {
    if (bsv === null) {
      bsv = require('bsv')
      bsv.Message = bsv.Bsm
    }
    this.bsv = bsv
    const concatenated = Buffer.from(parts.join(''))
    this.message = new this.bsv.Message(concatenated)
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

  sign (keypair) {
    return this.message.sign(this.message, keypair)
  }

  verify (signature, keyAddress) {
    return this.message.verify(this.message,  signature, keyAddress)
  }
}

export { VerifiableMessage }
