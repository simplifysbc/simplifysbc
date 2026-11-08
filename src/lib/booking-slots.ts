export interface BookedSlot {
  consultant_id: string;
  booking_time: string;
}

export const bookingTimeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
] as const;

export function availableConsultantIds(time: string, consultantIds: string[], slots: BookedSlot[]) {
  return consultantIds.filter((id) => !slots.some(
    (slot) => slot.consultant_id === id && slot.booking_time.slice(0, 5) === time,
  ));
}

export function isSlotConflict(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "23505";
}