import React, {Fragment, Component, createRef} from 'react';
import ReactDOM from 'react-dom';
import Todo from './components/todo'
import Footer from './components/footer'
import './main.css';

class TodoList extends Component{
  constructor(props){
      super(props);
      this.state = {
        todoList: []
      }
      this.todoInput = createRef()
  }
  addTodo =(ev)=>{
    let {value} = this.todoInput.current  // 获取对应的DOM节点
    if(ev.keyCode!==13 || !value.trim()) return;  // 如果按下的键不是enter键，或者输入的内容为空
    let {todoList} = this.state;
    this.setState({
      todoList:[
        {
          id:Math.random(),     //  为了key优化性能
          content:value,
          ifCompleted:false
        },
        ...todoList
      ]
    },()=>{
      this.todoInput.current.value = ''
    })
  }
  deleteTodo =(id)=>{
    let {todoList} = this.state;
    todoList  = todoList.filter(elt=>{
      return elt.id !== id        // 如果id相等，那么删除，ID不相等，就保留
    })
    this.setState({
      todoList
    })
  }
  toggleTodo = (id)=>{
    let {todoList} = this.state;
    todoList  = todoList.map(elt=>{
      if(elt.id === id){
        elt.ifCompleted = !elt.ifCompleted
      }
      return elt
    })
    this.setState({
      todoList
    })
  }
  toggleAll = (ev)=>{
    console.log(ev.target.checked)
    let {todoList} = this.state
    todoList = todoList.map(elt =>{
      elt.ifCompleted = ev.target.checked
      return elt
    })
    this.setState({
      todoList
    })
  }
  render(){
    let {todoList} = this.state
    let activeTodo = todoList.find(elt =>elt.ifCompleted === false)   // 全选，不全选，

    let todos = todoList.map((elt)=>{
      return (
        <Todo
          key={elt.id}
          {...{
            id:elt.id,
            content:elt.content,
            deleteTodo:this.deleteTodo,
            ifCompleted:elt.ifCompleted,
            toggleTodo:this.toggleTodo
          }}
        />
      )
    })
    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          {/* 输入框 */}
          <input
            type="text"
            className="new-todo"
            placeholder="type something here"
            ref={this.todoInput}
            onKeyDown ={this.addTodo}
          />
        </header>

        <section className="main">
          {/* 全选按钮 */}
          <input
            type="checkbox"
            className="toggle-all"
            checked ={!activeTodo && todoList.length > 0}
            onChange={this.toggleAll}
          />
          <ul className="todo-list">
           {todos}
          </ul>
        </section>



      </div>
    )
  }
}


ReactDOM.render(
  <TodoList/>
  ,
  document.getElementById('root')
)
