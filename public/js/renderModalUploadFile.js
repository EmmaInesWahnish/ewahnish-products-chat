import uploadFile from './uploadFile.js';

const renderModalUploadFile = () => {

    //formData = new FormData();

    let buttonId = "Image";

    document.getElementById('modal').style.display = 'block';

    const modifyForm = document.getElementById('modifyForm');

    modifyForm.innerHTML = `<div class="input-group">
                        <div class="form-group">
                            <label for='avatar'></label>
                            <input id='avatar' name='avatar' type="file">
                        </div>

      <button type="submit" id=${buttonId} class="btn btn-success">Upload</button>`;

    let theFile = document.getElementById("avatar");

    let formUpdate = document.getElementById(buttonId);

    formUpdate.addEventListener('click', function () {

        console.log("Antes de salir ", theFile.value);

        uploadFile(theFile);

        document.getElementById('modal').style.display = 'none';
    })

    let closeModal = document.getElementById('close');

    closeModal.addEventListener('click', function () {
        document.getElementById('modal').style.display = 'none';
    })

}

export default renderModalUploadFile;