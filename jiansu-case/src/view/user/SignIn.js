import SignInPanel from 'components/user/SignInPanel'
import EntryPanel from 'components/user/Panel'

let propsTypes = {
    signInAjax:PT.func,
    signInMsg:PT.object
}

export default class SignIn extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let {signInAjax,signInMsg} = this.props
        return (
            <EntryPanel>
                <SignInPanel
                {...{
                    signInAjax,
                    signInMsg
                }}></SignInPanel>
            </EntryPanel>
        )
    }
}

SignIn.propsTypes = propsTypes
