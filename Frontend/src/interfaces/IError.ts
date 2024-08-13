export interface IError {
  error: string | number;
  message: string;
}
export type ValidationErrors = {
  success: boolean;
  errors: IError[] | null;
};
