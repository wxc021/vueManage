export default {
  url: {
    type: String,
  },
  beforeurl: {
    type: String,
    default:  ''
  },
  text: {
    type:String,
    default:  'Upload Image'
  },
  extensions: {
    type: String,
    default:'png.jpg,jpeg,gif,svg,webp'
  },
  inputOfFile: {
    type: String,
    default: 'file'
  },
  crop: {
    type: [String, Boolean],
    default: ''
  },
  cropBtn: {
    type: Object,
    default: function() {
      return {
        ok: '确定',
        cancel: '取消',
      }
    }
  },
  cropRatio: {
    type: String,
    default: '1:1'
  },
  resize: {
    type: [String, Boolean],
    default: false,
  },
  rotate: {
    type: Boolean,
    default: true,
  },
  ResizeBtn: {
    type: Object,
    default: function() {
      return {
        ok: '确定',
        cancel: '取消'
      }
    }
  },
  maxFileSize:{
    type: Number,
    default: 1024 * 1024 * 100,
  },
  maxWidth:{
    type: Number,
  },
  maxHeight:{
    type: Number,
  },
  inputAccept:{
    type: String,
    default: 'image/jpg,image/jpeg,image/png,image/gif'
  },
  isXhr: {
    type: Boolean,
    default: true
  },
  headers: {
    type: Object,
    default: function() {
      return {};
    }
  },
  data: {
    type: Object,
    default: function() {
      return {};
    }
  },
  multiple: {
    type: Boolean,
    default: false
  },
  multipleSize: {
    type: Number,
    default: 0
  },
  minWidth: {
    type: Number,
    default: 50,
  },
  compress: {
    type: [Number, String],
    default: 0,
  },
  credentials: {
    type: [String, Boolean],
    default: true,
  }
}
