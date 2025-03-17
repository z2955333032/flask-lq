
export class VodList {
    constructor() {
        this.vod_id = ""        //id
        this.vod_name = ""      //名称
        this.vod_pic = ""   //图片
        this.vod_remarks = ""  //备注
    }
}

export class VodDetail extends VodList {
    constructor() {
        super();
        this.type_name = ""      // 类别
        this.vod_year = ""      // 年份
        this.vod_area = ""      // 地区
        this.vod_actor = ""     // 导演
        this.vod_director = ""      // 演员
        this.vod_content = ""  // 剧情
        this.vod_play_from = ""  // 播放格式
        this.vod_play_url = ""  // 播放连接
    }
}



