/// <reference path="../Mask/packages/mask-sdk/dist/public-api.d.ts" />
// @ts-check

log('Loading SDK......')

const payload = new URL(location.href).searchParams.get('data')
if (payload) log(`Payload: ${payload}`)

function sleep() {
    return new Promise((resolve) => setTimeout(resolve, 200))
}
async function main() {
    while (!window.Mask) await sleep()

    log(`Mask SDK v${Mask.sdkVersion} ready.`)

    document.querySelector('#add').addEventListener('click', () => {
        const val = document.querySelector('#input').value

        const meta = new Map()
        meta.set('v2', { data: val })
        Mask.socialNetwork.appendComposition('Hi extra text from external plugin', meta).then(
            () => log(`Set payload`),
            (e) => log(`Set payload failed`, e)
        )
    })
    document.querySelector('#sign').addEventListener('click', async () => {
        log('Request profiles...')
        try {
            const data = await Mask.persona.__experimental__sign__(document.querySelector('#input').value, 'web3')
            log('Sign result: ' + data)
        } catch (e) {
            log('Request profiles failed', e)
        }
    })
}

function log(x, e) {
    const li = document.createElement('li')
    e && console.log(e)
    li.innerHTML = `[${new Date().toLocaleTimeString()}] ${x} ${e || ''}`
    const ul = document.querySelector('ul')
    ul.insertBefore(li, ul.children[0])
}
