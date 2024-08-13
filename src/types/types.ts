export type UserType = {
  date: number;
  data: UserData[];
};

export type UserData = {
  name: string;
  age: number | null;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTC: 'accepted' | 'not accepted';
};
