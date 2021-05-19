import sdk from './sdk.js'
const mask = await sdk
globalThis.Mask = mask

document.querySelector('button').addEventListener('click', async () => {
    const profiles = await mask.getProfiles()
    for (const name of profiles) {
        const li = document.createElement('li')
        li.innerText = name
        document.querySelector('ul').appendChild(li)
    }
})
