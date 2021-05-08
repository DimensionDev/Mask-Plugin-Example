import { AsyncCall, JSONSerialization } from 'https://cdn.jsdelivr.net/npm/async-call-rpc@5.0.0/out/base.min.mjs'

const channel = {
    on(listener) {
        const l = (x) => x instanceof CustomEvent && listener(x.detail)
        document.addEventListener('mask-out', l)
        return () => document.removeEventListener('mask-out', l)
    },
    send(message) {
        document.dispatchEvent(new CustomEvent('mask-in', { detail: message }))
    },
}
const server = AsyncCall({}, { channel, serializer: JSONSerialization() })
async function init() {
    await Promise.race([untilStart(), timeout(500)])
    const version = await server.version()
    if (version !== 1) throw new Error(`Unknown version of Mask SDK ${version}`)
    return {
        version,
    }
}
export default init()
function untilStart() {
    return new Promise((r) => document.addEventListener('mask-start', r, { once: true }))
}
function timeout(ms) {
    return new Promise((_, r) => setTimeout(() => r('Timeout to init Mask SDK'), ms))
}
