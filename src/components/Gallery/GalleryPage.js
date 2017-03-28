import React, {PropTypes} from 'react';
import {FoldingCube} from 'better-react-spinkit';
import '../../styles/gallery/gallery.scss';
//import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
//import '../../../node_modules/react-image-gallery/styles/css/image-gallery-no-icon.css';
import '../../../node_modules/evolved-react-image-gallery/build/image-gallery.css';
import ImageGallery from 'evolved-react-image-gallery';
import {encode} from 'base64-arraybuffer';
import DropZone from 'react-dropzone';

const GalleryPage = ({onDrop, files, image, isLoading}) => {
    //let images = gallery.map(image => {
    //    return {
    //        original: `data:image/jpeg;base64,${image.ContentStr}`,
    //        thumbnail: `data:image/jpeg;base64,${image.ContentStr}`
    //    };
    //});

    //let s3Image = `data:image/jpeg;base64,${encode(image)}`;
    let images = [
        //{
        //  original: s3Image,
        //    thumbnail: s3Image
        //},
        {
         original: 'http://deskbg.com/s3/temp/96-Image00005.jpg',
            thumbnail: 'http://deskbg.com/s3/temp/96-Image00005.jpg'
        },
        {
            original: 'https://i.ytimg.com/vi/m8Lrby7g498/maxresdefault.jpg',
            thumbnail: 'https://i.ytimg.com/vi/m8Lrby7g498/maxresdefault.jpg'
        },
        {
            original: 'http://www.prgn.com/wp-content/uploads/2013/12/Denver-Skyline.jpg',
            thumbnail: 'http://www.prgn.com/wp-content/uploads/2013/12/Denver-Skyline.jpg'
        },
        {
            original: 'http://www.mycoolbackgrounds.com/backgrounds/24532/Summit%20Lake%20Below%20Mount%20Evans,%20Arapaho%20National%20Forest,%20Colorado.jpg',
            thumbnail: 'http://www.mycoolbackgrounds.com/backgrounds/24532/Summit%20Lake%20Below%20Mount%20Evans,%20Arapaho%20National%20Forest,%20Colorado.jpg'
        },
        {
            original: 'http://domplast.biz/wp-content/uploads/2016/12/garden_of_the_gods_open_hours_181984_1920_1080.jpg',
            thumbnail: 'http://domplast.biz/wp-content/uploads/2016/12/garden_of_the_gods_open_hours_181984_1920_1080.jpg'
        }
    ];

    let galleryMenu = [];
    galleryMenu.push({
       text: 'details',
        callback: function(idx){
            console.log(`selected image ${idx}`);
        }
    });

    return (
        <div className="gallery-main row">
            <div className="container-fluid">
                <div className="gallery-displayer">
                    <div className="gallery-jumbotron jumbotron">
                        <div className="gallery-container container">
                            <h2 className="display-4 gallery-title">Our Gallery</h2>
                            <hr className="gallery-horizontal-line-break" />
                            {isLoading &&
                            <div className="gallery-loading">
                                <FoldingCube size={100}/>
                            </div>}

                            <div className="image-upload-area">
                                <DropZone className="drop-zone" onDrop={onDrop} multiple={false} accept="image/*" >
                                        <div>Drag and drop an image here, or click to select</div>
                                </DropZone>
                                {files.length > 0 &&
                                <div className="preview-area">{files.map(file =>
                                    <img key={file.name} className="preview-image" src={file.preview}/>)}</div>}
                            </div>

                                <div className="gallery-displayer">
                                    {images.length > 0
                                    ? <ImageGallery
                                        items={images}
                                        slideInterval={3000}
                                        gallerymenu={galleryMenu}
                                        //thumbnailPosition="bottom"
                                        showFullScreenButton={true}
                                        autoPlay={true}
                                    />
                                    : <p className="lead">No images were retrieved to view</p>}

                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

GalleryPage.propTypes = {
    onDrop: PropTypes.func.isRequired,
    files: PropTypes.array.isRequired,
    image: PropTypes.object,
    isLoading: PropTypes.bool
};


//<div className="container-fluid">
//    <div className="gallery-displayer">
//        <ImageGallery
//            items={images}
//            slideInterval={3000}
//        />
//    </div>
//</div>

export default GalleryPage;