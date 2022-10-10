import uploadFile from './uploadFile.js';

const renderModalUploadFile = () => {

    document.getElementById('uModal').style.display = 'block';

    const uForm = document.getElementById('uForm');

    uForm.innerHTML = `<div class="form-group">
                        <label for='name'>Name</label>
                        <input name='name' id='name' placeholder="Enter your name" />
                    </div>
                    <div class="form-group">
                        <label for='files'></label>
                        <input id='files' name='files' type="file">
                    </div>

      <button type="submit" class="btn btn-success">Upload</button>`;


    uForm.addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();
        const name = document.getElementById("name");
        const files = document.getElementById("files");
        let formData = new FormData();

        const uploadRoute = `/api/up`;

        formData.append("name",name.value);
        formData.append("files", files.files[0]);

        console.log(formData)

        const requestOptions = {
            method: 'POST',
            body: formData,
            headers: {
            }
        }

        fetch(uploadRoute, requestOptions)
            .then(async res => {
                const data = await res.json();
                console.log(data)
            })
            .catch((err) => ("Error occured", err));

        document.getElementById('uModal').style.display = 'none';
    }



    let closeModal = document.getElementById('uClose');

    closeModal.addEventListener('click', function () {
        document.getElementById('uModal').style.display = 'none';
    })

}

export default renderModalUploadFile;