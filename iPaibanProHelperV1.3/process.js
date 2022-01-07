var list = [
    [{
            id: "get_audio_upload",
            title: "提取音频",
            tip: "本地上传",
            bgColor: 'rgb(241, 244, 255)'
        },
        {
            id: "get_audio_qqmusic",
            title: "提取音频",
            tip: "QQ音乐",
            bgColor: 'rgb(241, 244, 255)'

        },
    ],
    [{
            id: "get_video_upload",
            title: "提取视频",
            tip: "本地上传",
            bgColor: 'rgb(241, 255, 242)'

        },
        {
            id: "get_video_tx",
            title: "提取视频",
            tip: "腾讯视频",
            bgColor: 'rgb(241, 255, 242)'
        },

    ],
    [{
            id: "get_mimi_id",
            title: "提取小程序",
            tip: "文字小程序",
            bgColor:'rgb(252, 255, 241)'
        },
        {
            id: "get_open_account_id",
            title: "提取公众号",
            tip: "公众号id",
            bgColor:'rgb(255, 246, 241)'

        },
        {
            id: "get_video_account",
            title: "提取视频号",
            tip: "视频号卡片",

        }

    ],
    [{
            id: "get_mimi_card",
            title: "提取小程序",
            tip: "小程序卡片",
            bgColor:'rgb(252, 255, 241)'
        },
        {
            id: "get_open_account_code",
            title: "提取公众号",
            tip: "公众号代码",
            bgColor:'rgb(255, 246, 241)'
        },
        {
            id: "get_location",
            title: "地理位置",
            tip: "文字地理位置,"
        }
    ],
    [{
            id: "clear_code",
            title: "清空图文",
            tip: "清空编辑区",
        },
        {
            id: "show_code_textarea",
            title: "导入代码",
            tip: "清空导入",
        }
    ]
]
// 获取渲染根组件
const root = document.getElementById("root");

function renderItem(col,itemObj) {

    var title = document.createElement('div');
    title.className = 'title'
    title.innerHTML = itemObj.title;
    var tip = document.createElement('div');
    tip.className = 'tip'
    tip.innerHTML = itemObj.tip;
    col.append(title);
    col.append(tip);

}

function renderRow(list) {
    var count = list.length;
    var row = document.createElement('div');
    row.className = "row"
    for (let i = 0; i < count; i++) {
        var item = list[i];
        var col = document.createElement('div');
        col.className = 'item'
        col.style.backgroundColor = item.bgColor;
        col.style.width = (100 / count) + '%';
        col.id = item.id;
        renderItem(col,item);
        row.append(col);
    }
    root.append(row);
}

function load() {
    for (let i = 0; i < list.length; i++) {
        var row = list[i];
        renderRow(row);
    }
}
load()