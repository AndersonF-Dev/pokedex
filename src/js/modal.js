
/*jslint es6 */
'use strict';

function abrirModal() {
    const modal = document.getElementById('janela-modal')
    modal.classList.add('abrir');

    // console.log('Estado do modal:', modal.outerHTML);

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar' || e.target.id == 'janela-modal'){
            modal.classList.remove('abrir')
        } console.log(document.getElementById('janela-modal').outerHTML);


    });
}



