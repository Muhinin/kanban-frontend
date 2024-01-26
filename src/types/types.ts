export type executorType = {
  id: number;
  name: string;
  imageUrl?: string;
};

export type taskType = {
  id: number;
  title: string;
  status: taskStatus;
  date?: string;
  executor?: executorType;
};

export enum taskStatus {
  FOR_EXECUTION = "For execution",
  IN_PROGRESS = "In progress",
  IN_REVIEW = "In review",
  COMPLETE = "Complete",
}
