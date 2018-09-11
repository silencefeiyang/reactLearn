let $addCounter = $('.counterBox .addCounter'),
    $counterPanel = $('.counterBox .counterPanel'),
    $hasAll = $('.allSel .val'),
    $maximum = $('.maximum .val'),
    $allCount = $('.allCount .val')

const counters = []

class Counter{
    constructor(counters){
        this.value = 0;
        this.counters = counters
        this.elt = $('<div class="counter"></div>')
        let incrementBtn =this.incrementBtn = $('<button class="add"></button>')
        let decrementBtn = this.decrementBtn = $('<button class="sub"></button>')
        let oddBtn = this.oddBtn = $('<button class="addIfOdd"></button>')
        let asyncBtn =this.asyncBtn = $('<button class="addAsync"></button>')
        let num = this.num = $(`<span>${this.value}</span>`)
        this.elt.append(decrementBtn,num,incrementBtn,oddBtn,asyncBtn)

        this.increment = this.increment.bind(this) 
        this.decrement = this.decrement.bind(this)
        this.addIfOdd = this.addIfOdd.bind(this)              // 修改绑定的this
        this.asyncAdd = this.asyncAdd.bind(this)


        incrementBtn.click(this.increment)    // 增加的点击事件
        decrementBtn.click(this.decrement)    // 点击减少的点击事件
        oddBtn.click(this.addIfOdd)
        asyncBtn.click(this.asyncAdd)
    }

    decrement(){
        if(this.value === 0) return
        this.num.html(--this.value)
        syncState(this.counters)
    }
    increment(){
        this.num.html(++this.value)
        checkHasAll(this.counters)
        syncState(this.counters)
    }
    addIfOdd(){
        if(this.value %2 === 0) return
        this.num.html(++this.value)
        syncState(this.counters)
    }
    asyncAdd(){
        setTimeout(()=>{
            if(this.value %2 === 0) return
            this.num.html(++this.value)
            syncState(this.counters)
        },1000)

    }
}

function checkHasAll(counters){      //如果有一个不等于0,那么就是都更改过
    let val = counters.every(elt=>{
        return elt.value !== 0
    })
    $hasAll.html(val +'')
}

function calcMax(counters){
    let val = counters.slice().sort((a,b)=>{
       return b.value - a.value
    })[0].value
    $maximum.html(val)
}
function counteAll(counters){
    let all = counters.reduce((accu,elt)=>{
        return accu +elt.value
    },0)
    $allCount.html(all)
}
function syncState(counters){
    checkHasAll(counters)
    calcMax(counters)
    counteAll(counters)
}

$addCounter.click(ev=>{
    let counter = new Counter(counters)
    counters.push(counter)
    $counterPanel.append(counter.elt)
    syncState(counters)
})