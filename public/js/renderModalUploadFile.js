const renderModalUploadFile = () => {

    document.getElementById('uModal').style.display = 'block';

    const here = document.getElementById('here');

    here.innerHTML = `<div id="root">
    <h2 class="form_title">Formulario para upload de archivos</h2>
    <form action="/api/up" enctype="multipart/form-data" method="POST">
      <div class="m-2">
        <input type="file" name="avatar" />
      </div>
      <div class="m-2">
        <input type="submit" value="Upload File" class="btn btn-success" />
      </div>
    </form>
  </div>`;

    uForm.addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();
    }

    document.getElementById('uModal').style.display = 'none';

    let closeModal = document.getElementById('uClose');

    closeModal.addEventListener('click', function () {
        document.getElementById('uModal').style.display = 'none';
    })

}

export default renderModalUploadFile;