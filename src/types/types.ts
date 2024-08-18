export type UserType = {
  date: number;
  data: UserData[];
  files: FileType[];
};

export type FileType = {
  name: string;
  base64: string;
  size: number;
};

export type UserData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
  country: string;
  acceptTC: boolean;
  userPicture: string;
  pictureName?: string;
};

export type Gender = 'male' | 'female' | 'other' | 'not selected' | '';
