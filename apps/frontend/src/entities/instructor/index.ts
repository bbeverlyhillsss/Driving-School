export { useInstructorStore } from './model/instructor.store'
export { default as InstructorTable } from './ui/InstructorTable.vue'
export { default as InstructorForm } from './ui/InstructorForm.vue'
export {
  createEmptyInstructorForm,
  toInstructorFormValues,
  toInstructorCreateInput,
  toInstructorUpdateInput,
} from './model/instructor-form'
export type { InstructorFormErrors, InstructorFormValues } from './model/instructor-form'
