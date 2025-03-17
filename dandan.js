import {Session} from './lib/Session.js';
import cheerio from './lib/cheerio.min.js';
import * as Utils from './lib/utils.js';
import {VodDetail,VodList} from "./lib/vod.js";
import './lib/crypto-js.js';
let key = '蛋蛋影视';
let siteKey = '';
let siteType = 3;
let HOST = 'https://ddjhd.com';
//let HOST = 'http://192.168.1.2/test';
let s=new Session();

function indexOfVal(_0x51038c, _0x3d2780) {
            var _0xb316e2 = {
                'VCLqf': function(_0x2343cf, _0x3b754f) {
                    return _0x2343cf < _0x3b754f;
                }
            };
            for (var _0x3f75f3 = 0x0; _0xb316e2['VCLqf'](_0x3f75f3, _0x51038c['length']); _0x3f75f3++) {
                if (_0x3d2780 === _0x51038c[_0x3f75f3])
                    return !![];
            }
            return ![];
        }
function customStrDecode(_0xd23398) {
            let key='098f6bcd4621d373cade4e832627b4f6',
            _0xd23398A =CryptoJS.enc.Base64.parse(_0xd23398).toString(CryptoJS.enc.Utf8),
            len = 32,
            code = '';
            for (let i = 0x0; i<_0xd23398A.length; i++) {
                let k = i% len;
                code += String.fromCharCode(_0xd23398A.charCodeAt(i) ^ key.charCodeAt(k));
            }
            return CryptoJS.enc.Base64.parse(code).toString(CryptoJS.enc.Utf8);
        }
function deString(_0x337782, _0x45b5d6, _0x589c2d) {
            var _0xb4bd6f = {
                'KtTuh': function(_0x465dc6, _0x272eec) {
                    return _0x465dc6 < _0x272eec;
                },
                'gNOIr': function(_0x23c921, _0x1fa570) {
                    return _0x23c921 > _0x1fa570;
                },
                'Gxrex': function(_0x350cee, _0x3eb3a9) {
                    return _0x350cee < _0x3eb3a9;
                },
                'KKZor': function(_0xc9ad1a, _0x3f0395) {
                    return _0xc9ad1a | _0x3f0395;
                },
                'vWcAW': function(_0x3027cf, _0x4867ee) {
                    return _0x3027cf >> _0x4867ee;
                },
                'TENeX': function(_0x580fac, _0x598a4a) {
                    return _0x580fac | _0x598a4a;
                },
                'MyKKv': function(_0x4784be, _0x15d318) {
                    return _0x4784be & _0x15d318;
                },
                'LynQc': function(_0x303b9c, _0x287ef3) {
                    return _0x303b9c < _0x287ef3;
                },
                'oiEWy': function(_0x50e283, _0x5b931e) {
                    return _0x50e283 === _0x5b931e;
                },
                'ByIyB': 'iBmUb',
                'Auxlw': 'ScVeq'
            }
              , _0x45ce26 = ''
              , _0x311a7f = _0x337782
              , _0x836c4e = _0x45b5d6
              , _0x302df4 = _0x589c2d.split('');
            for (var _0x6af1ec = 0x0; _0x6af1ec < _0x302df4['length']; _0x6af1ec++) {
                if (_0xb4bd6f['oiEWy']('iBmUb', _0xb4bd6f['ByIyB'])) {
                    var _0x7a1451 = _0x302df4[_0x6af1ec]
                      , _0x355a55 = /^[a-zA-Z]+$/['test'](_0x7a1451);
                    if (_0x355a55 && indexOfVal(_0x836c4e, _0x7a1451))
                        _0x45ce26 += _0x836c4e[_0x311a7f['indexOf'](_0x7a1451)];
                    else {
                        if (_0xb4bd6f['oiEWy'](_0xb4bd6f['Auxlw'], _0xb4bd6f['Auxlw']))
                            _0x45ce26 += _0x7a1451;
                        else {

                        }
                    }
                } else {
                    for (var _0x2e2351 = 0x0; _0xb4bd6f['LynQc'](_0x2e2351, _0x5cec1a['length']); _0x2e2351++) {
                        if (_0x3bcb71 === _0x26690a[_0x2e2351])
                            return !![];
                    }
                    return ![];
                }
            }
            return _0x45ce26;
        }
function sign(_0x278289) {
            var _0x3b44c8 = {
                'bzxUA': function(_0x4f2c5c, _0x2f65a6) {
                    return _0x4f2c5c(_0x2f65a6);
                },
                'lxDPW': function(_0x258903, _0x5927d7) {
                    return _0x258903 == _0x5927d7;
                },
                'JRHEB': function(_0x476e3a, _0x183d01) {
                    return _0x476e3a + _0x183d01;
                },
                'Uglms': function(_0x3b905f, _0x10d149) {
                    return _0x3b905f == _0x10d149;
                },
                'eVuTK': function(_0x5618a6, _0x42a926) {
                    return _0x5618a6 !== _0x42a926;
                },
                'OPhas': 'bwbpU',
                'JuNss': 'LRnAo',
                'FXkwn': function(_0x3c6d2a, _0x2bc2c4) {
                    return _0x3c6d2a + _0x2bc2c4;
                },
                'GDdHH': function(_0x462385, _0x3d6a4d, _0x302cd7, _0x2657ed) {
                    return _0x462385(_0x3d6a4d, _0x302cd7, _0x2657ed);
                }
            }
              , _0x278289 = _0x3b44c8['bzxUA'](customStrDecode, _0x278289)
              , _0x45f1fe = _0x278289.split('/')
              , _0x400167 = '';
            for (var _0x317232 = 0x0; _0x317232 < _0x45f1fe['length']; _0x317232++) {
                var _0xb57ed3 = _0x3b44c8['lxDPW'](_0x3b44c8['JRHEB'](_0x317232, 0x1), _0x45f1fe['length']) ? '' : '/';
                if (_0x3b44c8['Uglms'](_0x317232, 0x0) || _0x3b44c8['Uglms'](_0x317232, 0x1)) {} else {
                    if (_0x3b44c8['eVuTK'](_0x3b44c8['OPhas'], _0x3b44c8['JuNss']))
                        _0x400167 += _0x3b44c8['FXkwn'](_0x45f1fe[_0x317232], _0xb57ed3);
                    else
                        return !![];
                }
            }
            var _0x413ec6 = CryptoJS.enc.Base64.parse(_0x400167).toString(CryptoJS.enc.Utf8)//atob22(_0x400167)
              , _0xb5279f = _0x3b44c8['GDdHH'](deString, JSON.parse(CryptoJS.enc.Base64.parse(_0x45f1fe[0x01]).toString(CryptoJS.enc.Utf8)), JSON.parse(CryptoJS.enc.Base64.parse(_0x45f1fe[0x0]).toString(CryptoJS.enc.Utf8)), _0x413ec6);
            return _0xb5279f;
        }


async function ParseVodListContent(res) {


}

async function init(cfg) {
    siteKey = cfg.skey;
    siteType = cfg.stype

}

async function home(filter) {
    let con =await s.request(HOST);
    let vod_list = [];
    let classes=[];
        if (!Utils.isEmpty(con.content)) {
            const $ = cheerio.load(con.content);

            classes=[{"type_id": 1, "type_name": '电影'},{"type_id": 2, "type_name": '剧集'},{"type_id": 3, "type_name": '综艺'},{"type_id": 4, "type_name": '动漫'}]

            $('.hide-actor.col-md-8.col-sm-4.col-xs-3').each((index, element) => {
                let vodShort = {
                    vod_id: $(element).find('a.thumb-link').attr('href'),
                    vod_name: $(element).find('.ewave-vodlist__thumb.lazyload').attr('title'),
                    vod_pic: $(element).find('.ewave-vodlist__thumb.lazyload').attr('data-original'),
                    vod_remarks: $(element).find('span.pic-text.text-right').text()
                }
                if (vodShort.vod_name !== undefined){vod_list.push(vodShort)}
            });

            $('.col-md-6.col-sm-4.col-xs-3').each((index, element) => {
                let vodShort2 = {
                    vod_id: $(element).find('a.thumb-link').attr('href'),
                    vod_name: $(element).find('.ewave-vodlist__thumb.lazyload').attr('title'),
                    vod_pic: $(element).find('.ewave-vodlist__thumb.lazyload').attr('data-original'),
                    vod_remarks: $(element).find('span.pic-text.text-right').text()
                }
                if (vodShort2.vod_name !== undefined){vod_list.push(vodShort2)}
            });

        }
        //console.log(classes) ;
    return JSON.stringify(
        {class:classes,list:vod_list,})}

async function homeVod() {


}

async function detail(id) {
    let detailUrl = HOST + id;
    let html = await s.request(detailUrl);
    if (!Utils.isEmpty(html.content)) {
        let $ = cheerio.load(html.content)
        let vodDetail = new VodDetail()
        vodDetail.vod_name = $('div.ewave-content__detail').find('h1.title>span:first').text();
        vodDetail.vod_pic = $('.ewave-content__thumb').find('img').attr('src')
        vodDetail.type_name = '';
        vodDetail.vod_year = $('p.data:first').find('a:last').text()
        vodDetail.vod_content = $('.desc.hidden-xs').text().trim().substring(3)
        let vod_play_from = []
        $('.nav.nav-tabs.pull-right.swiper-wrapper>.swiper-slide').each((index, element) => {
            vod_play_from.push($(element).find('a').text())
        })
        vodDetail.vod_play_from = vod_play_from.join('$$$')


        let vod_play_url = []
        $('.tab-content.ewave-pannel_bd.col-pd').children().each((index, element) => {
            let vodItems = []
            $(element).find('li').each((index, item) => {
                vodItems.push($(item).find('a').text() + '$' + $(item).find('a').attr('href'))
            })
            vod_play_url.push(vodItems.join('#'))
        })
        vodDetail.vod_play_url = vod_play_url.join('$$$')
        return JSON.stringify({
            list: [vodDetail]
        });
    }

}

async function play(flag, id, flags) {

    let con = await s.request(HOST + id);
    if (!Utils.isEmpty(con.content)) {
        const $ = cheerio.load(con.content);
        let ls = {};
        eval(($('.ewave-pannel-bd script:first').text() + `;ls=player_aaaa`));
        let hh = {
            'content-type': 'application/x-www-form-urlencoded',
            'referer': 'https://ddjhd.com',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
        }
        let postcon = await s.request('https://ddjhd.com/webplayer/api.php', hh, '', 'post', {vid: ls.url});
        return JSON.stringify({
            //parse: 0,
            //header: s.headers,
            url: sign(JSON.parse(postcon.content).data.url)
        });
    }
}

async function category(tid, pg, filter, extend) {
    //https://ddjhd.com/show/1--------1---.html
    let reqUrl =`${HOST}/show/${tid}--------${pg}---.html`;
    let c=`ewave-notice=1`;
    let res = await s.request(reqUrl,'',c);
    if (!Utils.isEmpty(res.content)) {
        //console.log(res.content)
        let $ =cheerio.load(res.content)
        let vod_list = [];
        $('.col-md-6.col-sm-4.col-xs-3').each((index, element) => {
                let vodShort2 = {
                    vod_id: $(element).find('a.thumb-link').attr('href'),
                    vod_name: $(element).find('.ewave-vodlist__thumb.lazyload').attr('title'),
                    vod_pic: $(element).find('.ewave-vodlist__thumb.lazyload').attr('data-original'),
                    vod_remarks: $(element).find('span.pic-text.text-right').text()
                }
                if (vodShort2.vod_name !== undefined){vod_list.push(vodShort2)}
            });

        return JSON.stringify({
        page: parseInt(pg),
        pagecount: 7,
        limit: 35,
        total: 7*28,
        list: vod_list,
    })
    }
}//验证码没做

async function search(wd, quick) {
   // https://ddjhd.com/search/-------------.html
    let searchUrl = HOST + `/search/-------------.html`;
    let hh = {
            'content-type': 'application/x-www-form-urlencoded',
            'referer': 'https://ddjhd.com',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
        }
        let html = await s.request(searchUrl,hh,'','post',{wd:wd})
    console.log(html.content)
        if (!Utils.isEmpty(html.content)) {
            let $ = cheerio.load(html.content)
            let vod_list = [];
            $('.active.top-line-dot.clearfix').each((index, element) => {
                let _name = $(element).find('div.thumb > a').attr('data-original');
                let vodShort = {
                    vod_id: $(element).find('div.thumb > a').attr('href'),
                    vod_name: $(element).find('div.thumb > a').attr('title'),
                    vod_pic: $(element).find('div.thumb > a').attr('data-original'),
                    vod_remarks: $(element).find('div.thumb ').text().trim()
                }
                if (vodShort.vod_name !== undefined) {
                    vod_list.push(vodShort)
                }
            });
            return JSON.stringify({
                list: vod_list
    });
        }

}//验证码没做

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



