import { GroupShift } from '@driving-school/shared'

export const GROUP_SHIFT_LABEL: Record<GroupShift, string> = {
  [GroupShift.MORNING]: 'Morning (09:00–12:00)',
  [GroupShift.EVENING]: 'Evening (18:00–21:00)',
}

export const GROUP_SHIFT_SHORT: Record<GroupShift, string> = {
  [GroupShift.MORNING]: 'Morning',
  [GroupShift.EVENING]: 'Evening',
}

export const GROUP_SHIFT_OPTIONS = Object.values(GroupShift).map((value) => ({
  value,
  label: GROUP_SHIFT_LABEL[value],
}))