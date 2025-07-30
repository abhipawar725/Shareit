const uploadFile = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    try {
        const res = await axios.post("http://localhost:8080/api/file", formData)
        Swal.fire({
            text: res.data.message,
            icon: "success"
        });
        fetchFiles()
    } catch (error) {
        Swal.fire({
            text: error.response.data.message,
            icon: "error"
        });
    }
}

const fetchFiles = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/files")
        const data = res.data.files
        const tableBody = document.querySelector('#table-body')
        tableBody.innerHTML = ""
        data.forEach((item, index) => {
                       const ui = `
                        <tr>
                            <th scope="row">${index + 1}</th>
                            <td>${item.file}</td>
                            <td>${item.type}</td>
                            <td>${item.size}</td>
                            <td>${moment(item.createdAt).format("DD/MM/YYYY")}</td>
                            <td>
                                <button type="button" class="btn btn-success"><i class="ri-download-2-line"></i></button>
                                <button type="button" class="btn btn-primary"><i class="ri-edit-line"></i></button>
                                <button type="button" class="btn btn-danger" onclick="deleteFile('${item._id}')"><i class="ri-delete-bin-line"></i></button>
                            </td>
                        </tr>
            `
            tableBody.innerHTML += ui 
        });
    } catch (error) {
       console.log('error:', error?.response?.data?.message || error.message);
    }
}

window.addEventListener('load', fetchFiles)

const deleteFile = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:8080/api/file/${id}`);
    Swal.fire({
      text: res.data.message,
      icon: "success"
    });
    fetchFiles(); // Refresh file list
  } catch (error) {
    Swal.fire({
      text: error?.response?.data?.message || "Error deleting file",
      icon: "error"
    });
  }
}
