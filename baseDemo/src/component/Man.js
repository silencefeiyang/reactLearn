import React,{Component} from 'react'

export default class Man extends Component{
    render(){
        console.log(this.props)
        let{eyes,hand,children} = this.props;
        return (
            <div>
                <span>aaaa</span>
                {children}
            </div>
        )
    }
}
Man.defaultProps = {
    eyes: 3
}