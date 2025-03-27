
  (function ($) {
  
  "use strict";

    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });
    
    // CUSTOM LINK
    $('.smoothscroll').click(function(){
      var el = $(this).attr('href');
      var elWrapped = $(el);
      var header_height = $('.navbar').height();
  
      scrollToDiv(elWrapped,header_height);
      return false;
  
      function scrollToDiv(element,navheight){
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop-navheight;
  
        $('body,html').animate({
        scrollTop: totalScroll
        }, 300);
      }
    });
  
  })(window.jQuery);

// Scripts extraídos do HTML

// Inicializa o EmailJS
emailjs.init("TXBS0auwosct8gIv1");

document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    let submitBtn = document.getElementById("submit-btn");
    let originalText = submitBtn.innerHTML; // Salva o texto original do botão
    let formContainer = document.getElementById("form-container");
    let responseMessage = document.getElementById("response-message");

    // Mostra loader apenas quando o usuário clicar no botão
    submitBtn.innerHTML = '<span class="loader"></span>';
    submitBtn.disabled = true;

    try {
        let originCep = document.getElementById("contact-origin-cep").value;
        let destinationCep = document.getElementById("contact-destination-cep").value;

        let originData = await fetch(`https://viacep.com.br/ws/${originCep}/json/`).then(res => res.json());
        let destinationData = await fetch(`https://viacep.com.br/ws/${destinationCep}/json/`).then(res => res.json());

        if (originData.erro || destinationData.erro) {
            throw new Error("CEP inválido.");
        }

        let formData = {
            first_name: document.getElementById("contact-first-name").value,
            ddd: document.getElementById("contact-ddd").value,
            whatsapp: document.getElementById("contact-whatsapp").value,
            event: document.getElementById("contact-event").value,
            date: document.getElementById("contact-date").value,
            origin_cep: originCep,
            destination_cep: destinationCep,
            origin_location: `${originData.logradouro}, ${originData.bairro}, ${originData.localidade} - ${originData.uf}`,
            destination_location: `${destinationData.logradouro}, ${destinationData.bairro}, ${destinationData.localidade} - ${destinationData.uf}`,
            origin_number: document.getElementById("contact-origin-number").value,
            destination_number: document.getElementById("contact-destination-number").value,
            time: document.getElementById("contact-time").value,
            message: document.getElementById("contact-message").value
        };

        await emailjs.send("service_8h28onn", "template_vgjsqna", formData);

        // Exibir mensagem de sucesso e resetar o formulário
        document.getElementById("form-title").style.display = "none";
        formContainer.innerHTML = `
            <p style="color: green; font-size: 18px; text-align: center; font-weight: bold;">
                Solicitação enviada! Entraremos em contato em até 48 horas.
            </p>
        `;
    } catch (error) {
        responseMessage.innerHTML = `
            <p style="color: red;">${error.message}</p>
        `;
    } finally {
        // Restaura o botão ao final do processo
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

//Script para formatar os campos do modal -->

function restrictInput(event, pattern) {
    let input = event.target;
    input.value = input.value.replace(pattern, "");
}

// Nome Completo - Apenas letras e espaços
document.getElementById("contact-first-name").addEventListener("input", function(event) {
    restrictInput(event, /[^A-Za-zÀ-ÖØ-öø-ÿ ]/g);
});

// WhatsApp - Apenas números, máximo de 9 dígitos
document.getElementById("contact-whatsapp").addEventListener("input", function(event) {
    let input = event.target;
    input.value = input.value.replace(/\D/g, "").slice(0, 9);
});

// CEP de origem - Apenas números, máximo de 8 dígitos
document.getElementById("contact-origin-cep").addEventListener("input", function(event) {
    let input = event.target;
    input.value = input.value.replace(/\D/g, "").slice(0, 8);
});

// Número de origem - Apenas números
document.getElementById("contact-origin-number").addEventListener("input", function(event) {
    restrictInput(event, /\D/g);
});

// CEP de destino - Apenas números, máximo de 8 dígitos
document.getElementById("contact-destination-cep").addEventListener("input", function(event) {
    let input = event.target;
    input.value = input.value.replace(/\D/g, "").slice(0, 8);
});

// Número de destino - Apenas números
document.getElementById("contact-destination-number").addEventListener("input", function(event) {
    restrictInput(event, /\D/g);
});

//Data do Evento - Formatar para DD/MM/AAAA
document.getElementById("contact-date").addEventListener("input", function(event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, "");
    
    if (value.length > 2) {
        value = value.substring(0, 2) + "/" + value.substring(2);
    }
    if (value.length > 5) {
        value = value.substring(0, 5) + "/" + value.substring(5, 9);
    }
    
    input.value = value;
});

// Modal na seção de agradecimento -->

document.addEventListener("DOMContentLoaded", function () {
  const formModal = document.getElementById("formModal");
  const openFormButton = document.getElementById("openFormButton");
  const closeButton = document.querySelector(".close");
  const thankYouButton = document.querySelector(".thank-you-section .btn");

  if (openFormButton) {
      openFormButton.addEventListener("click", function () {
          formModal.style.display = "flex";
      });
  }

  if (closeButton) {
      closeButton.addEventListener("click", function () {
          formModal.style.display = "none";
      });
  }

  if (thankYouButton) {
      thankYouButton.addEventListener("click", function (event) {
          event.preventDefault();
          formModal.style.display = "flex";
      });
  }

  window.addEventListener("click", function (event) {
      if (event.target === formModal) {
          formModal.style.display = "none";
      }
  });

  // **Correção Principal: Impedir que o modal apareça automaticamente ao carregar a página**
  formModal.style.display = "none";
});

//Security
if (window.top !== window.self) {
    document.body.innerHTML = "<h1>Este site não pode ser embutido em iframes.</h1>";
  }
  
//spinner
window.addEventListener("load", function () {
    const spinner = document.getElementById("spinner-overlay");
    const conteudo = document.getElementById("conteudo");
  
    // Esconde o spinner
    spinner.classList.add("hidden");
  
    // Mostra o conteúdo
    conteudo.style.display = "block";
  
    // Remove o spinner do DOM após a transição
    setTimeout(() => {
      spinner.remove();
    }, 500);
  });
  