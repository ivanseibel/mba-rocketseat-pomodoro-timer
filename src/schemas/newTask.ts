import * as zod from "zod";

export const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Task name is required"),
  minutesAmount: zod
    .number()
    .min(1, "Minimum amount of minutes is 5")
    .max(60, "Maximum amount of minutes is 60"),
});

export type NewTaskFormData = zod.infer<typeof newCycleFormValidationSchema>;
