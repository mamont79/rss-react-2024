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
  age: number | null;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  acceptTC: boolean;
  userPicture: string;
  pictureName: string;
};
