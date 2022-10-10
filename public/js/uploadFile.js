const uploadFile = (thefile) => {
    const uploadRoute = `/api/upload_file`;

    console.log(thefile)

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(thefile),
        headers: {
          "Content-Type": "multipart/form-data"
        }        
    }

    fetch(uploadRoute, requestOptions)
        .then(async res => {
          const data = await res.json();
          console.log(data)
        })
        .catch((err) => ("Error occured", err));
}

export default uploadFile