import React from "react";
import './TodoList.css'

class TodoList extends React.Component {
    render() {
        return (
            <div className="list">
                {this.props.items.map(item => (
                    <div className="listItem" key={item.id}>{item.text}</div>
                ))}
            </div>
        );
    }
}

export default TodoList;