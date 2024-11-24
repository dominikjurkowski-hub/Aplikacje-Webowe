
function generate() {
    let min = parseInt(document.getElementById('min').value);
    let max = parseInt(document.getElementById('max').value);
    let upper = document.getElementById('upper').checked;
    let special = document.getElementById('special').checked;


    let uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let specialChars = "!@#$%^&*()_+[]{}|;:',.<>?";

  
    let characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    if (upper) {
        characters += uppercaseChars;
    }

    if (special) {
        characters += specialChars;
    }

    let size = Math.floor(Math.random() * (max - min + 1)) + min;


    let password = "";
    for (let i = 0; i < size; i++) {
        let x = Math.floor(Math.random() * characters.length);
        password += characters[x];
    }

    alert(`Wygenerowane hasło: ${password}`);
}


