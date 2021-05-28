import sdk from './sdk.js'

log('Loading SDK......')

const payload = new URL(location.href).searchParams.get('data')
if (payload) log(`Payload: ${payload}`)

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
        document.querySelector('#req').addEventListener('click', async () => {
            log('Request profiles...')
            try {
                const data = await sdk.getProfiles()
                log('Profiles: ' + data.join())
            } catch (e) {
                log('Request profiles failed', e)
            }
        })
    },
    (err) => log(`Mask SDK init failed`, e)
)

function log(x, e) {
    const li = document.createElement('li')
    e && console.log(e)
    li.innerHTML = `[${new Date().toLocaleTimeString()}] ${x} ${e || ''}`
    const ul = document.querySelector('ul')
    ul.insertBefore(li, ul.children[0])
}
