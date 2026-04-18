import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import SummaryCard from '../components/SummaryCard';
import { getSummary, getTransactions } from '../services/api';

const chartWidth = Dimensions.get('window').width - 32;

export default function DashboardScreen() {
  const [summary, setSummary] = useState({ balance: 0, income: 0, expense: 0 });
  const [transactions, setTransactions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const [summaryData, transactionData] = await Promise.all([getSummary(), getTransactions()]);
    setSummary(summaryData);
    setTransactions(transactionData.slice(0, 5));
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const chartData = {
    labels: transactions.length ? transactions.slice().reverse().map((_, index) => `T${index + 1}`) : ['No Data'],
    datasets: [
      {
        data: transactions.length
          ? transactions.slice().reverse().map((item) => item.type === 'income' ? Number(item.amount) : -Number(item.amount))
          : [0]
      }
    ]
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.heading}>Expense Tracker</Text>
      <Text style={styles.subheading}>Track cash flow in one place.</Text>

      <SummaryCard title="Current Balance" amount={summary.balance} accent="#6366F1" />
      <SummaryCard title="Total Income" amount={summary.income} accent="#10B981" />
      <SummaryCard title="Total Expense" amount={summary.expense} accent="#F43F5E" />

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Recent activity</Text>
        <LineChart
          data={chartData}
          width={chartWidth}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundGradientFrom: '#1E293B',
            backgroundGradientTo: '#1E293B',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#6366F1'
            }
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.listCard}>
        <Text style={styles.chartTitle}>Latest transactions</Text>
        {transactions.length ? transactions.map((item) => (
          <View key={item.id} style={styles.latestRow}>
            <Text style={styles.latestTitle}>{item.title}</Text>
            <Text style={[styles.latestAmount, { color: item.type === 'income' ? '#10B981' : '#F43F5E' }]}>
              {item.type === 'income' ? '+' : '-'}${Number(item.amount).toFixed(2)}
            </Text>
          </View>
        )) : <Text style={styles.empty}>No transactions yet.</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  content: { padding: 16, paddingBottom: 30 },
  heading: { fontSize: 28, fontWeight: '700', color: '#F8FAFC' },
  subheading: { color: '#94A3B8', marginTop: 4, marginBottom: 18, fontSize: 15 },
  chartCard: {
    backgroundColor: '#1E293B',
    marginTop: 8,
    borderRadius: 16,
    padding: 16
  },
  chartTitle: { fontSize: 17, fontWeight: '700', color: '#F8FAFC', marginBottom: 12 },
  chart: { borderRadius: 16, marginLeft: -12 },
  listCard: { backgroundColor: '#1E293B', marginTop: 16, borderRadius: 16, padding: 16 },
  latestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#334155'
  },
  latestTitle: { color: '#F8FAFC', fontSize: 15 },
  latestAmount: { fontWeight: '700' },
  empty: { color: '#94A3B8' }
});
