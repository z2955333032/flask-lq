import {Session} from './lib/Session.js';
import cheerio from './lib/cheerio.min.js';
import * as Utils from './lib/utils.js';
let key = '🐰兔小贝';
let siteKey = '';
let siteType = 0;
let HOST = 'https://www.tuxiaobei.com';
//let HOST = 'http://127.0.0.1/test';
//let HOST='HTTPS://ddys.pro';
let s=new Session()




async function init(cfg) {
    siteKey = cfg.skey;
    siteType = cfg.stype;

}

async function home(filter) {

    const filterObj = {};
    //let res=await s.request( HOST );
    let res=await s.request( HOST+'/gongyi/index' );

    let classes=[];
    if(!Utils.isEmpty(res.content)){
        let $=cheerio.load(res.content);
        let items=$('.public_nav').find('li')
        for(const item of items.slice(1, 8)){
            let type_dic = {"type_id": $(item).find('a').attr('href'), "type_name": $(item).find('p:last').text()}
                classes.push(type_dic)
        }
    }
    return JSON.stringify({
        class: classes
        })
}

async function homeVod() {
    let res=await s.request(HOST + '/animate');
    let vodlist=[];
    if(!Utils.isEmpty(res.content)){
        let $=cheerio.load(res.content);
        let items=$('li');
        for(const item of items){
            if($(item).attr('data-new')){
                let vodlis_dic={
                    vod_id: $(item).find('a').attr('href'),
                    vod_name: $(item).find('p.tit').text(),
                    vod_pic: $(item).find('p > img').attr('src'),
                    vod_remarks: ''
                }
                vodlist.push(vodlis_dic)
            }
        }

    }
    return JSON.stringify({
        list: vodlist,
    })
}

async function category(tid, pg, filter, extend) {
    if (pg <= 0 || typeof pg == 'undefined') pg = 1;
    const link = await s.request(HOST + '/list/mip-data?typeId=' + tid + '&page=' + pg + '&callback=');
    const html = link.match(/\((.*?)\);/)[1];
    const data = JSON.parse(html).data;
    let videos = _.map(data.items, (it) => {
        return {
            vod_id: it.video_id,
            vod_name: it.name,
            vod_pic: it.image,
            vod_remarks: it.root_category_name + ' | ' + it.duration_string || '',
        }
    });
    const pgCount = pg * 30 > data.totalCount ? parseInt(pg) : parseInt(pg) + 1;
    return JSON.stringify({
        page: parseInt(pg),
        pagecount: pgCount,
        limit: 30,
        total: data.totalCount,
        list: videos,
    })
}  //没做

async function detail(id) {
    const vod = {
        vod_id: id,
        vod_remarks: '',
    };
    const playlist = ['点击播放' + '$' + HOST + '/play/' + id];
    vod.vod_play_from = "道长在线";
    vod.vod_play_url = playlist.join('#');
    return JSON.stringify({
        list: [vod],
    });
}  //没做

async function play(flag, id, flags) {
    const html = await request(id);
    const $ = load(html);
    const pvideo = $("body mip-search-video[video-src*=http]");
    const purl = pvideo[0].attribs['video-src'];
    // console.debug('兔小贝 purl =====>' + purl); // js_debug.log
    return JSON.stringify({
        parse: 0,
        url: purl,
    });
}  //没做

async function search(wd, quick) {
    const link = HOST + "/search/" + wd;
    const html = await request(link);
    const $ = load(html);
    const list = $("div.list-con > div.items");
    let videos = _.map(list, (it) => {
        const a = $(it).find("a:first")[0];
        const img = $(it).find("mip-img:first")[0];
        const tt = $(it).find("p:first")[0];
        const remarks = $(it).find("p")[1];
        return {
            vod_id: a.attribs.href.replace(/.*?\/play\/(.*)/g, '$1'),
            vod_name: tt.children[0].data,
            vod_pic: img.attribs["src"],
            vod_remarks: remarks.children[0].data || "",
        };
    });
    return JSON.stringify({
        list: videos,
        land: 1,
        ratio: 1.78,
    });
}  //没做

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

