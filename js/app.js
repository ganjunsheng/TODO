(function (window) {
	'use strict';

	var vm = new Vue({
		el: '#app',
		data: {
			list: [],
			newText: '',
			editIndex: '',
			listStatus: 'all'
		},

		methods: {
			addList() {
				if (this.newText.trim() == '') {
					console.log('不能为空');
					this.newText = '';
					return
				}
				this.list.push({
					text: this.newText.trim(),
					isCompleted: false
				})
				// 清空文本输入框的内容
				this.newText = ''

			},
			isShow(v) {
				switch (this.listStatus) {
					case 'all':
						return true
						break;
					case 'active':
						// if(v.isCompleted == false) return true
						return !v.isCompleted
						break;
					case 'completed':
						// if(v.isCompleted == true) return true
						return !v.isCompleted
						break;
					default:
						break;
				}
			}
		},

		// 实现全选操作
		computed: {
			// 方法一
			// toggleAll(){
			// 	// 遍历list列表 这是通过选中所有的子元素从而使全选按钮高亮
			// var tempList = 	this.list.filter(v=>{
			// 		return !v.isCompleted
			// 	})
			// 	console.log(tempList.length);
			// 	// return tempList.length == 0?true:false =>可以简写为下面
			// 	return !tempList.length
			// }

			// 方法二
			toggleAll: {

				// 通过点击全选按钮来控制下面的所有的子元素
				// 设置
				set(newValue) {
					console.log(newValue);
					this.list.forEach(v => {
						v.isCompleted = newValue
					});

				},
				// 获取
				// 通过选中所有的子元素从而使全选按钮高亮
				get() {
					// 通过判断实现当删除完所有项的时候，全选按钮恢复默认样式
					if(this.list.length ==0){
						return false
					}
					var tempList = this.list.filter(v => {
						return !v.isCompleted
					})
					return !tempList.length
				}
			}
		},
		// 实现数据持久化本地存储
		updated() {
			localStorage.setItem('todoList',JSON.stringify(this.list))
		},
		mounted () {
			var tmpList = JSON.parse(localStorage.getItem('todoList'))
			if(tmpList){
				this.list = tmpList
			}
			// else{
			// 	this.list = []
			// }
		}
	})

})(window);
