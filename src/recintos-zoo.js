class RecintosZoo {
    constructor() {
        //inicializa um array de objetos que representa um recinto do zoologico
        this.recintos = [
            { id: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: [{ especie: "MACACO", quantidade: 3, tamanho: 1 }] },
            { id: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
            { id: 3, bioma: "savana e rio", tamanhoTotal: 7, animaisExistentes: [{ especie: "GAZELA", quantidade: 1, tamanho: 2 }] },
            { id: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
            { id: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: [{ especie: "LEAO", quantidade: 1, tamanho: 3 }] }
        ];
        // define um objeto que contém informações sobre os animais disponíveis para adicionar nos recintos do zoológico
        this.dadosAnimais = {
            "LEAO": { tamanho: 3, biomas: ["savana"], carnivoro: true },
            "LEOPARDO": { tamanho: 2, biomas: ["savana"], carnivoro: true },
            "CROCODILO": { tamanho: 3, biomas: ["rio"], carnivoro: true },
            "MACACO": { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
            "GAZELA": { tamanho: 2, biomas: ["savana"], carnivoro: false },
            "HIPOPOTAMO": { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        //verifica se o animal especificado existe na lista de animais disponiveis e se a quantidade inserida é valida
        if (!this.dadosAnimais[animal]) {
            return { erro: "Animal inválido" };
        }
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }
        
        //cria uma variavel para receber o objeto com os animais disponiveis, passando o parametro do metodo como argumento
        const dadosAnimal = this.dadosAnimais[animal];
        //inicializa um array vazio para receber uma lista de recintos viaveis
        let recintosViaveis = [];
    
        this.recintos.forEach(recinto => {
            //calcula o espaço ocupado no recinto atual pelos animais já existentes
            let espacoOcupado = this.calcularEspacoOcupado(recinto.animaisExistentes);
            //em seguida calcula o espaço livre disponivel 
            let espacoLivre = recinto.tamanhoTotal - espacoOcupado;
    
            // cria uma variavel booleana para verificar se o animal é compativel com o recinto
            let biomasValidos = false;

            // separa os biomas do recinto em um array, dividindo-os onde houver a palavra 'e'
            const biomasRecinto = recinto.bioma.split(' e ');

            // itera sobre os biomas dos animais ja existentes
            for (let i = 0; i < dadosAnimal.biomas.length; i++) {
                const biomaAnimal = dadosAnimal.biomas[i];

                // iterar sobre os biomas do recinto
                for (let j = 0; j < biomasRecinto.length; j++) {
                    const biomaRecinto = biomasRecinto[j];

                    // se algum bioma do animal for igual do recinto, marca como válido
                    if (biomaAnimal === biomaRecinto) {
                        biomasValidos = true;
                        break;
                    }
                }

                // se um bioma válido já foi encontrado para a verificação
                if (biomasValidos) {
                    break;
                }
            }

            // se não houver biomas válidos, retorna
            if (!biomasValidos) return;
    
            // regras da casa entre carnívoros e herbívoros
            let contemCarnivoro = recinto.animaisExistentes.some(a => this.dadosAnimais[a.especie].carnivoro);
            let contemHerbivoro = recinto.animaisExistentes.some(a => !this.dadosAnimais[a.especie].carnivoro);
            if (dadosAnimal.carnivoro && contemHerbivoro) return;
            if (!dadosAnimal.carnivoro && contemCarnivoro) return;
    
            // cria uma variavel para verificar se tem o espaço necessario para adicionar um animal
            let espacoNecessario = dadosAnimal.tamanho * quantidade;
            
            // só adiciona espaço extra se for uma especie nova em um recinto!! PS: me deu muita dor de cabeça!
            if (recinto.animaisExistentes.length > 0 && !recinto.animaisExistentes.some(a => a.especie === animal)) {
                espacoNecessario += 1;
            }
    
            // verifica se o espaço livre for suficiente e adiciona o recinto viável à lista
            if (espacoLivre >= espacoNecessario) {
                console.log(recintosViaveis.push(`Recinto ${recinto.id} (espaço livre: ${espacoLivre - espacoNecessario} total: ${recinto.tamanhoTotal})`));
            }
        });
        //verifica se há recintos viaveis e retorna um erro caso não encontre, caso contrario retorna a lista de recintos viaveis
        if (recintosViaveis.length === 0) return { erro: "Não há recinto viável" };
        return { recintosViaveis };
    }
    
    calcularEspacoOcupado(animais) {
        //metodo para calcular o espaço ocupado pelos animais ja existente no recinto.
        let espaco = animais.reduce((total, animal) => total + animal.tamanho * animal.quantidade, 0);
        if (animais.length > 1) {
            espaco += 1;
        }
        return espaco;
    }
}

export { RecintosZoo as RecintosZoo };