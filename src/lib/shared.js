// browser + node - shared utilities

export function assert(test, msg) {
    //if(console.assert)
    //    console.assert(test, msg)

    if (! test) {
        throw new Error(`assert failed: ${msg}`);
    }
}

export function log(...args) {
    console.log('LOG', ...args)
}

log.error = (msg, ...args) => {
    console.error('ERROR: ' + msg, ...args)
}
