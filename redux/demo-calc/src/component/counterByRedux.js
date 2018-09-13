import { Redux,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { createStore } from '../../node_modules/redux';
let $addCounter = $('.counterBox .addCounter'),
    $counterPanel = $('.counterBox .counterPanel'),
    $hasAll = $('.allSel .val'),
    $maximum = $('.maximum .val'),
    $allCount = $('.allCount .val')




// function counters(state,action){
//     return {
//         counterA: counterA(state.counterA,action),
//         counterB: counterB(state.counterB,action)
//     }
// }
//  let counters = combineReducers({
//     A:counterA,
//     B:counterB
// })
let store = createStore(counter,initState,applyMiddleware(thunk))
class Counter {
    constructor(store, {id,value}) {
        this.value = value;
        this.id = id
        this.counters = store
        this.store = store
        this.elt = $('<div class="counter"></div>')
        let incrementBtn = this.incrementBtn = $('<button class="add"></button>')
        let decrementBtn = this.decrementBtn = $('<button class="sub"></button>')
        let oddBtn = this.oddBtn = $('<button class="addIfOdd"></button>')
        let asyncBtn = this.asyncBtn = $('<button class="addAsync"></button>')
        let num = this.num = $(`<span>${this.value}</span>`)
        this.elt.append(decrementBtn, num, incrementBtn, oddBtn, asyncBtn)

        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.addIfOdd = this.addIfOdd.bind(this)              // 修改绑定的this
        this.asyncAdd = this.asyncAdd.bind(this)


        incrementBtn.click(this.increment)    // 增加的点击事件
        decrementBtn.click(this.decrement)    // 点击减少的点击事件
        oddBtn.click(this.addIfOdd)
        asyncBtn.click(this.asyncAdd)
    }

    decrement() {
        if (this.value === 0) return
        boundDecrement(this.id)
    }
    increment() {
        boundIncrement(this.id)
    }
    addIfOdd() {
        boundAddIfOdd(this.id, this.value)
    }
    asyncAdd() {
        setTimeout(() => {
            if (this.value % 2 === 0) return
            this.store.dispatch(increment(this.id))
        }, 1000)

    }
}
const boundIncrement = (id) => store.dispatch(increment(id))
const boundDecrement = (id) => store.dispatch(decrement(id))
const boundAddIfOdd = (id,value)=> store.dispatch(addIfOdd(id,value))
function increment(id){                // action创建函数      
    return {type:'INCREMENT',id}
}
function decrement(id){
    return {type:'DECREMENT',id}
}
const addIfOdd = (id,value) => (dispatch,getState) =>{
    if(value %2 === 0) return;
    boundIncrement(id)
}
const asyncAdd = id => ()=>{
    setTimeout(()=>{
        boundIncrement(id)
    },1000)
}
$($addCounter[0]).click(ev => {
    store.dispatch({ type: 'ADD_COUNTER' ,panelName:'A'})
})
$($addCounter[1]).click(ev => {
    store.dispatch({ type: 'ADD_COUNTER',panelName:'B' })
})
store.subscribe(() => {
    let state = store.getState();
    $counterPanel.html('')
    initPanel(state.A,0)
    initPanel(state.B,1)
})
function initPanel(state,num){
    if(state.length === 0) return
    state.forEach(data => {   
        $($counterPanel[num]).append(new Counter(store,data).elt)
    })

    $($hasAll[num]).html(state.every(elt=> elt.value !== 0)+'')
    $($maximum[num]).html(state.slice().sort((a,b)=>{
        return b.value - a.value
     })[0].value)
     $($allCount[num]).html(state.reduce((accu,elt)=>{
        return accu +elt.value
    },0))
}
function syncState(counters){
    checkHasAll(counters)
    calcMax(counters)
    counteAll(counters)
}