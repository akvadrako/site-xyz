---
title: Contact
---

<script>
    let form
    let msg
  
    async function submit(e) {
        e.preventDefault()
        
        let formData = new FormData(form)
        let reply = await fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "multipart/form-data" },
            body: new URLSearchParams(formData).toString()
        })
        msg = 'Form successfully submitted'
    }
</script>

<style>
#msg {
    border: thick solid black;
    background: green;
}
</style>

## Contact Details

- Email: <a href='mailto:info@doubly.so'>info@doubly.so</a>
- Address: Delft and Amsterdam, The Netherlands

## Contact Form

<form bind:this={form} name="contact" method="POST" data-netlify="true">
  <p>
    <label>Your Name: <input type="text" name="name" /></label>   
  </p>
  <p>
    <label>Your Email: <input type="email" name="email" /></label>
  </p>
  <p>
    <label>Your Role: <select name="role[]" multiple>
      <option value="leader">Leader</option>
      <option value="follower">Follower</option>
    </select></label>
  </p>
  <p>
    <label>Message: <textarea name="message"></textarea></label>
  </p>
  <p>
    <label>Picture (Optional): <input type="file" name="picture" /></label>
  </p>
  <p>
    <button on:click={submit}>Send</button>
  </p>
</form>

<p id=msg>{msg}</p>

