import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { 
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadContainer
} from './styles';
import { useTheme } from 'styled-components';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";


export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  entries: HighlightProps,
  expensives: HighlightProps,
  total: HighlightProps,
}

export function Dashboard(){
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHightlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();
  
  async function loadTransactions(){
    const dataKey =  '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
      
      if(item.type === 'positive') {
        entriesTotal += Number(item.amount);
      } else {
        expensiveTotal += Number(item.amount);
      }

      const amount = Number(item.amount)
      .toLocaleString('pt-BR', { 
        style: 'currency', currency: 'BRL' 
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(item.date))

      return{
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      }
    });

    setTransactions(transactionsFormatted);

    const total = entriesTotal - expensiveTotal;
    setHightlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
      total: {
        amount: total.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
    })

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []))

  return(
    <Container>
      {
      isLoading 
      ?
      <LoadContainer>
        <ActivityIndicator 
          color={theme.colors.primary}
          size="large"
        />
      </LoadContainer>
      :
      <>
        <Header>
          <UserWrapper>
            <UserInfo>
              <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/22225821?v=4' }} />
              <User>
                <UserGreeting>Olá,</UserGreeting>
                <UserName>Gabriel</UserName>
              </User>
            </UserInfo>

            <LogoutButton onPress={() => {}}>
              <Icon name="power" />
            </LogoutButton>
          </UserWrapper>
        </Header>

        <HighlightCards>
          <HighlightCard 
            title="Entradas"
            amount={highlightData.entries.amount}
            lastTransaction="Última entrada dia 13 de abril"
            type="up"
          />
          <HighlightCard 
            title="Saídas"
            amount={highlightData.expensives.amount}
            lastTransaction="Última saída dia 03 de abril"
            type="down"
          />
          <HighlightCard 
            title="Total"
            amount={highlightData.total.amount}
            lastTransaction="01 à 16 de abril"
            type="total"
          />
        </HighlightCards>

        <Transactions>
          <Title>Listagem</Title>

          <TransactionList
            data={transactions}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <TransactionCard data={item} />}
          />

        </Transactions>
      </>  
      }
    </Container>
  )
}