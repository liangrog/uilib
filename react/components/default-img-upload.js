import React, { Component } from 'react'

const DefaultImgUpload = 
    MethodComponent => 
    UploadComponent =>
    ( { label = 'Profile photo', dirName = '', bucketName = '', ...args } = {} )  => {

    return (
        <MethodComponent bucketName={bucketName}>
        {
            //callback is the AuthComponent scope this
            (callbackMethod) => (
                <UploadComponent uploadFile={callbackMethod.createFile} dirName={dirName} imgPreview={true}>
                {
                    (callbackUpload) => (
                        <div>
                        <ul className="form-list">
                            <li>
                                <label>{label}</label>
                            </li>
                        </ul>
                            <div className="img-container l_span_2">
                                <img className="profile-preview" src={callbackUpload.state.imageUrl || require("../../../assets/images/profile-preview.png") } />
                            </div>
                            <div className="l_span_10 l_last">
                                {/*<a className="" id="upload" onClick={() => this.refs.fileInput.click()}>{label}</a>*/}
                                <input className="btn btn_secondary btn_margin_small" type="file" name="files[]" ref="fileInput" onChange={callbackUpload.upload} />
                                {/*<p>You can also drag and drop a picture from your computer.</p>*/}
                                <div className="">
                                    <p><strong>Upload requirements</strong><br/>
                                    Photo dimensions 600 x 600 pixels.<br/>
                                    Maximum file size is 5MB and accepted file types are JPG, GIF and PNG.</p>
                                </div>
                            </div>
                        </div>
                    )
                }
                </UploadComponent>
            )
        }
        </MethodComponent>
    )
}

export default DefaultImgUpload
