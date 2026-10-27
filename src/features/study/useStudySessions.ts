import { SESSIONS } from './data/mockSessions';
import { StudySession } from './types';

export function useStudySessions(): StudySession[] {
  return SESSIONS;
}
