/*(async () => {
    const db = require("./db");
    console.log("Começou!");

    const animais = await db.selectAnimais();
    console.log(animais);
})();

(async () => {
    const db = require("./db");
    console.log('Começou!');
    
    console.log('INSERT INTO ANIMAL');
    const result = await db.insertAnimais({nome: "rex", especie: "cachorro", raca: "pitbull", idade: 5, peso: 35, sexo:"M", id_tutor: 1});
    console.log(result);
 
    console.log('SELECT * FROM ANIMAL');
    const animais = await db.selectAnimais();
    console.log(animais);
})();*/



(async () => {
    //const db = require("./DAO/tutorDAO");
    //console.log('Começou!');
   
    /*console.log('INSERT INTO TUTOR');
    const result = await db.insertTutor({nome: "helena", telefone: "54718525", email: "helena@gmail.com"});
    console.log(result);

    //console.log('SELECT * FROM TUTOR');
    //const tutores = await db.selectTutor();
    //const tutores = await db.selectWhereTutor("*","nome","helena");
    //console.log(tutores);
})();

(async () => {
    //const db = require("./DAO/animalDAO");
    console.log('Começou!');
   
    /*console.log('INSERT INTO movimentacaoestoque');
    const result = await db.movimentarEstoque({id_funcionario: "1", id_item: "1", tipo_mov: "venda", quantidade: "2", data_hora: '2025-05-27 14:30:00'
});
    console.log(result);*/

    //console.log('SELECT * FROM animal');
    //const tutores = await db.selectTutor();
   // const animais = await db.selectAnimalTutor("*", 'mario@gmail.com');
    //console.log(animais);
})();