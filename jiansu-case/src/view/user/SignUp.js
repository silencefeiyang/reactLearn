import EntryPanel from 'components/user/Panel'
import SignUpPanel from 'components/user/SignUpPanel'
let {propsType} = {
    signUpAjax: PT.func,
    signUpMsg: PT.object,
    clearLoginMsg:PT.func
}

export default class SignUp extends React.Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        this.props.clearLoginMsg()
    }
    render(){
        let {signUpAjax,signUpMsg} = this.props
        return (
            <EntryPanel>
                <SignUpPanel {...{
                    signUpAjax,
                    signUpMsg
                }}></SignUpPanel>
            </EntryPanel>
        )
    }
}
SignUp.propsType = propsType

