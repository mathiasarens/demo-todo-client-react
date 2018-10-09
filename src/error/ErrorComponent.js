import React from 'react';

class ErrorComponent extends React.Component {
    render() {
        if (this.props.error) {
            return (<p style={{color: 'red'}}>{this.props.error.message}</p>)
        } else {
            return null;
        }
    }
}

export default ErrorComponent;