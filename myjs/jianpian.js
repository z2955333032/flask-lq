import {Session} from './lib/Session.js';
import cheerio from './lib/cheerio.min.js';
import * as Utils from './lib/utils.js';
import {VodDetail, VodList} from "./lib/vod.js";
import './lib/crypto-js.js';


let key = '荐片';
let siteKey = '';
let siteType = 3;
let HOST = 'http://api2.rinhome.com';
//let HOST = 'http://192.168.1.2/test';
let s = new Session();


async function ParseVodListContent($) {

}

async function init(cfg) {
    siteKey = cfg.skey;
    siteType = cfg.stype

}

async function home(filter) {
    let con = await s.request(HOST+'/api/slide/list?code=unknown9039b6856c3a3306&pos_id=888&channel=wandoujia');
    let vod_list = [];
    let classes = [];
    if (!Utils.isEmpty(con.content)) {


        classes = [{type_id: 0, type_pid: 0, type_name: "全部"}, {type_id: 1, type_name: "电影", type_pid: 0}, {type_id: 2, type_name: "电视剧", type_pid: 0}, {type_id: 3, type_name: "动漫", type_pid: 0}, {type_id: 4, type_name: "综艺", type_pid: 0}]

        vod_list=JSON.parse(con.content).data.map(( item) => {
            return  {
                vod_id:item.jump_id,
                        vod_name:item.title,
                       vod_pic:item.tvimg,
                       vod_remarks:''
            }

        });
    }
    return JSON.stringify(
        {class: classes, list: vod_list,})
}

async function homeVod() {


}

async function detail(id) {
    let html = await s.request(HOST + `/api/node/detail?channel=wandoujia&token=&id=${id}`);
    if (!Utils.isEmpty(html.content)) {

        let vodDetail = new VodDetail()
        let json=JSON.parse(html.content).data
            vodDetail.vod_id=json.id;
            vodDetail.vod_name=json.title;
            vodDetail.vod_pic=json.tvimg;
           // vodDetail.type_name='json.type_name';
            vodDetail.vod_year=json.year.title;
            //vodDetail.vod_area='json.vod_area';
            vodDetail.vod_remarks=json.mask;
            //vodDetail.vod_actor='json.vod_actor';
            //vodDetail.vod_director='json.vod_director';
            //vodDetail.vod_content=json.description.trim();

            vodDetail.vod_play_from='荐片';
            let urllist=json.m3u8_downlist.map((playeritem)=>{
                return playeritem.val
            });

            vodDetail.vod_play_url=urllist.join('#');
            vodDetail.vod_content=vodDetail.vod_play_url;
        return JSON.stringify({
            list: [vodDetail]
        });
    }

}

async function play(flag, id, flags) {

            return JSON.stringify({
                //parse: 0,
                //header: s.headers,
                url: id
            });
        }


async function category(tid, pg, filter, extend) {
    let res = await s.request(HOST + `/api/crumb/list?area=0&category_id=${tid}&page=${pg}&type=0&limit=24&sort=hot&year=0`);
    if (!Utils.isEmpty(res.content)) {
        let $ = cheerio.load(res.content)
        let vod_list = [];
        let json=JSON.parse(res.content)
            vod_list = json.data.map((item) => {
                return{vod_id:item.id,
                        vod_name:item.title,
                       vod_pic:item.path,
                       vod_remarks:item.playlist.title
                   }
            })


        return JSON.stringify({
            page: parseInt(pg),
            pagecount: 10,
            limit: 24,
            total: 240,
            list: vod_list,
        })
    }
}

async function search(wd, quick) {
    let html = await s.request(HOST + `/api/video/search?page=1&key=${wd}`)
    if (!Utils.isEmpty(html.content)) {
        let vod_list = [];
        let json=JSON.parse(html.content)
        vod_list = json.data.map( (item) => {
                return{vod_id:item.id,
                        vod_name:item.title,
                       vod_pic:item.tvimg,
                       vod_remarks:item.mask
                   }
            })

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



