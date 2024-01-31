import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Grid, Button, List, Container } from "@mui/material";
import { useData } from "@/context/context";
import { Aluno, FormValuesStudent } from "@/interface/interfaces";
import { BoxStyleFrequencia, ListStyle } from "@/utils/Styles";
import { ListaDeChamada } from "@/components/ListaDeChamada";
import Layout from "@/components/TopBarComponents/Layout";
import { HeaderForm } from "@/components/HeaderDefaultForm";

export default function StudentTemporaryPresenceTable() {
  const { handleSubmit } = useForm<FormValuesStudent>({
    defaultValues: {
      modalidade: "temporarios", // Definido como "temporarios"
      turmaSelecionada: "TEMPORARIO", // Definido como "TEMPORARIO"
    },
  });
  const { modalidades } = useData();
  const [alunosDaTurma, setAlunosDaTurma] = useState<Aluno[]>([]);

  useEffect(() => {
    const turmaEscolhida = modalidades
      .find((m) => m.nome === "temporarios")
      ?.turmas.find((t) => t.nome_da_turma === "TEMPORARIO");

    if (turmaEscolhida && Array.isArray(turmaEscolhida.alunos)) {
      setAlunosDaTurma(turmaEscolhida.alunos);
    }
  }, [modalidades]);

  const onSubmit = async () => {
    console.log("funciona")
  };

  return (
    
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={BoxStyleFrequencia}>
            <HeaderForm titulo={"Lista de Chamada"} />
            <List sx={ListStyle}>
             
              {alunosDaTurma.length > 0 && (
                <ListaDeChamada
                  alunosDaTurma={alunosDaTurma}
                  setAlunosDaTurma={setAlunosDaTurma}
                  modalidade={"temporarios"}
                  nomeDaTurma={"TEMPORARIO"}
                />
              )}
               <Button sx={{ width: "100%", marginBottom: "12px" }} type="submit" variant="contained">
                Carregar Lista de alunos Temporários
              </Button>
            </List>
          </Box>
        </form>
      </Container>
    
  );
}
