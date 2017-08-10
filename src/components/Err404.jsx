import React, { Component } from 'react';
class Err404 extends Component {
    render(){
        return (
            <div>
                <h1>Error, route not found</h1>
                <p>Back to <a href="/">Home</a></p>
            </div>);

    }
}

export default Err404;
