export default {
    setData(key,data) {        
        this.__init();
        this.dataCache[key] = {
            src: data,
            time: (new Date()).getTime()
        };
        this.__setCache();
    },
    
    __init() {
        if (typeof(this.dataCache) == 'undefined' ){
            if(localStorage.userCache) {
                this.dataCache = JSON.parse(localStorage.userCache)['data'];
            }else{
                this.dataCache = {};
            }  
        };
    },
    
    __setCache(data) {
        //记录json对象中是否出现过，再次出现的话，终止序列化
        // var see = [];
        // localStorage.userCache = JSON.stringify({
        //     userid: window.userid,
        //     data: this.dataCache
        // }, function(key, value) {
        //     if (typeof value === 'object' && value !== null) {
        //         if ( see.indexOf(value) !== -1  ) {
        //             //发现循环引用的丢弃不要
        //             return;
        //         }
        //         //留下我们需要转化的
        //         see.push(value);
        //     }
        //     return value;
        // });
        // //销毁收集结果
        // see = null;
        try {
            localStorage.userCache = JSON.stringify({
                userid: window.userid,
                data: this.dataCache
            }); 
        } catch(err) {
            return;
        }
        
    },
    
    __emptyCache() {
        localStorage.userCache = null;    
    },
    
    __findItem(query) {
        for(key in this.dataCache) {
            if(query == key) {
                return this.dataCache[key];
            }
            
        }
        return false;
    },
    _deleteItem(query){
        for(key in this.dataCache) {
            if(query == key) {
                this.dataCache[key]='';
            } 
        }
    },
    __getItemData(key) {
    
    },
    deleteItem(key){
        this.__init();
        if (!key) {
            return console.warn('Warning: The key is not found');
        }else{
            this._deleteItem(key);
        }
    },    
    getData(key) {
        this.__init();
        if(!key) {
            return console.warn('Warning: The key is not found');
        }
        return this.__findItem(key)['src'];  
    },
    
    // 只使用一次
    userOnce(key) {
        if(!key) {
            return console.warn('Warning: The key is not found');
        }
        var key = this.__findItem(key);
        if(key!==false) {
            var data = this.dataCache[key];
            
            this.this.dataCache[key] = null;
            return data;
            
        }
        
        return false; 
    }
}