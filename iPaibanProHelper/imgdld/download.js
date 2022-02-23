let img_base64
let urls = [];
let base64_arr = []


async function getImgUrls() {
    console.log(window.location.search);
    const url = window.location.search.split("?code=")[1];

    $.ajax({
        url: 'https://x.ipaiban.com/api_v2/media/getImagesFromWXArticle/' + url
    }).then(async r => {
        console.log(r);
        if (r.code === 99) {
            $('#errormsg').html('温馨提示:请先点击登录<a style="text-decoration:underline" href="http://x.ipaiban.com" target="_blank"> iPaiban Pro编辑器 </a>后，刷新本页，再使用此功能');
        } else {
            urls = r;
            let html = ''
            for (let i = 0; i < urls.length; i++) {
                html += '<img class="img-item" src=' + urls[i] + '>'
                console.log('一共' + urls.length + '个,当前索引' + (i + 1))
                $('#counter').html(`获取图片中: ${(i + 1)} / ${ urls.length}`)
                base64_arr.push(await fetch(urls[i]));
            }
            $('#imgs').append(html)
            $('#counter').html(`共${urls.length}张图片！`)
            $('#downloadbtn').css('display', 'block');

        }
    }).catch(e => {
        console.log(e);
    })

}
async function download() {
    zipImages(base64_arr)
}
getImgUrls();

function fetch(url) {
    let suffix = ''
    if (url.indexOf('wx_fmt') > -1) {
        suffix = url.substr(url.indexOf('wx_fmt=') + 7)
    } else {
        if (url.indexOf('mmbiz_png') > -1) {
            suffix = 'png'
        } else if (url.indexOf('mmbiz_gif') > -1) {
            suffix = 'gif'
        } else if (url.indexOf('mmbiz_jpg') > -1) {
            suffix = 'jpg'
        } else if (url.indexOf('mmbiz_jpeg') > -1) {
            suffix = 'jpeg'
        }

    }

    return new Promise((resolve, reject) => {

        $.ajax({
                url,
                xhrFields: {
                    responseType: 'blob' // 指定响应数据类型为blob格式
                },
                // beforeSend: function(request) {
                //     request.setRequestHeader("origin","https://www.baidu.com");
                //  },


            })
            .then(blob => {
                let reader = new FileReader();
                reader.onloadend = function () {
                    img_base64 = reader.result
                    img_base64 = img_base64.replace(/^data:image\/(png|jpg|gif|jpeg);base64,/, "")
                    resolve({
                        img_base64,
                        name: suffix
                    })
                };
                reader.readAsDataURL(blob);
            })
            .catch(console.error);


    })

}


function zipImages(base64_arr) {
    // 初始化一个zip打包对象
    var zip = new JSZip();
    // 创建一个被用来打包的名为Hello.txt的文件
    // zip.file("Hello.txt", "Hello World\n");
    // 创建一个名为images的新的文件目录
    // var img = zip.folder("images");

    // 这个images文件目录中创建一个base64数据为imgData的图像，图像名是smile.gif
    // img.file("smile.gif", imgData, {base64: true});

    base64_arr.forEach((e, index) => {
        console.log(e.img_base64)
        zip.file((index + 1) + '.' + e.name, e.img_base64, {
            base64: true
        });
    })

    $('#counter').html(`打包中...`);


    // 把打包内容异步转成blob二进制格式
    zip.generateAsync({
        type: "blob"
    }).then(function (content) {
        // content就是blob数据，这里以example.zip名称下载    
        // 使用了FileSaver.js  
        saveAs(content, "images.zip");
        $('#counter').html(`下载成功`);

    });

    /*
    最终下载的zip文件包含内容如下：
    Hello.txt
    images/
        smile.gif
    */
}


document.getElementById("downloadbtn").addEventListener('click', download);