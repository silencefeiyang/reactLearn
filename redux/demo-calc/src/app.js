import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware,bindActionCreators } from 'redux'    // 引入redux
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'        // 引入中间件
import reducer from 'reducer/index'    // 引入reducer
// import { increment, decrement, addIfOdd, asyncAdd } from 'action'   // 引入action
import * as actionsCreators from 'action'         // 将上述的action函数作为一个整体全部导入
const store = createStore(reducer, applyMiddleware(thunk))


const addCounter = panelName => store.dispatch(
    {
        type: 'ADD_COUNTER',
        panelName
    })

// let propTypes = {
//     actions: PT.objectOf(PT.func),    // 意思为：action为一个对象，对象里面的每一个value都是函数
//     addCounter: PT.func,
//     state: PT.shape({
//         A: PT.arrayOf(PT.object),
//         B: PT.arrayOf(PT.object)
//     })
// }

require('style/main.scss');
// require('component/demo.js');
// require('component/counterByDom')
// require('component/counterByRedux')
import CounterPanel from 'component/counter/counterPanel'

export default class App extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let { A,B, addCounter,addIfOdd, asyncAdd,decrement,increment} = this.props
        console.log(this.props)
        return (
            <div>
                <CounterPanel
                    {...{
                        data: A,
                        actions:{addIfOdd, asyncAdd,decrement,increment},
                        addCounter,
                        panelName: 'A'
                    }}
                />
                <CounterPanel
                    {...{
                        data: B,
                        actions:{addIfOdd, asyncAdd,decrement,increment},
                        addCounter,
                        panelName: 'B'
                    }}
                /> 
            </div>
        )
    }
}
// App.propTypes = propTypes;
// connect这种叫容器组件，负责逻辑处理，  偏顶层
App = connect(      // connect第一个参数为App这个组件要用到的state      
    state => state,    // 第一个state是整个state,返回值是这个组件需要用到的state
    dispatch => bindActionCreators(actionsCreators,dispatch)     // 第二个参数传入了dispatch
)(App)        
ReactDOM.render(
    <Provider       // provider 通过connect这个高阶的组件来达到跨层级的去使用state
        store = {store}  
    >
        <App/>
    </Provider>,
    document.getElementById('root')
)


// render()     // react中更新state应当通过setState，但是当使用了redux之后，这些状态交给了redux，所以不能使用setState.
// // 所以解决办法  ===> 当触发action，更新了state, 会触发subscribe函数，这个时候重新渲染整个virtualDOM
// store.subscribe(render)