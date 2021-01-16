import Format from './../utils/Format'
import CameraController from './CameraController'
export default class WhastsAppController {

    constructor() {

        this.elementsPrototype()
        this.loadElements()
        this.initEvents()

    }

    loadElements() {

        this.el = {}

        document.querySelectorAll( '[id]' ).forEach( element => {

            this.el[ Format.getCamelCase( element.id ) ] = element

        })

    }

    elementsPrototype() {

        Element.prototype.hide = function () {

            this.style.display = 'none'
            return this

        }

        Element.prototype.show = function () {

            this.style.display = 'block'
            return this

        }

        Element.prototype.toggle = function () {

            this.style.display = (this.style.display === 'none') ? 'block' : 'none'
            return this

        }

        Element.prototype.on = function( events, fn ) {
            events.split( ' ' ).forEach( event => {

                this.addEventListener( event, fn )

            })

            return this

        }

        Element.prototype.css = function( styles ) {

            for( let name in styles ) {

                this.style[name] = styles[name]

            }

            return this

        }

        Element.prototype.addClass = function( name ) {

            this.classList.add( name )
            return this

        }

        Element.prototype.removeClass = function( name ) {

            this.classList.remove( name )
            return this

        }

        Element.prototype.toggleClass = function( name ) {

            this.classList.toggle( name )

        }

        Element.prototype.hasClass = function( name ) {

            this.classList.contains( name )

        }

        HTMLFormElement.prototype.getform = function () {

            return new FormData( this )

        }

        HTMLFormElement.prototype.toJson = function () {

            let json = {}

            this.getform().forEach( ( value, key ) => {

                json[ key ] = value

            })

            return json

        }

    }

    initEvents() {

        this.el.myPhoto.on( 'click', evt => {

            this.closeAllLeftPanel()
            this.el.panelEditProfile.show()
            setTimeout( () => {

                this.el.panelEditProfile.addClass( 'open' )

            }, 300 )

        })

        this.el.btnNewContact.on( 'click', evt => {

            this.closeAllLeftPanel()
            this.el.panelAddContact.show()
            
            setTimeout( () => {

                this.el.panelAddContact.addClass( 'open' )

            }, 300 )

        })

        this.el.btnClosePanelEditProfile.on( 'click', evt => {

            this.el.panelEditProfile.removeClass( 'open' )

        })

        this.el.btnClosePanelAddContact.on( 'click', evt => {

            this.el.panelAddContact.removeClass( 'open' )

        })

        this.el.photoContainerEditProfile.on( 'click', evt => {

            this.el.inputProfilePhoto.click()

        })

        this.el.inputNamePanelEditProfile.on( 'keypress', evt => {

            if( evt.key === 'Enter' ) {

                evt.preventDefault()
                this.el.btnSavePanelEditProfile.click()

            }

        })

        this.el.btnSavePanelEditProfile.on( 'click', evt => {

            console.log( this.el.inputNamePanelEditProfile.innerHTML )

        })

        this.el.formPanelAddContact.on( 'submit', evt => {

            evt.preventDefault()

            let formData = new FormData( this.el.formPanelAddContact )

        })

        this.el.contactsMessagesList.querySelectorAll( '.contact-item' ).forEach(

            item => {

                item.on( 'click', evt => {

                    this.el.home.hide()
                    this.el.main.css({
                        display: 'flex'
                    })

                })


            }
        )

        this.el.btnAttach.on( 'click', evt => {

            evt.stopPropagation()
            this.el.menuAttach.addClass( 'open' )
            document.addEventListener( 'click', this.closeMenuAtach.bind( this ) )

        })

        this.el.btnAttachPhoto.on( 'click', evt => {

            this.el.inputPhoto.click()

        })

        this.el.inputPhoto.on( 'change', evt =>{

            [...this.el.inputPhoto.files].forEach( file => {

                console.log( 'FILE',  file )

            })

        })

        this.el.btnAttachCamera.on( 'click', evt => {

            this.closeAllMainPanel()
            this.el.panelCamera.addClass( 'open' )
            this.el.panelCamera.css({
                height: 'calc( 100% - 120px )'
            })

            this._camera = new CameraController( this.el.videoCamera )

        })

        this.el.btnClosePanelCamera.on( 'click', evt => {

            this.closeAllMainPanel()
            this.el.panelMessagesContainer.show()
            this._camera.stop()

        })
        
        this.el.btnTakePicture.on( 'click', evt => {

            let dataUrl = this._camera.takePicture()

            this.el.pictureCamera.src = dataUrl
            this.el.pictureCamera.show()
            this.el.videoCamera.hide()
            this.el.btnReshootPanelCamera.show()
            this.el.containerTakePicture.hide()
            this.el.containerSendPicture.show()

        })

        this.el.btnReshootPanelCamera.on( 'click', evt => {

            this.el.pictureCamera.hide()
            this.el.videoCamera.show()
            this.el.btnReshootPanelCamera.hide()
            this.el.containerTakePicture.show()
            this.el.containerSendPicture.hide()

        })

        this.el.btnSendPicture.on( 'click', evt => {

            console.log( this.el.pictureCamera.src )

        })

        this.el.btnAttachDocument.on( 'click', evt => {

            this.closeAllMainPanel()
            this.el.panelDocumentPreview.addClass( 'open' )
            this.el.panelDocumentPreview.css({
                height: 'calc( 100% - 120px )'
            })

        })

        this.el.btnClosePanelDocumentPreview.on( 'click', evt => {

            this.closeAllMainPanel()
            this.el.panelMessagesContainer.show()

        })

        this.el.btnSendDocument.on( 'click', evt => {

            console.log( 'send docuemnt' ) 

        })  

        this.el.btnAttachContact.on( 'click', evt => {

            this.el.modalContacts.show()

        })

        this.el.btnCloseModalContacts.on( 'click', evt => {

            this.el.modalContacts.hide()

        })

        this.el.btnSendMicrophone.on( 'click', evt => {

            this.el.recordMicrophone.show()
            this.el.btnSendMicrophone.hide()
            this,this.startRecordMicrophoneTime()

        })

        this.el.btnCancelMicrophone.on( 'click', evt => {

            this.closeRecordMicrophone()

        })

        this.el.btnFinishMicrophone.on( 'click', evt => {

            this.closeRecordMicrophone()

        })

        this.el.inputText.on( 'keypress', evt => {

            if ( evt.key === 'Enter' && !evt.ctrlKey ) {

                evt.preventDefault()
                this.el.btnSend.click()

            }

        })

        this.el.inputText.on( 'keyup', evt => {

            if ( this.el.inputText.innerHTML.length ) {

                this.el.inputPlaceholder.hide()
                this.el.btnSendMicrophone.hide()
                this.el.btnSend.show()

            } else {

                this.el.inputPlaceholder.show()
                this.el.btnSendMicrophone.show()
                this.el.btnSend.hide()

            }

        })

        this.el.btnSend.on( 'click', evt => {

            console.log( this.el.inputText.innerHTML )

        })

        this.el.btnEmojis.on( 'click', evt => {

            this.el.panelEmojis.toggleClass( 'open' )

        })

        this.el.panelEmojis.querySelectorAll( '.emojik' ).forEach( emoji => {

            emoji.on( 'click', evt => {

                let img = this.el.imgEmojiDefault.cloneNode()

                img.style.cssText = emoji.style.cssText
                img.dataset.unicode = emoji.dataset.unicode
                img.alt = emoji.dataset.unicode

                emoji.classList.forEach( name => {

                    img.classList.add( name )

                })

                let cursor = window.getSelection()

                if ( !cursor.focusNode || !cursor.focusNode.id === 'input-text' ) {

                    this.el.inputText.focus()
                    cursor = window.getSelection()

                }

                let range = document.createRange()
                range = cursor.getRangeAt( 0 )
                range.deleteContents()

                let frag = document.createDocumentFragment()
                frag.appendChild( img )

                range.insertNode( frag )
                range.setStartAfter( img )

                this.el.inputText.dispatchEvent( new Event( 'keyup' ) )

            })

        })

    }

    startRecordMicrophoneTime() {

        let start = Date.now()

        this._recordMicrophoneInterval = setInterval( () => {

            this.el.recordMicrophoneTimer.innerHTML = Format.toTime( ( Date.now() - start ) )

        }, 100 )

    }

    closeRecordMicrophone() {

        this.el.recordMicrophone.hide()
        this.el.btnSendMicrophone.show()

    }

    closeAllMainPanel() {

        this.el.panelMessagesContainer.hide()
        this.el.panelDocumentPreview.removeClass( 'open' )
        this.el.panelCamera.removeClass( 'open' )

    }

    closeMenuAtach() {

        document.removeEventListener( 'click', this.closeMenuAtach )
        this.el.menuAttach.removeClass( 'open' )

    }

    closeAllLeftPanel() {
        
        this.el.panelAddContact.hide()
        this.el.panelEditProfile.hide()

    }

}