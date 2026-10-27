import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import TimetableScreen from './screens/TimetableScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import PlannerScreen from './screens/PlannerScreen';

export default function App() {
  const [screen, setScreen] = useState('timetable');

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {screen === 'timetable' && <TimetableScreen />}
        {screen === 'projects' && <ProjectsScreen />}
        {screen === 'planner' && <PlannerScreen />}
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tab} onPress={() => setScreen('timetable')}>
          <Text style={[styles.tabText, screen === 'timetable' && styles.active]}>Timetable</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setScreen('projects')}>
          <Text style={[styles.tabText, screen === 'projects' && styles.active]}>Projects</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setScreen('planner')}>
          <Text style={[styles.tabText, screen === 'planner' && styles.active]}>Planner</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F7FB', paddingTop: StatusBar.currentHeight || 0 },
  tabBar: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#E3E6EE' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  tabText: { fontSize: 13, color: '#6B7280' },
  active: { color: '#2F6FED', fontWeight: '700' },
});