import {Session} from './lib/Session.js';
import cheerio from './lib/cheerio.min.js';
import * as Utils from './lib/utils.js';
import {VodDetail, VodList} from "./lib/vod.js";
import './lib/crypto-js.js';

let key = '厂长资源';
let siteKey = '';
let siteType = 3;
let HOST = 'https://www.czzy77.com';
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
        $('.submenu_mi li').each((index, element) => {
            let type_name = $(element).text()
            if (type_name.length < 4) {
                let type_id = $(element).find("a").attr("href")
                let type_dic = {"type_id": type_id, "type_name": type_name}
                classes.push(type_dic)
            }

        })

        $('.mikd>.mi_cont').find('li').each((index, item) => {
            let vodShort = {
                vod_id: $(item).find('a').attr('href').split(HOST)[1],
                vod_name: $(item).find('img').attr('alt'),
                vod_pic: $(item).find('img').attr('data-original'),
                vod_remarks: $(item).find('.jidi').text() || $(item).find('.rating').text()
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
        vodDetail.vod_play_from = '厂长资源';
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
        const $$ = cheerio.load(con.content);
        let b = $$('iframe').attr('src')
        let headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
            'Referer': HOST
        }
        let res = await s.request(b, headers);
        if (!Utils.isEmpty(res.content)) {
            const $ = cheerio.load(res.content);
            return JSON.stringify({
                //parse: 0,
                //header: s.headers,
                url:$('script:last').text().split(('mysvg'))[1].split("'")[1]
            });
        }
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
                vod_remarks: $(item).find('.jidi').text() || $(item).find('.rating').text()
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
    let html = await s.request(HOST + `/daoyongjiekoshibushiy0ubing?q=${wd}`)

    if (!Utils.isEmpty(html.content)) {
        let $ = cheerio.load(html.content)
        let vod_list = [];
        $('.mikd>.mi_cont').find('li').each((index, item) => {
            let vodShort = {
                vod_id: $(item).find('a').attr('href'),
                vod_name: $(item).find('img').attr('alt'),
                vod_pic: $(item).find('img').attr('src'),
                vod_remarks: $(item).find('.jidi').text() || $(item).find('.rating').text()
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



