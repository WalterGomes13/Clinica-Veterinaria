const listaCirurgia = document.getElementById("lista-cirurgia");
    const infoCirurgia = document.getElementById("info-cirurgia");
    const listaCirurgiaAgendar = document.getElementById("lista-cirurgia-para_agendar");
    const infoCirurgiaAgendar = document.getElementById("info-cirurgia-para-agendar");
    const listaCirurgiaRemarcar = document.getElementById("lista-cirurgia-para_remarcar")
    const infoCirurgiaRemarcar = document.getElementById("info-cirurgia-para-remarcar");
    const listaCirurgiaCancelar = document.getElementById("lista-cirurgia-para-cancelar");
    const infoCirurgiaCancelar = document.getElementById("info-cirurgia-para-cancelar");

    //menu select de cirurgia
    document.getElementById("select-cirurgia").addEventListener("change", function (e) {
        const opcao = e.target.value;
        limparTextoInicial();
        e.target.selectedIndex = 0; // reseta para o texto "Pet"

        if (opcao === "visualizar") {
          abrirModal("modal-visualizar-cirurgia")
          carregarCirurgias();
        };
        if (opcao === "agendar"){
            abrirModal("modal-agendar-cirurgia");
            carregarPetsCirurgia();
        } 
        if (opcao === "remarcar") {
          abrirModal("modal-remarcar-cirurgia")
          remarcarCirurgias();
        };
        if (opcao === "cancelar") {
          abrirModal("modal-cancelar-cirurgia");
          cancelarCirurgia()
        }
    });

    //mostrar cirurgias por animal
    async function carregarCirurgias() {
        try {
            const response = await fetch(`http://localhost:8080/cirurgias/${encodeURIComponent(emailLogado)}`);
            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Cirurgias não encontradas");
                return;
            }
            console.log(data);

            data.forEach((cirurgia) => {
                const div = document.createElement("div");
                div.className = "cirurgia-card";
                div.innerHTML = `
                <p><strong>Nome do Animal:</strong> ${cirurgia.nome_animal}</p>
                <p><strong>Veterinário:</strong> ${cirurgia.nome_veterinario}</p>
                <p><strong>Data e hora</strong> ${formatarData(cirurgia.data_hora)}</p>
                <p><strong>Sala:</strong> ${cirurgia.numero_sala}</p>
                <p><strong>Status da cirurgia:</strong> ${cirurgia.status_cirurgia}</p>
                `;
                div.style.cursor = "pointer";
                div.onclick = () => mostrarInfoCirurgia(cirurgia);
                listaCirurgia.appendChild(div);
            });

            console.log(data);

        } catch (error) {
        alert("Erro ao tentar carregar pets.");
        console.error(error);
        }
    }

    //mostrar infos das cirurgias
    function mostrarInfoCirurgia(cirurgia) {
        abrirModal("info-cirurgia-modal");
        infoCirurgia.innerHTML = `
            <h3>Informações da cirurgia</h3>
            <p><strong>Nome do Animal:</strong> ${cirurgia.nome_animal}</p>
            <p><strong>Veterinário:</strong> ${cirurgia.nome_veterinario}</p>
            <p><strong>Data e hora</strong> ${formatarData(cirurgia.data_hora)}</p>
            <p><strong>Sala:</strong> ${cirurgia.numero_sala}</p>
            <p><strong>Status da cirurgia:</strong> ${cirurgia.status_cirurgia}</p>
            <p><strong>Motivo da cirurgia:</strong> ${cirurgia.motivo_cirurgia}</p>
            <button class="btn" id="btn-voltar-cancelar-consulta" onclick="fecharModal('info-cirurgia-modal')">Voltar</button>
        `;
    }

    //apagar itens da lista ao voltar (cirurgia)
    document.getElementById("btn-voltar-cirurgia").addEventListener("click", function (e) {
      if (listaCirurgia.textContent !== ''){
        listaCirurgia.textContent = '';
        infoCirurgia.textContent = '';
      }
    })

    //mostrar pets para agendar cirurgia 
    async function carregarPetsCirurgia() {
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
                div.className = 'pets-cirurgia-card';
                div.innerHTML = `
                <p><strong>ID Animal:</strong> ${pet.id_animal}</p>
                <p><strong>Nome:</strong> ${pet.nome_animal}</p>
                <p><strong>Espécie:</strong> ${pet.especie}</p>
                <p><strong>Raça:</strong> ${pet.raca}</p>
                <p><strong>Idade:</strong> ${pet.idade}</p>
                <p><strong>Peso:</strong> ${pet.peso} kg</p>
                <p><strong>Sexo:</strong> ${pet.sexo}</p>`;
                div.style.cursor = "pointer";
                div.onclick = () => mostrarInfoAgendarCirurgia(pet);
                listaCirurgiaAgendar.appendChild(div);
            });

            console.log(data);

        } catch (error) {
        alert("Erro ao tentar carregar pets.");
        console.error(error);
        }
    }
    
    //agendar cirurgia por data/hora, id veterinario e motivo_cirurgia
    async function agendarDataHoraCirurgia(id){

      const id_animal = id;
      const id_sala = 2;
      const data_hora = document.getElementById("data_hora_agendar_cirurgia").value;
      const id_veterinario = document.getElementById("id_veterinario_cirurgia").value;
      const status_cirurgia = 'Ativa';
      const motivo_cirurgia = document.getElementById("motivo_cirurgia").value;
      const id_tutor = idTutorLogado;

      const novaCirurgia = {
        id_animal,
        id_sala,
        data_hora,
        id_veterinario,
        status_cirurgia,
        motivo_cirurgia
      };

      try {
        const response = await fetch(`http://localhost:8080/cirurgias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novaCirurgia)
        });

        if (response.ok) {
          alert("Cirurgia agendada com sucesso!");
          document.getElementById("data_hora_agendar_cirurgia").value = ''
          document.getElementById("id_veterinario_cirurgia").value = '';
          document.getElementById("motivo_cirurgia").value = '';
        } else {
          const erro = await response.json();
          alert("Erro ao agendar Cirurgia: " + (erro.error || "Erro desconhecido"));
        }
      } catch (error) {
        alert("Erro de rede ou servidor: " + error.message);
      }
    };

    //mostrar input de data hora para agendar cirurgia
    async function mostrarInfoAgendarCirurgia(pet) {
      try {
        const response = await fetch(`http://localhost:8080/veterinario`);
        const data = await response.json();

        if (!response.ok) {
          alert(data.error || "Veterinários não encontrados");
          return;
        }

        abrirModal("info-cirurgia-agendar-modal");
        infoCirurgiaAgendar.innerHTML = `
          <h3>Agendar Cirurgia</h3>
          <select id="id_veterinario_cirurgia" required></select>
          <input type="datetime-local" placeholder="Data e Hora" id="data_hora_agendar_cirurgia" required>
          <textarea placeholder="Motivo" id="motivo_cirurgia" required></textarea>
          <button id="agendar-btn" type="button" onclick="agendarDataHoraCirurgia(${pet.id_animal})">Agendar</button>
          <button class="btn" id="btn-voltar-agendamento-cirurgia" onclick="fecharModal('info-cirurgia-agendar-modal')">Voltar</button>
        `;

        const select = document.getElementById("id_veterinario_cirurgia");

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
    document.getElementById("btn-voltar-agendamento-cirurgia").addEventListener("click", function (e) {
      if (listaCirurgiaAgendar.textContent !== ''){
        listaCirurgiaAgendar.textContent = '';
        infoCirurgiaAgendar.textContent = '';
      }
    })

    //remarcar cirurgia
    async function remarcarCirurgias(){
      try {
            const response = await fetch(`http://localhost:8080/cirurgias/${encodeURIComponent(emailLogado)}`);
            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Cirurgias não encontradas");
                return;
            }
            console.log(data);

            data.forEach((cirurgia) => {
                const div = document.createElement("div");
                div.className = "cirurgia-remarcar-card";
                div.innerHTML = `
                <p><strong>Nome do Animal:</strong> ${cirurgia.nome_animal}</p>
                <p><strong>Veterinário:</strong> ${cirurgia.nome_veterinario}</p>
                <p><strong>Data e hora</strong> ${formatarData(cirurgia.data_hora)}</p>
                <p><strong>Sala:</strong> ${cirurgia.numero_sala}</p>
                <p><strong>Status da cirurgia:</strong> ${cirurgia.status_cirurgia}</p>
                `;
                div.style.cursor = "pointer";
                div.onclick = () => mostrarFormRemarcacaoCirurgia(cirurgia);
                listaCirurgiaRemarcar.appendChild(div);
            });

        } catch (error) {
        alert("Erro ao tentar carregar pets.");
        console.error(error);
        }
    }

    //alterar data da cirurgia
    async function alterarDataHoraCirurgia(id_cirurgia){

      const data_hora_remarcar = document.getElementById("data_hora_remarcar_cirurgia").value;

      try {
        const response = await fetch(`http://localhost:8080/cirurgias/${id_cirurgia}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data_hora: data_hora_remarcar })
        });

        if (response.ok) {
          alert("Cirurgia reagendada com sucesso!");
          document.getElementById("data_hora_remarcar_cirurgia").value = '';
        } else {
          const erro = await response.json();
          alert("Erro ao reagendar Cirurgia: " + (erro.error || "Erro desconhecido"));
        }
      } catch (error) {
        alert("Erro de rede ou servidor: " + error.message);
      }
    };

    //mostrar campo para remarcar cirurgia
    function mostrarFormRemarcacaoCirurgia(cirurgia){
      abrirModal("info-cirurgia-remarcar-modal");
      infoCirurgiaRemarcar.innerHTML = `
      <h3>Remarcar Cirurgia</h3>
      <input type="datetime-local" placeholder="Data e Hora" id="data_hora_remarcar_cirurgia" required>
      <button id="reagendar-btn-cirurgia" type="button" onclick="alterarDataHoraCirurgia(${cirurgia.id_cirurgia})">Reagendar</button>
      <button class="btn" id="btn-voltar-remarcar-cirurgia" onclick="fecharModal('info-cirurgia-remarcar-modal')">Voltar</button>
      `;
    }

    //apagar itens da lista ao voltar(remarcacao)
    document.getElementById("btn-voltar-remarcacao-cirurgia").addEventListener("click", function (e) {
      if (listaCirurgiaRemarcar.textContent !== ''){
        listaCirurgiaRemarcar.textContent = '';
        infoCirurgiaRemarcar.textContent = '';
      }
    })

    //cancelar cirurgia
    async function cancelarCirurgia(){
      try {
            const response = await fetch(`http://localhost:8080/cirurgias/${encodeURIComponent(emailLogado)}`);
            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Cirurgias não encontradas");
                return;
            }
            console.log(data);

            data.forEach((cirurgia) => {
                const div = document.createElement("div");
                div.className = "cirurgia-cancelar-card";
                div.innerHTML = `
                <p><strong>Nome do Animal:</strong> ${cirurgia.nome_animal}</p>
                <p><strong>Veterinário:</strong> ${cirurgia.nome_veterinario}</p>
                <p><strong>Data e hora</strong> ${formatarData(cirurgia.data_hora)}</p>
                <p><strong>Sala:</strong> ${cirurgia.numero_sala}</p>
                <p><strong>Status da cirurgia:</strong> ${cirurgia.status_cirurgia}</p>
                `;
                div.style.cursor = "pointer";
                div.onclick = () => mostrarFormCancelamentoCirurgia(cirurgia);
                listaCirurgiaCancelar.appendChild(div);
            });

        } catch (error) {
        alert("Erro ao tentar carregar pets.");
        console.error(error);
        }
    }

    //cancelar por id
    async function cancelarCirurgiaId(id_cirurgia){
      try {
        const response = await fetch(`http://localhost:8080/cirurgias/${id_cirurgia}`, {
        method: "DELETE",
        });

        if (response.ok) {
          alert("Cirurgia cancelada com sucesso!");
        } else {
          const erro = await response.json();
          alert("Erro ao cancelar cirurgia: " + (erro.error || "Erro desconhecido"));
        }
      } catch (error) {
        alert("Erro de rede ou servidor: " + error.message);
      }
    }

    function mostrarFormCancelamentoCirurgia(cirurgia) {
      abrirModal("info-cirurgia-cancelar");
        infoCirurgiaCancelar.innerHTML = `
            <h3>Informações da Cirurgia</h3>
            <p><strong>Nome do Animal:</strong> ${cirurgia.nome_animal}</p>
            <p><strong>Veterinário:</strong> ${cirurgia.nome_veterinario}</p>
            <p><strong>Data e hora</strong> ${formatarData(cirurgia.data_hora)}</p>
            <p><strong>Sala:</strong> ${cirurgia.numero_sala}</p>
            <p><strong>Status da cirurgia:</strong> ${cirurgia.status_cirurgia}</p>
            <p><strong>Motivo da cirurgia:</strong> ${cirurgia.motivo_cirurgia}</p>
            <button type="button" onclick="cancelarCirurgiaId(${cirurgia.id_cirurgia})">Cancelar cirurgia</button>
            <button class="btn" id="btn-voltar-cancelar-cirurgia" onclick="fecharModal('info-cirurgia-cancelar')">Voltar</button>
        `;
    }

    //apagar itens da lista ao voltar(cancelamento)
    document.getElementById("btn-voltar-cancelamento-cirurgia").addEventListener("click", function (e) {
      if (listaCirurgiaCancelar.textContent !== ''){
        listaCirurgiaCancelar.textContent = '';
        infoCirurgiaCancelar.textContent = '';
      }
    })
