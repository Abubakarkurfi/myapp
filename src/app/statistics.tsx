
import { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Task = {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  completed: boolean;
};

const today = new Date();
today.setHours(0, 0, 0, 0);

const dateOffset = (days: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Submit project proposal',
    subject: 'Software Engineering',
    dueDate: dateOffset(-2),
    completed: false,
  },
  {
    id: 2,
    title: 'Revise database notes',
    subject: 'Database Systems',
    dueDate: dateOffset(0),
    completed: false,
  },
  {
    id: 3,
    title: 'Complete UI prototype',
    subject: 'Mobile Development',
    dueDate: dateOffset(1),
    completed: false,
  },
  {
    id: 4,
    title: 'Prepare for quiz',
    subject: 'Information Systems',
    dueDate: dateOffset(3),
    completed: false,
  },
  {
    id: 5,
    title: 'Review lecture slides',
    subject: 'Database Systems',
    dueDate: dateOffset(0),
    completed: true,
  },
];

const C = {
  background: '#FFFFFF',
  white: '#FFFFFF',
  blue: '#1769FF',
  lightBlue: '#EAF2FF',
  text: '#10213A',
  muted: '#718096',
  border: '#E2EAF5',
  red: '#C24141',
  lightRed: '#FDECEC',
  amber: '#D99000',
};

export default function StatisticsScreen() {
  const [tasks, setTasks] = useState(initialTasks);

  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length;
    const pending = tasks.length - completed;
    const overdue = tasks.filter(
      (t) => !t.completed && t.dueDate < dateOffset(0)
    ).length;

    return {
      total: tasks.length,
      completed,
      pending,
      overdue,
      percentage:
        tasks.length === 0
          ? 0
          : Math.round((completed / tasks.length) * 100),
    };
  }, [tasks]);

  const toggleTask = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>CAMPUSFLOW</Text>
            <Text style={styles.title}>Your progress</Text>
            <Text style={styles.subtitle}>
              Small steps make a big difference.
            </Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>CF</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroLabel}>OVERALL COMPLETION</Text>
          <Text style={styles.heroNumber}>{stats.percentage}%</Text>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${stats.percentage}%` },
              ]}
            />
          </View>

          <Text style={styles.heroCaption}>
            {stats.completed} of {stats.total} tasks completed
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Task overview</Text>

        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <View style={[styles.metricIcon, { backgroundColor: C.lightBlue }]}>
              <Text style={styles.greenIcon}>✓</Text>
            </View>
            <Text style={styles.metricNumber}>{stats.completed}</Text>
            <Text style={styles.metricLabel}>Completed</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={[styles.metricIcon, { backgroundColor: '#FFF3D6' }]}>
              <Text style={styles.amberIcon}>◷</Text>
            </View>
            <Text style={styles.metricNumber}>{stats.pending}</Text>
            <Text style={styles.metricLabel}>Pending</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={[styles.metricIcon, { backgroundColor: C.lightRed }]}>
              <Text style={styles.redIcon}>!</Text>
            </View>
            <Text style={styles.metricNumber}>{stats.overdue}</Text>
            <Text style={styles.metricLabel}>Overdue</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Your tasks</Text>
            <Text style={styles.sectionSubtitle}>
              Mark a task complete to update your progress.
            </Text>
          </View>
        </View>

        {tasks.map((task) => {
          const overdue =
            !task.completed && task.dueDate < dateOffset(0);

          return (
            <Pressable
              key={task.id}
              style={styles.taskCard}
              onPress={() => toggleTask(task.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  task.completed && styles.checked,
                ]}
              >
                {task.completed && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>

              <View style={styles.taskInfo}>
                <Text
                  style={[
                    styles.taskTitle,
                    task.completed && styles.strikethrough,
                  ]}
                >
                  {task.title}
                </Text>
                <Text style={styles.subject}>{task.subject}</Text>
              </View>

              <View
                style={[
                  styles.status,
                  task.completed
                    ? styles.completedStatus
                    : overdue
                    ? styles.overdueStatus
                    : styles.pendingStatus,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    overdue && !task.completed && { color: C.red },
                  ]}
                >
                  {task.completed
                    ? 'Done'
                    : overdue
                    ? 'Overdue'
                    : 'Pending'}
                </Text>
              </View>
            </Pressable>
          );
        })}

        <View style={styles.tip}>
          <Text style={styles.tipTitle}>Your next step</Text>
          <Text style={styles.tipText}>
            {stats.pending === 0
              ? 'Amazing work! You have completed all your tasks.'
              : `You have ${stats.pending} pending task${stats.pending === 1 ? '' : 's'}. Choose one and make progress today.`}
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.background,
  },
  content: {
    padding: 22,
    paddingBottom: 35,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 12,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    color: C.blue,
    marginBottom: 8,
  },
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: C.text,
  },
  subtitle: {
    color: C.muted,
    fontSize: 13,
    marginTop: 6,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: C.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: C.blue,
    fontWeight: '800',
  },
  hero: {
    backgroundColor: C.blue,
    borderRadius: 23,
    padding: 23,
    marginBottom: 28,
  },
  heroLabel: {
    color: '#EAF2FF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  heroNumber: {
    color: C.white,
    fontSize: 49,
    fontWeight: '800',
    marginTop: 9,
    marginBottom: 17,
  },
  progressTrack: {
    height: 9,
    borderRadius: 8,
    backgroundColor: '#5B8FFF',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: C.white,
    borderRadius: 8,
  },
  heroCaption: {
    color: '#EAF2FF',
    fontSize: 12,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: C.text,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
    marginBottom: 29,
  },
  metricCard: {
    flex: 1,
    minWidth: 0,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 17,
    padding: 12,
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },
  greenIcon: {
    color: C.blue,
    fontSize: 19,
    fontWeight: '800',
  },
  amberIcon: {
    color: C.amber,
    fontSize: 21,
  },
  redIcon: {
    color: C.red,
    fontSize: 19,
    fontWeight: '800',
  },
  metricNumber: {
    color: C.text,
    fontSize: 25,
    fontWeight: '800',
  },
  metricLabel: {
    color: C.muted,
    fontSize: 11,
    marginTop: 5,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionSubtitle: {
    color: C.muted,
    fontSize: 12,
    marginTop: 6,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    padding: 14,
    backgroundColor: C.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 10,
  },
  checkbox: {
    width: 23,
    height: 23,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#C7D5E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: C.blue,
    borderColor: C.blue,
  },
  checkmark: {
    color: C.white,
    fontWeight: '800',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    color: C.text,
    fontSize: 13,
    fontWeight: '700',
  },
  strikethrough: {
    color: C.muted,
    textDecorationLine: 'line-through',
  },
  subject: {
    color: C.muted,
    fontSize: 11,
    marginTop: 5,
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  completedStatus: {
    backgroundColor: C.lightBlue,
  },
  overdueStatus: {
    backgroundColor: C.lightRed,
  },
  pendingStatus: {
    backgroundColor: '#FFF3D6',
  },
  statusText: {
    color: C.blue,
    fontSize: 10,
    fontWeight: '700',
  },
  tip: {
    backgroundColor: C.lightBlue,
    borderRadius: 17,
    padding: 17,
    marginTop: 12,
  },
  tipTitle: {
    color: C.blue,
    fontSize: 14,
    fontWeight: '800',
  },
  tipText: {
    color: C.blue,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 6,
  },

});
