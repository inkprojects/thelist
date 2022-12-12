import React from 'react'
import ReactDOM from 'react-dom'
import  {square} from './utils.js'

var appRoot = document.getElementById('app')

class TheApp extends React.Component {
    constructor(props){
        super(props)
        this.removeAll = this.removeAll.bind(this)
        this.chooseOne = this.chooseOne.bind(this)
        this.addOne = this.addOne.bind(this)
        this.deleteOneOption = this.deleteOneOption.bind(this)
        this.state = {
            list : [1,2],
            count : 0
        }
    }

    componentDidMount() {
        try {
            //console.log('mounteed yeehaw')
            const stringList = localStorage.getItem("list")
            const savedList = JSON.parse(stringList)
            //console.log(savedList)
            if (savedList){
                this.setState(() => ({ list:savedList }))
            }
        } catch (e) {
        }
    }

    componentDidUpdate(oldProps, oldState){
        if (oldState.list.length !== this.state.list.length) {
            //console.log('updatee happened')
            const json = JSON.stringify(this.state.list)
            localStorage.setItem("list",json)
        }
    }

    removeAll(){
        this.setState(() => ({ list: [] }) )
    }

    deleteOneOption(itemToRemove) {
        this.setState((oldState) => ({
            list: oldState.list.filter((choice) => itemToRemove !== choice)
            }))
    }

    chooseOne() {
        const chosen = Math.floor(Math.random()*this.state.list.length)
        alert(this.state.list[chosen])
    }
    
    addOne(choice) {
        //validation
        if (!choice) {
            return 'please enter some value'
        } else if (this.state.list.indexOf(choice) > -1) {
            return 'duplicates not accepted'
        }
        this.setState((oldList) => {
            return {
                list : oldList.list.concat([choice])
            }
        })
    }

    render(){
        const title = 'herkkukone'
        return (
            <div>
            <Header />
            <Input 
                list={this.list}
                addOne={this.addOne} />
            <Options
                removeAll={this.removeAll}
                deleteOneOption={this.deleteOneOption} 
                hasContent={this.state.list.length >0}
                list={this.state.list}
                />
            <Guess 
                chooseOne={this.chooseOne} />
            <h1>example title</h1>
        </div>
        )
    }
}

const Header = (props) => {
       return <h1>{props.title}</h1>
}

Header.defaultProps = {
    title : 'herkkukone'
}

const Guess = (props) => {
    return (
        <div>
            <button onClick={props.chooseOne}>GUESSSS</button>
        </div>
)}

const Options = (props) => {
    return (
        <div>
            {props.list.length === 0 && <p>try adding something</p>}
            <button onClick={props.removeAll}
            disabled={!props.hasContent}
            >Removeall
            </button>
            <ol>
                {    
                props.list.map( item => (
                    <Option
                    key={item}
                    optionText={item} 
                    deleteOneOption={props.deleteOneOption} />) 
                    )
                }
            </ol>
        </div>
    )  
}

const Option = (props) => {
    return (
        <div>
            <li>{props.optionText}</li>
            <button 
                onClick={(e) => { props.deleteOneOption(props.optionText)} }>delete</button>
        </div>
    )
}


class Input extends React.Component {
    constructor(props) {
        super(props)
        this.add = this.addOne.bind(this)
        // as default there will be no error
        this.state = {
            error : undefined
        }
    }
    addOne(e) {
        //prevent flashing
        e.preventDefault()

        //put into variable value from input field named choice
        const choice = e.target.elements.choice.value.trim()
        const error = this.props.addOne(choice)

        this.setState(() => {
            return {
                error: error
            }
        })
        if (!error){
            e.target.elements.choice.value =""
        }
    }

    render() {
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p> }
                <p>minkä söisin</p>
                <form onSubmit={this.add}>
                    <input type="text" name="choice"></input>
                    <button>add</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<TheApp />,appRoot)






