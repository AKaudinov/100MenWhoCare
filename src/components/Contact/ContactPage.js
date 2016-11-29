import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as contactActions from '../../actions/contactActions';
import ContactForm from './ContactForm';
import toastr from 'toastr';


export class ManageContactpage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            contact: {
                firstName: '',
                lastName: '',
                email: '',
                phone:'',
                subject: '',
                organization: '',
                newsLetter: false,
                receiveEmails: false,
                message: ''
            },
            errors: {}
        };

        this.updateContactInfoState = this.updateContactInfoState.bind(this);
        this.updateStateCheckBox = this.updateStateCheckBox.bind(this);
        this.checkErrors = this.checkErrors.bind(this);
        this.submitContact = this.submitContact.bind(this);
        this.onSuccessfulSubmit = this.onSuccessfulSubmit.bind(this);
        this.onFailedSubmit = this.onFailedSubmit.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
    }

    //will need to be removed
    componentWillMount(){
        this.props.actions.getAllContacts();
    }

    updateContactInfoState(event) {
        const field = event.target.name;
        const fieldValue = event.target.value;

        this.checkErrors(field, fieldValue);

        let contactSetter = this.state.contact;
        contactSetter[field] = fieldValue;
        return this.setState({contact: contactSetter});
    }

    updateStateCheckBox(event){
        event.preventDefault();
        const fieldName = event.target.name;
        let contactSetter = this.state.contact;
        contactSetter[fieldName] = !this.state.contact[fieldName];
        return this.setState({contact: contactSetter});
    }


    checkErrors(fieldName, fieldValue){
        let stateErrorsCleaner = this.state.errors;
        let errorMessage = stateErrorsCleaner[fieldName];

        //email validation
        if(fieldName == 'email' && fieldValue.indexOf('@') !== -1){
            stateErrorsCleaner.email = '';
        }

        //phone validation
        if(fieldName == 'phone'){
            if(fieldValue.length === 10 && errorMessage.indexOf('digits') !== 1){
                stateErrorsCleaner.phone = '';
            }
        }

        //check for blanks, make sure errorMessage is actually defined and than check for the 'blank' error
        if(fieldValue.length > 0 && (errorMessage && errorMessage.indexOf('blank') !== -1)){
            stateErrorsCleaner[fieldName] = '';
            return this.setState({errors: stateErrorsCleaner});
        }
    }

    onSuccessfulSubmit(msg) {
        toastr.options = {
            positionClass: 'toast-top-center',
            preventDuplicates: false,
            progressBar: true
        };
        toastr.success(msg);
        let stateContactSetter = Object.assign({}, this.state.contact, {
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        return this.setState({contact: stateContactSetter});
    }

    onFailedSubmit(err){
        toastr.options = {
            positionClass: 'toast-top-center',
            preventDuplicates: false,
            progressBar: true
        };
        toastr.error(err);
    }

    submitContact(event) {
        event.preventDefault();
        if(this.isFormValid()) {
            //this.props.dispatch(contactActions.submitContactForm(this.state.contact))
            this.props.actions.submitContactForm(this.state.contact)
            .then(() => {
               if(this.props.contactUsResult.successfulMessage){
                   return this.onSuccessfulSubmit(this.props.contactUsResult.successfulMessage);
               }else{
                   return this.onFailedSubmit(this.props.contactUsResult.messageSendError);
               }
            });
        }
    }

    isFormValid(){
        let contactObj = this.state.contact;
        let errorSetter = this.state.errors;
        let valid = true;

        //blank check
        Object.keys(contactObj).map(key => {
           if(contactObj[key] == '') {
               valid = false;
               let objKey = key;
               if(objKey === 'firstName'){
                   objKey = 'First Name';
               }
               if(objKey === 'lastName'){
                   objKey = 'Last Name';
               }
               return errorSetter[key] = `${objKey} cannot be blank`;
           }
        });

        //valid email check
        if(contactObj.email.indexOf('@') === -1 && contactObj.email !== ''){
            valid = false;
            errorSetter.email = `${contactObj.email} is not a valid email`;
        }//

        //phone check
        if(contactObj.phone.length > 10){
            valid = false;
            errorSetter.phone = `Phone must be lower than 10 digits`;
        }
        if(contactObj.phone.length < 10){
            valid = false;
            errorSetter.phone = `Phone must be 10 digits long`;
        }//

        if(valid !== true){
            this.setState({errors: errorSetter});
            return false;
        }
        return valid;
    }


    render() {
        return (
            <ContactForm
                contact={this.state.contact}
                retrievedContacts={this.props.contacts}
                onChange={this.updateContactInfoState}
                updateStateCheckBox={this.updateStateCheckBox}
                onSend={this.submitContact}
                fetchCallsInProgress={this.props.fetchCallsInProgress}
                errors={this.state.errors}
            />
        );
    }
}

ManageContactpage.propTypes = {
    //dispatch: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    contactUsResult: PropTypes.object.isRequired,
    contacts: PropTypes.object.isRequired,
    fetchCallsInProgress: PropTypes.number.isRequired
};

function mapStateToProps(state, ownprops){
return{
        contactUsResult: state.contactUsResult,
        contacts: state.contacts,
        fetchCallsInProgress: state.fetchCallsInProgress
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(contactActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageContactpage);