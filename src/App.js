import React from 'react';
import './App.css';
import TodoComponent from './todo/TodoComponent'

class App extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <div className="container">
            <TodoComponent/>
                </div>
            </div>
        )
    }

}

export default App;