<template>
	<div>
		<div id="msg">
			<div id="head-img" style="height: 50px;width: 50px;">
				<img id="mylike"  src="../assets/logo.png" style="height: 100%;width: 100%;" @click="likeits()"/>
			</div>
			<div id="somemsg" >
				<div class="title">
					{{this.article.title}}
				</div>
				<div class="user">
					<span>作者：{{article.user}} </span>
				</div>
				<div>
					<span>时间：{{article.time}}</span>	
				</div>
				<div>
					<span>点赞:{{article.like}}</span>
				</div>
			</div>
		</div>
		<div id="mid" contenteditable="false">
			<div v-html="article.articl"></div>
		</div>
		<div id="likeit">
			<img style="float: right;height: 100%; margin-right: 10%;" src="../assets/nolike.png"/>
		</div>
		<div id="comments">
			<div id="writeComment"  contenteditable="true">
			</div>
			<div>
				<button @click="submit"> 评论 </button>
			</div>
		</div>
		
		<div id="comment">
			<div class="comments" v-for="items in this.comments" :key="items.comments" >
				<div style="height: 50px;width: 50px;">
					<img src="../assets/logo.png" style="height: 100%;width: 100%;"/>
				</div>
				<div style="width: 70%;" v-html="items.comment">
				</div>
			</div>
		</div>
	</div>
	
	
</template>

<script>
	export default {
		name :'tArticle',
		data(){
			return{
				article:this.$route.params.oneArticle,
				usercomment:'',
				comments:'',
				status:false
			}
		},
		created:function(){
			var params = new URLSearchParams();
			params.append('title',this.$route.params.oneArticle.title);
			this.axios.post('http://localhost:7001/commentsList',params).then((res)=>{
				this.comments = res.data;
				localStorage.setItem('userarticle', res.data);
			})
			
			
		},
		beforeDestroy:function(){
			if(this.status == true){
				console.log(this.status);
			}
		},
		methods: {
			submit(){
				if(false == this.$cookies.isKey('username') ){
					alert("请先登录");
				}
				else if(document.getElementById("writeComment").innerHTML == ''){
					alert("你还没有评论");
				}
				else{
					this.usercomment=document.getElementById("writeComment").innerHTML;
					var params = new URLSearchParams();
					let nowtime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
					params.append('user', this.$cookies.get('username'));
					params.append('comment',this.usercomment);
					params.append('time',nowtime);
					params.append('Beuser',this.$route.params.oneArticle.user);
					params.append('title',this.$route.params.oneArticle.title);
					this.axios.post('http://127.0.0.1:7001/comments', params,
					).then(res => {
						if(res.data.code == 1) {
						alert("评论成功");
						document.getElementById("writeComment").innerHTML = '';
						var thiscomment = {
							user:this.$cookies.get('username'),
							comment:this.usercomment,
							time:nowtime,
							Beuser:this.$route.params.oneArticle.user,
							title:this.$route.params.oneArticle.title,
						}
						this.comments.push(thiscomment);
						}
					})
				}
			},
			likeits(){
				console.log(this.status);
			// 	var img = document.getElementById("mylike");
				
			// 	if(this.status == false){
			// 		img.src = "../assets/ylike.png"
			// 		this.status = true;
			// 	}
			// 	else{
			// 		img.src = "../assets/nolike.png"
			// 		this.status = false;
			// 	}
			// 	console.log(this.status);
			}
	}
}	
</script>

<style  scoped>
	button{
		height: 2.5em;
		width: 6em;
		background: #5f55af;
		border: 0;
		margin-left: 20px;
		border-radius:5px ;
		color: white;
		text-transform: uppercase;
		font-size: 0.8rem;
		font-weight: bold;
	}
	button svg{
		display: inline-block;
		vertical-align: middle;
		padding-right: 5px;
	}
	button:hover svg{
		animation: fly 2s ease 1;
	}
	$@keyframes fly{
		0% {transform: translateX(0%);}
		50%{transform: translateX(300%);}
		100%{transform: translateX(0);}
	}
	#msg{
		display: flex;
		flex-direction: row;
		width: 50%;
		margin: 10px auto;
	}
	#mid{
		display: flex;
		width: 50%;
		margin: 1rem auto;
	}
	#comment{
		display: flex;
		width: 50%;
		flex-direction: column;
		margin: 1rem auto;
	}
	#somemsg{
		display: flex;
		margin-left: 20px;
		height: 8rem;
		flex-direction: column;
	}
	#writeComment{
		height: 2em;
		width: 80%;
		border: 2px black solid;
	}
	#comments{
		width: 50%;
		margin: 1em auto;
		display: flex;
	}
	#likeit{
		height: 30px;
		width: 50%;
		margin: 0 auto 10px auto;
	}
	.comments{
		display: flex;
		width: 100%;
		flex-direction: row;
		position: relative;
	}
	.title{
		width: 100%;
		font-size: 30px;
		font-weight: 800;
	}
	.user{
		left: 10px;
		width: 100%;
		font-size: 16px;
		font-weight: 800;
	}
	
</style>
