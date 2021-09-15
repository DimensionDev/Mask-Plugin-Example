/// <reference path="../Mask/packages/mask-sdk/dist/public-api.d.ts" />
// @ts-check

const payload = new URL(location.href).searchParams.get('data')
if (payload) log(`Payload: ${payload}`)

async function main() {
    log('Waiting for Mask SDK......')
    log(`Please full screen the window to reveal a much convenient UI.`)
    while (!window.Mask) await sleep()

    log(`Mask SDK v${Mask.sdkVersion} ready.`)

    document.querySelector('#append').addEventListener('click', () => {
        const val = document.querySelector('#input').value

        const meta = new Map()
        meta.set('v2', { data: val })
        Mask.socialNetwork
            .appendComposition(
                `Hi there!
This message is sent from the external plugin demo.

You just wrote: ${val}`,
                meta
            )
            .then(
                async () => {
                    await sleep()
                    await sleep()
                    window.close()
                },
                (e) => log(`Set payload failed`, e)
            )
    })
    document.querySelector('#sign').addEventListener('click', async () => {
        log('Request to sign the message...')
        try {
            const data = await Mask.persona.__experimental__sign__(document.querySelector('#input').value, 'web3')
            log('Sign result: ' + data)
        } catch (e) {
            log('Request sign failed', e)
        }
    })
}

main()

/**
 *
 * @param {any} message
 * @param {any} e
 */
function log(message, e = undefined) {
    const template = document.querySelector('template')
    const result = template?.content.cloneNode(true)
    if (!(result instanceof DocumentFragment)) return
    result.querySelector('.content').innerText = message
    result.querySelector('.time').innerText = new Date().toLocaleTimeString()

    document.getElementById('log')?.appendChild(result)
}

function sleep() {
    return new Promise((resolve) => setTimeout(resolve, 50))
}
