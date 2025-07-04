const listaConsulta = document.getElementById("lista-consulta");
    const infoConsulta = document.getElementById("info-consulta");
    const listaConsultaAgendar = document.getElementById("lista-consulta-para_agendar");
    const infoConsultaAgendar = document.getElementById("info-consulta-para-agendar");
    const listaConsultaRemarcar = document.getElementById("lista-consulta-para_remarcar")
    const infoConsultaRemarcar = document.getElementById("info-consulta-para-remarcar");
    const listaConsultaCancelar = document.getElementById("lista-consulta-para-cancelar");
    const infoConsultaCancelar = document.getElementById("info-consulta-para-cancelar");


    //menu select de consulta
    document.getElementById("select-consulta").addEventListener("change", function (e) {
        const opcao = e.target.value;
        limparTextoInicial();
        e.target.selectedIndex = 0; // reseta para o texto "Pet"

        if (opcao === "visualizar") {
          abrirModal("modal-visualizar-consulta")
          carregarConsultas();
        };
        if (opcao === "agendar"){
            abrirModal("modal-agendar-consulta");
            carregarPetsConsulta();
        } 
        if (opcao === "remarcar") {
          abrirModal("modal-remarcar-consulta")
          remarcarConsultas();
        };
        if (opcao === "cancelar") {
          abrirModal("modal-cancelar-consulta");
          cancelarConsulta()
        }
    });

    //mostrar consultas por animal
    async function carregarConsultas() {
        try {
            const response = await fetch(`http://localhost:8080/consultas/${encodeURIComponent(emailLogado)}`);
            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Consultas não encontradas");
                return;
            }
            console.log(data);

            data.forEach((consulta) => {
                const div = document.createElement("div");
                div.className = "consulta-card";
                div.innerHTML = ` 
                <p><strong>Nome do Animal:</strong> ${consulta.nome_animal}</p>
                <p><strong>Veterinário:</strong> ${consulta.nome_veterinario}</p>
                <p><strong>Data e hora</strong> ${formatarData(consulta.data_hora)}</p>
                <p><strong>Sala:</strong> ${consulta.numero_sala}</p>
                <p><strong>Status da consulta:</strong> ${consulta.status_consulta}</p>`;
                div.style.cursor = "pointer";
                div.onclick = () => mostrarInfoConsulta(consulta);
                listaConsulta.appendChild(div);
            });

            console.log(data);

        } catch (error) {
        alert("Erro ao tentar carregar pets.");
        console.error(error);
        }
    }

    //mostrar infos das consultas
    function mostrarInfoConsulta(consulta) {
      abrirModal("info-consulta-modal")
      infoConsulta.innerHTML = `
          <h3>Informações da Consulta</h3>
          <p><strong>Nome do Animal:</strong> ${consulta.nome_animal}</p>
          <p><strong>Veterinário:</strong> ${consulta.nome_veterinario}</p>
          <p><strong>Data e hora</strong> ${formatarData(consulta.data_hora)}</p>
          <p><strong>Sala:</strong> ${consulta.numero_sala}</p>
          <p><strong>Status da consulta:</strong> ${consulta.status_consulta}</p>
          <p><strong>Sintomas:</strong> ${consulta.sintomas}</p>
          <button class="btn" id="btn-voltar-consulta" onclick="fecharModal('info-consulta-modal')">Voltar</button>
      `;
    }

    //apagar itens da lista ao voltar (consulta)
    document.getElementById("btn-voltar-consulta").addEventListener("click", function (e) {
      if (listaConsulta.textContent !== ''){
        listaConsulta.textContent = '';
        infoConsulta.textContent = '';
      }
    })

    //mostrar pets para agendar consulta 
    async function carregarPetsConsulta() {
        try {
            const response = await fetch(`http://localhost:8080/animais/${encodeURIComponent(emailLogado)}`);
            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Animais não encontrados");
                return;
            }
            console.log(data);

            data.forEach((pet) => {
                const div = document.createElement("div");
                div.className = 'pets-consulta-card';
                div.innerHTML = `
                <p><strong>ID Animal:</strong> ${pet.id_animal}</p>
                <p><strong>Nome:</strong> ${pet.nome_animal}</p>
                <p><strong>Espécie:</strong> ${pet.especie}</p>
                <p><strong>Raça:</strong> ${pet.raca}</p>
                <p><strong>Idade:</strong> ${pet.idade}</p>
                <p><strong>Peso:</strong> ${pet.peso} kg</p>
                <p><strong>Sexo:</strong> ${pet.sexo}</p>`;
                div.style.cursor = "pointer";
                div.onclick = () => mostrarInfoAgendarConsulta(pet);
                listaConsultaAgendar.appendChild(div);
            });

            console.log(data);

        } catch (error) {
        alert("Erro ao tentar carregar pets.");
        console.error(error);
        }
    }

    //agendar consulta por data/hora, id veterinario e sintomas
    async function agendarDataHoraConsulta(id){

      const id_animal = id;
      const id_sala = 1;
      const data_hora = document.getElementById("data_hora_agendar_consulta").value;
      const id_veterinario = document.getElementById("id_veterinario_consulta").value;
      const status_consulta = 'Ativa';
      const sintomas = document.getElementById("sintomas").value;
      const id_tutor = idTutorLogado;

      const novaConsulta = {
        id_animal,
        id_sala,
        data_hora,
        id_veterinario,
        status_consulta,
        sintomas
      };

      try {
        const response = await fetch(`http://localhost:8080/consultas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novaConsulta)
        });

        if (response.ok) {
          alert("Consulta agendada com sucesso!");
          document.getElementById("data_hora_agendar_consulta").value = ''
          document.getElementById("id_veterinario_consulta").value = '';
          document.getElementById("sintomas").value = '';
        } else {
          const erro = await response.json();
          alert("Erro ao agendar Consulta: " + (erro.error || "Erro desconhecido"));
        }
      } catch (error) {
        alert("Erro de rede ou servidor: " + error.message);
      }
    };

    //mostrar input de data hora para agendar consulta
    async function mostrarInfoAgendarConsulta(pet) {
      try {
        const response = await fetch(`http://localhost:8080/veterinario`);
        const data = await response.json();

        if (!response.ok) {
          alert(data.error || "Veterinários não encontrados");
          return;
        }

        abrirModal("info-consulta-agendar-modal");
        infoConsultaAgendar.innerHTML = `
          <h3>Agendar Consulta</h3>
          <select id="id_veterinario_consulta" required></select>
          <input type="datetime-local" placeholder="Data e Hora" id="data_hora_agendar_consulta" required>
          <textarea placeholder="Sintomas" id="sintomas" required></textarea>
          <button id="agendar-btn" type="button" onclick="agendarDataHoraConsulta(${pet.id_animal})">Agendar</button>
          <button class="btn" id="btn-voltar-agendamento-consulta" onclick="fecharModal('info-consulta-agendar-modal')">Voltar</button>
        `;

        const select = document.getElementById("id_veterinario_consulta");

        data.forEach((veterinario) => {
          const option = document.createElement("option");
          option.value = veterinario.id_funcionario;
          option.textContent = `Veterinário: ${veterinario.nome} - ${veterinario.especialidade}`;
          select.appendChild(option);
        });

        console.log(data);
      } catch (error) {
        alert("Erro ao tentar carregar veterinários.");
        console.error(error);
      }
    }

    //apagar itens da lista ao voltar(agendamento consulta)
    document.getElementById("btn-voltar-agendamento-consulta").addEventListener("click", function (e) {
      if (listaConsultaAgendar.textContent !== ''){
        listaConsultaAgendar.textContent = '';
        infoConsultaAgendar.textContent = '';
      }
    })

    //remarcar consulta
    async function remarcarConsultas(){
      try {
            const response = await fetch(`http://localhost:8080/consultas/${encodeURIComponent(emailLogado)}`);
            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Consultas não encontradas");
                return;
            }
            console.log(data);

            data.forEach((consulta) => {
                const div = document.createElement("div");
                div.className = "consulta-remarcacao-card";
                div.innerHTML = ` 
                <p><strong>Nome do Animal:</strong> ${consulta.nome_animal}</p>
                <p><strong>Veterinário:</strong> ${consulta.nome_veterinario}</p>
                <p><strong>Data e hora</strong> ${formatarData(consulta.data_hora)}</p>
                <p><strong>Sala:</strong> ${consulta.numero_sala}</p>
                <p><strong>Status da consulta:</strong> ${consulta.status_consulta}</p>`;
                div.style.cursor = "pointer";
                div.onclick = () => mostrarFormRemarcacao(consulta);
                listaConsultaRemarcar.appendChild(div);
            });

        } catch (error) {
        alert("Erro ao tentar carregar pets.");
        console.error(error);
        }
    }

    //alterar data da consulta
    async function alterarDataHora(id_consulta){

      const data_hora_remarcar = document.getElementById("data_hora_remarcar").value;

      try {
        const response = await fetch(`http://localhost:8080/consultas/${id_consulta}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data_hora: data_hora_remarcar })
        });

        if (response.ok) {
          alert("Consulta reagendada com sucesso!");
          document.getElementById("data_hora_remarcar").value = '';
        } else {
          const erro = await response.json();
          alert("Erro ao reagendar Consulta: " + (erro.error || "Erro desconhecido"));
        }
      } catch (error) {
        alert("Erro de rede ou servidor: " + error.message);
      }
    };

    //mostrar campo para remarcar consulta
    function mostrarFormRemarcacao(consulta){
      abrirModal("info-consulta-remarcar-modal");
      infoConsultaRemarcar.innerHTML = `
      <h3>Remarcar Consulta</h3>
      <input type="datetime-local" placeholder="Data e Hora" id="data_hora_remarcar" required>
      <button id="reagendar-btn" type="button" onclick="alterarDataHora(${consulta.id_consulta})">Reagendar</button>
      <button class="btn" id="btn-voltar-remarcar-consulta" onclick="fecharModal('info-consulta-remarcar-modal')">Voltar</button>
      `;
    }

    //apagar itens da lista ao voltar(remarcacao)
    document.getElementById("btn-voltar-remarcacao").addEventListener("click", function (e) {
      if (listaConsultaRemarcar.textContent !== ''){
        listaConsultaRemarcar.textContent = '';
        infoConsultaRemarcar.textContent = '';
      }
    })

    //cancelar consulta
    async function cancelarConsulta(){
      try {
            const response = await fetch(`http://localhost:8080/consultas/${encodeURIComponent(emailLogado)}`);
            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Consultas não encontradas");
                return;
            }
            console.log(data);

            data.forEach((consulta) => {
                const div = document.createElement("div");
                div.className = "consulta-cancelamento-card";
                div.innerHTML = ` 
                <p><strong>Nome do Animal:</strong> ${consulta.nome_animal}</p>
                <p><strong>Veterinário:</strong> ${consulta.nome_veterinario}</p>
                <p><strong>Data e hora</strong> ${formatarData(consulta.data_hora)}</p>
                <p><strong>Sala:</strong> ${consulta.numero_sala}</p>
                <p><strong>Status da consulta:</strong> ${consulta.status_consulta}</p>`;
                div.style.cursor = "pointer";
                div.onclick = () => mostrarFormCancelamento(consulta);
                listaConsultaCancelar.appendChild(div);
            });

        } catch (error) {
        alert("Erro ao tentar carregar pets.");
        console.error(error);
        }
    }

    //cancelar por id
    async function cancelarConsultaId(id_consulta){
      try {
        const response = await fetch(`http://localhost:8080/consultas/${id_consulta}`, {
        method: "DELETE",
        });

        if (response.ok) {
          alert("Consulta cancelada com sucesso!");
        } else {
          const erro = await response.json();
          alert("Erro ao cancelar Consulta: " + (erro.error || "Erro desconhecido"));
        }
      } catch (error) {
        alert("Erro de rede ou servidor: " + error.message);
      }
    }

    //mostrar informações da consulta para cancelamento
    function mostrarFormCancelamento(consulta) {
      abrirModal("info-consulta-cancelar");
        infoConsultaCancelar.innerHTML = `
            <h3>Informações da Consulta</h3>
            <p><strong>Nome do Animal:</strong> ${consulta.nome_animal}</p>
            <p><strong>Veterinário:</strong> ${consulta.nome_veterinario}</p>
            <p><strong>Data e hora</strong> ${formatarData(consulta.data_hora)}</p>
            <p><strong>Sala:</strong> ${consulta.numero_sala}</p>
            <p><strong>Status da consulta:</strong> ${consulta.status_consulta}</p>
            <button type="button" onclick="cancelarConsultaId(${consulta.id_consulta})">Cancelar Consulta</button>
            <button class="btn" id="btn-voltar-cancelar-consulta" onclick="fecharModal('info-consulta-cancelar')">Voltar</button>
        `;
    }

    //apagar itens da lista ao voltar(cancelamento)
    document.getElementById("btn-voltar-cancelamento").addEventListener("click", function (e) {
      if (listaConsultaCancelar.textContent !== ''){
        listaConsultaCancelar.textContent = '';
        infoConsultaCancelar = '';
      }
    })
