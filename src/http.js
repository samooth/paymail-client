class Http {
  constructor (fetch) {
    this.fetch = fetch
  }

  async get (url) {
    return this._basicRequest(url)
  }

  async postJson (url, body) {
    return this._basicRequest(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }

  async _basicRequest (url, options = { timeOut:30000}) {
    if (!options?.timeOut) options.timeOut=30000
    return Promise.race([
      this.fetch(url, {
        ...options,
        credentials: 'omit',
      }), 
     new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), options.timeOut))
    ])
  }
};

export { Http }
