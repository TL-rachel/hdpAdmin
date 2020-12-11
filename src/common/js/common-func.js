import Hashids from 'hashids';
import axios from 'axios';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

const remote = axios.create({});

const routeUtil = {
  goBack() {
    window.history.go(-1);
  }
};
const fileUtil = {
  getFile(url) {
    return new Promise((resolve, reject) => {
      remote({
        url,
        method: 'get',
        responseType: 'arraybuffer'
      }).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err.toString());
      });
    });
  },
  batchDownload(urls, title = 'batchFiles') {
    if (urls.constructor.name === 'Object') {
      urls = [urls];
    }
    let zip = new JSZip();
    let remotes = [];
    urls.forEach(url => {
      remotes.push(this.getFile(url).then(data =>{
        let urlStrs = url.split('=');
        let fileName = urlStrs[urlStrs.length - 1];
        zip.file(fileName, data, {binary: true});
      }));
    });
    Promise.all(remotes).then(() => {
      zip.generateAsync({type: 'blob'}).then(content => {
        FileSaver.saveAs(content, `${title}.zip`);
      });
    });
  },
  readAsDataURL(file) {
    let reader = new FileReader();
    let promise = new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () =>{
        reject('转换文件出错');
      };
    });
    reader.readAsDataURL(file);
    return promise;
  }
};
const util = {
  getUid(salt = 'zfids', length = 4) {
    let hashids = new Hashids(salt, length);
    let id = hashids.encode(Math.floor(Math.random() * 10000000));
    if ((/\d/).test(id)) {
      return this.getUid();
    } else {
      return id;
    }
  }
};
const install = (Vue) => {
  Vue.prototype.$ZFCommon = (function () {
    return {
      routeUtil,
      fileUtil,
      util
    };
  })();
};
export default {
  install
};
