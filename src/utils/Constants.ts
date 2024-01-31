export const fieldsIdentificacao = [
    { label: "Nome do Aluno", id: "aluno.nome" },
    { label: "Data de Nascimento", id: "aluno.anoNascimento" },
    { label: "Telefone", id: "aluno.telefoneComWhatsapp" },
  
  ];
  export const fieldsEndereco = [
    { label: "Rua", id: "aluno.informacoesAdicionais.endereco.ruaAvenida" },
    { label: "nº da residencia ", id: "aluno.informacoesAdicionais.endereco.numeroResidencia" },
    { label: "Bairro", id: "aluno.informacoesAdicionais.endereco.bairro" },
    { label: "CEP", id: "aluno.informacoesAdicionais.endereco.cep" },
    { label: "complemento", id: "aluno.informacoesAdicionais.endereco.complemento" }
  ];
  //pagadorMensalidades
  export const fieldsResponsavelMensalidade = [
    { label: "Nome completo", id: "aluno.informacoesAdicionais.pagadorMensalidades.nomeCompleto" },
    { label: "CPF", id: "aluno.informacoesAdicionais.pagadorMensalidades.cpf" },
    { label: "E-mail", id: "aluno.informacoesAdicionais.pagadorMensalidades.email" },
    { label: "Telefone para emergências", id: "aluno.informacoesAdicionais.pagadorMensalidades.celularWhatsapp" },
  ];
 
  export const fieldsDadosGeraisAtleta=[
    { label: "Escola que estuda", id: "aluno.informacoesAdicionais.escolaEstuda" },
    { label: "Possui Irmãos?", id: "aluno.informacoesAdicionais.irmaos" },
    { label: "Possui problema de saúde? ", id: "aluno.informacoesAdicionais.saude" },
    { label: "Caso possua problema de saúde, descreva-os: ", id: "aluno.informacoesAdicionais.problemasaude" },
    { label: "Faz uso de algum tipo de medicação?: ", id: "medicacao" },
    { label: "Descreva as medicações utilizadas(caso faça uso): ", id: "aluno.informacoesAdicionais.tipomedicacao" },
    { label: "Em qual convênio de saúde seu filho(a) é atendido?", id: "aluno.informacoesAdicionais.convenio" },
     {label:"Você autoriza o uso da imagem e nome deste para fins legítimos de divulgação e promoção da marca, sem ônus?",id:"aluno.informacoesAdicionais.imagem"}
  ]
  export const fieldsTermosAvisos = [
    { label: "Você se compromete a avisar antecipadamente a ausência de seu filho aos treinos, bem como a informar sobre possíveis problemas de saúde?", id: "aluno.informacoesAdicionais.avisaAusencia" },
    { label: "Comprometo-me a pagar a mensalidade dos treinos até o dia 10 de cada mês e, em caso de cancelamento, a comunicar até o penúltimo dia do mês para evitar cobranças futuras.", id: "aluno.informacoesAdicionais.comprometimentoMensalidade" },
    {label:"Concordo com o desconto de R$5,00 para pagamentos até dia 10. Sem devolução ou isenção para treinos não realizados, exceto com atestado médico. Faltas podem ser recuperadas, exceto em feriados.",id:"aluno.informacoesAdicionais.desconto"}
  ];


  type OpcoesTermosAvisos = {
    [key: string]: string[];
  };
  
  export const opcoesTermosAvisos: OpcoesTermosAvisos = {
    cobramensalidade: ["Ciente"],
    avisaAusencia: ["Sim, avisarei sobre ausências aos treinos."],
    comprometimentoMensalidade: ["Concordo em realizar o pagamento antecipado até dia 10 de cada mês."],
    copiaDocumento: ["Comprometo-me a providenciar cópia autenticada do RG e atestado médico."],
    desconto: ["Estou de acordo com o desconto"]
  };


  //----------------------------------------------------------------------------------------------

  type DiasDaSemanaMap = {
    [key: string]: number;
  };
  
  export type Presencas = {
    [mes: string]: {
      [data: string]: boolean;
    };
  };
  
  export  function extrairDiaDaSemana(nomeDaTurma: string): string {
    const partes = nomeDaTurma.split('_');
    return partes.find(parte => ["SEGUNDA", "TERCA", "QUARTA", "QUINTA", "SEXTA", "SABADO", "DOMINGO"].includes(parte.toUpperCase())) || "SEGUNDA";
  }
  
  export function gerarPresencasParaAluno(diaDaSemana: string): Presencas {
    const ano = 2024;
    const diasDaSemana: DiasDaSemanaMap = {
      "SEGUNDA": 1,
      "TERCA": 2,
      "QUARTA": 3,
      "QUINTA": 4,
      "SEXTA": 5,
      "SABADO": 6,
      "DOMINGO": 0
    };
  
    let presencas: Presencas = {};
    for (let mes = 0; mes < 12; mes++) {
      let nomeMes = new Date(ano, mes, 1).toLocaleString('pt-BR', { month: 'long' });
      presencas[nomeMes] = {};
      let dias = gerarDiasDoMes(ano, mes, diasDaSemana[diaDaSemana.toUpperCase()]);
      dias.forEach(data => {
        presencas[nomeMes][data] = false;
      });
    }
  
    return presencas;
  }
  
  export function gerarDiasDoMes(ano: number, mes: number, diaDaSemana: number): string[] {
    let datas: string[] = [];
    let data = new Date(ano, mes, 1);
    while (data.getDay() !== diaDaSemana) {
      data.setDate(data.getDate() + 1);
    }
    while (data.getMonth() === mes) {
      let diaFormatado = `${data.getDate()}-${mes + 1}-${ano}`;
      datas.push(diaFormatado);
      data.setDate(data.getDate() + 7);
    }
    return datas;
  }
  


  