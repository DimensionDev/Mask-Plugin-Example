import sdk from './sdk.js'

log('Waiting Mask SDK to be ready...')
sdk.then(
    async (sdk) => {
        log(`Mask SDK v${sdk.version} ready.`)

        document.querySelector('#add').addEventListener('click', () => {
            const val = document.querySelector('#input').value
            sdk.setPayload({ v2: { data: val } }, { additionText: 'Hi extra text from external plugin' }).then(
                () => log(`Set payload`),
                (e) => log(`Set payload failed`, e)
            )
        })
    },
    (err) => log(`Mask SDK init failed ${err}`)
)

function log(x, e) {
    const li = document.createElement('li')
   e&& console.log(e);
    li.innerHTML = `[${new Date().toLocaleTimeString()}]<br /> ${x} ${e||''}`
    const ul = document.querySelector('ul')
    ul.insertBefore(li, ul.children[0])
}
