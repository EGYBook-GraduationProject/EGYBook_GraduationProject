import React, { Component, Fragment } from 'react';  
import { Modal } from 'react-bootstrap';  

  
class ModalPopup extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {  
            showModal: false  
            
        };  
    }  
  
    isShowModal = (status) => {  
        this.handleClose();  
        this.setState({ showModal: status });  
    }  
  
    handleClose = () => {  
        this.props.onPopupClose(false);  
    }  
  
  
    render() {  
        return (  
            <Fragment>  
                <Modal show={this.props.showModalPopup} onHide={this.handleClose}  
                    size="lg"  
                    aria-labelledby="contained-modal-title-vcenter"  
                    centered  
                >  
                   
                    <Modal.Body> 
                    <button className="img-profile"> Change profile photo</button>
                   <div className="img-radius"> <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" width ="120" height ="120"alt="" /> 
                   
                     
                       <div className="h6"><h6> Username </h6> </div> <input id="first-name" className="reviews-title" type="text9" name="FirstName"autocomplete="off" required
                        
                        // value={this.state.userFields["FirstName"]}
                        // onChange={this.handleChange.bind(this,  " FirstName")}
                      />
                      </div> 
                        <div>
                        <div className="h6"> <h6> Email </h6></div>
                        <input id="first-name" className="reviews-title" type="text9" name="FirstName"autocomplete="off" required
                        
                        // value={this.state.userFields["FirstName"]}
                        // onChange={this.handleChange.bind(this,  " FirstName")}
                      />
                      </div> 
                        <div>
                        <div className="h6"><h6> Phone Number </h6></div>
                        <input id="first-name" className="reviews-title" type="text9" name="FirstName"autocomplete="off" required
                        
                        // value={this.state.userFields["FirstName"]}
                        // onChange={this.handleChange.bind(this,  " FirstName")}
                      /></div>
                      <div>
                     
                      <div className="h6"> <h6> Location </h6></div>
                        <input id="first-name" className="reviews-title" type="text9" name="FirstName"autocomplete="off" required
                        
                        // value={this.state.userFields["FirstName"]}
                        // onChange={this.handleChange.bind(this,  " FirstName")}
                      /></div>
                      <div>
                      <div className="h6"> <h6> Nationality </h6></div> 
                        <input id="first-name" className="reviews-title" type="text9" name="FirstName"autocomplete="off" required
                        
                        // value={this.state.userFields["FirstName"]}
                        // onChange={this.handleChange.bind(this,  " FirstName")}
                      /></div>
                     
                        <div className="signUp">  
                        <button type="button" className="link-button" > Save</button>
                            <button type="button" className="link-button2" onClick={() => this.isShowModal(true)}> Cancel</button>
                        </div>  
                    </Modal.Body>  
  
                </Modal >  
            </Fragment >  
  
        );  
    }  
}  
  
export default (ModalPopup);  