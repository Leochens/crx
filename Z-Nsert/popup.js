console.log('zhl test');


//test
$('#get_audio_upload').click(e => {
    console.log(document);
    // 要给content-srcipt 发送消息获得当前页面的dom
    sendMessageToContentScript({ cmd: 'get_audio_upload' }, function (response) {
        console.log('1111',response);
        const audios = JSON.parse(response);
        const content = $('#content');
        $('#import_code_block').css("display", 'none');

        content.empty();

        for (let i in audios) {
            const audio = audios[i];
            const item = $('<div><div>名称:' + audio.name + '</div><input value="' + audio.code + '" /> </div>')
            content.append(item)
        }
    });
});


// $('#aaaa').click(e => {
//     console.log(document);
   
// });



$('#get_audio_qqmusic').click(e => {
    console.log(document);
    // 要给content-srcipt 发送消息获得当前页面的dom
    sendMessageToContentScript({ cmd: 'get_audio_qqmusic' }, function (response) {
        console.log(response);
        const audios = JSON.parse(response);
        const content = $('#content');
        $('#import_code_block').css("display", 'none');

        content.empty();
        for (let i in audios) {
            const audio = audios[i];
            const item = $('<div><div>名称:' + audio.name + '</div><div>代码:<textarea rows="20" cols="30">' + audio.code + '</textarea></div> </div>')
            content.append(item)
        }
    });
});


$('#get_video_upload').click(e => {
    console.log(document);
    // 要给content-srcipt 发送消息获得当前页面的dom
    sendMessageToContentScript({ cmd: 'get_video_upload' }, function (response) {
        console.log(response);
        const videos = JSON.parse(response);
        const content = $('#content');
        $('#import_code_block').css("display", 'none');

        content.empty();
        for (let i in videos) {
            const video = videos[i];
            const item = $(`<div><div><input value="${video.code}" /></div> </div>`)
            content.append(item)
        }
    });
});

$('#show_code_textarea').click(e => {
    const content = $('#content');
    content.empty();
    $('#import_code_block').css("display", 'block');
})
$('#import_code').click(e => {
    // console.log(document);
    // 要给content-srcipt 发送消息获得当前页面的dom
    const value = $('#import_code_area').val();
    console.log(value);
    const content = $('#content');
    content.empty();

    if (!value) return alert("请输入代码！");
    sendMessageToContentScript({ cmd: 'import_code', code: value }, function (response) {
        // $('import_code_block').css("display", 'none');
        alert("导入成功")
    });
});
// $('#update_font_size').click(() => {
//     sendMessageToContentScript({ cmd: 'update_font_size', size: 42 }, function (response) { });
// });

// 获取当前选项卡ID
function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

// 向content-script主动发送消息
function sendMessageToContentScript(message, callback) {
    getCurrentTabId((tabId) => {
        chrome.tabs.sendMessage(tabId, message, function (response) {
            if (callback) callback(response);
        });
    });
}


// 模拟主分支bug修复


// test新功能开发

