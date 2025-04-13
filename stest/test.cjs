const { PaymailClient, VerifiableMessage } = require('../dist/paymail-client.umd.cjs')

const bsv = require('bsv2')

const client = new PaymailClient()

const somePaymailAddress = 'bsvdirect@handcash.io'
const senderPrivateKey = bsv.PrivKey.fromRandom()

let ThePubKey

(async () => {
  // Sign & Verify

  const msgSig = new VerifiableMessage(['samooth@handcash.io']).sign(senderPrivateKey)

  const verified = new VerifiableMessage(['samooth@handcash.io']).verify(msgSig, bsv.Address.fromPrivKey(senderPrivateKey))

  console.log(msgSig, verified)

  // You can look for someones public identity key.

  await client.getPublicKey(somePaymailAddress).then(pubkey => {
    console.log(`Current public key for ${somePaymailAddress} is ${pubkey}`)
    ThePubKey = pubkey
  })

  await client.getPublicProfile(somePaymailAddress).then(profile => {
    console.log(`Profile of ${somePaymailAddress}:`)
    console.log(`Avatar: ${profile.avatar}`)
    console.log(`Name: ${profile.name}`)
  })

  console.log(senderPrivateKey.toString())
  await client.getOutputFor(somePaymailAddress, {
    senderHandle: 'bsvdirect@handcash.io',
    amount: 10000, // Amount in satoshis
    senderName: 'Mr. Sender',
    purpose: 'Pay for your services.',
    pubkey: ThePubKey
  }, senderPrivateKey).then(output => {
    console.log(`Now I can send money to ${somePaymailAddress} using this output: ${output}`)
  })

  console.log(senderPrivateKey.toString())
  await client.getOutputFor('samooth@volt.id', {
    senderHandle: 'bsvdirect@handcash.io',
    amount: 10000, // Amount in satoshis
    senderName: 'Mr. Sender',
    purpose: 'Pay for your services.',
    pubkey: ThePubKey
  }, senderPrivateKey).then(output => {
    console.log(`Now I can send money to samooth@volt.id using this output: ${output}`)
  }).catch((e) => {
    console.log('There was an error')
  })

  /*
    // P2P Payments
        let p2p = await client.getP2pPaymentDestination(somePaymailAddress, 1000);
        console.log(p2p)
        //sendRawTx (somePaymailAddress, hexTransaction, p2p.reference, metadata = {})
    */
})()
