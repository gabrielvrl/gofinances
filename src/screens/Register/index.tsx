import React, { useState } from "react";
import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";

export function Register(){
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  return(
    <Container>
      <Header>
        <Title>
          Cadastro
        </Title>
      </Header>

      <Form>
        <Fields>
          <Input 
            placeholder="Nome"
          />

          <Input 
            placeholder="Preço"
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
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  )
}