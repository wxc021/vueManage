export default class Exports {
	constructor(datas, bindthis, orgin) {
		this.datas = datas;
		this.bindthis = bindthis;
		this.orgin = orgin;
	}
	getKey(data) {
		if (Object.prototype.toString.call(data) === '[object Object]') {
			return Object.keys(data);
		}
	}
	getValue(data) {
		if (Object.prototype.toString.call(data) === '[object Object]') {
			return Object.values(data);
		}
	}
	getInner(data) {
		let temp = this.getKey(data);
		let arr = [];
		this.getValue(data).forEach((item,index) => {
			arr.push({
				key: temp[index],
				value: item,
				size: item.length
			})
		})
		return arr;
	}
	initData() {
		let that = this;
		this.bindthis[this.orgin] = [];
		this.getValue(this.datas).forEach(item => {
			that.bindthis[that.orgin].push({
				title: item.title,
				value: that.getInner(item.data)
			})
		})
		this.bindthis['init']();
	}
}