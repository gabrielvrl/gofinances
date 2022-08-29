import React, { useState, useEffect } from "react";
import { 
  Keyboard, 
  Modal, 
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from "@react-native-async-storage/async-storage"

import { useForm } from "react-hook-form";

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";

import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { CategorySelect } from "../CategorySelect"

interface FormData {
  [name: string]: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number().typeError('Informe um valor numérico').positive('O valor não pode ser negativo').required('O valor é obrigatório'),
});

export function Register(){
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const dataKey =  '@gofinances:transactions';

  const { 
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  function handleOpenSelectedCategoryModal(){
    setCategoryModalOpen(true)
  }

  function handleCloseSelectedCategoryModal(){
    setCategoryModalOpen(false)
  }

  async function handleRegister(form: FormData){
    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação');
    
    if(category.key === 'category')
      return Alert.alert('Selecione a categoria');

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    try {
      await AsyncStorage.setItem(dataKey, JSON.stringify(data));

    } catch(error) {
      console.log(error);
      Alert.alert("Nao foi possivel salvar")
    }
  }

  useEffect(()=> {
    async function loadData(){
      const data = await AsyncStorage.getItem(dataKey);
      console.log(JSON.parse(data!));
    }
    loadData();
  }, [])

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>
            Cadastro
          </Title>
        </Header>

        <Form>
          <Fields>
            <InputForm 
              name="name"
              control={control}
              error={errors.name && errors.name.message}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
            />

            <InputForm 
              name="amount"
              control={control}
              error={errors.amount && errors.amount.message}
              placeholder="Preço"
              keyboardType="numeric"
            />

            <TransactionsTypes>
              <TransactionTypeButton 
                title="Income" 
                type="up" 
                onPress={() => handleTransactionTypeSelect('up')}
                isActive={transactionType === 'up'}
              />

              <TransactionTypeButton 
                title="Outcome" 
                type="down"
                onPress={() => handleTransactionTypeSelect('down')}
                isActive={transactionType === 'down'}
              />
            </TransactionsTypes>

            <CategorySelectButton 
              title={category.name}
              onPress={handleOpenSelectedCategoryModal}
            />
          </Fields>

          <Button 
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectedCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}