import React , {Component} from 'react';
import S from './style.scss';
import Validation from 'util/validation'    // 验证文件

let {propsType} = {
    signUpAjax: PT.func,
    signUpMsg: PT.object
}

export default class SignUpPanel extends Component{

    constructor(props){
        super(props);  
        this.state = {
            username:'',
            passw:'',
            confirmpassw:'',
            usernameErr: false,
            passwErr:false,
            confirmpasswErr: false
        } 
        this.usernameChange = this.usernameChange.bind(this) 
        this.passwChange = this.passwChange.bind(this)    
        this.confirmpasswChange = this.confirmpasswChange.bind(this)    
        this.onSubmit = this.onSubmit.bind(this)
        this.validator = new Validation()
        this.validator.addByValue('username',[                         //  密码的校验规则
            {strategy: 'isEmpty', errorMsg: '用户名不能为空'},
            {strategy: 'hasSpace', errorMsg: '用户名不能有空格'},
            {strategy: 'maxLength:6', errorMsg: '用户名最长为6'}
        ])
        this.validator.addByValue('passw',[                         //  密码的校验规则
            {strategy: 'isEmpty', errorMsg: '密码不能为空'},
            {strategy: 'hasSpace', errorMsg: '密码不能有空格'},
            {strategy: 'maxLength:12', errorMsg: '密码最长为12'}
        ])
    }
    usernameChange(ev){
        let{target} = ev
        let msg = this.validator.valiOneByValue('username', target.value);         // 调用验证的方法
        this.setState({
            username:target.value,
            usernameErr: msg
        })
    }
    passwChange(ev){
        let {target} = ev
        let {confirmpasswErr} = this.state
        let msg = this.validator.valiOneByValue('passw', target.value);         // 调用验证的方法
        this.setState({
            passw:target.value,
            passwErr:msg
        })
        if(confirmpasswErr){
            this.confirmpasswChange()
        }
    }
    confirmpasswChange(ev){
        let{passwDom,cfPasswDom} = this.refs
       
        let confirmpasswErr = passwDom.value === cfPasswDom.value? '': '密码不一致'         // 比较两次密码的值

        this.setState({
            confirmpassw:cfPasswDom.value,
            confirmpasswErr
        })
    }
    onSubmit(ev){     // 登录的函数
        ev.preventDefault()
        ev.stopPropagation()
        let {validator} = this
        let {username,passw,confirmpassw} = this.state
        let nameErr = validator.valiOneByValue('username', username)
        let passwErr = validator.valiOneByValue('passw', passw)
        let confirmpasswErr = passw === confirmpassw? '': '密码不一致'
        this.setState({
            nameErr,
            passwErr,
            confirmpasswErr
        })
        if(!nameErr&&!passwErr&&!confirmpasswErr){
            this.props.signUpAjax({
                username,passw,confirmpassw
            })
        }
    }
    render(){
        let {username,passw,confirmpassw,usernameErr,passwErr,confirmpasswErr} = this.state
        let {usernameChange,passwChange,confirmpasswChange,onSubmit} = this
        let {signUpMsg} = this.props
        let resInfo = null    // 用这个去接收接口结果需要渲染的数据
        if(signUpMsg){
            if(signUpMsg.code === 0){
                resInfo = (
                    <div className="ui message positive">
                        <p>{signUpMsg.msg}</p>
                        <p>马上帮你登录</p>
                    </div>
                )
            }else {
                resInfo = (
                    <div className="ui message error">
                        <p>{signUpMsg.msg}</p>
                    </div>
                )
            }
        }
        let usernameErrMsg = usernameErr? (
            <p className={S.err}>{usernameErr}</p>
        ):null
        let passwErrMsg = passwErr? (
            <p className={S.err}>{passwErr}</p>
        ):null
        let confirmpasswErrMsg = confirmpasswErr? (
            <p className={S.err}>{confirmpasswErr}</p>
        ):null
        return (
            <div className={S.sign_panel}>
            {resInfo}
                <form
                    className="ui form"
                    onSubmit = {onSubmit}
                >
                    <div className={`field ${usernameErr? 'error': ''}`}>
                        <input
                            type="text"
                            placeholder="用户名"
                            value = {username}
                            ref="nameDom"
                            onChange = {usernameChange}
                        />
                        {usernameErrMsg}
                    </div>
                    <div className={`field ${passwErr? 'error': ''}`}>
                        <input
                            type="text"
                            placeholder="密码"
                            value = {passw}
                            onChange = {passwChange}
                            ref="passwDom"
                        />
                        {passwErrMsg}
                    </div>
                    <div className={`field  ${confirmpasswErr? 'error': ''}`}>
                        <input
                            type="text"
                            placeholder="确认密码"   
                            value = {confirmpassw}   
                            onChange = {confirmpasswChange}                     
                            ref="cfPasswDom"
                        />
                        {confirmpasswErrMsg}
                    </div>
                    <div className="field">
                        <button type="submit"
                            className="ui button fluid primary"
                        >注册</button>
                    </div>
                </form>
            </div>
        );
    }
}
SignUpPanel.propsTypes = propsType