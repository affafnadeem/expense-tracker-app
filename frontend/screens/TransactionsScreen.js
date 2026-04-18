import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TransactionItem from '../components/TransactionItem';
import { getTransactions, deleteTransaction } from '../services/api';

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    Alert.alert('Deleted', 'Transaction removed successfully.');
    loadTransactions();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>All transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <TransactionItem item={item} onDelete={handleDelete} />}
        ListEmptyComponent={<Text style={styles.empty}>No transactions available.</Text>}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', padding: 16, paddingTop: 24 },
  heading: { fontSize: 26, fontWeight: '700', color: '#F8FAFC', marginBottom: 16 },
  empty: { color: '#94A3B8', textAlign: 'center', marginTop: 30 }
});
