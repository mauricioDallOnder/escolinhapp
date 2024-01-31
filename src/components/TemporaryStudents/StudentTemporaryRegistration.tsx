import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, Container, Grid, TextField, Typography, MenuItem,Divider } from '@mui/material';
import Layout from '@/components/TopBarComponents/Layout';
import { BoxStyleCadastro, TituloSecaoStyle } from '@/utils/Styles';
import { extrairDiaDaSemana, gerarPresencasParaAluno } from '@/utils/Constants';
import { useData } from '@/context/context';
import { FormValuesStudenTemporary } from '@/interface/interfaces';



export default function TemporaryStudentRegistration() {
    const { sendTemporaryRegistrationDataToApi,fetchModalidades } = useData();
  const { register, handleSubmit,reset, formState: { isSubmitting } } = useForm<FormValuesStudenTemporary>({
    defaultValues: {
      nomeAluno: '', // Initialize as empty string
      daysOfWeek: 'SEGUNDA', // Default to 'SEGUNDA'
    }
  });

  const daysOfWeek = ['SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO'];

  const onSubmit: SubmitHandler<FormValuesStudenTemporary> = async (formData) => {
    const diaDaSemana = extrairDiaDaSemana(formData.daysOfWeek!);
    const presencas = gerarPresencasParaAluno(diaDaSemana);
  
    // Criando fullData com a estrutura esperada
    const fullData: FormValuesStudenTemporary = {
      nomeAluno: formData.nomeAluno,
      daysOfWeek: formData.daysOfWeek,
      modalidade: 'temporarios',
      turmaSelecionada: 'TEMPORARIO', // Valor fixo para 'turmaSelecionada'
      presencas: presencas
    };
  
    try {
      await sendTemporaryRegistrationDataToApi(fullData);
      
      alert("Cadastro temporário efetuado com sucesso");
      reset(); // Reset form
      fetchModalidades(); // Refresh the data
    } catch (error) {
      console.error('Erro ao enviar os dados do formulário', error);
    }
  };
  
  

  return (
    
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={BoxStyleCadastro}>
            <Typography sx={TituloSecaoStyle}>Cadastro de Alunos Temporários</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome do Aluno"
                  variant="standard"
                  required
                  {...register('nomeAluno')}
                />
              </Grid>
              <Divider/>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Dia da Semana"
                  fullWidth
                  required
                  variant="outlined"
                  {...register('daysOfWeek')}
                >
                  {daysOfWeek.map((day, index) => (
                    <MenuItem key={index} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </TextField>
              D</Grid>
            </Grid>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? 'Processando...' : 'Cadastrar aluno temporariamente'}
            </Button>
          </Box>
        </form>
      </Container>
  
  );
}
