import uploadFile from './uploadFile.js';
import multer from 'multer';

const renderModalUploadFile = () => {

    formData = new FormData();

    let buttonId = "Image";

    document.getElementById('modal').style.display = 'block';

    const modifyForm = document.getElementById('modifyForm');

    modifyForm.innerHTML = `<div class="input-group">
                        <div class="form-group">
                            <label for='avatar'>Select file</label>
                            <input id='avatar' name='avatar' type="file">
                        </div>

      <button type="submit" id=${buttonId} class="btn btn-success">Upload</button>`;

    let theFile = document.getElementById("avatar");

    let formUpdate = document.getElementById(buttonId);

    formUpdate.addEventListener('click', function () {

        formData.append("avatar", theFiles.files[0]);
        console.log("Antes de salir ", formData);

        uploadFile(formData);

        document.getElementById('modal').style.display = 'none';
    })

    let closeModal = document.getElementById('close');

    closeModal.addEventListener('click', function () {
        document.getElementById('modal').style.display = 'none';
    })

}

export default renderModalUploadFile;