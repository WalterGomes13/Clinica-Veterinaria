const listaProdutos = document.getElementById("lista-produtos");

    //mostrar produtos
    document.getElementById("produtos-btn").addEventListener("click", async function (e){
      e.preventDefault();
      
      abrirModal("modal-produtos");

      try {
                const response = await fetch(`http://localhost:8080/estoque`);
                const data = await response.json();

                if (!response.ok) {
                    alert(data.error || "Estoque não encontrado");
                    return;
                }
                console.log(data);

                data.forEach((produto) => {
                    const div = document.createElement("div");
                    div.className = "produto-card";
                    div.innerHTML = `
                    <p><strong>ID:</strong>${produto.id_item}</p>
                    <p><strong>Nome:</strong> ${produto.nome_item}</p>
                    <p><strong>Categoria:</strong> ${produto.categoria}</p>
                    <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                    <p><strong>Preço:</strong> R$ ${produto.preco}</p>
                    <button class="btn" onclick="abrirModal('modal-compra-venda')">Comprar</button>
                    `;
                    listaProdutos.appendChild(div);
                });

                console.log(data);

            } catch (error) {
            alert("Erro ao tentar carregar produtos.");
            console.error(error);
            }
    });

    //mostrar formulario de compra/venda
    document.getElementById("form-compra-venda").addEventListener("submit", async function (e) {
      e.preventDefault();
      fecharModal("modal-compra-venda");

      const id_funcionario = 3;
      const id_item = document.getElementById("id_item").value;
      const tipo_mov = 'venda';
      const quantidade = document.getElementById("quantidade").value;
      const data_hora = document.getElementById("data_hora_movimentacao").value;

      const novaMovimentacao = {
            id_funcionario,
            id_item,
            tipo_mov,
            quantidade,
            data_hora
          };

          console.log(novaMovimentacao);


          try {
          const response = await fetch("http://localhost:8080/estoque", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(novaMovimentacao)
          });


          if (response.ok) {
            alert("Movimentação realizada com sucesso!");
            document.getElementById("form-compra-venda").reset();
          } else {
            const erro = await response.json();
            alert("Erro ao movimentar Estoque: " + (erro.error || "Erro desconhecido"));
          }
        } catch (error) {
          alert("Erro de rede ou servidor: " + error.message);
        }

    })

    //apagar itens da lista ao voltar (compra/venda)
    document.getElementById("btn-voltar-produtos").addEventListener("click", function (e) {
      if (listaProdutos.innerHTML !== ''){
        listaProdutos.innerHTML = '';
      }
    })
