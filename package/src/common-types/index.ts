export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type ValueOf<T> = T[keyof T];
export type KeyOf<T> = keyof T;