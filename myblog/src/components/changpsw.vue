<template>
	<div id="changPsw">
		<div id="changPsw-from">

		<form style="height: 180px; background-color:white">
			<h3 style="text-align: center;">
				修改密码
			</h3>
			<table style=" border-radius: 10px; margin: auto auto auto auto;padding: 0;height: 100%;background-color:rgba(255,255,255,0.5)" >
				<tr style="margin: auto">
					<div  class="acc">
						<span>
							<input type="text" name="username" v-model="changForm.user" placeholder="账号" @blur="chackUser()"/>
						</span>
					</div>
				</tr>
				<tr>
					<span  class="acc-error">{{errorlist.userError}}</span>
				</tr>
				<tr>
					<div  class="rekey" style="">
						<span>
							<input type="text" name="email" v-model="changForm.ema" placeholder="邮箱" @blur="chackEma()"/>
						</span>
					</div>
				</tr>
				<tr>
					<span class="acc-error"> {{errorlist.emaError}} </span>
				</tr>
				<tr style="margin: auto">
					<div  class="key">
						<span>
							<input type="password" name="password" v-model="changForm.pwd" placeholder="密码" @blur="chackPsw()"/>
						</span>
					</div>
				</tr>
				<tr>
					<span  class=acc-error>{{errorlist.pswError}}</span>
				</tr>
				
				<tr style="margin:auto">
					<td>
						<button @click="change">修改</button>
					</td>
				</tr>
			</table>
		</form>
		</div>
	</div>
</template>

<script>
	import md5 from 'js-md5';//密码加密
	export default {
		name: "changpsw",
		data() {
			return {
				changForm: {
					user: '',
					pwd: '',
					ema: ''
				}, 
				errorlist: {
					userError:'',
					pswError:'',
					emaError:'',
				}
			}
		},
		methods:{
			chackUser(){				//用户验证
				let pattern = /^\w{6,}$/;
				if(this.changForm.user ==''){
					this.errorlist.userError = "用户名不能为空";
					return false;
				}
				else if(!pattern.test(this.changForm.user)){
					this.errorlist.userError = "用户名由6~20位字符组成";
					return false;
				}
				else{
					this.errorlist.userError = "";
					return true;
				}
			},
			chackEma(){				//邮箱验证
				let pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				if(!pattern.test(this.changForm.ema)){
					this.errorlist.emaError="邮箱格式错误";
					return false;
				}
				else{
					this.errorlist.emaError="";
					return true;
				}
			},
			chackPsw(){			//密码验证
				let pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
				if(this.changForm.pwd == ''){
					this.errorlist.pswError = "密码不能为空";
					return false;
				}
				else if(!pattern.test(this.changForm.pwd)){
					this.errorlist.pswError = "密码名由6~20位字母和数字组成";
					return false;
				}
				else{
					this.errorlist.pswError = "";
					return true;
				}
			},
			change(){
				if(this.chackUser()&&this.chackEma()&&this.chackPsw()){			//提交到后台处理
					var params = new URLSearchParams();
					
					params.append('user', this.changForm.user);
					params.append('email', this.changForm.ema);
					params.append('passworld', md5(this.changForm.pwd));

					this.axios.post('http://localhost:7001/change', params).then(res => {
						if (res.data.code == '-1') {
							alert("用户不存在");
						}
						if (res.data.code == '0') {
							alert("邮箱错误");
						}
						if (res.data.code == '1') {
							alert("修改成功");
							this.$router.history.go(-1);
						}
					})
				}
			}
		},
}
</script>

<style scoped>
	input[type="text"]{
		outline-style: none ;
		border: none;
		border-radius: 3px;
		height: 40px;
		margin: auto auto auto 2px;
		width: 150px;
		font-size: 15px;
	}
	input[type="password"]{
		outline-style: none ;
		border: none;
		border-radius: 3px;
		height: 40px;
		width: 150px;
		font-size: 15px;
	}
	.acc:focus{
		border-color: #66afe9;
		outline: 0;
		-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
		box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
	}
	button{
		box-sizing: border-box;
		text-align:center;
		font-size:1.4em;
		color: white;
		height:40px;
		border-radius:4px;
		margin: auto;
		border:1px solid #c8cccf;
		background-color: #1760d7;
		display:block;
		outline:0;
		padding:0 1em;
		text-decoration:none;
		width:250px;
	}
	#changPsw{
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	#changPsw-from{
		height: 400px;
		width: 400px;
		border: 1px solid gray;
		border-radius: 2px;
		align-items: center;
		justify-content: center;
	}
	.acc,.key,.rekey{
		height: 43px;
		width: 250px;
		display: flex;
		margin: 0 auto 0 auto;
		border: 1px solid gray;
		border-radius: 3px;
		flex-direction: row;
		align-content: center;
		justify-content: baseline;
		background-color: white;
	}
	.acc-error{
		margin:auto 92.4px auto 92.4px;
		color: red;
		text-align: center;
		font-size: 12px;
	}
	.account{
		background-image: url("../assets/account.png");
		background-repeat: no-repeat;
		width: 30px;
		height: 40px;
		margin:2px 5px 2px 5px;
	}
	.keyword{
		background-image: url("../assets/keyword.png");
		background-repeat: no-repeat;
		width: 30px;
		height: 40px;
		margin:2px 5px 2px 5px;
	}
	.account{
		background-image: url("../assets/account.png");
		background-repeat: no-repeat;
		width: 30px;
		height: 40px;
		margin:2px 5px 2px 5px;
	}
</style>
