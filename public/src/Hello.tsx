import * as React from 'react';
import * as firebase from 'firebase';

export interface Props {
    content: string;
}

export interface State {
    time: Time;
}

export class Time {
    date: string;
    add: number;
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
        const time = new Time();
        time.date = Date();
        time.add = this.state.time.add+1;
        firebase.database().ref('times/').set({ time });
    }

    render() {
        return (
            <div>
                <div>{this.props.content}</div>
                <div>{this.state.time.date}</div>
                <div>{this.state.time.add}</div>
                <div><button onClick={this.onClick.bind(this)}>Click</button></div>
            </div>
        )
        // return <div>{this.props.content}</div>
    }
}