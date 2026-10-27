# CampusFlow: how to drop this into your project

Run these from your project root (the folder with package.json).

1. Copy the files in:   unzip -o ~/Downloads/campusflow-refined.zip
2. Remove old files:    rm "src/app/(tabs)/layout.tsx" src/app/index.tsx   (ignore "No such file" messages)
3. Install packages:    npx expo install @expo/vector-icons @react-native-community/datetimepicker
4. Start fresh:         npx expo start -c

Folders:
  src/app        routes only (one line each)
  src/features   tasks, dashboard, courses, study (each feature owns its screens, hooks and data)
  src/shared     small pieces used by several features
