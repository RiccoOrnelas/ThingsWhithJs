function validateEmail(email) {
    if (!email.match(/\w{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/)) {
        const err = new Error('Email inválido.')
        err.input = 'email'
        throw err
    }
}

function validatePassword(password) {
    if (password.length < 8) {
        throw new Error('A senha deve ter no mínimo 8 caracteres.')
    }

    if (!password.match(/[a-z]/)) {
        throw new Error('A senha deve conter pelo menos uma letra minúscula.')
    }

    if (!password.match(/[A-Z]/)) {
        throw new Error('A senha deve conter pelo menos uma letra maiúscula.')
    }

    if (!password.match(/[0-9]/)) {
        throw new Error('A senha deve conter pelo menos um número.')
    }

    if (!password.match(/[^a-zA-Z0-9\s]/)) {
        throw new Error('A senha deve conter pelo menos um caractere especial.')
    }
}
function validateName(name) {
    if (name === "") {
        throw new Error('Ops... Esqueceu do Nome')
    }

}

function resetFormStyles() {
    Object.entries(userInputs).forEach(([key, value]) => {

        document.querySelector(`#${key}-error`).textContent = ''
    })
}
function hello(pagina) {
    window.location.href = pagina
}

const userInputs = {}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('btn')

    form.addEventListener('click', (ev) => {
        ev.preventDefault()
        const username = document.getElementById('name').value
        const useremail = document.getElementById('email').value
        const userpassword = document.getElementById('password').value
        const useremail2 = document.getElementById('email').value


        try {
            validateEmail(useremail)
            validatePassword(userpassword)
            validateName(username)
            if (!validateEmail) {
                useremail2.style.backgroundColor = 'red'
            }
            if (validatePassword === false) {
                userpassword.classList.add('error')
            }
            if (validateName === false) {
                username.classList.add('error')
            }
            if (validateName && validatePassword && validateEmail) {
                alert(`Parabens ${username} Cadastro realizado com sucesso!`)
                resetFormStyles()
                hello("Pass.html")
            }
        } catch (err) {
            alert(err)
        }
    })
})