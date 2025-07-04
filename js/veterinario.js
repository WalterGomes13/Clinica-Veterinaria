const listaVet = document.getElementById("lista-veterinarios");
    const infoVet =  document.getElementById("info-vet");

    //buscar veterinarios
    document.getElementById("veterinario-btn").addEventListener("click", async function (e){
      e.preventDefault();
      
      abrirModal("modal-veterinarios");

      try {
                const response = await fetch(`http://localhost:8080/veterinario`);
                const data = await response.json();

                if (!response.ok) {
                    alert(data.error || "Veterinarios não encontrados");
                    return;
                }
                console.log(data);

                data.forEach((veterinario) => {
                    const div = document.createElement("div");
                    div.className = "veterinario-card";
                    div.innerHTML = `
                    <p><strong>ID Veterinário:</strong>${veterinario.id_funcionario}</p>
                    <p><strong>Nome:</strong> ${veterinario.nome}</p> 
                    <p><strong>Telefone:</strong> ${veterinario.telefone}</p>
                    <p><strong>Email:</strong> ${veterinario.email}</p>
                    <p><strong>Turno:</strong>${veterinario.turno}</p>
                    <p><strong>Especialidade: </strong>${veterinario.especialidade}</p>
                    `;
                    div.onclick = () => mostrarInfoVet(veterinario);
                    listaVet.appendChild(div);
                });

                console.log(data);

            } catch (error) {
            alert("Erro ao tentar carregar veterinários.");
            console.error(error);
            }
    });

    function mostrarInfoVet(veterinario) {
        abrirModal("info-vet-modal");
        infoVet.innerHTML = `
            <h3>Informações do Veterinário</h3>
            <p><strong>ID Veterinario:</strong> ${veterinario.id_funcionario}</p>
            <p><strong>Nome:</strong> ${veterinario.nome}</p>
            <p><strong>Telefone:</strong> ${veterinario.telefone}</p>
            <p><strong>Email:</strong> ${veterinario.email}</p>
            <p><strong>Turno:</strong> ${veterinario.turno}</p>
            <p><strong>Especialidade:</strong> ${veterinario.especialidade}</p>
            <button class="btn" id="btn-voltar-veterinarios" onclick="fecharModal('info-vet-modal')">Voltar</button>
        `;
    }

    //apagar itens da lista ao voltar (veterinario)
    document.getElementById("btn-voltar-veterinarios").addEventListener("click", function (e) {
      if (listaVet.innerHTML !== ''){
        listaVet.innerHTML = '';
      }
    });