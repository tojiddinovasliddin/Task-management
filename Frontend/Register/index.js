const full_name = document.querySelector(".full_name")
const email = document.querySelector(".email")
const username = document.querySelector(".username")
const password = document.querySelector(".password")

 async function btn_signs(){
      let arr = await axios.post("http://localhost:8080/register", {
         full_name: full_name.value,
         email: email.value,
         username: username.value,
         password:password.value
      })
     console.log(arr)

}
