import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SummaryCard({ title, amount, accent }) {
  return (
    <View style={[styles.card, { borderLeftColor: accent }]}> 
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.amount}>${Number(amount || 0).toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4
  },
  title: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 6
  },
  amount: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '700'
  }
});
