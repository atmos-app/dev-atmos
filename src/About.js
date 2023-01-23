import gsap from 'gsap'

export default class About {
    constructor () {
        this.aboutWrapper = document.querySelector('.about_wrapper')
        this.aboutLink = document.querySelector('.about_link')
        this.isOpen = false
    }

    setNone () {
        gsap.set(this.aboutWrapper, {
            autoAlpha: 0,
        })
        this.aboutWrapper.style.pointerEvents = 'none'
    }

    toggleAboutUi () {
        const time = 0.6
        if (!this.isOpen) {
            gsap.to(this.aboutLink, {
                autoAlpha: 0,
                ease: 'Power2.inOut',
                duration: time,
                onComplete: _ => {
                    this.aboutLink.innerText = 'close'
                    gsap.to(this.aboutLink, {
                        autoAlpha: 1,
                        ease: 'Power2.inOut',
                        duration: time,
                    })
                },
            })

            gsap.to(this.aboutWrapper, {
                autoAlpha: 1,
                ease: 'Power2.inOut',
                duration: time,
                onComplete: _ => {
                    this.aboutWrapper.style.pointerEvents = 'all'
                },
            })
            this.isOpen = true
        } else if (this.isOpen) {
            gsap.to(this.aboutLink, {
                autoAlpha: 0,
                ease: 'Power2.inOut',
                duration: time,
                onComplete: _ => {
                    this.aboutLink.innerText = 'about'
                    gsap.to(this.aboutLink, {
                        autoAlpha: 1,
                        ease: 'Power2.inOut',
                        duration: time,
                    })
                },
            })
            gsap.to(this.aboutWrapper, {
                autoAlpha: 0,
                ease: 'Power2.inOut',
                duration: time,
                onComplete: _ => {
                    this.aboutWrapper.style.pointerEvents = 'none'
                },
            })
            this.isOpen = false
        }
    }

    addEventListeners () {
        this.aboutLink.addEventListener('click', (e) => {
            this.toggleAboutUi()
        })
    }
}
