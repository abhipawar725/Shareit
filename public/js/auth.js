const login = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    let allData = {}
    for (const [key, value] of formData.entries()) {
        allData[key] = value
    }
    try {
        const res = await axios.post("http://localhost:8080/api/login", allData)
        console.log(res.data);
        Swal.fire({
            text: res.data.message,
            icon: "success"
        });
        form.reset()
        if(res.data.redirect){
            window.location.href = res.data.redirect
        }
    } catch (error) {
        Swal.fire({
            text: error.response?.data?.message,
            icon: "error"
        });
    }
}

const signup = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    let allData = {}
    for (const [key, value] of formData.entries()) {
        allData[key] = value
    }
    try {
        const res = await axios.post("http://localhost:8080/api/signup", allData)
        console.log(res.data);
        Swal.fire({
            text: res.data.message,
            icon: "success"
        });
        form.reset()
        if(res.data.redirect){
            window.location.href = res.data.redirect
        }
    } catch (error) {
        Swal.fire({
            text: error.response?.data?.message,
            icon: "error"
        });
    }
}