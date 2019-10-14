import React, {Component} from 'react'

export default class timeDown extends Component {
    constructor(props){
        super(props);
        const time_arr = props.time.split(":");
        this.state = {
            hour: parseInt(time_arr[0]),
            minute: parseInt(time_arr[1]) ,
            second: parseInt(time_arr[2]) 
        }

    }
   //00:00:00
    render() {
        const norm = {
            display: "inline-block",
            fontSize: '30px',
            position: 'absolute',
            right: '2px',
            border: '3px green solid',
            padding: '5px',
            color: 'green',
            top: '0',
            height: '100%'
           }

        const danger = {
            display: "inline-block",
            fontSize: '30px',
            position: 'absolute',
            right: '2px',
            border: '3px red solid',
            padding: '5px',
            color: 'red',
            top: '0',
            height: '100%'
        }
        const { hour, minute, second } = this.state;
        return (
            <div style={hour + minute === 0 && second < 30 ? danger : norm}>
                <b>{hour< 10 ? '0' + hour:hour} : {minute < 10? '0'+minute:minute }: {second<10? '0'+second:second} </b>
            </div>
        )
    }

    componentDidMount(){

        this.timer = setInterval(() => {
            var { hour, minute, second } = this.state;
            if (hour >= 0) {
                if (minute > 0) {
                    if (second === 0) {
                        minute--;
                        second = 59;
                    } else second--;
                }else if (minute === 0) {
                    if (second === 0) {
                        if (hour === 0) {
                           this.props.stop()
                        }else{
                            hour--;
                            minute = 59;
                            second = 59;
                        }
                      
                    } else second--;
                }
            }
            this.setState(() => ({ hour, minute, second}))
            }, 1000);
     
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
   
   
}