import React from 'react'

export default class Input extends React.Component {
    // as default there will be no error
    state = {
        error : undefined
    }
    addOne = (e) => {
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

