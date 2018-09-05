import React , {Component} from 'react';
import Panel from './Panel';
import S from './style.scss';
import Validation from 'util/validation'    // 验证文件

let propsTypes = {
    signInAjax:PT.func,
    signInMsg:PT.object
}
export default class SignInPanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            passw:'',
            nameErr: false,
            passwErr:false
        }
        this.validator = new Validation()
        this.validator.addByValue('username',[                         //  密码的校验规则
            {strategy: 'isEmpty', errorMsg: '用户名不能为空'},
            {strategy: 'hasSpace', errorMsg: '用户名不能有空格'},
            {strategy: 'maxLength:6', errorMsg: '用户名最长为6'}
        ])
        this.validator.addByValue('passw',[
            {strategy: 'isEmpty', errorMsg: '密码不能为空'},
            {strategy: 'hasSpace', errorMsg: '密码不能有空格'},
            {strategy: 'maxLength:12', errorMsg: '密码最长为12'}


        ])
        this.namechange = this.namechange.bind(this)
        this.passwchange = this.passwchange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    namechange(ev){
        let {target} = ev;
        let msg = this.validator.valiOneByValue('username', target.value);         // 调用验证的方法
        this.setState({
            username: target.value,
            nameErr: msg
        })
    }
    passwchange(ev){
        let {target} = ev
        let msg = this.validator.valiOneByValue('passw', target.value);         // 调用验证的方法
        this.setState({
            passw: target.value,
            passwErr: msg
        })
    }
    onSubmit(ev){
        ev.preventDefault()
        ev.stopPropagation()
        let {validator} = this
        let {nameDom,passwDom} = this.refs
        let nameErr = validator.valiOneByValue('username',nameDom.value)
        let passErr = validator.valiOneByValue('passw',passwDom.value)
        this.setState({
            nameErr,passErr
        })
        if(!nameErr && !passErr){
            this.props.signInAjax({
                username:nameDom.value,
                passw:passwDom.value
            })
        }
    }
    render(){
        let {namechange,passwchange,onSubmit} = this
        let {username,passw,nameErr,passwErr} = this.state
        let nameErrMsg = nameErr ? (
            <p className={S.err}>{nameErr}</p>
        ): null;
        let passwErrMsg = passwErr ? (
            <p className={S.err}>{passwErr}</p>
        ): null;
        let {signInMsg} = this.props
        let resInfo = null
        if(signInMsg && signInMsg.code !== 0){
            resInfo = (
                <div className="ui message error">
                    <p>{signInMsg.msg}</p>
                </div>
            )
        }
        return (
            <div className={S.sign_panel}>
                {resInfo}
                <form
                    className="ui form"
                    onSubmit = {onSubmit}
                >
                    <div className={`field ${nameErr? 'error': ''}`}>
                        <input
                            type="text"
                            placeholder="用户名"
                            value = {username}
                            onChange = {namechange}
                            ref="nameDom"
                        />
                       {nameErrMsg}
                    </div>

                    <div className={`field ${passwErr? 'error': ''}`}>
                        <input
                            type="text"
                            placeholder="密码"
                            value = {passw}
                            onChange = {passwchange}
                            ref="passwDom"
                        />
                        {passwErrMsg}
                    </div>

                    <div className="field ">
                        <button type="submit"
                            className="ui button fluid primary"
                        >登录</button>
                    </div>
                </form>
            </div>
        );
    }
}
SignInPanel.propsTypes = propsTypes