
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CampusFlow</Text>
      <Text style={styles.subtitle}>Welcome back!</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Campus at a Glance</Text>
        <Text style={styles.cardText}>
          Stay organised with your classes, tasks, and deadlines.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Access</Text>
        <Text style={styles.cardText}>
          Use the tabs below to explore your campus dashboard.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#253B80',
  },
  subtitle: {
    fontSize: 17,
    color: '#667085',
    marginTop: 8,
    marginBottom: 28,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#253B80',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#667085',
  },
});
