// Screen 5: Projects and Milestones
// Project list and progress, milestones with completion status,
// and the tasks belonging to each milestone.
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const projects = [
  { name: 'Sorting Algorithms Report', course: 'COMP 1600', progress: 33, color: '#2F6FED' },
  { name: 'Cell Biology Poster', course: 'BIOL 1362', progress: 50, color: '#16A34A' },
];

const milestones = [
  {
    title: 'Research & outline',
    status: 'Complete',
    tasks: [
      { name: 'Read lecture notes', done: true },
      { name: 'Write outline', done: true },
    ],
  },
  {
    title: 'Implement algorithms',
    status: 'In progress',
    tasks: [
      { name: 'Bubble sort', done: true },
      { name: 'Merge sort', done: false },
      { name: 'Benchmark timings', done: false },
    ],
  },
  {
    title: 'Write final report',
    status: 'Not started',
    tasks: [
      { name: 'Draft results', done: false },
      { name: 'Proofread', done: false },
    ],
  },
];

const statusColor = {
  'Complete': '#16A34A',
  'In progress': '#F59E0B',
  'Not started': '#9CA3AF',
};

export default function ProjectsScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>Projects</Text>

      {/* Project list and progress */}
      {projects.map((p) => (
        <View key={p.name} style={[styles.card, { borderLeftWidth: 4, borderLeftColor: p.color }]}>
          <Text style={styles.cardTitle}>{p.name}</Text>
          <Text style={styles.small}>{p.course} · {p.progress}% complete</Text>
          <View style={styles.track}>
            <View style={[styles.fill, { width: p.progress + '%', backgroundColor: p.color }]} />
          </View>
        </View>
      ))}

      {/* Milestones for the first project */}
      <Text style={styles.section}>Milestones · Sorting Algorithms Report</Text>

      {milestones.map((m) => (
        <View key={m.title} style={styles.card}>
          <View style={styles.row}>
            <Text style={[styles.cardTitle, { flex: 1 }]}>{m.title}</Text>
            <Text style={[styles.badge, { color: statusColor[m.status], borderColor: statusColor[m.status] }]}>
              {m.status}
            </Text>
          </View>

          {/* Tasks belonging to this milestone */}
          {m.tasks.map((t) => (
            <View key={t.name} style={styles.task}>
              <View style={[styles.box, t.done && styles.boxDone]}>
                {t.done && <Text style={styles.tick}>✓</Text>}
              </View>
              <Text style={[styles.taskText, t.done && styles.taskDone]}>{t.name}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F6F7FB' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  section: { fontSize: 15, fontWeight: '700', marginTop: 16, marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center' },

  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#E3E6EE' },
  cardTitle: { fontSize: 15, fontWeight: '600' },
  small: { fontSize: 12, color: '#6B7280', marginTop: 4 },

  track: { height: 6, backgroundColor: '#E3E6EE', borderRadius: 3, marginTop: 10 },
  fill: { height: 6, borderRadius: 3 },

  badge: { fontSize: 11, fontWeight: '600', borderWidth: 1, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },

  task: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  box: { width: 18, height: 18, borderRadius: 4, borderWidth: 1.5, borderColor: '#9CA3AF', marginRight: 10, alignItems: 'center', justifyContent: 'center' },
  boxDone: { backgroundColor: '#16A34A', borderColor: '#16A34A' },
  tick: { color: '#fff', fontSize: 11, fontWeight: '700' },
  taskText: { fontSize: 14 },
  taskDone: { color: '#9CA3AF', textDecorationLine: 'line-through' },
});