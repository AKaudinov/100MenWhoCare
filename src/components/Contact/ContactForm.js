import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import TextAreaInput from '../common/TextAreaInput';
import {ChasingDots} from 'better-react-spinkit';
import '../../styles/contact/contact.scss';

const ContactForm = ({contact, onChange, onPhoneKeyPress, onSend, onCancel, isSending, errors}) => {

    let sendButton = (
        <button className="btn btn-lg accept-orange-button" onClick={onSend}>
            Send
        </button>
    );

    let disabledSendButton = (
        <button className="btn btn-lg accept-orange-button" disabled>
            <ChasingDots color="black" size={25} className="standard-in-progress-button-icon"/> Sending
        </button>
    );


    let checkBoxNewsLetterClass = contact.newsletter ? 'contact-checkbox-button' : 'contact-checkbox-unchecked contact-checkbox-button';
    let emailCheckBoxClass = contact.receiveEmails ? 'contact-checkbox-button' : 'contact-checkbox-unchecked contact-checkbox-button';

    return (
        <div className="Contact">
            <div className="jumbotron">
                <div className="container">
                    <h4 className="contact-us-header display-4">Contact us</h4>
                    <hr className="contact-us-horizontal-line-break"/>
                    <form className="contact-us-form">
                        <div className="row">
                            <div className="input-fields">
                                <div className="contact-user-info">
                                    <div className="contact-firstName col-xs-12 col-md-6">
                                        <TextInput
                                            name="firstName"
                                            label="First Name"
                                            type="text"
                                            onChange={onChange}
                                            placeHolder="ex: John"
                                            value={contact.firstName}
                                            error={errors.firstName}/>
                                    </div>

                                    <div className="contact-lastName col-xs-12 col-md-6">
                                        <TextInput
                                            name="lastName"
                                            label="Last Name"
                                            type="text"
                                            onChange={onChange}
                                            placeHolder="ex: Mason"
                                            value={contact.lastName}
                                            error={errors.lastName}/>
                                    </div>

                                    <div className="contact-organization col-xs-12">
                                        <TextInput
                                            name="organization"
                                            label="Organization"
                                            type="text"
                                            onChange={onChange}
                                            value={contact.organization}
                                            error={errors.organization}/>
                                    </div>

                                    <div className="contact-email col-xs-12 col-md-6">
                                        <TextInput
                                            name="email"
                                            label="Email"
                                            type="email"
                                            onChange={onChange}
                                            placeHolder="example@domain.com"
                                            value={contact.email}
                                            error={errors.email}
                                        />
                                    </div>

                                    <div className="contact-phone col-xs-12 col-md-6">
                                        <TextInput
                                            name="phone"
                                            label="Phone"
                                            type="tel"
                                            maxlength="10"
                                            onChange={onChange}
                                            onKeyPress={onPhoneKeyPress}
                                            placeHolder="ex: 3035054343"
                                            value={contact.phone}
                                            error={errors.phone}/>
                                    </div>


                                    <div className="news-letter col-xs-12 col-md-6">
                                        <label className={checkBoxNewsLetterClass}>
                                            <input type="checkbox" name="newsletter" autoComplete="off"
                                                   onChange={onChange}/>
                                            <i className="fa fa-check"/>
                                        </label>
                                        <span className="news-letter-question">Would you like to sign up for the news letter?</span>
                                    </div>

                                    <div className="receive-emails col-xs-12 col-md-6">
                                        <label className={emailCheckBoxClass}>
                                            <input type="checkbox" name="receiveEmails" autoComplete="off"
                                                   onChange={onChange}/>
                                            <i className="fa fa-check"/>
                                        </label>
                                        <span
                                            className="receive-emails-question">Would you like to receive emails?</span>
                                    </div>

                                </div>

                                <div className="contact-message col-xs-12">
                                    <TextAreaInput
                                            name="message"
                                            label="Message"
                                            id="message"
                                            onChange={onChange}
                                            value={contact.message}
                                            error={errors.message}/>
                                </div>

                                    <div className="submit-contact col-xs-12 col-md-3">
                                        {isSending ? disabledSendButton : sendButton}
                                    </div>
                                <div className="cancel-contact col-xs-12 col-md-3">
                                    <button className="btn btn-lg cancel-gray-button" onClick={onCancel}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

ContactForm.propTypes = {
    contact: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onPhoneKeyPress: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isSending: PropTypes.bool.isRequired,
    errors: PropTypes.object
};


export default ContactForm;