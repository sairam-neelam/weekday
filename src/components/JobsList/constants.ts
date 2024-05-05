interface Options {
  value: number | string;
  label: string;
}

export const ROLES: Options[] = [
  {
    value: "Backend",
    label: "Backend",
  },
  {
    value: "Frontend",
    label: "Frontend",
  },
  {
    value: "Ios",
    label: "Ios",
  },
  {
    value: "Fullstack",
    label: "Fullstack",
  },
  {
    value: "Flutter",
    label: "Flutter",
  },
  {
    value: "Android",
    label: "Android",
  },
  {
    value: "React Native",
    label: "React Native",
  },
  {
    value: "Tech Lead",
    label: "Tech Lead",
  },
  {
    value: "Data Engineer",
    label: "Data Engineer",
  },
  {
    value: "Dev-Ops",
    label: "Dev-Ops",
  },
];

export const EXPERIENCE: Options[] = [];
for (let i = 1; i <= 10; i++) {
  EXPERIENCE.push({ value: i, label: String(i) });
}

export const MODE: Options[] = [
  {
    value: "Remote",
    label: "Remote",
  },
  {
    value: "Hybrid",
    label: "Hybrid",
  },
  {
    value: "In-office",
    label: "In-office",
  },
];

export const BASE_SALARY: Options[] = [];
for (let i = 0; i <= 7; i++) {
  BASE_SALARY.push({ value: i * 10, label: String(i * 10) + "L" });
}

export const LOCATION: Options[] = [
  {
    value: "Bangalore",
    label: "Bangalore",
  },
  {
    value: "Delhi NCR",
    label: "Delhi NCR",
  },
  {
    value: "Mumbai",
    label: "Mumbai",
  },
  {
    value: "Chennai",
    label: "Chennai",
  },
];
