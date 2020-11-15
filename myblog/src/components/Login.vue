<template>
    <div id="login">
        <div id="login_to">
            <form style="height: 180px; background-color:white" >
                <h3 style="text-align: center;">
                    个人博客登录
                </h3>
                <table style=" border-radius: 10px; margin: auto auto auto auto;padding: 0;height: 100%;background-color:rgba(255,255,255,0.5)" >
                    <tr style="margin: auto;display: flex;justify-content: center;">
                        <div  class="acc">
                            <span>
                                <input type="text" name="username" v-model="loginForm.user" placeholder="账号" @blur="chackUser()"/>
                            </span>
                        </div>
                    </tr>
                    <tr>
						<span  class="acc-error">{{errorlist.userError}}</span>
					</tr>
                    <tr style="margin: auto">
                        <div  class="key">
                            <span>
                                 <input type="password" name="password" v-model="loginForm.pwd" placeholder="密码" @blur="chackPsw()"/>
                            </span>
                        </div>
                    </tr>
                    <tr>
                        <span  class=acc-error>{{errorlist.pswError}}</span>
                    </tr>
					<tr style="margin:auto;display: flex;justify-content:space-around;">
						<td style="display: flex;">
							<router-link to="/changPsw" >忘记密码</router-link>
						</td>
						<td style="display: flex;">
							<router-link to="/regist" >注册</router-link>
						</td>
					</tr>
                    <tr style="margin:auto">
                        <td colspan="2">
                            <button @click="login">登录</button>
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
        name: "Login",
		data() {
				return {
					loginForm: {
						user: '',
						pwd: ''
					}, 
					errorlist: {
						userError:' ',
						pswError:' ',
					}
				}
		},
		methods:{
			chackUser(){				//用户验证
				let pattern = /^\w{6,}$/;
				if(this.loginForm.user ==''){
					this.errorlist.userError = "用户名不能为空";
					return false;
				}
				else if(!pattern.test(this.loginForm.user)){
					this.errorlist.userError = "用户名由6~20位字符组成";
					return false;
				}
				else{
					this.errorlist.userError = "";
					return true;
				}
			},
			chackPsw(){			//密码验证
				let pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
				if(this.loginForm.pwd == ''){
					this.errorlist.pswError = "密码不能为空";
					return false;
				}
				else if(!pattern.test(this.loginForm.pwd)){
					this.errorlist.pswError = "密码名由6~20位字母和数字组成";
					return false;
				}
				else{
					this.errorlist.pswError = "";
					return true;
				}
			},
			login(){
				if(this.chackUser()&&this.chackPsw()){
				console.log(this.loginForm);
				var params = new URLSearchParams();
				params.append('user', this.loginForm.user);
				params.append('passworld', md5(this.loginForm.pwd));
				this.axios.post('http://localhost:7001/login', params).then(res => {	//返回值代表状态 1-不存在 0密码错误  1-存在且密码正确
					if (res.data.code == '-1') {
						alert("用户不存在");
						this.$router.push('/');
					}
					else if(res.data.code == '0'){
						alert("密码错误");
					} 
					else if(res.data.code == '1'){
						alert("登录成功");
						this.$cookies.set('username',this.loginForm.user);
						this.$cookies.set('psd',md5(this.loginForm.pwd));
						this.$router.push('/');
					} 
			})
		}
	},
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
    #login{
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #login_to{
        height: 300px;
        width: 400px;
        border: 1px solid gray;
        border-radius: 2px;
        margin-right: auto;
        margin-left: auto;
        background-color:white;
    }
    .acc,.key{
        height: 43px;
        width: 250px;
        border: 1px solid gray;
		margin: auto;
        border-radius: 3px;
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