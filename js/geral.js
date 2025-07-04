function abrirModal(id) {
        document.getElementById(id).style.display = "block";
    }

    function fecharModal(id) {
        document.getElementById(id).style.display = "none";
    }

    function limparTextoInicial() {
        const titulo = document.getElementById("titulo");
        const subtitulo = document.getElementById("subtitulo");
        if (titulo) titulo.remove();
        if (subtitulo) subtitulo.remove();
    }

    function formatarData(data){
      const dataFormatada = new Date(data).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo" // Ajusta para seu fuso horário
      });

      return dataFormatada;
    }

    // Fecha modal ao clicar fora dele
    window.onclick = function (event) {
    document.querySelectorAll(".modal").forEach((modal) => {
        if (event.target === modal) {
        modal.style.display = "none";
        listaPets.textContent = '';
        
        listaConsulta.textContent = '';
        infoConsulta.textContent = '';
        listaConsultaAgendar.textContent = '';
        infoConsultaAgendar.textContent = '';
        listaConsultaRemarcar.textContent = '';
        infoConsultaRemarcar.textContent = '';
        listaConsultaCancelar.textContent = '';
        infoConsultaCancelar.textContent = '';

        listaCirurgia.textContent = '';
        infoCirurgia.textContent = '';
        listaCirurgiaAgendar.textContent = '';
        infoCirurgiaAgendar.textContent = '';
        listaCirurgiaRemarcar.textContent = '';
        infoCirurgiaRemarcar.textContent = '';
        listaCirurgiaCancelar.textContent = '';
        infoCirurgiaCancelar.textContent = '';

        listaProdutos.innerHTML = '';

        listaVet.innerHTML = '';
        }
    });
    };