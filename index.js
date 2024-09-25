const { select, input, checkbox } = require ("@inquirer/prompts")

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

const listarMetas = async () => {
    const respostas = await checkbox ({
        message: "use as setas para mudar de metaas, o espaço para marcar/desmarcar e o enter para finalizar essa etapa",
        choices: [...metas],
        instruction: false

    }) 
    
    metas.forEach((m) => {
        m.checked = false })

        if(respostas.length == 0) {
            console.log("nenhuma meta selecionada!")
            return
        }

   
    

        respostas.forEach ((resposta) => {
            const meta = metas.find  ((m) => {
                return m.value == resposta
            })
            meta.checked = true
        })
        console.log ("meta(s) marcadas como concluída(s)!")
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
       return meta.checked
    })
    if(realizadas.length == 0) {
        console.log ("não existem metas realizadas :P")
        return
    }
    await select({
        message: "Metas realizadas-" + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked 
    })

    if(abertas.length == 0) {
        console.log ("não há metas abertas")
        return
    }
    await select ({
        message: "metas abertas-" + abertas.length,
        choices: [...abertas]
    })

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
            name:"metas realizadas",
            value: "realizadas"
        },
        {
            name:"metas abertas",
            value: "abertas"
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
        await listarMetas()
        break
        case "realizadas":
            await metasRealizadas()
            break
         case "abertas":
            await metasAbertas()
            break
        case "sair":
            console.log(" até mais!")
            return
           
        }
 }
}

start()