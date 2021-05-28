import sdk from './sdk.js'

log('Waiting Mask SDK to be ready...')
sdk.then(
    async (sdk) => {
        log(`Mask SDK v${sdk.version} ready.`)
    },
    (err) => log(`Mask SDK init failed ${err}`)
)

function log(x) {
    const li = document.createElement('li')
    li.innerHTML = `[${new Date().toLocaleTimeString()}]<br /> ${x}`
    const ul = document.querySelector('ul')
    ul.insertBefore(li, ul.children[0])
}

// import sdk from './sdk.js'
// const mask = await sdk
// globalThis.Mask = mask

// document.querySelector('button').addEventListener('click', async () => {
//     const profiles = await mask.getProfiles()
//     for (const name of profiles) {
//         const li = document.createElement('li')
//         li.innerText = name
//         document.querySelector('ul').appendChild(li)
//     }
// })
