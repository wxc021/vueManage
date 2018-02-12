// import WebUploader from './webuploader-0.1.5/webuploader.js'
require('./webuploader-0.1.5/webuploader.js') 
let defaults = {
    maxNum: 1,
    type: "img", //"img","video","attach"
    swf: "/js/components/webuploader-0.1.5/Uploader.swf",
    url: "/webtools/",
    accept: null,
    resize: false,
    chunked: true,
    // 如果要分片，分多大一片？ 默认大小为5M.
    chunkSize: 1024*1024*5,
    // 如果某个分片由于网络问题出错，允许自动重传多少次？
    chunkRetry: 3,
	// 去重
    duplicate: true,


    onError: function() {},
    //当图片项目添加完成后回调
    onAddItem: function($item, data) {},
    process: function(file,percentage) {},
    backStatus: function() {},
    debug: false
};

WebUploader.Uploader.register({
    'before-send-file': 'getKey'
},{
   getKey : function(){
        let deferred = WebUploader.Base.Deferred();
        WebUploader.uploadData = {
            uptoken: '8f10dd93:eyJhcHBpZCI6IjhmMTBkZDkzIiwiZGVhZGxpbmUiOjE1MjYyNjMzNzYsInNpemVsaW1pdCI6NTI0Mjg4MDAwLCJhbGxvdyI6WyJpbWFnZVwvcG5nIiwiaW1hZ2VcL2pwZWciLCJhcHBsaWNhdGlvblwveC1kb3NleGVjIiwidGV4dFwvcGxhaW4iLCJhcHBsaWNhdGlvblwvb2N0ZXQtc3RyZWFtIiwiYXBwbGljYXRpb25cL3BkZiIsImFwcGxpY2F0aW9uXC96aXAiLCJpbWFnZVwvZ2lmIl0sImJ1Y2tldCI6ImRqeXY0Iiwibm9uY2UiOiI1OTliOTBkMGExMTg1In0=:YmE4ZDYzNGI0ZGQyZTM2NjRlYmU5ZGNkZGVhYTU0ZWM2MzIzMzM4NQ=='
        }
        console.log(11616)
         deferred.resolve();
        // $.ajax({
        //     url: '/IUser/UploadKey',
        //     type: 'post',
        //     dataType: 'json',
        //     xhrFields: {
        //       withCredentials: true
        //     },
        //     crossDomain: true,
        //     data: {},
        //   })
        //   .done(function(res) {
        //     if (res) {
        //       if (res.code == 200) {
        //         let data = res.data;
        //         WebUploader.uploadData = {
        //             guid : data.guid,
        //             uuid : data.uuid
        //         }
        //         deferred.resolve();
        //       } else {
        //         deferred.fail( function(){
        //             alert(res.msg);
        //         } );
        //       }
        //     };
            
        //   })
        return deferred.promise();
   } 
});

let imgAccept = {
        title: "Image",
        extensions: "gif,jpg,jpeg,png",
        mimeTypes: "image/jpg,image/png,image/jpeg,image/gif"
    },
    videoAccept = {
        title: "Video",
        extensions: "mp4",
        mimeTypes: "video/mp4"
    },
    audioAccept = {
        title: "Audio",
        extensions: "mp3",
        mimeTypes: "audio/mp3"
    },
    attachAccept = null,
    imgItemStr = '\
    <div class="img-item pos-rel fl">\
      <input type="hidden" name="img[]" value="{{ID}}">\
      <img src="{{URL}}" width="100%" height="100%" alt="">\
      <span class="img-item-del"></span>\
    </div>',
    videoItemStr = '\
    <div class="video-item">\
      <input type="hidden" name="video" value="{{ID}}">\
      <div class="video-icon"></div>\
      <p class="file-name">{{NAME}}</p>\
    </div>',
    audioItemStr = '\
    <div class="video-item">\
      <input type="hidden" name="video" value="{{ID}}">\
      <div class="video-icon"></div>\
      <p class="file-name">{{NAME}}</p>\
    </div>',
    attachItemStr = '\
      <div class="attach-item clearfix">\
        <input type="hidden" name="attach[]" value="{{ID}}">\
        <p class="file-name fl">{{NAME}}</p>\
        <div class="item-delete"></div>\
      </div>';

function upload($obj, options) {
    //webuploader object
    this.uploader = null;
    // options 
    this.opt = $.extend({}, defaults, options);
    console.log(this.opt);
    this.$dom = $obj;
    //默认显示的上传按钮
    this.$deBtn = this.$dom.find(".default-btn");
    //上传容器
    this.$box = this.$dom.find(".upload-box");
    //当前上传长度
    this.num = 0;
    //上传按钮
    if (this.opt.type !== "video") {
        this.$addBtn = this.$dom.find(".img-add-btn");
        // this.addBtns a array of DOM which can fire uoload event
        this.addBtns = [this.$deBtn, this.$addBtn];
    } else {
        this.$addBtn = null;
        this.addBtns = [this.$deBtn];
    }
    if (this.opt.type === "img") {
        this.opt.accept = imgAccept;
    } else if (this.opt.type === "video") {
        this.opt.accept = videoAccept;
    } else if (this.opt.type === "attach") {
        this.opt.accept = attachAccept;
    } else if (this.opt.type === "audio") {
    	this.opt.accept = audioAccept;
    }
    this.init();
}
upload.prototype = {
    debug: function() {
        if (this.opt.debug === true) {
            console.info.apply(console, $.makeArray(arguments));
        }
    },
    init: function() {
        this.uploader = new WebUploader.Uploader({
            swf: this.opt.swf,
            // fileNumLimit:this.opt.maxNum,
            server: this.opt.url,
            duplicate: true,
            /* pick : {
                id : $addImgBtn[0]
            },*/
            compress: false,
            auto: true,
            accept: this.opt.accept,
            resize: false,
            formData: {'type':this.opt.type}
        });

        this.bindBtn(this.$deBtn);
        let saveUploader = this.uploader;
        this.uploader.on("uploadSuccess", $.proxy(this.success, this));
        this.uploader.on("error", $.proxy(this.error, this));
        this.uploader.on("uploadError", $.proxy(this.uploadError, this));
        this.uploader.on("beforeFileQueued", $.proxy(this.beforeFileQueued, this));
        this.uploader.on("uploadFinished", $.proxy(this.uploadFinished, this));
        this.uploader.on("startUpload", $.proxy(this.startUpload, this));
        this.uploader.on("uploadProgress", $.proxy(this.uploadProgress, this));
        this.uploader.on("filesQueued", $.proxy(this.filesQueued, this));
        this.uploader.on("uploadBeforeSend", function(object, data, headers){
            if (window.layer) {
                layer.msg('上传中...', {icon: 16, time:0});
            };
            // data.size = object.total;
            data.chunkSize = 1024*1024*5;
            data.filehash = saveUploader.md5File( object.file);
            data.start = object.start;
            data.end = object.end;
            data.filename = object.file.name;

            // data.guid =  WebUploader.uploadData.guid;
            // data.uuid =  WebUploader.uploadData.uuid;
            data.recover = 1;
            data.uptoken = WebUploader.uploadData.uptoken;
            
        });
        $.data(this.$dom[0], this);
    },
    backStatus: function(res) {
    	return res;
    },
    //获取uploader实例
    getUpload: function() {
        return this.uploader;
    },
    bindBtn: function(btn) {
        let id = WebUploader.Base.guid();
        btn.prop("id", id);
        this.uploader.addButton({
            id: "#" + id
        });

    },
    success: function(file, response) {
        this.debug("success", response);
        //上传成功 TODO
        if (this.num === 0&&this.$box.find('.img-add-btn').length<1) {
    		this.$box.append('<div class="img-add-btn add-btn fl fly"></div>');
    		this.$addBtn = this.$box.find('.img-add-btn');
        	this.bindBtn(this.$addBtn);
        }
        this.$box.removeClass('fly');
        this.addItem(response);
    },
    setItem: function(data) {
        if (this.num === 0) {
            this.$box.show();
            if (this.$addBtn) {
                this.bindBtn(this.$addBtn);
            }
        }
        this._addItem(data);
    },
    beforeFileQueued: function(file) {
        this.uploader.reset();
        this.debug("beforeFileQueued");
        // if (file.size) {
        // 	console.log(file.size)
        // };
    },
    uploadProgress: function(file, percentage) {
    	this.opt.process(file, percentage);
        this.debug("uploadProgress", percentage)
    },
    filesQueued: function(files) {
        this.debug(this.num, files.length, this.opt.maxNum);
        if (this.num + files.length > this.opt.maxNum) {
            let index = files.length - 1;
            for (index; index > -1; index--) {
                this.uploader.cancelFile(files[index]);
            }
            return this.opt.backStatus('超过了文件最大个数的限制了');
            this.opt.onError("overlimitlength");
        }
    },
    startUpload: function() {
        this.debug("startUpload");
    },
    uploadFinished: function() {
        if (window.layer) {
            layer.closeAll();
        };
        this.debug("uploadFinished");
    },
    error: function(type) {
        this.opt.onError(type);
    },
    uploadError: function(type) {
        this.opt.onError(type);
    },
    addItem: function(res) {
        let data = res.data;
        let self = this;
        if (res.code == 200) {
        	let $obj = null;
            // console.log(this.opt.type, data);
            if (this.opt.type === "img") {
                $obj = $(imgItemStr.replace("{{URL}}", data.original).replace("{{ID}}", data.value));
                $obj.insertBefore(this.$addBtn);
            } else if (this.opt.type === "video") {
                $obj = $(videoItemStr.replace("{{NAME}}", data.name).replace("{{ID}}", data.value));
                $obj.prependTo(this.$box);
            } else if (this.opt.type === "attach") {
                $obj = $(attachItemStr.replace("{{NAME}}", data.name).replace("{{ID}}", data.value));
                $('.upload-box').append($obj);
                // $obj.insertBefore(this.$addBtn);
            } else if(this.opt.type === 'audio') {
            	$obj = $(audioItemStr.replace("{{NAME}}", data.name).replace("{{ID}}", data.value));
                $obj.prependTo(this.$box);
            }
            $obj.one('click', ".img-item-del", function() {
                self.deleteItem($(this));
            });
            this.opt.onAddItem($obj, data);
            this.num++;
            this.$addBtn.removeClass('fly');
            if ((this.num === this.opt.maxNum)&&this.opt.maxNum==1) {
            	 this.$addBtn.addClass('fly');
                return;
            }
        } else {
            return this.opt.backStatus(res.msg);
        }
    },
    _addItem: function(data) {
        let self = this;
        if (data instanceof Array) {
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                if (this.opt.type === "img") {
                    let $obj = $(imgItemStr.replace("{{URL}}", item.url).replace("{{ID}}", item.value));
                    $('.img-bag').append($obj);
                    // $obj.insertBefore(this.$addBtn);
                } else if (this.opt.type === "video") {
                    let $obj = $(videoItemStr.replace("{{NAME}}", item.name).replace("{{ID}}", item.value));
                    $obj.prependTo(this.$box);
                } else if (this.opt.type === "attach") {
                    let $obj = $(attachItemStr.replace("{{NAME}}", item.name).replace("{{ID}}", item.value));
                    $('.upload-box').append($obj);
                // $obj.insertBefore(this.$addBtn);
                }
                $obj.one('click', ".item-delete", function() {
                    self.deleteItem($(this));
                });
                this.opt.onAddItem($obj, item);
                this.num++;
                if (this.num === this.opt.maxNum) {
                    if (this.opt.type !== "video") {
                        this.$addBtn.hide();
                    }
                    return;
                }
            }
        }
        else {
            if (this.opt.type === "img") {
                let $obj = $(imgItemStr.replace("{{URL}}", data.url).replace("{{ID}}", data.value));
                $obj.insertBefore(this.$addBtn);
            } else if (this.opt.type === "video") {
                let $obj = $(videoItemStr.replace("{{NAME}}", data.name).replace("{{ID}}", data.value));
                $obj.prependTo(this.$box);
            } else if (this.opt.type === "attach") {
                let $obj = $(attachItemStr.replace("{{NAME}}", data.name).replace("{{ID}}", data.value));
                $obj.insertBefore(this.$addBtn);
            }
            $obj.one('click', ".item-delete", function() {
                self.deleteItem($(this));
            });
            this.opt.onAddItem($obj, data);
            this.num++;
            if (this.num === this.opt.maxNum) {
                if (this.opt.type !== "video") {
                    this.$addBtn.hide();
                }
                return;
            }
        }
    },
    deleteItem: function($obj) {
        $obj.parent().remove();
        this.num--;
        if (this.num === 0) {
            // this.$box.hide();
            this.$box.addClass('fly');
        } else {
            this.$addBtn.show();
        }
    }
}

$.extend($.fn, {
    upload: function(options) {
        // if nothing is selected, return nothing; can't chain anyway
        if (!this.length) {
            if (options && options.debug && window.console) {
                console.warn("Nothing selected, can't validate, returning nothing.");
            }
            return;
        }
        if (this.length > 1) {
            return this.each(function() {
                let obj = $.data(this);
                if ($.isEmptyObject(obj)) {
                    return new upload($(this), options);
                }
            });
        } else if (this.length === 1) {
            let obj = $.data(this[0]);
            if (!$.isEmptyObject(obj) && $.type(options) === "string") {
                let arg = $.makeArray(arguments);
                arg.shift();
                return obj[options].apply(obj, arg);
            } else {
                obj = new upload(this, options);
            }
            return obj;
        }
    }
});

export default upload