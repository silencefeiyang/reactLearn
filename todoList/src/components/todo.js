import React,{Component,createRef} from 'react'
export default class Todo extends Component{
    constructor(){
        super()
        this.state = {
          inEdit:false
        }
        this.editInput = createRef()
    }
    onEdit = () =>{
      this.setState({
        inEdit:true
      },()=>{
        this.editInput.current.value = this.props.content
        this.editInput.current.focus()    // 更新换数据之后，自动让input获取焦点，
      })
    }
    commitChange = ()=>{
      let {current:input} = this.editInput
      let content = input.value.trim()
      let {id} = this.props
      if(content) {
        this.props.alterTodoContent(id,input.value)
      } else{
        this.props.deleteTodo(id)
      }
      input.value = ''
    }
    quiteEdit = ()=>{
      if(!this.state.inEdit) return
      this.setState({
        inEdit:false
      })
      this.commitChange()
    }
    quiteByKey = (ev)=>{

      if(ev.keyCode === 27 || ev.keyCode === 13){
        this.setState({
          inEdit:false
        })
      }
      if(ev.keyCode === 13){
        this.commitChange()
      }
    }
    render(){
        let {content,deleteTodo,id,ifCompleted,toggleTodo,alterTodoContent} = this.props;
        let {inEdit} = this.state
        let className = inEdit? 'editing': ''
        className = ifCompleted? className + 'completed': className;

        return(
            <li
            // className="completed"
            // className="editing"
            className = {className}
          >
            <div className="view">
              {/* 勾选按钮 */}
              <input
                type="checkbox"
                className="toggle"
                checked={ifCompleted}
                onChange={()=>toggleTodo(id)}
              />
              {/* todo 的内容 */}
              <label ref="label"
                onDoubleClick = {this.onEdit}
              >
                {content}
              </label>
              {/* 删除按钮 */}
              <button
                className="destroy"
                ref="btn"
                onClick = {()=>deleteTodo(id)}
              ></button>
            </div>
            {/* 编辑 todo 的输入框 */}
            <input
              type="text"
              className="edit"
              ref={this.editInput}
              onBlur = {this.quiteEdit}
              onKeyDown = {this.quiteByKey}
            />
          </li>
        )
    }
}