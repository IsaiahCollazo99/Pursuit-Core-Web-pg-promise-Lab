document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    const form = document.querySelector('#addUserForm');
    form.addEventListener('submit', addUserFormSubmitted);

    const displayPostSelect = document.querySelector("#displayPostSelect");
    const postForm = document.querySelector("#postForm");

    displayPostSelect.addEventListener("change", async () => {
        let res = await axios.get("http://localhost:3001/posts/" +  displayPostSelect.value)
        showUserPosts(res.data);
        
    })

    postForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let createPostSelect = document.querySelector("#createPostSelect");
        let userInput = document.querySelector("#postBody");
        let createResponse = document.querySelector("#createResponse");
        createResponse.innerHTML = "";

        if(createPostSelect.value === "disabled") {
            let error = document.createElement("p");
            error.innerText = "Please select a user";
            createResponse.appendChild(error);
        } else if(!userInput.value) {
            let error = document.createElement("p");
            error.innerText = "Please fill out the post's body";
            createResponse.appendChild(error);
        } else {
            let poster_id = createPostSelect.value;
            let body = userInput.value;
            let res = await axios.post("http://localhost:3001/posts/register/", {poster_id, body});
            appendPostResponse(res.data);
        }
    })
});

const loadUsers = async () => {
    const usersList = document.querySelector('#usersList');
    const userSelects = document.querySelectorAll(".users");
    usersList.innerHTML = "";
    const res = await axios.get(`http://localhost:3001/users/all`);
    res.data.users.forEach((user) => {
        let li = document.createElement("li");
        li.innerText = `${user.firstname} ${user.lastname}, age ${user.age}`;
        for(let i = 0; i < userSelects.length; i++) {
            let option = document.createElement("option");
            option.value = user.id;
            option.innerText = `${user.firstname} ${user.lastname}`;
            userSelects[i].appendChild(option);
        }
        usersList.appendChild(li);
    });
} // End of loadUser() function

const showUserPosts = async (data) => {
    let allPosts = document.querySelector("#allPosts");
    allPosts.innerHTML = "";
    let posts = data.posts;
    posts.forEach(post => {
        let {firstname, lastname, body} = post;
        let postInfo = document.createElement("p");
        postInfo.innerHTML = `<b>User</b>: ${firstname} ${lastname} <b>Body</b>: ${body}`
        allPosts.appendChild(postInfo);
    })
} // End of showUserPosts() function

const appendPostResponse = async (data) => {
    let createResponse = document.querySelector("#createResponse");
    createResponse.innerHTML = "";
    
    let post = document.createElement("p");
    post.innerText = data.post.body;
    createResponse.appendChild(post);
    
} // End of appendPostResponse() function

const addUserFormSubmitted = async (event) => {
    event.preventDefault();    
    const firstname = document.querySelector('#firstNameInput').value;
    const lastname = document.querySelector('#lastNameInput').value;
    const age = document.querySelector('#ageInput').value;
    let response = await axios.post(`http://localhost:3000/users/register`, { firstname, lastname, age });
    loadUsers();
} // End of addUserFormSubmitted() function