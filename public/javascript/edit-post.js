async function editFormHandler(event) {
    event.preventDefault();

    // On form submission it grabs the post title and url 
    
    const title = document.querySelector('input[name="post-title"]').value;
    
     // get id number   dashboard/edit/21     
     const id = window.location.toString().split('/') [
        window.location.toString().split('/').length -1
    ];

    // posts the info from above 
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title 
           
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok){
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);