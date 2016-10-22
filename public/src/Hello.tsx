import * as React from 'react';
import * as firebase from 'firebase';

export interface Props {
    content: string;
}

export interface State {
    time: Time;
}

export class Time {
    constructor(public date: string, public add: number) {
        this.date = date
        this.add = add
    }
}

export default class MyComponent extends React.Component<Props, State> {

    constructor() {
        super();

        this.state = {
            time: new Time("read", 0)
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
            const value = snapshot.val()
            if (value != null) {
                this.setState({
                    time: new Time(snapshot.val().date, snapshot.val().add)
                })
            }
            console.log("KKKK", snapshot.val());
        });
    }

    onClick(e:any) {
        const time = new Time(Date(), this.state.time.add+1);
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
    }
}