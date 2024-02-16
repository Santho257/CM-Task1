const togglePassword = () =>{
    let img = document.querySelector("#passwordArea img");
    let input = document.querySelector("#passwordArea input");
    if(input.type === "password"){
        img.src = "https://cdn-icons-png.flaticon.com/512/2767/2767146.png";
        input.type = "text";
    }
    else{
        img.src = "https://cdn-icons-png.flaticon.com/512/159/159604.png";
        input.type = "password";
    }

}