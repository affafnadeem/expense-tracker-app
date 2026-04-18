import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function TransactionItem({ item, onDelete }) {
  const isIncome = item.type === 'income';

  return (
    <View style={styles.row}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>{item.category} • {item.date}</Text>
      </View>
      <View style={styles.actions}>
        <Text style={[styles.amount, { color: isIncome ? '#10B981' : '#F43F5E' }]}>
          {isIncome ? '+' : '-'}${Number(item.amount).toFixed(2)}
        </Text>
        {onDelete ? (
          <Pressable onPress={() => onDelete(item.id)}>
            <Text style={styles.delete}>Delete</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  content: { flex: 1, marginRight: 12 },
  title: { fontSize: 16, fontWeight: '600', color: '#F8FAFC' },
  meta: { marginTop: 4, color: '#94A3B8', fontSize: 13 },
  actions: { alignItems: 'flex-end' },
  amount: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  delete: { color: '#EF4444', fontWeight: '600' }
});
