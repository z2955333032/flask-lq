
//import {} from '../../wrapper/index.js';
//import {_} from '../../lib/cat.js';

import * as Utils from './utils.js';



export class Session {
    constructor() {
        this.cookie = ""
        this.headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'}
    }
    async  request(Url,headers,cookie, method, data) {
        //const host=new URL(Url).origin;
        let host=Url.match(/https?:\/\/[\w.-]+(:\d+)?/gi);
        if(headers){
            this.headers=headers;
        }
        else {
           this.headers ['Referer']=host[0];
        }

        if (!Utils.isEmpty(cookie)) {
            this.cookie =this.cookie+ (cookie.endsWith(";")? cookie:cookie+';');
        }

        //const postType = method === 'post' ? 'form' : '';
        const postType='';
        this.headers['Cookie']=this.cookie;
        let res = await req(Url, {
            method: method || 'get', headers: this.headers, data: data, postType: postType//,proxy:1
        });
        if (res.headers['set-cookie'] ) {
            let _cookie = Array.isArray(res.headers['set-cookie']) ? res.headers['set-cookie'].join(';') : res.headers['set-cookie'];
            this.cookie=this.cookie+_cookie+';';
            this.headers['Cookie']=this.cookie;
        }
        if (res.headers['Location'] ) {
            res = await req(res.headers['Location'], {
            method: method || 'get', headers:this.headers, data: data, postType: postType,
        });
        }

        if (res.code !== 200 && res.code !== 304) {
            Utils.sleep(1);
            res = await req(Url , {
                method: method || 'get', headers: this.headers, data: data, postType: postType,
            });
        }
        //content,code,headers
        return res;
    }
}
