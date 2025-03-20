"use strict";

const URL = 'http://localhost:3000/dogs'
const tBody = document.querySelector('tbody')
const form = document.querySelector('form')
const inputs = form.querySelectorAll('input')
const name = document.querySelector('input')
const sex = document.querySelector('[name="sex"]')
const breed = document.querySelector('[name="breed"]')

fetch(URL).then(res => res.json())
.then(arr => {
    arr.forEach(dog => {
        const tr= document.createElement('tr')
        tr.innerHTML = `
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button data-id="${dog.id}">Edit</button></td>
        `
        tr.querySelector('button').addEventListener('click', e=>{
            inputs.forEach(input => {
                input.removeAttribute('disabled')
            })
            name.value = dog.name
            breed.value = dog.breed
            sex.value = dog.sex
            form.setAttribute('data-id', `${dog.id}`)
            console.log('reached')
        })
        tBody.appendChild(tr)
    });
})

form.addEventListener('submit', e => {
    e.preventDefault()
    
    let dogName = name.value
    let dogSex = sex.value
    let dogBreed = breed.value

    const id = form.getAttribute('data-id')
    form.removeAttribute('data-id')

    const dog = Array.from(tBody.children).find(child => child.querySelector('button').getAttribute('data-id') === id)
    dog.children[0].textContent = dogName
    dog.children[1].textContent = dogBreed
    dog.children[2].textContent = dogSex
    
    fetch(URL+`/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }, 
        body: JSON.stringify({
            name: dogName,
            breed: dogBreed,
            sex: dogSex
        })
    })

    inputs.forEach(input => {
        input.setAttribute('disabled', '')
    })
    form.reset()
})