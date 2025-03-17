//import {__jsEvalReturn} from '../js/91_porn.js';
import {__jsEvalReturn} from './ddys.js';
//import {__jsEvalReturn} from '../js/aiyingshi.js';
//import {__jsEvalReturn} from '../js/tiantian.js';
import {} from '../wrapper/index.js';
import * as Utils from "../lib/utils.js";
let spider = __jsEvalReturn();
function print(parma){
    console.log(parma)
}
async function test() {
    let siteKey = '1ddys';
    let siteType = 3;
    await spider.init({
        skey: siteKey, stype: siteType, ext: {
            "aliToken": "a0debd28d10e4aa5a431e7de586e6e42",
            "box": "TV",
            "code": "1",
            "from": "star",
            "danmu": false

        }
    });
    let classes = JSON.parse(await spider.home(true));
 print(JSON.stringify(classes))


    //测试首页列表
  // let homeVod = JSON.parse(await spider.homeVod())
  //console.log(homeVod)
    //console.debug(JSON.stringify(homeVod));/new-movie/page/2
   //测试类别列表
    //let Category_list=JSON.parse(await spider.category(1, 1, false, {}))
    //print(Category_list)
    // // 测试详情
  let detail1 = JSON.parse(await spider.detail('567079'))
   console.log(detail1)

    /***
     *
     * "HD粤语中英双字$ftp://a.gbl.114s.com:20320/9607/潜行-2023_HD粤语中英双字.mp4#HD国语中英双字$ftp://a.gbl.114s.com:20320/8224/潜行-2023_HD国语中英双字.mp4#BD国粤双语中字$ftp://a.gbl.114s.com:20320/1413/潜行-2023_BD国粤双语中字.mp4"
     */

  // 播放测试

   //let play = JSON.parse(await spider.play(0,"/v_play/bXZfMjAyNzEtbm1fMTQ=.html",0))
  // console.log(play)
    // 测试搜索
    //let search_page = JSON.parse(await spider.search("毒液", false))
   //console.debug(JSON.stringify(search_page))
    // 测试详情
    // if (search_page.list && search_page.list.length > 0) {
    //     for (const k in search_page.list) {
    //         // console.debug(k)
    //         if (k >= 1) break;
    //         let obj = search_page.list[k]
    //         let spVid = search_page.list[k].vod_id
    //         console.debug("===", spVid)
    //         var detail = JSON.parse(await spider.detail(spVid || search_page.list[k].vod_id));

    //         await testPlay(detail);
    //     }
    // }
}


test();

