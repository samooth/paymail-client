// import { DnsOverHttps } from "./dns-over-https"

class DnsClient {
  constructor (dns, doh) {
    this.dns = dns
    this.doh = doh
  }

  async checkSrv (aDomain) {
    return new Promise((resolve, reject) => {
      this.dns.resolveSrv(`_bsvalias._tcp.${aDomain}`, async (err, result) => {
        try {
          if (err && (err.code === 'ENODATA' || err.code === 'ENOTFOUND')) {
            return resolve({
              domain: aDomain,
              port: 443,
              isSecure: true
            })
          }
          if (err) {
            return reject(err)
          }

          const { name: domainFromDns, port, isSecure } = result[0]
          resolve({
            domain: domainFromDns,
            port,
            isSecure: this.checkDomainIsSecure(domainFromDns, aDomain) || isSecure
          })
        } catch (err) {
          return reject(err)
        }
      })
    }).then(result => {
      if (result.isSecure) {
        return result
      } else {
        return this.validateDnssec(aDomain)
      }
    }, (err) => {
      console.error(err)
      return err
    })
  }

  checkDomainIsSecure (srvResponseDomain, originalDomain) {
    if (this.domainsAreEqual(srvResponseDomain, originalDomain)) {
      return true
    } else if (this.responseIsWwwSubdomain(srvResponseDomain, originalDomain)) {
      return true
    } else if (this.domainsAreEqual('localhost', srvResponseDomain)) {
      return true
    } else {
      return false
    }
  }

  responseIsWwwSubdomain (srvResponseDomain, originalDomain) {
    return this.domainsAreEqual(srvResponseDomain, `www.${originalDomain}`)
  }

  isHandcashDomain (aDomain) {
    return this.domainsAreEqual('handcash.io', aDomain)
  }

  async validateDnssec (aDomain) {
    const dnsResponse = await this.doh.queryBsvaliasDomain(aDomain)
    if (dnsResponse.Status !== 3 || !dnsResponse.Authority) {
      throw new Error('Insecure domain.')
    }
    const data = dnsResponse.Answear[0].data.split(' ')
    const port = data[2]
    const responseDomain = data[3]
    if (!dnsResponse.AD && !this.domainsAreEqual(aDomain, responseDomain)) {
      throw new Error('Insecure domain.')
    }
    return {
      port,
      domain: responseDomain,
      isSecure: dnsResponse.AD
    }
  }

  domainsAreEqual (domain1, domain2) {
    return domain1.replace(/\.$/, '') === domain2.replace(/\.$/, '')
  }
}

export { DnsClient }
