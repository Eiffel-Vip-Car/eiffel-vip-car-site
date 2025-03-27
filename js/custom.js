
(function ($) {
    "use strict";
  
    // MENU
    $('.navbar-collapse a').on('click', function () {
      $(".navbar-collapse").collapse('hide');
    });
  
    // CUSTOM LINK
    $('.smoothscroll').click(function () {
      var el = $(this).attr('href');
      var elWrapped = $(el);
      var header_height = $('.navbar').height();
  
      scrollToDiv(elWrapped, header_height);
      return false;
  
      function scrollToDiv(element, navheight) {
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop - navheight;
  
        $('body,html').animate({
          scrollTop: totalScroll
        }, 300);
      }
    });
  })(window.jQuery);
  
  // Inicializa o EmailJS
  emailjs.init("TXBS0auwosct8gIv1");
  
  // Submissão do formulário
  document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    let submitBtn = document.getElementById("submit-btn");
    let originalText = submitBtn.innerHTML;
    let formContainer = document.getElementById("form-container");
    let responseMessage = document.getElementById("response-message");
  
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
  
      // Oculta título e exibe confirmação
      document.getElementById("form-title").classList.add("d-none");
      formContainer.innerHTML = `
      <p class="success-message-confirmation">
        Solicitação enviada! Entraremos em contato em até 48 horas.
      </p>
    `;    
    } catch (error) {
      responseMessage.innerHTML = `<p class="text-danger">${error.message}</p>`;
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
  
  // Restrição de inputs
  function restrictInput(event, pattern) {
    let input = event.target;
    input.value = input.value.replace(pattern, "");
  }
  
  document.getElementById("contact-first-name").addEventListener("input", function (event) {
    restrictInput(event, /[^A-Za-zÀ-ÖØ-öø-ÿ ]/g);
  });
  
  document.getElementById("contact-whatsapp").addEventListener("input", function (event) {
    let input = event.target;
    input.value = input.value.replace(/\D/g, "").slice(0, 9);
  });
  
  document.getElementById("contact-origin-cep").addEventListener("input", function (event) {
    let input = event.target;
    input.value = input.value.replace(/\D/g, "").slice(0, 8);
  });
  
  document.getElementById("contact-origin-number").addEventListener("input", function (event) {
    restrictInput(event, /\D/g);
  });
  
  document.getElementById("contact-destination-cep").addEventListener("input", function (event) {
    let input = event.target;
    input.value = input.value.replace(/\D/g, "").slice(0, 8);
  });
  
  document.getElementById("contact-destination-number").addEventListener("input", function (event) {
    restrictInput(event, /\D/g);
  });
  
  document.getElementById("contact-date").addEventListener("input", function (event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, "");
    if (value.length > 2) value = value.substring(0, 2) + "/" + value.substring(2);
    if (value.length > 5) value = value.substring(0, 5) + "/" + value.substring(5, 9);
    input.value = value;
  });
  
  // Modal
  document.addEventListener("DOMContentLoaded", function () {
    const formModal = document.getElementById("formModal");
    const openFormButton = document.getElementById("openFormButton");
    const closeButton = document.querySelector(".close");
    const thankYouButton = document.querySelector(".thank-you-section .btn");
  
    if (openFormButton) {
      openFormButton.addEventListener("click", function () {
        formModal.classList.add("show");
      });
    }
  
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        formModal.classList.remove("show");
      });
    }
  
    if (thankYouButton) {
      thankYouButton.addEventListener("click", function (event) {
        event.preventDefault();
        formModal.classList.add("show");
      });
    }
  
    window.addEventListener("click", function (event) {
      if (event.target === formModal) {
        formModal.classList.remove("show");
      }
    });
  
    // Modal começa sempre oculto
    formModal.classList.remove("show");
  });
  
  // Segurança contra iframe embedding
  if (window.top !== window.self) {
    document.body.innerHTML = "<h1>Este site não pode ser embutido em iframes.</h1>";
  }
  
  // Spinner
  window.addEventListener("load", function () {
    const spinner = document.getElementById("spinner-overlay");
    const conteudo = document.getElementById("conteudo");
  
    spinner.classList.add("hidden");
    conteudo.classList.remove("d-none");
  
    setTimeout(() => {
      spinner.remove();
    }, 500);
  });
  
// Redirecionamento
  if (location.hostname === "eiffelvipcar.com.br") {
    window.location.href = "https://www.eiffelvipcar.com.br";
  }

