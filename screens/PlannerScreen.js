// Screen 6: Study-Session Planner
// Scheduled study sessions showing course, date, time and duration,
// with Add and Edit session actions.
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const sessions = [
  { course: 'COMP 1600', date: 'Fri 23 Oct', time: '6:00 PM', duration: '1 h 30 min', color: '#2F6FED' },
  { course: 'BIOL 1362', date: 'Sat 24 Oct', time: '10:00 AM', duration: '1 h', color: '#16A34A' },
  { course: 'MATH 1201', date: 'Sat 24 Oct', time: '3:00 PM', duration: '2 h', color: '#E07B00' },
  { course: 'ENGL 1010', date: 'Mon 26 Oct', time: '5:30 PM', duration: '45 min', color: '#8B3FD9' },
];

export default function PlannerScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Study Planner</Text>

        {/* Add session action */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addText}>+ Add Session</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {sessions.map((s, i) => (
          <View key={i} style={[styles.card, { borderLeftColor: s.color }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.course}>{s.course}</Text>
              <Text style={styles.detail}>📅 {s.date}</Text>
              <Text style={styles.detail}>🕒 {s.time}</Text>
              <Text style={styles.detail}>⏱ {s.duration}</Text>
            </View>

            {/* Edit session action */}
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F6F7FB' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 16 },
  title: { fontSize: 22, fontWeight: '700' },

  addButton: { backgroundColor: '#2F6FED', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  addText: { color: '#fff', fontWeight: '600' },

  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#E3E6EE', borderLeftWidth: 4 },
  course: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  detail: { fontSize: 13, color: '#4B5563', marginTop: 2 },

  editButton: { borderWidth: 1, borderColor: '#2F6FED', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8 },
  editText: { color: '#2F6FED', fontWeight: '600' },
});