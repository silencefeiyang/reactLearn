export default function Counter(props){
   let {increment,decrement,asyncAdd,addIfOdd,value,id} = props
    return (
    <div className="counter">
        <button className="sub" onClick={()=> decrement(id,value)}></button>
        <span>{value}</span>
        <button className="add" onClick ={()=>increment(id)}></button>
        <button className="addIfOdd" onClick ={()=>addIfOdd(id,value)}></button>
        <button className="addAsync" onClick ={()=>asyncAdd(id)}></button>
    </div>
    )
}