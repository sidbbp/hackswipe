import { StyleSheet } from 'react-native';

// Define common colors
export const colors = {
  primary: '#4F46E5', // Indigo
  primaryLight: '#EEF2FF',
  secondary: '#10B981', // Emerald
  secondaryLight: '#D1FAE5',
  dark: '#1F2937', // Gray 800
  gray: '#6B7280', // Gray 500
  lightGray: '#F3F4F6', // Gray 100
  white: '#FFFFFF',
  danger: '#EF4444', // Red
  dangerLight: '#FEE2E2',
  warning: '#F59E0B', // Amber
  warningLight: '#FEF3C7',
  info: '#3B82F6', // Blue
  infoLight: '#EBF5FF',
};

// Define common text styles
export const text = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark,
  },
  body: {
    fontSize: 16,
    color: colors.dark,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    color: colors.gray,
  },
  small: {
    fontSize: 12,
    color: colors.gray,
  },
});

// Define common layout styles
export const layout = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  section: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

// Define common button styles
export const buttons = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  danger: {
    backgroundColor: colors.danger,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPrimary: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  textSecondary: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  textDanger: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
  },
});

// Define common input styles
export const inputs = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.dark,
    backgroundColor: colors.white,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.dark,
    backgroundColor: colors.white,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray,
    marginBottom: 6,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});

// Define common card styles
export const cards = StyleSheet.create({
  basic: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  swipeCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
});

// Define common badge styles
export const badges = StyleSheet.create({
  basic: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  primary: {
    backgroundColor: colors.primaryLight,
  },
  secondary: {
    backgroundColor: colors.secondaryLight,
  },
  danger: {
    backgroundColor: colors.dangerLight,
  },
  warning: {
    backgroundColor: colors.warningLight,
  },
  info: {
    backgroundColor: colors.infoLight,
  },
  textPrimary: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  textSecondary: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '500',
  },
  textDanger: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '500',
  },
  textWarning: {
    color: colors.warning,
    fontSize: 12,
    fontWeight: '500',
  },
  textInfo: {
    color: colors.info,
    fontSize: 12,
    fontWeight: '500',
  },
});

// Define common modal styles
export const modals = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark,
  },
  body: {
    padding: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});

export default {
  colors,
  text,
  layout,
  buttons,
  inputs,
  cards,
  badges,
  modals,
};
