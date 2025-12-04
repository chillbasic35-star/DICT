// navigation.d.ts
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  '(admin)': NavigatorScreenParams<AdminStackParamList>;
  '(supervisor)': NavigatorScreenParams<SupervisorStackParamList>;
  '(staff)': NavigatorScreenParams<StaffStackParamList>;
  '(citizen)': NavigatorScreenParams<CitizenStackParamList>;
  '(auth)': NavigatorScreenParams<AuthStackParamList>;
};

export type SupervisorStackParamList = {
  index: undefined;
  reports: undefined;
  staff: undefined;
  logout: undefined;
};

// Add other stack param lists as needed
type AdminStackParamList = {
  index: undefined;
  // Add other admin screens
};

type StaffStackParamList = {
  index: undefined;
  // Add other staff screens
};

type CitizenStackParamList = {
  index: undefined;
  // Add other citizen screens
};

type AuthStackParamList = {
  login: undefined;
  register: undefined;
  // Add other auth screens
};

// This allows type checking for the navigation prop
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}