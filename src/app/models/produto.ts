export class produto{
    id: number = 0;
    nome: string = '';
    categoria: string ='';
    quantidade: number = 0 ;
    urlImagem: string ='';
    data: Date = new Date;

    constructor(id: number, nome: string, categoria: string, quantidade: number, urlImagem: string, data: Date )
    {
        this.id= id;
        this.nome= nome;
        this.categoria= categoria;
        this.quantidade = quantidade;
        this.urlImagem = urlImagem;
        this.data = data;
    }
}