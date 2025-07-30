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
    } catch (error) {
        Swal.fire({
            text: error.response.data.message,
            icon: "error"
        });
    }
}