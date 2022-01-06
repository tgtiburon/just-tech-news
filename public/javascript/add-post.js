async function newFormHandler(event) {
    event.preventDefault();

    // On form submission it grabs the post title and url 
    
    const title = document.querySelector('input[name="post-title"]').value;
    const post_url = document.querySelector('input[name="post-url"]').value;


    // posts the info from above 
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title, 
            post_url
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

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);