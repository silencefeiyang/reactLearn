import React from 'react';
import PT from 'prop-types';
export default function People(props){

    return (
        <div className="people">
            <h2>我是名字是{props.name}</h2>
            <p>我的年纪是{props.age}</p>
            <p>{props.children}</p>
            <div>{props.render}</div>
        </div>
    )
}
People.defaultProps = {
    name: '默认值'
}
People.propTypes = {
    name: PT.string,
    age:PT.number.isRequired,
    render:PT.node
}