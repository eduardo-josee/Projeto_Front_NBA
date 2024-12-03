const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close');
const comentarioText = document.getElementById('comentario-text');
const comentariosList = document.getElementById('comentarios-list');
const enviarComentarioBtn = document.getElementById('enviar-comentario');
const imagemPerfilInput = document.getElementById('imagem-perfil');
let imagemPerfilURL = '';   
let comentarioEditando = null;   

 
function openModal() {
    modal.style.display = 'flex';
}

 
closeButton.onclick = function() {
    modal.style.display = 'none';
}

 
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

 
function removerComentario(event) {
    const comentarioElemento = event.target.closest('.comentario');
    comentarioElemento.remove();
}

 
function editarComentario(event) {
    const comentarioElemento = event.target.closest('.comentario');
    const comentarioTexto = comentarioElemento.querySelector('p').innerText;

     
    comentarioText.value = comentarioTexto;

    
    comentarioEditando = comentarioElemento;

   
    openModal();
}

 
function adicionarComentarioNoFooter() {
    const comentario = comentarioText.value.trim();

    if (comentario) {
         
        if (comentarioEditando) {
            const comentarioTextoElemento = comentarioEditando.querySelector('p');
            comentarioTextoElemento.innerText = comentario;
            comentarioEditando = null;  
        } else {
            
            const comentarioElemento = document.createElement('div');
            comentarioElemento.classList.add('comentario');

             
            const imgPerfil = document.createElement('img');
            imgPerfil.src = imagemPerfilURL || './img/default-avatar.png';   
            imgPerfil.alt = 'Imagem de Perfil';
            imgPerfil.classList.add('imagem-perfil');
            comentarioElemento.appendChild(imgPerfil);

             
            const comentarioTexto = document.createElement('p');
            comentarioTexto.innerText = comentario;
            comentarioElemento.appendChild(comentarioTexto);

             
            const lixeira = document.createElement('img');
            lixeira.src = './img/image 13.png';  
            lixeira.alt = 'Excluir';
            lixeira.onclick = removerComentario;   
            comentarioElemento.appendChild(lixeira);

             
            const lapis = document.createElement('img');
            lapis.src = './img/lapis.png';   
            lapis.alt = 'Editar';
            lapis.onclick = editarComentario;   
            comentarioElemento.appendChild(lapis);

           
            comentariosList.appendChild(comentarioElemento);
        }

         
        comentarioText.value = '';
        imagemPerfilURL = '';   
        imagemPerfilInput.value = '';   

         
        modal.style.display = 'none';
    } else {
        alert("Por favor, digite um comentário.");
    }
}

 
document.querySelectorAll('.imagem-modal').forEach(img => {
    img.onclick = function() {
        openModal();  
    };
});

 
enviarComentarioBtn.onclick = adicionarComentarioNoFooter;

 
imagemPerfilInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagemPerfilURL = e.target.result;  
        }
        reader.readAsDataURL(file);
    }
});
