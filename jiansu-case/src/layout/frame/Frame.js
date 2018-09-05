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
    }
    signInAjax(resData){
        $.post(`${cfg.url}/login`,resData)
        .done(res=>{
            let { code,data} = res
            if(code === 0){

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
        })
    }
    render(){
        let {signInAjax,signUpAjax} = this
        let {signInMsg,signUpMsg} = this.state
        return (
            <div className={S.layout}>
                <Nav/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/sign_in" render = {
                    (props)=> (
                        <SignIn {
                            ...{
                                signInAjax,
                                signInMsg
                            }
                        }></SignIn>
                    )
                }/>
                <Route exact path="/sign_up" render = {
                    (props)=>(
                        <SignUp {
                            ...{
                                signUpAjax,
                                signUpMsg
                            }
                        }></SignUp>
                    )
                }
                />
            </div>
        );
    }
}

