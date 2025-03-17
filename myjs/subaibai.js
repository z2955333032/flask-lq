import {Session} from './lib/Session.js';
import cheerio from './lib/cheerio.min.js';
import * as Utils from './lib/utils.js';
import {VodDetail, VodList} from "./lib/vod.js";
import './lib/crypto-js.js';

let key = '素白白';
let siteKey = '';
let siteType = 3;
let HOST = 'https://www.subaibai.com';
//let HOST = 'http://192.168.1.2/test';
let s = new Session();


async function ParseVodListContent($) {

}

async function init(cfg) {
    siteKey = cfg.skey;
    siteType = cfg.stype

}

async function home(filter) {
    let con = await s.request(HOST);
    let vod_list = [];
    let classes = [];
    if (!Utils.isEmpty(con.content)) {
        const $ = cheerio.load(con.content);
        $('.menu-item.menu-item-type-post_type.menu-item-object-page').each((index, element) => {
            let type_name = $(element).text()
            if (type_name !== "公告留言") {
                let type_id = $(element).find("a").attr("href").split(HOST)[1]
                let type_dic = {"type_id": type_id, "type_name": type_name}
                classes.push(type_dic)
            }

        })

        $('.mikd>.mi_cont').find('li').each((index, item) => {
            let vodShort = {
                vod_id: $(item).find('a').attr('href').split(HOST)[1],
                vod_name: $(item).find('img').attr('alt'),
                vod_pic: $(item).find('img').attr('data-original'),
                vod_remarks: $(item).find('.jidi').text()||$(item).find('.rating').text()
            }
            if (vodShort.vod_name !== undefined) {
                vod_list.push(vodShort)
            }
        });
    }
    return JSON.stringify(
        {class: classes, list: vod_list,})
}

async function homeVod() {


}

async function detail(id) {
    let html = await s.request(HOST + id);
    if (!Utils.isEmpty(html.content)) {
        let $ = cheerio.load(html.content)
        let vodDetail = new VodDetail()
        vodDetail.vod_id = id;
        vodDetail.vod_name = $('.dytext.fl').find('h1').text();
        vodDetail.vod_pic = $('.dyimg.fl').find('img').attr('src')
        // vodDetail.vod_remarks='';
        vodDetail.vod_content = $('.yp_context').find('p').text().trim();
        vodDetail.vod_play_from = '素白白';
        let urllist = [];
        let elements = $('.paly_list_btn').find('a')
        for (const element of elements) {
            urllist.push($(element).text() + '$' + $(element).attr('href').split(HOST)[1])
        }
        vodDetail.vod_play_url = urllist.join('#');
        return JSON.stringify({
            list: [vodDetail]
        });
    }

}

async function play(flag, id, flags) {
    let con = await s.request(HOST + id);
    if (!Utils.isEmpty(con.content)) {
        const $ = cheerio.load(con.content);
        let v1;
        $('script').each((index, item) => {
            if ($(item).text().match(/dpobj\.on/)) {
                let scripttext = $(item).text().replace(/\n/g, '').replace(/\r/g, '').replace(/\t/g, '');
                let key = scripttext.match(/parse\(\"(.*?)\"\)\;/)[1]
                let data = scripttext.split('var')[1].match(/\=\"(.*?)\"\;/)[1]
                let a = CryptoJS.enc.Utf8.parse(key);
                let iv = CryptoJS.enc.Utf8.parse(1234567890983456);
                let decrypted = CryptoJS.AES.decrypt(data, a, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }).toString(CryptoJS.enc.Utf8);
                const found1 = decrypted.match(/video: (.*?),\}\)/);
                //console.log(found1[1])
                v1 = found1[1].replace(/https:/g, "$").replace(/'/g, `"`).replace(/\{/g, `{"`).replace(/\:/g, `":`).replace(/\,/g, `,"`).replace(/\$/g, `https:`);

            }
        })
        return JSON.stringify({
            //parse: 0,
            //header: s.headers,
            url: JSON.parse(v1).url
        });
    }
}

async function category(tid, pg, filter, extend) {
    let res = await s.request(HOST + `${tid}/page/${pg}`);
    if (!Utils.isEmpty(res.content)) {
        let $ = cheerio.load(res.content)
        let vod_list = [];
        $('.mikd>.mi_cont').find('li').each((index, item) => {
            let vodShort = {
                vod_id: $(item).find('a').attr('href').split(HOST)[1],
                vod_name: $(item).find('img').attr('alt'),
                vod_pic: $(item).find('img').attr('data-original'),
                vod_remarks: $(item).find('.jidi').text()||$(item).find('.rating').text()
            }
            if (vodShort.vod_name !== undefined) {
                vod_list.push(vodShort)
            }
        });
        return JSON.stringify({
            page: parseInt(pg),
            pagecount: 7,
            limit: 25,
            total: 7 * 25,
            list: vod_list,
        })
    }
}

async function search(wd, quick) {
    let html = await s.request(HOST + `/search?q=${wd}`)
    if (!Utils.isEmpty(html.content)) {
        let $ = cheerio.load(html.content)
        let vod_list = [];
        $('.mikd>.mi_cont').find('li').each((index, item) => {
            let vodShort = {
                vod_id: $(item).find('a').attr('href').split(HOST)[1],
                vod_name: $(item).find('img').attr('alt'),
                vod_pic: $(item).find('img').attr('data-original'),
                vod_remarks: $(item).find('.jidi').text()||$(item).find('.rating').text()
            }
            if (vodShort.vod_name !== undefined) {
                vod_list.push(vodShort)
            }
        });
        return JSON.stringify({
            list: vod_list
        });
    }
}

export function __jsEvalReturn() {
    return {
        init: init,
        home: home,
        homeVod: homeVod,
        category: category,
        detail: detail,
        play: play,
        search: search,
    }
}



