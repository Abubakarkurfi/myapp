
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Task = {
  id: number;
  title: string;
  subject: string;
  date: string;
  time: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
};


const today = new Date();

const dateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const offsetDate = (days: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return dateKey(date);
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Submit project proposal',
    subject: 'Software Engineering',
    date: offsetDate(-2),
    time: '10:00 AM',
    priority: 'High',
    completed: false,
  },
  {
    id: 2,
    title: 'Revise database notes',
    subject: 'Database Systems',
    date: offsetDate(0),
    time: '02:00 PM',
    priority: 'Medium',
    completed: false,
  },
  {
    id: 3,
    title: 'Complete UI prototype',
    subject: 'Mobile Development',
    date: offsetDate(1),
    time: '11:59 PM',
    priority: 'High',
    completed: false,
  },
  {
    id: 4,
    title: 'Prepare for quiz',
    subject: 'Information Systems',
    date: offsetDate(3),
    time: '09:00 AM',
    priority: 'Medium',
    completed: false,
  },
  {
    id: 5,
    title: 'Review lecture slides',
    subject: 'Database Systems',
    date: offsetDate(0),
    time: '05:00 PM',
    priority: 'Low',
    completed: true,
  },
];



const COLORS = {
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



const weekdayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function DeadlineCalendarScreen() {
  const [tasks, setTasks] = useState(initialTasks);
  const [month, setMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(dateKey(today));
  const [activeTab, setActiveTab] = useState('Calendar');

  const todayKey = dateKey(today);

  const monthName = month.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const firstDay = new Date(
    month.getFullYear(),
    month.getMonth(),
    1
  );

  
  const startingOffset = (firstDay.getDay() + 6) % 7;

  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0
  ).getDate();

  const calendarCells: (number | null)[] = [
    ...Array(startingOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  while (calendarCells.length % 7 !== 0) {
    calendarCells.push(null);
  }

  const tasksForDate = (key: string) =>
    tasks.filter((task) => task.date === key);

  const selectedTasks = tasksForDate(selectedDate);

  const isOverdue = (task: Task) =>
    !task.completed && task.date < todayKey;

  const formatSelectedDate = () => {
    const [year, monthNumber, day] = selectedDate.split('-').map(Number);

    return new Date(year, monthNumber - 1, day).toLocaleDateString(
      'en-US',
      { weekday: 'long', month: 'long', day: 'numeric' }
    );
  };

  const changeMonth = (direction: number) => {
    setMonth(
      new Date(month.getFullYear(), month.getMonth() + direction, 1)
    );
  };

  const toggleTask = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const goToToday = () => {
    setMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(todayKey);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>CAMPUSFLOW</Text>
          <Text style={styles.pageTitle}>Deadline calendar</Text>
          <Text style={styles.subtitle}>
            Stay on top of your studies.
          </Text>
        </View>

        <Pressable style={styles.todayButton} onPress={goToToday}>
          <Text style={styles.todayButtonText}>Today</Text>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Monthly calendar */}
        <View style={styles.calendarCard}>
          <View style={styles.monthHeader}>
            <View>
              <Text style={styles.monthTitle}>{monthName}</Text>
              <Text style={styles.monthSubtitle}>
                Select a date to view tasks
              </Text>
            </View>

            <View style={styles.monthControls}>
              <Pressable
                accessibilityLabel="Previous month"
                style={styles.arrowButton}
                onPress={() => changeMonth(-1)}
              >
                <Text style={styles.arrowText}>{'‹'}</Text>
              </Pressable>

              <Pressable
                accessibilityLabel="Next month"
                style={styles.arrowButton}
                onPress={() => changeMonth(1)}
              >
                <Text style={styles.arrowText}>{'›'}</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.weekRow}>
            {weekdayNames.map((day, index) => (
              <Text key={index} style={styles.weekday}>
                {day}
              </Text>
            ))}
          </View>

          {Array.from(
            { length: calendarCells.length / 7 },
            (_, weekIndex) => (
              <View key={weekIndex} style={styles.weekRow}>
                {calendarCells
                  .slice(weekIndex * 7, weekIndex * 7 + 7)
                  .map((day, dayIndex) => {
                    if (day === null) {
                      return (
                        <View
                          key={`empty-${weekIndex}-${dayIndex}`}
                          style={styles.dayCell}
                        />
                      );
                    }

                    const cellDate = new Date(
                      month.getFullYear(),
                      month.getMonth(),
                      day
                    );

                    const key = dateKey(cellDate);
                    const isSelected = key === selectedDate;
                    const isToday = key === todayKey;
                    const dayTasks = tasksForDate(key);
                    const hasOverdue = dayTasks.some(isOverdue);
                    const hasPending = dayTasks.some(
                      (task) => !task.completed && !isOverdue(task)
                    );

                    return (
                      <Pressable
                        key={key}
                        accessibilityRole="button"
                        accessibilityLabel={`${key}, ${dayTasks.length} tasks`}
                        onPress={() => setSelectedDate(key)}
                        style={styles.dayCell}
                      >
                        <View
                          style={[
                            styles.dayNumber,
                            isToday && styles.todayCircle,
                            isSelected && styles.selectedCircle,
                          ]}
                        >
                          <Text
                            style={[
                              styles.dayText,
                              isToday && styles.todayText,
                              isSelected && styles.selectedText,
                            ]}
                          >
                            {day}
                          </Text>
                        </View>

                        <View style={styles.dotsRow}>
                          {hasOverdue && (
                            <View
                              style={[
                                styles.dot,
                                { backgroundColor: COLORS.red },
                              ]}
                            />
                          )}
                          {hasPending && (
                            <View
                              style={[
                                styles.dot,
                                { backgroundColor: COLORS.blue },
                              ]}
                            />
                          )}
                          {dayTasks.some((task) => task.completed) && (
                            <View
                              style={[
                                styles.dot,
                                { backgroundColor: '#B8BBAE' },
                              ]}
                            />
                          )}
                        </View>
                      </Pressable>
                    );
                  })}
              </View>
            )
          )}

          <View style={styles.legend}>
            <LegendDot color={COLORS.blue} label="Upcoming" />
            <LegendDot color={COLORS.red} label="Overdue" />
            <LegendDot color="#B8BBAE" label="Completed" />
          </View>
        </View>

        {/* Task summary */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Your deadlines</Text>
            <Text style={styles.sectionSubtitle}>
              {formatSelectedDate()}
            </Text>
          </View>

          <View style={styles.countBadge}>
            <Text style={styles.countText}>{selectedTasks.length}</Text>
          </View>
        </View>

        {selectedTasks.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>✦</Text>
            <Text style={styles.emptyTitle}>Nothing scheduled</Text>
            <Text style={styles.emptyText}>
              Enjoy the free time or choose another date.
            </Text>
          </View>
        ) : (
          selectedTasks.map((task) => {
            const overdue = isOverdue(task);

            return (
              <View key={task.id} style={styles.taskCard}>
                <Pressable
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: task.completed }}
                  onPress={() => toggleTask(task.id)}
                  style={[
                    styles.checkCircle,
                    task.completed && styles.checkedCircle,
                  ]}
                >
                  {task.completed && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </Pressable>

                <View style={styles.taskDetails}>
                  <Text
                    style={[
                      styles.taskTitle,
                      task.completed && styles.completedTitle,
                    ]}
                  >
                    {task.title}
                  </Text>

                  <Text style={styles.taskSubject}>{task.subject}</Text>

                  <Text style={styles.taskTime}>{task.time}</Text>
                </View>

                <View style={styles.taskRight}>
                  <View
                    style={[
                      styles.priorityBadge,
                      overdue
                        ? styles.overdueBadge
                        : task.priority === 'High'
                        ? styles.highBadge
                        : styles.normalBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.priorityText,
                        overdue && { color: COLORS.red },
                      ]}
                    >
                      {task.completed
                        ? 'Done'
                        : overdue
                        ? 'Overdue'
                        : task.priority}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        )}

        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>✦</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>A little progress adds up</Text>
            <Text style={styles.tipText}>
              Tap the circle beside a task to mark it complete.
            </Text>
          </View>
        </View>
      </ScrollView>

     
    
    </SafeAreaView>
  );
}

function LegendDot({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyebrow: {
    color: COLORS.blue,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 7,
  },
  pageTitle: {
    color: COLORS.text,
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: -0.7,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 5,
  },
  todayButton: {
    backgroundColor: COLORS.lightBlue,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
  },
  todayButtonText: {
    color: COLORS.blue,
    fontSize: 13,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 22,
  },
  calendarCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    paddingHorizontal: 12,
    paddingTop: 19,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 22,
  },
  monthTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORS.text,
  },
  monthSubtitle: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 5,
  },
  monthControls: {
    flexDirection: 'row',
    gap: 8,
  },
  arrowButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 25,
    color: COLORS.text,
    lineHeight: 29,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weekday: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '700',
    paddingBottom: 10,
  },
  dayCell: {
    width: `${100 / 7}%`,
    height: 53,
    alignItems: 'center',
    paddingTop: 2,
  },
  dayNumber: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '500',
  },
  todayCircle: {
    borderWidth: 1.5,
    borderColor: COLORS.blue,
  },
  todayText: {
    color: COLORS.blue,
    fontWeight: '800',
  },
  selectedCircle: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },
  selectedText: {
    color: COLORS.white,
    fontWeight: '800',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 3,
    height: 5,
    alignItems: 'center',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    paddingHorizontal: 5,
    paddingTop: 17,
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendText: {
    fontSize: 10,
    color: COLORS.muted,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 26,
    marginBottom: 13,
    paddingHorizontal: 3,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORS.text,
  },
  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 5,
  },
  countBadge: {
    backgroundColor: COLORS.lightBlue,
    width: 32,
    height: 32,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: COLORS.blue,
    fontWeight: '800',
    fontSize: 13,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 17,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 11,
  },
  checkCircle: {
    width: 23,
    height: 23,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#C8CBBF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },
  checkMark: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 14,
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 19,
  },
  completedTitle: {
    color: COLORS.muted,
    textDecorationLine: 'line-through',
  },
  taskSubject: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 4,
  },
  taskTime: {
    fontSize: 11,
    color: COLORS.blue,
    marginTop: 7,
    fontWeight: '600',
  },
  taskRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  highBadge: {
    backgroundColor: COLORS.lightRed,
  },
  overdueBadge: {
    backgroundColor: COLORS.lightRed,
  },
  normalBadge: {
    backgroundColor: COLORS.lightBlue,
  },
  priorityText: {
    color: COLORS.blue,
    fontSize: 10,
    fontWeight: '700',
  },
  emptyCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 26,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 28,
    color: COLORS.blue,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
  },
  emptyText: {
    fontSize: 12,
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 7,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 16,
    padding: 15,
    marginTop: 9,
    marginBottom: 10,
  },
  tipIcon: {
    fontSize: 21,
    color: COLORS.blue,
  },
  tipTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.blue,
  },
  tipText: {
    fontSize: 11,
    color: COLORS.blue,
    marginTop: 5,
    lineHeight: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: 12,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 3,
  },
  navIcon: {
    fontSize: 22,
    color: '#A0A296',
  },
  activeNavIcon: {
    color: COLORS.blue,
  },
  navLabel: {
    fontSize: 10,
    color: '#A0A296',
  },
  activeNavLabel: {
    color: COLORS.blue,
    fontWeight: '800',
  },
});
