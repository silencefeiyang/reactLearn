import React,{Component,createRef} from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './css/main.css';

class MagicNumber extends Component{
    constructor(){
        super()
        this.state = {
            msg : ''
        }
    }
    changeMsg = (val)=>{
        console.log(this.inputValue.value)
        this.setState({
            msg: this.inputValue.value
        })
    }
    render(){
        return (
            <div>
                <Input getInput={el=> this.inputValue = el}></Input>
                <Send changeMsg = {this.changeMsg}></Send>
                <Receive msg = {this.state.msg}></Receive>
            </div>
        )
    }
}
class Send extends Component{
    render(){
        let {changeMsg} = this.props
        return (
            <div>
                <button onClick={()=>changeMsg()}>发送消息</button>
            </div>
        )
    }
}
class Receive extends Component{
    render(){
        let {msg} = this.props
        return (
            <div>
                <p>我在这接收消息{msg}</p>
            </div>
        )
    }
}
class Input extends Component{
    render(){
        let {getInput} = this.props
        return (
            <input type="text"  ref={getInput}/>
        )
    }
}
// class MagicNumber extends Component {
//     constructor(props){
//         super();
//         this.state = {
//             msg: 'fatherComponent'
//         }
//     }
//     changeMsg=()=>{
        
//         this.setState({
//             msg:this.sunInput.value
//         })
//     }
//     render(){
//         let {msg} = this.state;
//         return (
//             <div id="outDIV" ref="outDIV">
//                 <Input getInput={el=> this.sunInput = el}></Input>
//                 <p>---------------------------</p>
//                 <Receive msg={msg}></Receive>
//                 <p>---------------------------</p>
//                 <Send changeMsg={this.changeMsg}></Send>
//             </div>
//         )
//     }
// }
// class Input extends Component{
//     render(){
//         let {getInput} = this.props
//         return (
//             <input type="text" ref={getInput}/>
//         )
//     }
// }
// class Send extends Component{
//     constructor(){
//         super()
//     }
//     render(){
//         let {changeMsg} = this.props
//         return (
//             <div>
//                 <h2>发送消息</h2>
//                 <button onClick={()=>changeMsg()}>发送</button>
//             </div>
//         )
//     }
// }
// class Receive extends Component{
//     constructor(){
//         super()
//     }
//     render(){
//         let {msg} = this.props
//         return (
//             <div>
//                 <h2>接收消息</h2>
//                 <p>{msg}</p>
//                 <button>接收</button>
//             </div>
//         )
//     }
// }
ReactDOM.render(
    <div>
        <MagicNumber></MagicNumber>
    </div>,
    document.getElementById('root')
);
registerServiceWorker();
