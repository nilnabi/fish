import * as React from 'react';
import * as firebase from 'firebase';

export interface Props {
    content: string;
}

export interface State {
    time: Time;
}

export class Time {
    value: string;
    test: string;
}

export default class MyComponent extends React.Component<Props, State> {

    constructor() {
        super();

        this.state = {
            time: new Time()
        }
    }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: ' AIzaSyDtZ-35e0mBjYK_dYL1p85dEMQgopXOaJk',
            authDomain: '',
            databaseURL: 'https://fish-a99a4.firebaseio.com/',
            storageBucket: ''
        });
        firebase.database().ref('times/time').on('value', (snapshot) => {
            this.setState({
                time: snapshot.val()
            })
            console.log("KKKK", snapshot.val());
        });
    }

    onClick(e:any) {
        const time = new Time()
        time.value = Date()
        time.test = "okok"
        firebase.database().ref('times/').set({ time });
    }

    render() {
        return (
            <div>
                <div>{this.props.content}</div>
                <div>{this.state.time.test}</div>
                <div>{this.state.time.value}</div>
                <div><button onClick={this.onClick}>Click</button></div>
            </div>
        )
        // return <div>{this.props.content}</div>
    }
}