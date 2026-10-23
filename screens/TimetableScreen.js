// Screen 4: Weekly Timetable
// Days and time slots, with lectures, tutorials and other activities.
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const days = ['Mon 19', 'Tue 20', 'Wed 21', 'Thu 22', 'Fri 23'];
const hours = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'];

// day: 0 = Mon ... 4 = Fri. start/end are hours in 24h time.
const activities = [
  { title: 'COMP 1600', type: 'Lecture', day: 0, start: 8, end: 10, time: '8:00 - 10:00', color: '#2F6FED', bg: '#E8EEFC' },
  { title: 'COMP 1600', type: 'Lecture', day: 1, start: 8, end: 10, time: '8:00 - 10:00', color: '#2F6FED', bg: '#E8EEFC' },
  { title: 'BIOL 1362', type: 'Lecture', day: 1, start: 10, end: 12, time: '10:00 - 12:00', color: '#16A34A', bg: '#E6F5EE' },
  { title: 'BIOL 1362', type: 'Tutorial', day: 2, start: 8, end: 9, time: '8:00 - 9:00', color: '#16A34A', bg: '#E6F5EE' },
  { title: 'MATH 1201', type: 'Tutorial', day: 2, start: 13, end: 14, time: '1:00 - 2:00', color: '#E07B00', bg: '#FDF1E3' },
  { title: 'COMP 1600', type: 'Lab', day: 3, start: 11, end: 13, time: '11:00 - 1:00', color: '#2F6FED', bg: '#E8EEFC' },
  { title: 'Study Group', type: 'Other', day: 4, start: 9, end: 11, time: '9:00 - 11:00', color: '#8B3FD9', bg: '#F3E8FD' },
];

const HOUR_HEIGHT = 60;
const DAY_WIDTH = 110;

export default function TimetableScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Weekly Timetable</Text>
      <Text style={styles.subtitle}>October · Week 8</Text>

      <ScrollView>
        <View style={styles.row}>
          {/* Time slots */}
          <View style={styles.timeColumn}>
            {hours.map((h) => (
              <Text key={h} style={styles.hour}>{h}</Text>
            ))}
          </View>

          {/* Days */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {days.map((day, dayIndex) => (
              <View key={day} style={{ width: DAY_WIDTH }}>
                <Text style={styles.dayName}>{day}</Text>

                <View style={[styles.dayColumn, { height: hours.length * HOUR_HEIGHT }]}>
                  {hours.map((h, i) => (
                    <View key={h} style={[styles.line, { top: i * HOUR_HEIGHT }]} />
                  ))}

                  {activities
                    .filter((a) => a.day === dayIndex)
                    .map((a, i) => (
                      <View
                        key={i}
                        style={[
                          styles.block,
                          {
                            top: (a.start - 8) * HOUR_HEIGHT,
                            height: (a.end - a.start) * HOUR_HEIGHT - 2,
                            backgroundColor: a.bg,
                            borderLeftColor: a.color,
                          },
                        ]}
                      >
                        <Text style={styles.blockTitle}>{a.title}</Text>
                        <Text style={[styles.blockType, { color: a.color }]}>{a.type}</Text>
                        <Text style={styles.blockTime}>{a.time}</Text>
                      </View>
                    ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F6F7FB' },
  title: { fontSize: 22, fontWeight: '700', paddingHorizontal: 16, paddingTop: 16 },
  subtitle: { fontSize: 13, color: '#2F6FED', paddingHorizontal: 16, marginBottom: 12 },
  row: { flexDirection: 'row' },

  timeColumn: { width: 50, paddingTop: 30 },
  hour: { height: HOUR_HEIGHT, fontSize: 10, color: '#6B7280', textAlign: 'right', paddingRight: 6, marginTop: -6 },

  dayName: { height: 30, textAlign: 'center', fontSize: 12, fontWeight: '600', color: '#374151' },
  dayColumn: { borderLeftWidth: 1, borderColor: '#E3E6EE' },
  line: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: '#E3E6EE' },

  block: { position: 'absolute', left: 3, right: 3, borderRadius: 6, padding: 6, borderLeftWidth: 3 },
  blockTitle: { fontSize: 11, fontWeight: '700' },
  blockType: { fontSize: 10, fontWeight: '600' },
  blockTime: { fontSize: 9, color: '#6B7280', marginTop: 2 },
});