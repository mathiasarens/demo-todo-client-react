import React from 'react';
import TodoList from './TodoList'
import ErrorComponent from "../error/ErrorComponent";

class TodoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: [], text: '', error: null};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const url = '/api/v1/todo'
        fetch(url)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(url + ' returned ' + response.status)
                }
            })
            .then(data => {
                let serverItems = data.map(result => {
                    return {id: result.id, text: result.name}
                });
                this.setState({items: serverItems});
            }).catch(err => {
                this.setState({error: err});
                console.log(err);
            });
    }


    render() {
        return (
            <div>
                <h3>TODO</h3>
                <ErrorComponent error={this.state.error}/>
                <TodoList items={this.state.items}/>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-todo">
                        What needs to be done?
                    </label>
                    <input
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <button>
                        Add #{this.state.items.length + 1}
                    </button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now()
        };
        this.setState(state => ({
            items: state.items.concat(newItem),
            text: ''
        }));
        fetch('/api/v1/todo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: "cors",
            body: JSON.stringify({id: newItem.id, name: newItem.text})
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }
}

export default TodoComponent;