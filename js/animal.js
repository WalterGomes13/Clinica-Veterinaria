// Mock de dados de pets
    const emailLogado = sessionStorage.getItem("emailTutorLogado");
    const idTutorLogado = sessionStorage.getItem("idTutorLogado");
    const listaPets = document.getElementById("lista-pets");
    const infoPet = document.getElementById("info-pet");
    console.log(emailLogado);
    console.log(idTutorLogado);

    //menu select de pets
    document.getElementById("select-pet").addEventListener("change", function (e) {
        const opcao = e.target.value;
        limparTextoInicial();
        e.target.selectedIndex = 0; // reseta para o texto "Pet"

        if (opcao === "ver"){
            abrirModal("modal-ver-pets");
            carregarPets();
        } 
        if (opcao === "cadastrar") abrirModal("modal-cadastro-pet");
    });

    //mostrar pets cadastrados
    async function carregarPets() {
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
                div.className = 'pets-card';
                div.innerHTML = `
                <p><strong>ID Animal:</strong> ${pet.id_animal}</p>
                <p><strong>Nome:</strong> ${pet.nome_animal}</p>
                <p><strong>Espécie:</strong> ${pet.especie}</p>
                <p><strong>Raça:</strong> ${pet.raca}</p>
                <p><strong>Idade:</strong> ${pet.idade}</p>
                <p><strong>Peso:</strong> ${pet.peso} kg</p>
                <p><strong>Sexo:</strong> ${pet.sexo}</p>`;
                div.style.cursor = "pointer";
                div.onclick = () => mostrarInfoPet(pet);
                listaPets.appendChild(div);
            });

            console.log(data);

        } catch (error) {
        alert("Erro ao tentar carregar pets.");
        console.error(error);
        }
    }

    //cadastrar animal
    document.getElementById("form-cadastro-pet").addEventListener("submit", async function (e) {
      e.preventDefault();

      const nome_animal = document.getElementById("nome").value;
      const especie = document.getElementById("especie").value;
      const raca = document.getElementById("raca").value;
      const idade = document.getElementById("idade").value;
      const peso = document.getElementById("peso").value;
      const sexo = document.getElementById("sexo").value;
      const id_tutor = idTutorLogado;

      const novoAnimal = {
        nome_animal,
        especie,
        raca,
        idade,
        peso,
        sexo,
        id_tutor
      };

      try {
      const response = await fetch("http://localhost:8080/animais", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novoAnimal)
      });


      if (response.ok) {
        alert("Pet cadastrado com sucesso!");
        document.getElementById("form-cadastro-pet").reset();
      } else {
        const erro = await response.json();
        alert("Erro ao cadastrar Pet: " + (erro.error || "Erro desconhecido"));
      }
    } catch (error) {
      alert("Erro de rede ou servidor: " + error.message);
    }

    });

    //apagar itens da lista ao voltar
    document.getElementById("btn-voltar").addEventListener("click", function (e) {
      if (listaPets.textContent !== ''){
        listaPets.textContent = '';
      }
    })

    //mostrar infos dos pets cadastrados
    function mostrarInfoPet(pet) {
      abrirModal("info-pet-modal");
      infoPet.innerHTML = `
          <h3>Informações do Pet</h3>
          <p><strong>ID Animal:</strong> ${pet.id_animal}</p>
          <p><strong>Nome:</strong> ${pet.nome_animal}</p>
          <p><strong>Espécie:</strong> ${pet.especie}</p>
          <p><strong>Raça:</strong> ${pet.raca}</p>
          <p><strong>Idade:</strong> ${pet.idade}</p>
          <p><strong>Peso:</strong> ${pet.peso} kg</p>
          <p><strong>Sexo:</strong> ${pet.sexo}</p>
          <button class="btn" id="btn-voltar-pets" onclick="fecharModal('info-pet-modal')">Voltar</button>
      `;
    }