require('./webuploader-0.1.5/webuploader.js')
const upF = function(obj) {
	WebUploader.Uploader.register({
        'before-send-file': 'getKey'
    },{
       getKey : function(){
            let deferred = WebUploader.Base.Deferred();
            
            obj.that.axios({
                method: 'get',
                url: 'http://file.djyv4.com/test/token.php'
            })
            .then(res => {
                let needData = res.data;
                WebUploader.uploadData = {
                    uptoken: needData.uptoken
                }
                deferred.resolve();
            })
            .catch(err => {
                deferred.fail( function(){
                    alert(res.msg);
                } );
            })    
            
            return deferred.promise();
       } 
    });
	var uploader = new WebUploader.Uploader({
        swf: '@/webuploader-0.1.5/Uploader.swf',
        pick: obj.dom,
        server: "http://file.djyv4.com/upload.php",
        duplicate: true,
        compress: false,
        auto: true,
        accept: obj.acceptType,
        resize: false,
        chunked:true,
        sendAsBinary:true,
    });

    uploader.on('uploadBeforeSend',function(object, data, headers){
        data.chunkSize = 5*1024*1024;
        data.filehash = uploader.md5File( object.file);
        data.start = object.start;
        data.end = object.end;
        data.filename = object.file.name;
        data.recover = 1;
        data.uptoken = WebUploader.uploadData.uptoken;
    });
    uploader.on( 'fileQueued', function( file ) {
        //that.fileQueued(file);
    });
    uploader.on( 'uploadProgress', function( file, percentage ) {
        //that.uploading(file, percentage);
    });
    uploader.on( 'uploadSuccess', function( file ) {
       // console.log(file)
    });
    uploader.on( 'uploadError', function( file ) {
        //console.log(file)
    });
    uploader.on( 'uploadComplete', function( file ) {
         //that.uploadComplete(file);
    });
    uploader.on('uploadAccept', function(object, ret){
        // console.log(ret);
        if(ret['errno'] !=0){
            uploader.stop(true);
            alert("文件类型错误");
        }
    });
    return uploader;
}
		
export default upF;
