
import Counter from 'component/counter/counter'

export default function CounterPanel(props) {
    let { data, actions, panelName, addCounter } = props
    let HasAll = data.length ? data.every(elt=> elt.value !== 0)+'': 'null'
    let max = data.length ? data.slice().sort((a,b)=>{
        return b.value - a.value
     })[0].value: 'null'
    let allCount = data.length ? data.reduce((accu,elt)=>{
        return accu +elt.value
    },0): 'null'
    
    return (
        <div className="counterBox" style={{ margin: '40px' }}>
            <div className="panel">
                <button className="addCounter" onClick={() => addCounter(panelName)}></button>
                <div className="counterPanel">
                    {
                        data.map((elt) => {
                            return (
                                <Counter
                                    key={elt.id}
                                    {...actions}
                                    {...elt}
                                />
                            )
                        })
                    }
                </div>
            </div>

            <div className="dashboard">
                <div className="allSel line">
                    <span className="key">HasAll:</span>
                    <span className="val">{HasAll}</span>
                </div>
                <div className="maximum line">
                    <span className="key">Maximum:</span>
                    <span className="val">{max}</span>
                </div>
                <div className="allCount line">
                    <span className="key">AllCount:</span>
                    <span className="val">{allCount}</span>
                </div>
            </div>
        </div>
    )
}