import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../config/firebaseAdmin';
import { extrairDiaDaSemana, gerarPresencasParaAluno } from '@/utils/Constants';

const db = admin.database();

export default async function submitForm(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { modalidade, turmaSelecionada, nomeAluno, daysOfWeek } = req.body;

    // Verifica se todos os campos necessários estão presentes
    if (!turmaSelecionada || !nomeAluno || !daysOfWeek) {
      return res.status(400).json({ error: 'Dados incompletos fornecidos.' });
    }

    const turmaRef = db.ref(`modalidades/${modalidade}/turmas`).orderByChild('nome_da_turma').equalTo(turmaSelecionada);
    const snapshot = await turmaRef.once('value');

    if (snapshot.exists()) {
      const turmaData = snapshot.val();
      const turmaKey = Object.keys(turmaData)[0];
      const turma = turmaData[turmaKey];

      if (turma.capacidade_atual_da_turma < turma.capacidade_maxima_da_turma) {
        const novoIdAluno = turma.contadorAlunos ? turma.contadorAlunos + 1 : 1;
        
        // Suponha que as funções extrairDiaDaSemana e gerarPresencasParaAluno estão corretas
        // e sejam importadas corretamente.
        const diaDaSemana = extrairDiaDaSemana(daysOfWeek);
        const presencas = gerarPresencasParaAluno(diaDaSemana);

        const aluno = {
          id: novoIdAluno, // Atribui um ID numérico ao aluno
          nome: nomeAluno,
          presencas: presencas,
          // Adicione outras propriedades necessárias para o objeto aluno
        };

        // Adiciona aluno na lista de alunos com ID numérico
        await db.ref(`modalidades/${modalidade}/turmas/${turmaKey}/alunos/${novoIdAluno}`).set(aluno);

        // Incrementa capacidade_atual_da_turma e contadorAlunos
        await db.ref(`modalidades/${modalidade}/turmas/${turmaKey}`).update({
          capacidade_atual_da_turma: turma.capacidade_atual_da_turma + 1,
          contadorAlunos: novoIdAluno
        });

        return res.status(200).json({ message: 'Aluno adicionado com sucesso.' });
      } else {
        return res.status(400).json({ error: 'Não há vagas disponíveis nesta turma.' });
      }
    } else {
      return res.status(404).json({ error: 'Turma não encontrada.' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}