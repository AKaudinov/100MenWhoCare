import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as galleryActions from '../../actions/galleryActions';
import GalleryPage from './GalleryPage';

class GalleryContainer extends React.Component{
    constructor(props, context) {
        super(props, context);

        this.state = {
            gallery: []
        };
    }

    componentWillMount(){
        this.props.actions.loadGallery()
        .then(() => {
            return this.setState({gallery: this.props.gallery.data});
        });
    }

    render(){
        return (
            <GalleryPage gallery={this.state.gallery}/>
        );
    }
}


GalleryContainer.propTypes = {
    gallery: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownprops){
    return{
      gallery: state.gallery
    };
}

function mapDispatchToProps(dispatch){
    return {
      actions: bindActionCreators(galleryActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);