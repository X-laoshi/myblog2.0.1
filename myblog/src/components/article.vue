<template>
	<div>
		<div id="label">
			<button style="background-image: url(../assets/block.png);"  @click="execCommand('bold')"></button>
			<button style="background-image:url(../assets/qxie.png)" @click="execCommand('Italic')" >斜体</button>
			<button class="inco"><input type="color" @click="changeColor()" v-model="color"></button>
			<button class="inco" @click="execCommand('insertUnorderedList')">无序</button>
			<button class="inco" @click="execCommand('formatBlock', '<p>')">段落</button>
			<button class="inco" @click="execCommand('formatBlock', '<blockquote>')">引用</button>
			<button class="inco" @click="createLink()">链接</button>
			<button class="inco" @click="execCommand('insertHorizontalRule')">水平</button>
			<button class="inco" @click="execCommand('undo')">后退</button>
			<button class="inco" @click="execCommand('redo')">前进</button>
			<button class="nav__img inco">
				<input type="file" style="width: 80px;" accept="image/gif, image/jpeg, image/png" @change="insertImg">
			</button>
			<button class="inco" @click="submit">发布</button>
			<button class="inco" ><router-link to="/s">返回</router-link></button>
		</div>
		<div id="title" contenteditable="true" style="height: 50px; width: 800px;margin: 10px auto 10px auto; text-align: left;font-weight:bold;line-height: 50px;font-size: 1.5em;;">
			
		</div>
		<div style="border: 1px solid border-left: ;;">
		<div id="writeArea" contenteditable="true">
			<!--  	 -->
		</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "articl",
		data() {
			return{
				color:'',
				articl:{
					user:'',
					title:'',
					article:'',
					time:''
				}
		}
		},
		methods: {
			// changBack{
				
			// },
			execCommand(name, args = null) {
				document.execCommand(name, false, args);
			},
				
			changeColor(){
				document.execCommand('ForeColor', false, this.color);
			},
			createLink() {
				let url = window.prompt('请输入链接地址');
				if (url) this.execCommand('createLink', url);
			},
			insertImg(e) {
				let reader = new FileReader();
				let file = e.target.files[0];
				reader.onload = () => {
				let base64Img = reader.result;
				this.execCommand('insertImage', base64Img);
				document.querySelector('.nav__img input').value = ''; // 解决同一张图片上传无效的问题
				};
				reader.readAsDataURL(file);
			},
			submit(){
				this.articl.user='18xzhg';
				this.articl.title=document.getElementById("title").innerHTML;
				this.articl.article=document.getElementById("writeArea").innerHTML;
				this.articl.time= new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
				var params = new URLSearchParams();
				params.append('user', this.articl.user);
				params.append('title', document.getElementById("title").innerHTML);
				params.append('article', document.getElementById("writeArea").innerHTML);
				params.append('time', this.articl.time);
				this.axios.post('http://127.0.0.1:7001/article',params)
					.then(res => {
									console.log(res);
									if (res.data.code == '1'){
										alert("发布成功");
									}	
									else if(res.data.code == '-1'){
										alert("发布失败");
									}
								})
			},
	},
}
</script>

<style scoped>
	button {
	width: 60px;
	height: 40px;
	padding:10px;  
	/* background-color:rgba(238, 238, 255, 0.5);  */
	border-color: #357ebd;    
	-moz-border-radius: 10px;  
	-webkit-border-radius: 10px;  
	border-radius: 10px; /* future proofing */  
	-khtml-border-radius: 10px; /* for old Konqueror browsers */  
	text-align: center;  
	vertical-align: middle;  
	border: 1px solid transparent;  
	font-weight: 900;  
	font-size:100%  
	}  
#label{
	display: flex;
	flex-direction: row;
	justify-content: space-around;		
	height: 40px;
	width: 800px;
	margin: 10px auto auto auto;
}
#writeArea{
	height: 800px;
	width: 800px;
	background-color: 0;
	margin:  2px auto auto auto;
	img {
		max-width: 300px;
		max-height: 300px;
		vertical-align: middle;
	}
#title{
		height: 200px;
		width: 800px;
		background-color: 0;
		margin:  2px auto auto auto;
		border: 1px solid black;
	}


.inco{
	height: auto;
	width: 60px;
}
 /* p{
	display: block;
	padding: 16px 16px 0 16px;
	margin: 0 0 24px 0;
	border-left: 8px solid #dddfe4;
	background: #eef0f4;
	overflow: auto;
} */
}
</style>
