import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';



import './common/css/goodSort.css';
import goodData from './common/data/goodsSortData'

class App extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let comp = goodData.map(item =>{            // 在生成结构前可以做的事情  为了保证循环时数据的唯一性，优化性能，要加上key
           return <li key={item.id}>                
           {item.sort}
           {item.data.map(inner=>{
               return <a href="javascript" key={inner.id}>{inner.desc}</a>
           })}
           </li>  
        })
        console.log(comp)
        return (
            <div id="wrap">
            <section id="section">
                <nav id="choose">
                    你的选择:
                </nav>
                <ul id="type">
                    {comp}                        
                </ul>
            </section>
        </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
registerServiceWorker();
