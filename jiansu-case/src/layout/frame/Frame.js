import {Route,Redirect} from 'react-router-dom';
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
            signUpMsg:null,
            hasLoginReq: true,
            myPagePreviews: [],   // 分类文章列表的数组
            myNoteBook: [],  // 我的文集列表
            previewsName: '所有文章'   // 当前展示是什么文章类型
        }
        this.signInAjax = this.signInAjax.bind(this)
        this.signUpAjax = this.signUpAjax.bind(this)
        this.clearLoginMsg = this.clearLoginMsg.bind(this)
        this.initUserInfo = this.initUserInfo.bind(this)
        this.logout = this.logout.bind(this)
        this.getPreview = this.getPreview.bind(this)
        this.changePreviewsName = this.changePreviewsName.bind(this)
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
    componentDidMount(){             // 向后端发送请求，检查是否登陆过
        $.post(`${cfg.url}/autologin`)
        .done(({code,data})=>{
            if(code === 0){
                this.initMyInfo(data)
            }
            this.setState({
                hasLoginReq: true
            })
        })
    }
    initUserInfo(myInfo){
        if(myInfo){
            myInfo.avatar = cfg.url + myInfo.avatar
        }
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
    getPreview(){                       // 获取分类的文章列表
        $.post(`${cfg.url}/getPreview`,data)
        .done(({code})=>{
            if(code === 0){
                this.setState({
                    myPagePreviews:data
                })
            }
        })
    }
    // previewName 用户当前看的是哪个文集的名字
    initMyPage(userId,previewsData,previewName){
        this.getPreview(previewsData)
        $.post(`${cfg.url}/getCollection`,{
            userId
        })
        .done(({code,data})=>{
            if(code === 0){
                this.setState({
                    myNoteBook:data,
                    previewsName
                })
            }
        })
    }
    changePreviewsName (previewsName){
        this.setState({
            previewsName
        })
    }
    logout(){
        $.post(`${cfg.url}/logout`)
        .done(({code})=>{
            if(code === 0){
                this.initMyInfo(null)
            }
        })
    }
    render(){
        let {signInAjax,signUpAjax,clearLoginMsg,logout} = this
        let {signInMsg,signUpMsg,myInfo,hasLoginReq} = this.state
        if(!hasLoginReq){
            return (<div></div>)
        }
        return (
            <div className={S.layout}>
                <Nav
                {...{
                    myInfo,
                    logout
                }}
                />
                <Route exact path="/" component={Home}/>
                <Route exact path="/sign_in" render = {
                    (props)=> (
                        myInfo ? (
                            <Redirect to="/" />
                        ):(
                            <SignIn {
                                ...{
                                    signInAjax,
                                    signInMsg,
                                    clearLoginMsg
                                }
                            }></SignIn>
                        )                       
                    )
                }/>
                <Route exact path="/sign_up" render = {
                    (props)=>(
                        myInfo? (
                            <Redirect to="/"/>
                        ):(
                            <SignUp {
                                ...{
                                    signUpAjax,
                                    signUpMsg,
                                    clearLoginMsg
                                }
                            }></SignUp>
                        )
                        
                    )
                }
                />
            </div>
        );
    }
}

