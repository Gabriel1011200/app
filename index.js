
const { select, input } = require ("@inquirer/prompts")

let meta = {
    value: "tomar banho",
    chechked: false
}
    


let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({message:"Digite a meta."})

    if(meta.length == 0) {
        console.log("a meta está vazia")
        return
    }
    metas.push(
        {value: meta, checked: false}
    )

}

const start = async () => {
 
    while(true){
    
    const opcao = await select ({
        message: "menu >",
        choices: [
        {
          name: "cadastrar meta",
          value: "cadastrar"
        },
        {
          name:"listar metas",
          value: "listar"
        },
        {
            name: "sair",
            value: "sair"
        }
            
            
        ]
    })

    switch(opcao) {
    case "cadastrar":
        await cadastrarMeta()
        console.log(metas)
       break
       case "listar":
        console.log ("vamos listar")
        break
        case "sair":
            console.log("até a próxima!")
            return
    }
 }
}

start()