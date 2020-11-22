document.addEventListener('DOMContentLoaded', function () {
	console.log('我被执行了！');
});


function getBody() {
	console.log(document)
	const editor = document.getElementById('ueditor_0');
	const body = editor.contentWindow.document.getElementsByTagName('body')[0];
	return body;
}

// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	// console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
	switch (request.cmd) {
		case 'get_audio_upload': {
			const body = getBody();
			// 获取到的音频节点信息
			const audios = body.getElementsByClassName("js_editor_audio")
			console.log(audios);
			const _audios = [];
			for (let i = 0; i < audios.length; i++) {
				const item = audios[i]
				const code = item.getAttribute('voice_encode_fileid');
				const name = item.getAttribute('name');
				console.log(name, code);
				_audios.push({ name, code });
			}
			console.log(_audios);
			sendResponse(JSON.stringify(_audios));
			break;
		}
		case 'get_audio_qqmusic': {
			const body = getBody();
			// 获取到的音频节点信息
			const audios = body.getElementsByClassName("wx-edui-media-wrp")
			console.log(audios);
			const _audios = [];
			for (let i = 0; i < audios.length; i++) {
				const item = audios[i]
				const name = item.getElementsByClassName('js_editor_qqmusic')[0].getAttribute('music_name');
				_audios.push({ name, code: item.innerHTML });
			}
			console.log(_audios);
			sendResponse(JSON.stringify(_audios));
			break;
		}
		case 'get_video_upload': {
			const body = getBody();
			// 获取到的音频节点信息
			const videoFrames = body.getElementsByClassName("video_iframe");

			const _videos = [];
			for (let i = 0; i < videoFrames.length; i++) {
				const item = videoFrames[i];
				const code = item.getAttribute('data-mpvid');
				const cover = item.getAttribute('data-cover');
				_videos.push({ cover, code });
			}
			console.log(_videos);
			sendResponse(JSON.stringify(_videos));
			break;
		}

		case 'import_code': {
			const body = getBody();
			// 获取到的音频节点信息
			const code = request.code;
			console.log(code);

			body.innerHTML = code;

			sendResponse(true);

			break;
		}

		default:
			{
				// tip(JSON.stringify(request));
				sendResponse('我收到你的消息了：' + JSON.stringify(request));
			}
	}

});

// 主动发送消息给后台
// 要演示此功能，请打开控制台主动执行sendMessageToBackground()
function sendMessageToBackground(message) {
	chrome.runtime.sendMessage({ greeting: message || '你好，我是content-script呀，我主动发消息给后台！' }, function (response) {
		tip('收到来自后台的回复：' + response);
	});
}
