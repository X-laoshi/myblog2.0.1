<template>
	<div id="main">
		<div id="head"> 
			<div id="loginB">
				<router-link to="/Login">登录</router-link>
			</div>
			<div id="writeblog">
				<a @click="gowrite()">写博客</a>
			</div>
			
		</div>
		<div class="nav">
			<ul>
				<li><router-link to=""><span>HTNL</span></router-link></li>
				<li><router-link to=""><span>CSS</span></router-link></li>
				<li><router-link to=""><span>JavaScript</span></router-link></li>
				<li><router-link to=""><span>Vue</span></router-link></li>
			</ul>
		</div>
		<div>
			<div class="art_items" v-for = "items in this.showArticels" :key="items.articels" @click="goto(items)">
				<div style="display: flex; flex-direction: row; justify-content: space-between;">
					<span style="font-size: 18px;font-weight: 700;">标题：{{items.title}}</span>
					<span style="font-size: 18px;font-weight: 700;"> 作者：{{items.user}}</span>
				</div>
				<div style="display: flex;flex-direction: row;">
					<p style="width: 20px;"></p>
					<span style="font-size: 15px;font-weight: 500;" v-html="items.articl.substring(0,104)"></span>
				</div>
				<div>
					<span style="margin-left: 580px; font-size: 14px;font-weight: 700;"> 时间：{{items.time}}</span>
				</div>
			</div>
			
		</div>
		<div class="page-bar">
			<ul>
				<li v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a></li>
				<li v-if="cur==1"><a >上一页</a></li>
				<li v-for="(indexs,i) in this.all" :key='i' v-bind:class="{ 'active': cur == index}">
				<a v-on:click="btnClick(indexs)">{{ indexs }}</a>
			</li>
				<li v-if="cur!=all"><a v-on:click="cur++,pageClick()">下一页</a></li>
				<li v-if="cur == all"><a >下一页</a></li>
				<li><a>共<i>{{this.all}}</i>页</a></li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
  name: 'index',
	data() {
			return {
				kongge:'    ',
				articels:'',
				items:'',
				showArticels:'',
				index:5,
				all:'',
				cur:1,
			}
	},  

   created:function(){
		this.axios.post('http://localhost:7001/articleList').then((res)=>{
			this.articels = res.data.result;
			console.log(this.articels);
			this.all=Math.ceil(res.data.result.length/4);
			this.cur=1;
			
			this.showArticels=this.articels.slice((this.cur-1)*4,(this.cur-1)*4+5);
			// this.index.push(i+1);
			
		})
		console.log( this.$cookies.isKey('username'));
		console.log( this.$cookies.isKey('psd'));
	},
	methods:{
		pageClick(){
			this.showArticels=this.articels.slice((this.cur-1)*4,(this.cur-1)*4+5);
		},
		btnClick: function(data){//页码点击事件
			if(data != this.cur){
			this.cur = data;
			this.showArticels=this.articels.slice((this.cur-1)*4,(this.cur-1)*4+5);
			}
		},
		goto(s){
			let oneArticle = s; 
			this.$router.push({name:'tArticle' ,params:{oneArticle}});
		},
		gowrite(){
			if(false == this.$cookies.isKey('username') ){
				alert("请先登录");
			}
			else{
				this.$router.push('/article');
			}
		}
	},
}
</script>

<style>
	#main{
		height: 100%;
		width: 100%;
		background: url("../assets/inbexBack.jpg");
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
	}
	#head{
		width: 800px;
		height: 100px;
		margin: 0 auto 10px auto;
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
		align-items: center;
	}
	#writeblog{
		display: flex;
		width: 80px;
		height: 40px;
		justify-content: center;
		align-items: center;
		font-weight: 1000;
		font-size:20px;
		border: 1px solid #000000;
		background-color:rgba(238, 238, 255, 0.2);
	}
	#loginB{
		display: flex;
		width: 80px;
		height: 40px;	
		justify-content: center;
		align-items: center;
		font-weight: 1000;
		font-size:20px;
		border: 1px solid #000000;
		background-color:rgba(184, 200, 255, 0.2);
	}
	li {
	list-style: none ;
	}
	a {
	text-decoration: none;
	}
	.nav{
		width:800px;
		height: 45px;
		color: black;
		background-color:rgba(20, 161, 255, 0.5);
		margin: 10px auto auto auto;
	}
	.nav li{
		float: left;
		margin: 0 40px;
		padding-top:2px;
	}
	.nav a{
	height: 33px;
	padding-left: 10px;
	color: #000000;
	display: block;
	line-height: 33px;
	font-weight: 700;
	font-size:14px;
	}
	.nav span {
	height: 33px;
	display: block;
	padding-right: 10px;
	}
	#wirte{
		height: 30px;
		width: 50px;
		background-color: #b9b0b2;
	}
	.art_items{
		display: flex;
		flex-direction: column;
		height: 80px;
		width: 800px;
		margin: 20px auto 10px auto;
		background-color:rgba(:;, 255, 255, 0.8);
	}
	ul.pagination li {display: inline;}
	
	ul.pagination li a {
	color: black;
	float: left;
	padding: 8px 16px;
	text-decoration: none;
	transition: background-color .3s;
	border: 1px solid #ddd;
	}
	
	ul.pagination li a.active {
	background-color: #4CAF50;
	color: white;
	border: 1px solid #4CAF50;
	}
	
	ul.pagination li a:hover:not(.active) {background-color: #ddd;}
	p{
		margin-block-end: 0;
		margin-block-start: 0;
		height: 40px;
		line-height: 40px;
		font-size: 28px;
		font-weight: 800;
	}
	.page-bar{
		margin:15px auto;
		height: 50px;
		width: 800px;
	}
	ul,li{
	margin: 0px;
	padding: 0px;
	}
	li{
	list-style: none
	}
	.page-bar li:first-child>a {
	margin-left: 0px
	}
	.page-bar a{
	border: 1px solid #ddd;
	text-decoration: none;
	position: relative;
	float: left;
	padding: 6px 12px;
	margin-left: -1px;
	line-height: 1.42857143;
	color: #5D6062;
	cursor: pointer;
	margin-right: 20px;
	}
	.page-bar a:hover{
	background-color: #eee;
	}
	.page-bar a.banclick{
	cursor:not-allowed;
	}
	.page-bar .active a{
	color: #fff;
	cursor: default;
	background-color: #E96463;
	border-color: #E96463;
	}
	.page-bar i{
	font-style:normal;
	color: #d44950;
	margin: 0px 4px;
	font-size: 12px;
	}
</style>
