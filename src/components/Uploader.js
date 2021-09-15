import React from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import axios from 'axios';

function Uploader()  {
    const API_ENDPOINT = " https://ggst5fx39j.execute-api.us-east-1.amazonaws.com/default/getPresignedImageURL";
  
    const handleChangeStatus = ({ meta, remove }, status) => {
    console.log(status, meta);
    }
  
    const handleSubmit = async(files) => {
        const f = files[0];
        console.log("Inside handle submit",f['file']);
        //GET req for presigned URL
        const response = await axios({
            method: 'GET',
            url: API_ENDPOINT
          })

        console.log("Response :", response);
        //PUT req: upload file to S3
        const result = await fetch(response.data.uploadURL, {
            method: 'PUT',
            headers: {
                "Content-Type": "image/jpeg",
            },
            body: f["file"]
          })
        console.log('Result: ', result.url);
        alert("Please Check the console for your S3 bucket URL");
    }

    return (
      <React.Fragment>
        <div id="toast"></div>
        <Dropzone
        //   getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          maxFiles={1}
          multiple={false}
          canCancel={false}
          inputContent="Drop A File(jpg Image Alone) and Enter submit"
          styles={{
            dropzone: { width: 900, height: 200 },
            dropzoneActive: { borderColor: 'green' },
          }}
        />
      </React.Fragment>
    )
  }
  
  export { Uploader };