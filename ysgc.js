import {Session} from './lib/Session.js';
import cheerio from './lib/cheerio.min.js';
import * as Utils from './lib/utils.js';
import {VodDetail, VodList} from "./lib/vod.js";
import {_, load} from "../lib/cat.js";
import {VodShort} from "../lib/vod.js";

let key = '影视工厂';
let siteKey = '';
let siteType = 3;
let HOST = 'http://137.220.252.33:1223';
//let HOST = 'http://192.168.1.44/test';
let s = new Session();

async function ParseVodListContent(res) {


}

async function init(cfg) {
    siteKey = cfg.skey;
    siteType = cfg.stype

}

async function home(filter) {
    let con = await s.request(HOST + '/ysgc.php/v6/nav');
    let classes = [];
    if (!Utils.isEmpty(con.content)) {
            JSON.parse(con.content).data.forEach((item) => {
            let dic = {"type_id": item.type_id, "type_name": item.type_name}
            classes.push(dic)
        })
    }
    return JSON.stringify(
        {class: classes})
}

async function homeVod() {
    let con = await s.request(HOST + '/ysgc.php/v6/index_video');
    //http://137.220.252.33:1223/ysgc.php/v6/index_video
    let vod_list = []
    if (!Utils.isEmpty(con.content)) {
        JSON.parse(con.content).data.forEach((cls) => {
            cls.vlist.forEach((item) => {
                let dic = {
                    vod_id: item.vod_id,
                    vod_name: item.vod_name,
                    vod_pic: item.vod_pic,
                    vod_remarks: item.vod_remarks
                }
                vod_list.push(dic)
            })
        })
        return JSON.stringify(
            {list: vod_list
            })
    }
}

async function detail(id) {
    let html = await s.request(HOST + '/ysgc.php/v6/video_detail?id=' + id);
    if (!Utils.isEmpty(html.content)) {
        let vodDetail = new VodDetail()
        let json = JSON.parse(html.content).data.vod_info
        vodDetail.vod_id = json.vod_id;
        vodDetail.vod_name = json.vod_name;
        vodDetail.vod_pic = json.vod_pic;
        vodDetail.type_name = json.type_name;
        vodDetail.vod_year = json.vod_year;
        vodDetail.vod_area = json.vod_area;
        vodDetail.vod_remarks = json.vod_remarks;
        vodDetail.vod_actor = json.vod_actor;
        vodDetail.vod_director = json.vod_director;
        vodDetail.vod_content = (json.vod_content).trim();
        vodDetail.vod_play_from = json.vod_play_from;
        let urllist = [];
        json.vod_url_with_player.forEach((playeritem) => {
            urllist.push(playeritem.url)
        });
        vodDetail.vod_play_url = urllist.join('$$$');
        return JSON.stringify({
            list: [vodDetail]
        });
    }

}

async function play(flag, id, flags) {

    return JSON.stringify({
        parse: 0,
        //  header: s.headers,
        url: id
        //url:'magnet:?xt=urn:btih:E55AF07B3AC13D45BA4040035C03C5DD3D035FAB'
    });
}

async function category(tid, pg, filter, extend) {
    let res = await s.request(HOST + '/ysgc.php/v6/video?pg=' + pg + '&tid=' + tid);
    if (!Utils.isEmpty(res.content)) {
        let json = JSON.parse(res.content)
        let vod_list = [];
        json.data.forEach((item) => {
            let dic = {
                vod_id: item.vod_id,
                vod_name: item.vod_name,
                vod_pic: item.vod_pic,
                vod_remarks: item.vod_remarks
            }
            if (dic.vod_name !== undefined) {
                vod_list.push(dic)
            }
        })


        return JSON.stringify({
            page: parseInt(pg),
            pagecount: json.pagecount,
            limit: json.limit,
            total: json.total,
            list: vod_list,
        })
    }

}

async function search(wd, quick) {
    let res = await s.request(`${HOST}/ysgc.php/v6/search?text=${wd}`)
    if (!Utils.isEmpty(res.content)) {
        let json = JSON.parse(res.content)
        let vod_list = [];
        json.data.forEach((item) => {
            let dic = {
                vod_id: item.vod_id,
                vod_name: item.vod_name,
                vod_pic: item.vod_pic,
                vod_remarks: item.vod_remarks
            }
            if (dic.vod_name !== undefined) {
                vod_list.push(dic)
            }
        })
        return JSON.stringify({
            list: vod_list
        })
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



