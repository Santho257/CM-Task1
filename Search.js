const displayCard = (user, ele) => {
    ele.innerHTML += `<div class="user">
                        <img src="${user.profileProps.photo}" alt="Profile Photo"/>
                        <h4>${user.name}</h4>
                        <table><tr><td>Username</td><td>:</td><td>${user.username}</td></tr>
                        <tr><td>email</td><td>:</td><td>${user.email}</td></tr>
                        <tr><td>contact</td><td>:</td><td>${user.contact}</td></tr>
                        <tr><td>Gender</td><td>:</td><td>${user.gender}</td></tr>
                        <tr><td>Date Of Birth</td><td>:</td><td>${user.dob}</td></tr>
                        <tr><td>Education</td><td>:</td><td>${user.education}</td></tr>
                        <tr><td>Occupation</td><td>:</td><td>${user.occupation}</td></tr>
                        <tr><td>PAN</td><td>:</td><td>${user.pan}</td></tr></table></div>`
}
document.querySelector(".searchBar").addEventListener("focus", () => {
    document.getElementById("userForm").style.display = "none";
    document.getElementById("searchArea").style.display = "block";
});
document.querySelector(".searchBar").addEventListener("blur", () => {
    if (document.querySelector(".searchBar").value == '') {
        document.getElementById("searchArea").style.display = "none";
        document.getElementById("userForm").style.display = "block";
    }
});
document.querySelector(".searchBar").addEventListener("input", () => {
    let userss = JSON.parse(localStorage.getItem("users"));
    if (userss == null)
        document.querySelector("#users").innerHTML = `<h2>No Users in Local Storage</h2>`;
    else if(document.querySelector(".searchBar").value == '')
        document.querySelector("#users").innerHTML = ``;
    else {
        let filteredUsers = [];
        if (/^[a-zA-Z ]+$/.test(document.querySelector(".searchBar").value)) {
            filteredUsers = userss.filter((user) => user.name.toLowerCase().includes(document.querySelector(".searchBar").value.toLowerCase()));
        }
        else if (/^[0-9]+$/.test(document.querySelector(".searchBar").value)) {
            filteredUsers = userss.filter((user) => ((new Date().getTime() - new Date(user.dob).getTime()) / (1000 * 60 * 60 * 24)) <= parseInt(document.querySelector(".searchBar").value ));
        }
        else if (/^[0-9.]+[bkmgtBKMGT]{1,2}$/.test(document.querySelector(".searchBar").value)) {
            let searchType = document.querySelector(".searchBar").value.substr(document.querySelector(".searchBar").value.length - 2, 2).toLowerCase();
            if (/^\d[b]$/.test(searchType)) {
                filteredUsers = userss.filter((user) => user.profileProps.size < parseFloat(document.querySelector(".searchBar").value.substr(0, document.querySelector(".searchBar").value.length - 1)));
            }
            else if (searchType == "kb")
                filteredUsers = userss.filter((user) => user.profileProps.size / 1024 < parseFloat(document.querySelector(".searchBar").value.substr(0, document.querySelector(".searchBar").value.length - 2)));
            else if (searchType == "mb")
                filteredUsers = userss.filter((user) => user.profileProps.size / (1024 * 1024) < parseFloat(document.querySelector(".searchBar").value.substr(0, document.querySelector(".searchBar").value.length - 2)));
            else if (searchType == "gb")
                filteredUsers = userss.filter((user) => user.profileProps.size / (1024 * 1024 * 1024) < parseFloat(document.querySelector(".searchBar").value.substr(0, document.querySelector(".searchBar").value.length - 2)));
        }
        if (filteredUsers.length > 0) {
            document.querySelector("#users").innerHTML = '';
            filteredUsers.forEach(user => displayCard(user, document.querySelector("#users")));
        }
        else {
            document.querySelector("#users").innerHTML = `<h2>No Results Found</h2>`
        }
    }
})