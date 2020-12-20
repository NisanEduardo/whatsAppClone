class WhastsAppController {

    constructor() {

        console.log( 'Teste OK' )

        this.loadElements()

    }

    loadElements() {

        this.el = {}

        document.querySelectorAll( '[id]' ).forEach( element => {

            this.el[ Format.getCamelCase( element.id ) ] = element

        })

    }

}