//Validating Functions
const regCheck = (reg,ele) => reg.test(ele.value);

const selectCheck = ele => ele.value != "";

const dobCheck = ()=>{
    let date = new Date(document.getElementById("dob").value);
    return date.getFullYear()<=2010 && date.getFullYear()>=1950;
}

const usernameCheck = () => {
    if(localStorage.getItem('users'))
        return (JSON.parse(localStorage.getItem('users')).filter((user) => user.username == document.getElementById("username").value).length == 0)
    return true;
}

const profileCheck = () => (document.getElementById("profile").files[0].size / (1024*1024) <= 2) && (document.getElementById("profile").files[0].type =='image/jpeg' || document.getElementById("profile").files[0].type == 'image/png');

//Follow Up Actions
const nameFA = ()=>{
    if(regCheck(/^[a-zA-Z]+[ a-zA-Z]*$/ , document.getElementById("name")))
        document.getElementById('nameAck').innerHTML='';
    else
        document.getElementById('nameAck').innerHTML='Name should not contain numeric values or special character and cannot be empty';
};
const genderFA = ()=>{
    if(selectCheck(document.getElementById("gender")))
        document.getElementById('genderAck').innerHTML='';
    else
        document.getElementById('genderAck').innerHTML='Please select a value';
}
const educationFA = ()=>{
    if(selectCheck(document.getElementById("education")))
        document.getElementById('educationAck').innerHTML='';
    else
        document.getElementById('educationAck').innerHTML='Please select a value';
}
const emailFA = ()=>{
    if(regCheck(/^[a-zA-Z_.0-9]+@[a-zA-Z0-9.]+.[a-zA-Z]{2,4}$/ , document.getElementById("email")))
        document.getElementById('emailAck').innerHTML='';
    else
        document.getElementById('emailAck').innerHTML='Provide valid email id';
};
const contactFA = ()=>{
    if(regCheck(/^[9876][0-9]{9}$/ , document.getElementById("email")))
        document.getElementById('contactAck').innerHTML='';
    else
        document.getElementById('contactAck').innerHTML='Provide valid contact number';
};
const dobFA = ()=>{
    if(!dobCheck())
        document.getElementById('dobAck').innerHTML='Your DOB should be between 1950 and 2010';
    else
        document.getElementById('dobAck').innerHTML='';
};
const usernameFA = ()=>{
    if(document.getElementById("username").value == '')
        document.getElementById('usernameAck').innerHTML='Username Cannot be empty';
    else if(!usernameCheck())
        document.getElementById('usernameAck').innerHTML='User Already Exists';
    else   
        document.getElementById('usernameAck').innerHTML='';
};
const passwordFA = ()=>{
    if(regCheck(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/ , document.getElementById("password")))
        document.getElementById('passwordAck').innerHTML='';
    else
        document.getElementById('passwordAck').innerHTML='Password Should contain atleast<br>a small letter, a capital letter, a special character and a number<br> It should be in the length range 8-15';
};
const panFA = ()=>{
    if(regCheck(/^[A-Z]{5}[0-9]{4}[A-Z]$/,document.getElementById("pan")))
        document.getElementById('panAck').innerHTML='';
    else
        document.getElementById('panAck').innerHTML='Provide Valid PAN number';
};
const profileFA = ()=>{
    document.getElementById('profileAck').innerHTML='';
    if(document.getElementById("profile").files[0] == undefined){
        document.getElementById('profileAck').innerHTML='Upload Profile Image';
    }
    else if(document.getElementById("profile").files[0].size / (1024*1024) > 2)
        document.getElementById('profileAck').innerHTML='File Should be less than 2 MB';
    else if(document.getElementById("profile").files[0].type != 'image/jpeg' && document.getElementById("profile").files[0].type != 'image/png')
        document.getElementById('profileAck').innerHTML='Only jpeg or png files accepted';    
};

//Validating Input Values
document.getElementById("name").addEventListener('input', nameFA);
document.getElementById("email").addEventListener('input',emailFA);
document.getElementById("email").addEventListener('input',contactFA);
document.getElementById("dob").addEventListener('input',dobFA);
document.getElementById("username").addEventListener('input',usernameFA)
document.getElementById("password").addEventListener('input',passwordFA);
document.getElementById("pan").addEventListener('input',panFA);
document.getElementById("profile").addEventListener('input',()=>{
    profileFA();
    savePhoto();
});

//When It leaves Without Input
document.getElementById("name").addEventListener('blur', nameFA);
document.getElementById("email").addEventListener('blur',emailFA);
document.getElementById("email").addEventListener('blur',contactFA);
document.getElementById("dob").addEventListener('blur',dobFA);
document.getElementById("gender").addEventListener('blur',genderFA);
document.getElementById("education").addEventListener('blur',educationFA);
document.getElementById("username").addEventListener('blur',usernameFA)
document.getElementById("password").addEventListener('blur',passwordFA);
document.getElementById("pan").addEventListener('blur',panFA);
document.getElementById("profile").addEventListener('blur',profileFA);

//After Submissions
let profileFile = '';
const addUser = (usr) => {
    let userList = (localStorage.getItem('users'))?JSON.parse(localStorage.getItem('users')):[];
    userList.push(usr);
    localStorage.setItem('users',JSON.stringify(userList));
}
const savePhoto = () => {
    let reader = new FileReader();
    reader.onload = function(e){
        profileFile = e.target.result;
    }
    reader.readAsDataURL(document.getElementById("profile").files[0]);
}

document.querySelector('form').addEventListener('submit',(e)=>{
    if(regCheck(/^[a-zA-Z]+[ a-zA-Z]*$/,document.getElementById("name")) && regCheck(/^[a-zA-Z_.0-9]+@[a-zA-Z0-9.]+.[a-zA-Z]{2,4}$/,document.getElementById("email")) && regCheck(/^[9876][0-9]{9}$/,document.getElementById("email")) &&dobCheck() && usernameCheck() && regCheck(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/,document.getElementById("password")) && regCheck(/^[A-Z]{5}[0-9]{4}[A-Z]$/,document.getElementById("pan")) && profileCheck()){
        alert('Succesfully Submitted!');
        if(document.getElementById("occupation").value=='')
            document.getElementById("occupation").value='Not Mentioned';
        const user={
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            contact: document.getElementById("contact").value,
            gender: document.getElementById("gender").value,
            dob: document.getElementById("dob").value,
            education: document.getElementById("education").value,
            occupation: document.getElementById("occupation").value,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            pan: document.getElementById("pan").value,
            profileProps: {
                photo: profileFile,
                size: document.getElementById("profile").files[0].size,
                name: document.getElementById("profile").files[0].name              
            }
        };
        addUser(user);
    }
    else{
        e.preventDefault();
        alert('Submission Unsuccessful!')
        nameFA();
        emailFA();
        contactFA();
        dobFA();
        usernameFA();
        passwordFA();
        panFA();
        profileFA();
    }
})
