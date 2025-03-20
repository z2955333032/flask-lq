import {Session} from './lib/Session.js';
import cheerio from './lib/cheerio.min.js';
import * as Utils from './lib/utils.js';
import {VodDetail, VodList} from "./lib/vod.js";
import './lib/crypto-js.js';



let key = '91porn';
let siteKey = '';
let siteType = 3;
let HOST = 'https://91porn.com';
//let HOST = 'http://192.168.1.2/test';
let s = new Session();

s.headers={"User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0', "Referer": HOST + "/","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-US;q=0.7,en-GB;q=0.6"}
async function ParseVodListContent($) {

}

async function init(cfg) {
    siteKey = cfg.skey;
    siteType = cfg.stype

}

async function home(filter) {
    let con = await s.request(HOST+'/index.php');
    let vod_list = [];
    let classes = [{"type_id": 'ori', "type_name": '91原创'},
                {"type_id": 'hot', "type_name": '当前最热'},
                {"type_id": 'top', "type_name": '本月最热'},
                {"type_id": 'long', "type_name": '10分钟以上 '},
                {"type_id": 'longer', "type_name": '20分钟以上 '},
                {"type_id": 'tf', "type_name": '本月收藏'},
                {"type_id": 'rf', "type_name": '最近加精'},
                {"type_id": 'hd', "type_name": '高清'},
                {"type_id": 'md', "type_name": '本月讨论'},
                {"type_id": 'mf', "type_name": ' 收藏最多'}]

        if (!Utils.isEmpty(con.content)) {
            const $ = cheerio.load(con.content);
            $('.col-xs-12.col-sm-4.col-md-3.col-lg-3').each((index, element) => {
            let vodShort = new VodList()
            vodShort.vod_remarks =$(element).find('.duration').text()
            vodShort.vod_id =$(element).find('a').attr('href').split('https://91porn.com')[1]
            vodShort.vod_name =$(element).find('.video-title').text()
            vodShort.vod_pic =$(element).find('.img-responsive').attr('src')
        if (vodShort.vod_name !== undefined){
            vod_list.push(vodShort)}
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
            vodDetail.vod_play_url='正片$'+decodeURIComponent($("video").text().match(/code2\(\"(.*?)\"\)/)[1]).match(/src\=\'(.*?)\' /)[1]
            vodDetail.vod_name = ''
            vodDetail.vod_pic=''
            vodDetail.type_name ='';
            vodDetail.vod_year=''
            vodDetail.vod_play_from='91_porn'
            //vodDetail.vod_content=decodeURIComponent($("video").text().match(/code2\(\"(.*?)\"\)/)[1]).match(/src\=\'(.*?)\' /)[1]
        return JSON.stringify({
            list: [vodDetail]
        });
    }

}

async function play(flag, id, flags) {

            return JSON.stringify({
                //parse: 0,
                //header: s.headers,
                url:id
            });
}

async function category(tid, pg, filter, extend) {
    let con = await s.request(HOST +'/v.php?category='+tid+'&viewtype=basic&page='+pg);
  // let con = await s.request(HOST+'/index.php');
   let vod_list=[]
    if (!Utils.isEmpty(con.content)) {
            const $ = cheerio.load(con.content);
            $('.col-xs-12.col-sm-4.col-md-3.col-lg-3').each((index, element) => {
            let vodShort = new VodList()
            vodShort.vod_remarks =$(element).find('.duration').text()
            vodShort.vod_id =$(element).find('a').attr('href').split('https://91porn.com')[1]
            vodShort.vod_name =$(element).find('.video-title').text()
            vodShort.vod_pic =$(element).find('.img-responsive').attr('src')
        if (vodShort.vod_name !== undefined){
            vod_list.push(vodShort)}
        });
        }
    return JSON.stringify({
            page: parseInt(pg),
            pagecount: 5,
            limit: 24,
            total: 5 * 28,
            list: vod_list,
        })

}

async function search(wd, quick) {



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



