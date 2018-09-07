import {Route} from 'react-router-dom';
import Nav from 'nav/Nav';
import Home from 'view/home/Home.js';
import SignUp from 'view/user/SignUp';
import SignIn from 'view/user/SignIn';
import S from './style.scss';
import cfg from 'config/config.json'

export default class Layout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            myInfo: null,
            signInMsg: null,
            signUpMsg:null
        }
        this.signInAjax = this.signInAjax.bind(this)
        this.signUpAjax = this.signUpAjax.bind(this)
        this.clearLoginMsg = this.clearLoginMsg.bind(this)
        this.initUserInfo = this.initUserInfo.bind(this)
    }
    signInAjax(resData){
        $.post(`${cfg.url}/login`,resData)
        .done(res=>{
            let { code,data} = res
            if(code === 0){
                this.initUserInfo(res.data)
            } else {
                this.setState({
                    signInMsg:res
                })
            }
        })
    }
    signUpAjax(resData){
        $.post(`${cfg.url}/register`,resData)
        .done((res)=>{
            let {code, data} = res
            this.setState({
                signUpMsg:res
            })
            if(code === 0){
                setTimeout(()=>{
                    this.initUserInfo(res.data)
                },1000)
            }
        })
    }
    initUserInfo(myInfo){
        myInfo.avatar = cfg.url + myInfo.avatar
        console.log(myInfo)
        this.setState({
            myInfo
        })
    }
    clearLoginMsg(){
        this.setState({
            signInMsg: null,
            signUpMsg: null
        })
    }
    render(){
        let {signInAjax,signUpAjax,clearLoginMsg} = this
        let {signInMsg,signUpMsg,myInfo} = this.state
        return (
            <div className={S.layout}>
                <Nav
                {...{
                    myInfo
                }}
                />
                <Route exact path="/" component={Home}/>
                <Route exact path="/sign_in" render = {
                    (props)=> (
                        <SignIn {
                            ...{
                                signInAjax,
                                signInMsg,
                                clearLoginMsg
                            }
                        }></SignIn>
                    )
                }/>
                <Route exact path="/sign_up" render = {
                    (props)=>(
                        <SignUp {
                            ...{
                                signUpAjax,
                                signUpMsg,
                                clearLoginMsg
                            }
                        }></SignUp>
                    )
                }
                />
            </div>
        );
    }
}

