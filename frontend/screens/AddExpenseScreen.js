import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { addTransaction } from '../services/api';

export default function AddExpenseScreen() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('General');
  const [type, setType] = useState('expense');

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setCategory('General');
    setType('expense');
  };

  const handleSubmit = async () => {
    if (!title.trim() || !amount.trim()) {
      Alert.alert('Missing fields', 'Please enter title and amount.');
      return;
    }

    await addTransaction({
      title,
      amount: Number(amount),
      category,
      type,
      date: new Date().toISOString().slice(0, 10)
    });

    Alert.alert('Saved', 'Transaction added successfully.');
    resetForm();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Add transaction</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Salary, Groceries, Freelance..." placeholderTextColor="#475569" />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="0.00"
        placeholderTextColor="#475569"
      />

      <Text style={styles.label}>Category</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Food, Bills, Travel..." placeholderTextColor="#475569" />

      <Text style={styles.label}>Type</Text>
      <View style={styles.typeRow}>
        <Pressable style={[styles.typeButton, type === 'expense' && styles.activeExpense]} onPress={() => setType('expense')}>
          <Text style={[styles.typeText, type === 'expense' && styles.activeText]}>Expense</Text>
        </Pressable>
        <Pressable style={[styles.typeButton, type === 'income' && styles.activeIncome]} onPress={() => setType('income')}>
          <Text style={[styles.typeText, type === 'income' && styles.activeText]}>Income</Text>
        </Pressable>
      </View>

      <Pressable style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>Save transaction</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  content: { padding: 16, paddingTop: 24 },
  heading: { fontSize: 26, fontWeight: '700', color: '#F8FAFC', marginBottom: 18 },
  label: { color: '#94A3B8', fontWeight: '600', marginBottom: 8, marginTop: 10 },
  input: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#334155',
    color: '#F8FAFC'
  },
  typeRow: { flexDirection: 'row', gap: 12, marginTop: 8, marginBottom: 24 },
  typeButton: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155'
  },
  activeExpense: { backgroundColor: '#4C0519', borderColor: '#BE123C' },
  activeIncome: { backgroundColor: '#064E3B', borderColor: '#047857' },
  typeText: { color: '#94A3B8', fontWeight: '600' },
  activeText: { color: '#F8FAFC' },
  submit: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center'
  },
  submitText: { color: '#F8FAFC', fontWeight: '700', fontSize: 16 }
});
