export type User = {
  userId: string;
  userName: string;
};

export type LoginProps = {
  currentUserId: string;
  setCurrentUserId: React.Dispatch<React.SetStateAction<string>>;
};
export type BudgetingProps = {
  currentUserId: string;
  setFile: React.Dispatch<React.SetStateAction<string>>;
};
export type ExpensesProps = {
  currentUserId: string;
  file: string;
};
