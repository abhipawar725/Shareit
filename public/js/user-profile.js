const uploadProfile = async (e) => {
    e.preventDefault()
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('profile', image)
    try {
        const res = await axios.post("http://localhost:8080/api/upload-profile", formData, {withCredentials: true})
        console.log(res.data);
        const profileImage = document.querySelector('#profile-image')
        profileImage.setAttribute("src", `/${res.data.profile}`);
    } catch (error) {        
        console.log(error.response.data.message);
    }
}