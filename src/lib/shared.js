// browser + node - shared utilities

export function assert(test, ...args) {
    console.assert(test, ...args)
}

export function log(...args) {
    console.log('LOG', ...args)
}

log.error = (msg, ...args) => {
    console.error('ERROR: ' + msg, ...args)
}
