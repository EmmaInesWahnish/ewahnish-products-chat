const uploadFile = (formData) => {
    const uploadRoute = `/api/multer/upload-file/`;

    const requestOptions = {
        method: 'POST',
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }        
    }

    fetch(uploadRoute, requestOptions)
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));
}

export default uploadFile