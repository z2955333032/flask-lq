import {Session} from './lib/Session.js';
import cheerio from './lib/cheerio.min.js';
import * as Utils from './lib/utils.js';
import {VodDetail, VodList} from "./lib/vod.js";
import {_, load} from "../lib/cat.js";
import {VodShort} from "../lib/vod.js";

let key = '低端影视';
let siteKey = '';
let siteType = 0;
let HOST = 'https://ddys.pro';
//slet HOST = 'http://192.168.1.2/test';
let s = new Session();


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
        $('.dropdown-menu li').each((index, element) => {
                let _name = $(element).text();
                if (_name !== '站长推荐' && _name !== '关于本站') {
                    let type_id = $(element).find('a').attr("href").split(HOST)[1]
                    let type_dic = {"type_id": type_id, "type_name": _name}
                    classes.push(type_dic)
                }


            }
        )

        $('article').each((index, element) => {
            let _name = $(element).find('.post-box-title a').text().trim();
            let vodShort = {
                vod_id: $(element).find('.post-box-title a').attr('href').split(HOST)[1],
                vod_name: _name.match(/[(（](.*?)[)）]/) ? _name.replace(_name.match(/[(（](.*?)[)）]/)[0], '').trim() : _name,
                vod_pic: $(element).find('.post-box-image').css('background-image').match(/\((.*?)\)/)[1],
                vod_remarks: _name.match(/[(（](.*?)[)）]/) ? _name.match(/[(（](.*?)[)）]/)[1] : '正片'
            }
            if (vodShort.vod_name !== undefined) {
                vod_list.push(vodShort)
            }
        })
    }
    return JSON.stringify(
        {class: classes, list: vod_list})
}

async function homeVod() {
    /*
   let con = await s.request(HOST);
 let vod_list = [];
        if (!Utils.isEmpty(con.content)) {
            const $ =cheerio.load(con.content);

        $('article').each((index, element) => {
            let _name=$(element).find('.post-box-title a').text().trim();
        let vodShort = {
            vod_id: $(element).find('.post-box-title a').attr('href').split(HOST)[1],
            vod_name: _name.match(/[(（](.*?)[)）]/)?_name.replace(_name.match(/[(（](.*?)[)）]/)[0], '').trim():_name,
            vod_pic: $(element).find('.post-box-image').css('background-image').match(/\((.*?)\)/)[1],
            vod_remarks: '正片'
        }
        if (vodShort.vod_name !== undefined){
            vod_list.push(vodShort)
        }
        });
        //console.log(vod_list)
        }



        return JSON.stringify({
               list:vod_list,
            //page:0,
            //pagecount:0,
           // total:0

    })

     */

}

async function detail(id) {
    let detailUrl = HOST + id;
    let html = await s.request(detailUrl);
    if (!Utils.isEmpty(html.content)) {
        let $ = cheerio.load(html.content)
        let vodDetail = new VodDetail()
        vodDetail.vod_name = $('.post-title').text().indexOf('(') ? $('.post-title').text().slice(0, $('.post-title').text().indexOf('(')).trim() : $('.post-title').text().trim();
        vodDetail.vod_pic = JSON.parse($('.yoast-schema-graph').text())['@graph'][0]['thumbnailUrl']
        vodDetail.type_name = '';
        vodDetail.vod_year = $('.entry-date').text().trim()
        vodDetail.vod_play_from = '低端'
        vodDetail.vod_content = ''
        let vodItems = []
        let src = $('.wp-playlist-script')
        JSON.parse(src.text()).tracks.forEach(it => {
            let play_url = `${it.caption}$https://v.ddys.pro` + it.src0;   //HD国语$/vodplay/265193-4-1.html
            vodItems.push(play_url)
        })

        let page = $('.post-page-numbers')
        let num = page.length
        for (let i = 1; i < num; i++) {
            let html = await s.request(detailUrl + $(page[i]).text())
            if (!Utils.isEmpty(html.content)) {
                let $1 = cheerio.load(html.content)
                let src = $1('.wp-playlist-script')
                JSON.parse(src.text()).tracks.forEach(it => {
                    let play_url = `${it.caption}$https://v.ddys.pro` + it.src0;   //HD国语$/vodplay/265193-4-1.html
                    vodItems.push(play_url)
                })
            }
        }
        vodDetail.vod_play_url = vodItems.join("#");
        return JSON.stringify({
            list: [vodDetail]
        });
    }

}

async function play(flag, id, flags) {
    return JSON.stringify({
        parse: 0,
        header: s.headers,
        url: id
    });
}

async function category(tid, pg, filter, extend) {
    let reqUrl = HOST + tid + 'page/' + pg;
    let res = await s.request(reqUrl);
    if (!Utils.isEmpty(res.content)) {
        let $ = cheerio.load(res.content)
        let vod_list = [];
        $('article').each((index, element) => {
            let _name = $(element).find('.post-box-title a').text().trim();
            let vodShort = {
                vod_id: $(element).find('.post-box-title a').attr('href').split(HOST)[1],
                vod_name: _name.match(/[(（](.*?)[)）]/) ? _name.replace(_name.match(/[(（](.*?)[)）]/)[0], '').trim() : _name,
                vod_pic: $(element).find('.post-box-image').css('background-image').match(/\((.*?)\)/)[1],
                vod_remarks: _name.match(/[(（](.*?)[)）]/) ? _name.match(/[(（](.*?)[)）]/)[1] : '正片'
            }
            if (vodShort.vod_name !== undefined) {
                vod_list.push(vodShort)
            }
        });
        let count = 1;
        let textValue;
        $('.page-numbers').each((index, element) => {
            //console.log($(element).text())
            textValue = parseInt($(element).text());
            if (!isNaN(textValue) && textValue > count) {
                count = textValue;
            }
        });
        return JSON.stringify({
            page: parseInt(pg),
            pagecount: count,
            limit: 28,
            total: count * 28,
            list: vod_list,
        })
    }

}

async function search(wd, quick) {
    let searchUrl = `${HOST}/?s=${wd}&post_type=post`;
    let html = await s.request(searchUrl)
    if (!Utils.isEmpty(html.content)) {
        let $ = cheerio.load(html.content)
        let vod_list = [];
        $('article').each((index, element) => {
            let vodShort = {
                vod_id: $(element).find('a').attr('href').split(HOST)[1],
                vod_name: $(element).find('a').text().trim(),
                vod_pic: '',
                vod_remarks: ''
            }

            vod_list.push(vodShort)

        });
        return JSON.stringify(
            {list: vod_list})
        //{ list: [{"vod_id":"/dragon-ball-daima/","vod_name":"龙珠大魔 (更新至20)","vod_pic":"","vod_remarks":""},{"vod_id":"/dragon-ball-super-borly/","vod_name":"龙珠超: 布罗利","vod_pic":"","vod_remarks":""}]})
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



