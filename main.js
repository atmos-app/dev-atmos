
import Canvas from './src/scripts/Canvas'
import localforage from 'localforage'

async function subscribe (event, frame) {
    const json = parse(event)
    // eslint-disable-next-line no-unused-vars
    let canvas
    if (json?.source !== 'readyplayerme') {
        return
    }

    if (json.eventName === 'v1.frame.ready') {
        localforage.clear()

        frame.contentWindow.postMessage(
            JSON.stringify({
                target: 'readyplayerme',
                type: 'subscribe',
                eventName: 'v1.**',
            }),
            '*'
        )
    }

    if (json.eventName === 'v1.avatar.exported') {
        const urlPRMS = new Promise((resolve, reject) => {
            if (json.data.url) {
                resolve(json.data.url)
            } else {
                reject(new Error('no model loaded, try clearing cache and refresh the page'))
            }
        })

        await urlPRMS.then((value) => {
            document.querySelector('#RPMframe').hidden = true
            document.querySelector('.frameHolder').hidden = true
            document.querySelector('.frameTitle').hidden = true
            document.querySelector('.frameHolder').style.display = 'none'
            const name = value.toString().replace(/\.[^/.]+$/, '').split('/').at(-1)
            // canvas = new Canvas(value)
            fetch(value)
                .then((response) => {
                    return response.blob()
                }).then(blob => {
                    const url = URL.createObjectURL(blob)
                    localforage.setItem(`RPM${name}`, url).then((ur) => {
                        canvas = new Canvas(ur, `RPM${name}`)
                    })
                })
        })
    }
}

function parse (event) {
    try {
        return JSON.parse(event.data)
    } catch (error) {
        return null
    }
}

window.addEventListener('load', async (event) => {
    console.log('%cDEVELOPED AND DESIGNED BY TRIIIYE', 'font-size: 16px; border: 2px #7289da dashed; color: #7289da; padding: 5px;')
    const subdomain = 'atmosapp'
    const frame = document.getElementById('RPMframe')

    frame.src = `https://${subdomain}.readyplayer.me/avatar?frameApi`

    window.addEventListener('message', (e) => {
        subscribe(e, frame)
    })
    document.addEventListener('message', (e) => {
        subscribe(e, frame)
    })
})
