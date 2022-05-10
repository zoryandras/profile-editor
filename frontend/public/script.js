const formComponent = `
    <form id="form">
        <h2>Profile Editor</h2>
        <label>Your name</label>
        <input type="text" name="firstname" placeholder="First name">
        <input type="text" name="surname" placeholder="Surname">
        <label>Your Adress</label>
        <input type="text" name="zip" placeholder="ZIP">
        <input type="text" name="country" placeholder="Country">
        <input type="text" name="city" placeholder="City">
        <input type="text" name="street" placeholder="Street">
        <input type="number" name="streetnumber" placeholder="Str. num">
        <textarea id="intro" name="intro" rows="3" cols="30"></textarea>
        <div class="upload-btn-wrapper">
            <button class="btn"> Upload your picture </button>
            <input type="file" name="picture" />
        </div>
        <span>
        <button id="save"> SAVE! </button>
        <button id="delete"> CLEAR! </button>
        </span>
    </form>
`

function loadEvent(){
    const rootElement = document.getElementById("root")
    rootElement.insertAdjacentHTML("beforeend", formComponent)

    let formElement = document.getElementById("form")
    formElement.addEventListener("submit", event => {
        event.preventDefault()
        
        const formData = new FormData()
        formData.append("firstname", event.target.querySelector(`input[name="firstname"]`).value)
        formData.append("surname", event.target.querySelector(`input[name="surname"]`).value)
        formData.append("zip", event.target.querySelector(`input[name="zip"]`).value)
        formData.append("country", event.target.querySelector(`input[name="country"]`).value)
        formData.append("city", event.target.querySelector(`input[name="city"]`).value)
        formData.append("street", event.target.querySelector(`input[name="street"]`).value)
        formData.append("streetnumber", event.target.querySelector(`input[name="streetnumber"]`).value)
        formData.append("introduction", event.target.querySelector(`textarea[name="intro"]`).value)
        formData.append("picture", event.target.querySelector(`input[name="picture"]`).files[0])

        const fetchSettings = {
            method: "POST",
            body: formData,
        }

        fetch("/", fetchSettings)
            .then(async data => {
                if (data.status === 200) {
                    const response = await data.json()
                    alert("YOUR DATA IS FINALLY MINE!")
                }
            })
            .catch(error => {
                event.target.outerHTML = "The shit hits the fan"
                console.dir(error)
            })             
    })
    
    let clear =  document.getElementById("delete").addEventListener("click", clearField)

    function clearField() {
        formElement.reset()
    }
    

    }


window.addEventListener("load", loadEvent)