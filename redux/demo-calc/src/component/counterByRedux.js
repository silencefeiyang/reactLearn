import { Redux } from 'redux'
import { createStore } from '../../node_modules/redux';
let $addCounter = $('.counterBox .addCounter'),
    $counterPanel = $('.counterBox .counterPanel'),
    $hasAll = $('.allSel .val'),
    $maximum = $('.maximum .val'),
    $allCount = $('.allCount .val')

let initState = []

function counter(state = [], action) {
    let { type,id} = action
    switch (type) {
        case 'ADD_COUNTER':
            return [...state, {
                id: new Date().getTime(),
                value: 0
            }]
        case 'INCREMENT':
            return state.map(elt => {
                if (elt.id === id) {
                    elt.value++
                }
                return elt
            })
        case 'DECREMENT':
            return state.map(elt => {
                if (elt.id === id) {
                    elt.value--
                }
                return elt
            })
        default:
            return state;
    }
}
let store = createStore(counter)
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
        this.store.dispatch({ type: 'DECREMENT', id: this.id })
    }
    increment() {
        this.store.dispatch({ type: 'INCREMENT', id: this.id })
    }
    addIfOdd() {
        if (this.value % 2 === 0) return
        this.store.dispatch({ type: 'ADDIFODD', id: this.id })
    }
    asyncAdd() {
        setTimeout(() => {
            if (this.value % 2 === 0) return
            this.store.dispatch({ type: 'ASYNCADD', id: this.id })
        }, 1000)

    }
}
$addCounter.click(ev => {
    store.dispatch({ type: 'ADD_COUNTER' })
})
store.subscribe(() => {
    let state = store.getState();
    $counterPanel.html('')

    state.forEach(data => {    
        $counterPanel.append(new Counter(store,data).elt)
    })
    $hasAll.html(state.every(elt=> elt.value !== 0)+'')
    $maximum.html(state.slice().sort((a,b)=>{
        return b.value - a.value
     })[0].value)
     $allCount.html(state.reduce((accu,elt)=>{
        return accu +elt.value
    },0))
})

function syncState(counters){
    checkHasAll(counters)
    calcMax(counters)
    counteAll(counters)
}