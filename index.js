const { select, input, checkbox } = require ("@inquirer/prompts")

let mensagem = "Bem-vindo ao app de metas";
let meta = {
    value: "tomar banho",
    chechked: false
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({message:"Digite a meta."})

    if(meta.length == 0) {
        mensagem = "a meta está vazia"
        return
    }
    metas.push(
        {value: meta, checked: false},
    )
    mensagem = "meta cadastrada com sucesso!"

}
const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })
    const itensaDeletar = await checkbox ({
    mensagem: "selecione item para deletar",
    choices: [...metasDesmarcadas],
    instruction: false

}) 
if(itensaDeletar.length == 0) {
    mensagem = "nenhum item para deletar"
    return
}
itensaDeletar.forEach((item) => {
    metas = metas.filter((meta) => {
        return meta.value != item
    })
})
mensagem ="meta(s) deletada(s) com sucesso!"
 
}


const listarMetas = async () => {
    const respostas = await checkbox ({
        message: "use as setas para mudar de metas, o espaço para marcar/desmarcar e o enter para finalizar essa etapa",
        choices: [...metas],
        instruction: false

    }) 
    
    metas.forEach((m) => {
        m.checked = false })

        if(respostas.length == 0) {
            mensagem = "nenhuma meta selecionada!"
            return
        }

   
    

        respostas.forEach ((resposta) => {
            const meta = metas.find  ((m) => {
                return m.value == resposta
            })
            meta.checked = true
        })
        mensagem = "meta(s) marcada(s) como concluída(s)!"
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
       return meta.checked
    })
    if(realizadas.length == 0) {
        mensagem = "não existem metas realizadas :P"
        return
    }
    await select({
        message: "Metas realizadas:" + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked 
    })

    if(abertas.length == 0) {
        mensagem = "não há metas abertas :]"
        return
    }
    await select ({
        message: "metas abertas:" + abertas.length,
        choices: [...abertas]
    })
    
    }
    const mostrarMensagem = () =>
{
    console.clear();
    if(mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
 
    while(true){
    mostrarMensagem()
    
    const opcao = await select ({
        message: "menu >",
        choices: [
        {
          name: "cadastrar meta",
          value: "cadastrar"
        },
        {
            name: "deletar metas",
            value: "deletar"
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
        break
        case "deletar":
            await deletarMetas()
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