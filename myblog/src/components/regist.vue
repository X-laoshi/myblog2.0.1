<template>
    <div id="regist">
        <div id="regist_to">
            <form style="height: 180px; background-color:white">
                <h3 style="text-align: center;">
                    个人博客注册
                </h3>
                <table style=" border-radius: 10px; margin: auto auto auto auto;padding: 0;height: 100%;background-color:rgba(255,255,255,0.5)" >
                    <tr style="margin: auto">
                        <div  class="acc">
                            <span>
                                <input type="text" name="username" v-model="registerForm.user" placeholder="账号" @blur="chackUser()"/>
                            </span>
                        </div>
                    </tr>
                    <tr>
                        <span class="acc-error">{{errorlist.userError}} </span>
                    </tr>
                    <tr style="margin: auto">
                        <div  class="key">
                            <span>
                                 <input type="password" name="password" v-model="registerForm.pwd1" placeholder="密码" @blur="chackPsw1()"/>
                            </span>
                        </div>
                    </tr>
                    <tr>
                        <span class="acc-error"> {{errorlist.pswError1}}</span>
                    </tr>
                    <tr style="margin: auto">
                        <div  class="rekey" style="">
                            <span>
                                 <input type="password" name="password" v-model="registerForm.pwd2" placeholder="确认密码" @blur="chackPsw2()"/>
                            </span>
                        </div>
                    </tr>
                    <tr>
                        <span  class="acc-error"> {{errorlist.pswError2}}</span>
                    </tr>
                    <tr>
                        <div  class="rekey" style="">
                            <span>
                                 <input type="text" name="email" v-model="registerForm.ema" placeholder="邮箱" @blur="chackEma()"/>
                            </span>
                        </div>
                    </tr>
					<tr>
						<span class="acc-error"> {{errorlist.emaError}} </span>
					</tr>
                    <tr style="margin:auto">
                        <td colspan="2">
                            <button @click="onSubmit">注册</button>
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
        name: "regist",
        data() {
                return {
                    registerForm: {
                        user: '',
                        pwd1: '',
                        pwd2: '',
						ema: ''
                    }, 
					errorlist: {
						userError:'',
						pswError1:'',
						pswError2:'',
						emaError:'',
					}
					
        }
		},
        methods: {
				
			chackUser(){				//用户验证
				let pattern = /^\w{6,}$/;
				if(this.registerForm.user ==''){
					this.errorlist.userError = "用户名不能为空";
					return false;
				}
				else if(!pattern.test(this.registerForm.user)){
					this.errorlist.userError = "用户名不合法";
					return false;
				}
				else{
					this.errorlist.userError = "";
					return true;
				}
			},
			chackPsw1(){			//密码验证
				let pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
				if(this.registerForm.pwd1 == ''){
					this.errorlist.pswError1 = "密码不能为空";
					return false;
				}
				else if(!pattern.test(this.registerForm.pwd1)){
					this.errorlist.pswError1 = "密码不合法";
					return false;
				}
				else{
					this.errorlist.pswError1 = "";
					return true;
				}
			},
			chackPsw2(){			//第二次密码验证
				if(this.registerForm.pwd2 != this.registerForm.pwd1){
					this.errorlist.pswError2="密码不一致";
					return false;
				}
				else{
					this.errorlist.pswError2="";
					return true;
				}
			},
			chackEma(){				//邮箱验证
				let pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				if(!pattern.test(this.registerForm.ema)){
					this.errorlist.emaError="邮箱格式错误";
					return false;
				}
				else{
					this.errorlist.emaError="";
					return true;
				}
			},
			
            onSubmit() {
				if(this.chackUser()&&this.chackPsw1()&&this.chackPsw2()&&this.chackEma()){
				console.log(this.registerForm);
				var params = new URLSearchParams();
				params.append('user', this.registerForm.user);
				params.append('passworld', md5(this.registerForm.pwd1));
				params.append('email', this.registerForm.ema);
                this.axios.post('http://127.0.0.1:7001/regist', params,
				).then(res => {
					console.log(res);
					if (res.data.code == '1'){
						alert("注册成功");
						this.$cookies.set('username',this.registerForm.user);
						this.$cookies.set('psd',md5(this.registerForm.pwd1));
						this.$router.push('/');
				}	else if(res.data.code == '-1'){
						this.registerForm.user='';
						this.registerForm.pwd1='';
						this.registerForm.pwd2='';
						this.registerForm.ema='';
						alert("用户已存在");
              } 
            });
				}
				else if(!this.chackUser()){
					alert("用户名不合法");
				}
				else if(!this.chackPsw1()||!this.chackPsw2()){
					alert("密码格式错误");
				}
				else if(!this.chackEma()){
					alert("邮箱格式错误");
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
        height: 41px;
        margin: 0;
        width: 250px;
        font-size: 15px;
    }
    input[type="password"]{
        outline-style: none ;
        border: none;
        border-radius: 3px;
        height: 41px;
        width: 250px;
        font-size: 15px;
    }
    input:focus{
        border-color: darkblue;
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
    #regist{
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #regist_to{
        height: 400px;
        width: 400px;
        border: 1px solid gray;
        border-radius: 2px;
        margin-right: auto;
        margin-left: auto;
        background-color:white;
    }
    .acc,.key,.rekey{
        height: 43px;
        width: 250px;
        margin:auto auto 0px auto;
        display: flex;
        border: 1px solid gray;
        border-radius: 3px;
        flex-direction: row;
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
</style>