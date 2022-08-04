import { DnsOverHttps } from './dns-over-https'

class BrowserDns {
  constructor (fetch) {

    //https://cloudflare-dns.com/dns-query
    //https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-json/

    //https://dns.google.com/resolve
    //https://developers.google.com/speed/public-dns/docs/doh/json

    this.doh = new DnsOverHttps(fetch, { baseUrl: 'https://cloudflare-dns.com/dns-query' })
  }

  async resolveSrv (aDomain, aCallback) {
    try {
      const response = await this.doh.resolveSrv(aDomain)


      if (response.Status === 0 && response.Answer) {
        const data = response.Answer.map(record => {

          const [priority, weight, port, name] = record.data.split(' ')

          return {
            priority,
            weight,
            port,
            name,
            isSecure: response.AD
          }
        })
        aCallback(null, data)
      } else if (response.Status === 0 && !response.Answer) {
        aCallback({ code: 'ENODATA' })
      } else {
        aCallback(new Error('error during dns query'))
      }
    } catch (e) {
      aCallback(e)
    }
  }
}

export { BrowserDns }
