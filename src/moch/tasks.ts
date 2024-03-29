import { taskStatus, taskType } from "../types/types";

export const mochTasks: taskType[] = [
  {
    id: 1001,
    title: "Пресс качат",
    status: taskStatus.FOR_EXECUTION,
    date: '10 dec 2023',
    executor: {
      id: 101,
      name: "Pikachu",
      imageUrl: "pika.png",
    }
  },
  {
    id: 1002,
    title: "Бегит",
    status: taskStatus.FOR_EXECUTION,
    date: '10 dec 2023',
    executor: {
      id: 101,
      name: "Spoody man",
      imageUrl: "spoody.png",
    }
  },
  {
    id: 1003,
    title: "Ажуманя",
    status: taskStatus.FOR_EXECUTION,
    date: '10 dec 2023',
    executor: {
      id: 101,
      name: "Son of mom's friend",
      imageUrl: "boi.png",
    }
  },
  {
    id: 1004,
    title: "Турник",
    status: taskStatus.FOR_EXECUTION,
    date: '11 dec 2023',
  },
  {
    id: 1011,
    title: "Вечером пресс качат",
    status: taskStatus.FOR_EXECUTION,
    date: '11 dec 2023',
  },
  {
    id: 1012,
    title: "Вечером бегит",
    status: taskStatus.FOR_EXECUTION,
    date: '11 dec 2023',
  },
  {
    id: 1013,
    title: "Вечером ажуманя",
    status: taskStatus.FOR_EXECUTION,
    date: '11 dec 2023',
  },
  {
    id: 1014,
    title: "Вечером турник",
    status: taskStatus.FOR_EXECUTION,
    date: '11 dec 2023',
  },

];
