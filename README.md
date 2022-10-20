# Ghost COS Store
This Ghost custom storage module allows you to store media file with TencentCloud COS instead of storing at local machine.

## Installation

### Via NPM

- Install COS storage module

  ```
  npm install ghost-cos-store
  ```
  
- Make the storage folder if it doesn't exist yet

  ```
  mkdir -p content/adapters/storage
  ```
  
 - Create a script named "ghost-cos-store.js", content as follow:
 
 ```javascript
//  content/adapters/storage/ghost-cos-store.js
module.exports = require('ghost-cos-store');
 ```

### Via Git
In order to replace the storage module, the basic requirements are:

- Create a new folder named `storage` inside `content/adapters`
- Clone this repo to `/storage`
```
mkdir -p [ghost/ptah]/content/adapters/storage
cd [ghost/ptah]/content/adapters/storage

git clone https://github.com/tencentyun/ghost-cos-store.git
```
- Install dependencies
```
cd ghost-cos-store
npm i
```

## Configuration

In your `config.[env].json` file, you'll need to add a new storage block to whichever environment you want to change:

```json
{
  "storage": {
    "active": "ghost-cos-store",
    "ghost-cos-store": {      
      "BasePath": "资源路径，如 ghost/ ，不填写默认为根目录",      
      "SecretId": "SecretId，在腾讯云控制台获取",
      "SecretKey": "SecretKey，在腾讯云控制台获取",
      "Bucket": "<BucketName>-<AppId>，如 test-1250000000",
      "Region": "<Region>，如 ap-chengdu"
    }
  }
}
```
