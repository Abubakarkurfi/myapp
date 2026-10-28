
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const initialTasks = [
  { id: 1, title: 'Submit project proposal', subject: 'Information Systems', priority: 'High', done: false },
  { id: 2, title: 'Revise database notes', subject: 'Database Systems', priority: 'Medium', done: false },
  { id: 3, title: 'Complete UI prototype', subject: 'Mobile Development', priority: 'High', done: false },
  { id: 4, title: 'Review lecture slides', subject: 'Database Systems', priority: 'Low', done: true },
];

export default function TasksScreen() {
  const [tasks, setTasks] = useState(initialTasks);

  const completed = tasks.filter((task) => task.done).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>CAMPUSFLOW</Text>
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subtitle}>Small steps make big progress.</Text>

        <View style={styles.summary}>
          <Text style={styles.summaryNumber}>
            {completed} / {tasks.length}
          </Text>
          <Text style={styles.summaryText}>tasks completed</Text>
        </View>

        <Text style={styles.sectionTitle}>Your checklist</Text>

        {tasks.map((task) => (
          <Pressable
            key={task.id}
            style={styles.taskCard}
            onPress={() =>
              setTasks((current) =>
                current.map((item) =>
                  item.id === task.id
                    ? { ...item, done: !item.done }
                    : item
                )
              )
            }
          >
            <View style={[styles.checkbox, task.done && styles.checked]}>
              {task.done && <Text style={styles.checkmark}>✓</Text>}
            </View>

            <View style={styles.taskDetails}>
              <Text style={[styles.taskTitle, task.done && styles.completed]}>
                {task.title}
              </Text>
              <Text style={styles.subject}>{task.subject}</Text>
            </View>

            <Text
              style={[
                styles.priority,
                task.priority === 'High' && styles.high,
              ]}
            >
              {task.priority}
            </Text>
          </Pressable>
        ))}

        <Text style={styles.hint}>
          Tap a task to mark it complete or reopen it.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 22, paddingTop: 35 },

  eyebrow: {
    color: '#1769FF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  title: {
    color: '#10213A',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 8,
  },
  subtitle: {
    color: '#718096',
    fontSize: 14,
    marginTop: 7,
    marginBottom: 24,
  },

  summary: {
    backgroundColor: '#1769FF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 28,
  },
  summaryNumber: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  summaryText: {
    color: '#EAF2FF',
    fontSize: 13,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#10213A',
    marginBottom: 13,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 16,
    marginBottom: 11,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E2EAF5',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#1769FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#1769FF',
    borderColor: '#1769FF',
  },
  checkmark: { color: '#FFFFFF', fontWeight: '800' },

  taskDetails: { flex: 1 },
  taskTitle: {
    color: '#10213A',
    fontSize: 13,
    fontWeight: '700',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#8A98AB',
  },
  subject: {
    color: '#718096',
    fontSize: 11,
    marginTop: 5,
  },

  priority: {
    color: '#1769FF',
    fontSize: 10,
    fontWeight: '700',
    backgroundColor: '#EAF2FF',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
  },
  high: {
    color: '#C24141',
    backgroundColor: '#FDECEC',
  },
  hint: {
    color: '#718096',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
  },
});
