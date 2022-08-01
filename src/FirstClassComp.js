import React, { Component } from 'react'


class FirstClassComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { label: 'Name', value: 'Ram' },
                { label: 'Age', value: '27' },
                { label: 'Email', value: 'ram@gmail.com' },
                { label: 'Phone', value: '97877887878' },
                { label: 'Description', value: 'Dev , trainer' },
                { label: 'Submit', value: 'Submit' },
            ],
            displayData: []
        }
    }

    componentWillMount(){
        console.log('will mount calling')
        var data = localStorage.getItem("List")
        var dpData = JSON.parse(data)
        console.log(dpData)
        this.setState({
            displayData : dpData
        })
    }

    componentDidMount(){
        console.log('did mount calling')
    }

    setValue = (event, item, index) => {
        var newState = JSON.parse(JSON.stringify(this.state.data))
        newState[index].value = event.target.value

        this.setState({
            data: newState
        })
    }

    storeData = () => {
        console.log(this.state.data)
        var error = ""
        this.state.data.map((item, index) => {

            // 1 == '1'   - true 
            // 1 === '1'  - false
            if (item.value === "") {
                error = item.label
            }
        })

        if (error) {
            alert(error + "should not empty")
        }
        else {

            let check = {
                Name: '',
                Age: '',
                Email: '',
                Phone: '',
                Description: ''
            }
            localStorage.setItem("DATAS", JSON.stringify(this.state.data))
            var Obj = this.state.data.map((item, index) => {
                Object.keys(check).map((items, index) => {
                    if (item.label === items) {
                        check[items] = item.value
                    }
                })
            })
            console.log(check)
            let tot = JSON.parse(JSON.stringify(this.state.displayData))
            tot.push(check)
            localStorage.setItem('List' , JSON.stringify(tot) )
            this.setState({
                displayData: tot
            })

        }
    }



    render() {
        console.log('render calling ..')
        console.log(this.state.displayData)
        return (
            <div>
                {
                    this.state.data.map((item, index) => {
                        return (
                            <div>
                                <div style={{ display: 'flex', width: '300px', justifyContent: 'space-between' }}>
                                    {
                                        item.label === "Submit" ? <div><input type="button" value={item.label} onClick={this.storeData} /></div> :
                                            <><div>{item.label}</div>
                                                <div><input type="text" value={item.value} onChange={(e) => this.setValue(e, item, index)} /></div></>

                                    }

                                </div>



                            </div>


                        )
                    })
                }

                <div>
                    <h1> List of details</h1>
                    {
                        this.state.displayData.map((item, index) => {
                            return <p>{JSON.stringify(item)}</p>
                        })
                    }

                </div>

            </div>
        )
    }


}

export default FirstClassComp;