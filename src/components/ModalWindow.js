import React from 'react'
import Modal from 'react-modal'

export default class ModalWindow extends React.Component {
    componentWillMount = () => {
        Modal.setAppElement('body')
    }
    render() {
        return (
            <Modal
                isOpen={!!this.props.resultValue}
                contentLabel={"result choice"}
                onRequestClose={this.props.resetChoice}
                closeTimeOutMS={100}
                className="custom__modal"
                >
                <h3>Result</h3>
                {this.props.resultValue && <p className='choice__text'>{this.props.resultValue}</p>}
                <button
                    className='button'
                    onClick={this.props.resetChoice}> X </button>
                </Modal>
            )
    }
}