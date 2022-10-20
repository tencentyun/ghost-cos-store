const COS = require('cos-nodejs-sdk-v5')
const BaseStore = require('ghost-storage-base')

class CosStore extends BaseStore {
  
  constructor (config) {
    super(config)

    this.baseParams = {
      Bucket: config.Bucket,
      Region: config.Region
    }

    this.basePath = config.BasePath || '';

    this.client = new COS({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      UserAgent: 'ghost-cos-store'
    })
    
  }

  exists (file) {
    return new Promise((resolve, reject) => {
      this.client.headObject({
        ...this.baseParams,
        Key: this.basePath + file.name
      }, (err, data) => {
        if(err) {
          if(err.code == 404) {
            resolve(false)
          }else {
            reject(this.errorParser(err))  
          }          
        }else {
          resolve(true)
        }
      })
    })
  }

  save (file) {
    return new Promise((resolve, reject) => {
      this.client.uploadFile({
        ...this.baseParams,
        Key: this.basePath + file.name,
        FilePath: file.path
      }, (err, data) => {
        if(err) {
          reject(this.errorParser(err))   
        }else {
          resolve('//'+data.Location)
        }
      })
    })
  }

  serve() {
    return (req, res, next) => {
      next();
    }    
  }

  delete(file) {
    return new Promise((resolve, reject) => {
      this.client.deleteObject({
        ...this.baseParams,
        Key: this.basePath + file.name
      }, (err, data) => {
        if(err) {
          reject(this.errorParser(err))   
        }else {
          resolve(true)
        }
      })
    })
  }

  read(file) {
    return new Promise((resolve, reject) => {
      this.client.getObject({
        ...this.baseParams,
        Key: this.basePath + file.name
      }, (err, data) => {
        if(err) {
          reject(this.errorParser(err))        
        }else {
          resolve(data.Body ? data.Body.toString() : '')
        }
      })
    })
  }

  errorParser(err) {
    if(err.statusCode === 404) {
      return 'Resource Not Exists'
    }else if(err.statusCode === 403){
      return 'AccessDenied'
    }else {
      return err
    }
  }

}

module.exports = CosStore
