import React from 'react'
import ReactDOM from 'react-dom'
import ModalWindow from './components/ModalWindow'

import Header from './components/Header'

import 'normalize.css/normalize.css'
import './styles/styles.scss'

var appRoot = document.getElementById('app')

class TheApp extends React.Component {
    state = {
        list : [],
        count : 0,
        resultValue: undefined
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

    removeAll = () => {
        this.setState(() => ({ list: [] }) )
    }

    deleteOneOption = (itemToRemove) => {
        this.setState((oldState) => ({
            list: oldState.list.filter((choice) => itemToRemove !== choice)
            }))
    }

    chooseOne = () => {
        const chosenId = Math.floor(Math.random()*this.state.list.length)
        const chosenValue = this.state.list[chosenId]
        //alert(chosenValue)
        this.setState(() => ({
            resultValue : chosenValue
        }))
    }
    
    addOne = (choice) => {
        //validation
        if (!choice) {
            return <p className='form__empty-message'>type something in</p>
        } else if (this.state.list.indexOf(choice) > -1) {
            return <p className='form__empty-message'>duplicates not accepted</p>
        }
        this.setState((oldList) => {
            return {
                list : oldList.list.concat([choice])
            }
        })
    }
    resetChoice = () => {
        this.setState(() => ({ resultValue: undefined }))
    }

    render(){
        const title = 'herkkukone'
        return (
            <div>
            <Header />
            <div className='container'>
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
                <ModalWindow 
                    resultValue={this.state.resultValue}
                    resetChoice={this.resetChoice}
                />
            </div>

        </div>
        )
    }
}

const Guess = (props) => {
    return (
        <div>
            <button className={"big-button"} onClick={props.chooseOne}>GUESSSS</button>
        </div>
)}

const Options = (props) => {
    return (
        <div>
                {    
                props.list.map( (item,index) => (
                    <Option
                    itemNo={index+1}
                    key={item}
                    optionText={item} 
                    deleteOneOption={props.deleteOneOption} />) 
                    )
                }
            <div className='form__clear'>
                {props.list.length === 0 && 
                <p className='form__empty-message'>try adding something above</p>}
                <button 
                    className='form__clear-text'
                    onClick={props.removeAll}
                    disabled={!props.hasContent}
                >(X) Clear All
                </button>
            </div>
        </div>
    )  
}

const Option = (props) => {
    return (
        <div className="choice">
            <p className="choice__text">{props.itemNo}. {props.optionText}</p>
            <button className='button__delete-choice'
                onClick={(e) => { props.deleteOneOption(props.optionText)} }>X</button>
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
                <form className='add' onSubmit={this.add}>
                    <input className='add__input' type="text" name="choice"></input>
                    <button className='button'>add</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<TheApp />,appRoot)






