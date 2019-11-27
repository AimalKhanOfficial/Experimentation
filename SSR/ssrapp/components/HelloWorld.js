var React = require('react');
//require('./HelloWorld.css');
//import './HelloWorld.css';

export default class HelloWorld extends React.Component {

    constructor() {
        super();
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    render () {
        return (
            <div>
                <button onClick={this.onButtonClick}>
                    Click Me
                </button>
            </div>
        );
    }

    onButtonClick = () => {
        console.log('>>>> onButtonClick');
        alert('Clicked' + window.location.href);
    }
}