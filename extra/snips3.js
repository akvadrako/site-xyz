
async function _load({ fetch }) {
    let resp = await fetch('/data/pages.json')
    let body = await resp.json()

    log("load +layout - done", body.routes.length, "routes")
    
    return {
        routes: body.routes,
    }
}
