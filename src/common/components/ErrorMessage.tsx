import { Alert } from "@mui/material";

// ErrorMessageProps 타입을 /model에 생성하지 않은 이유: 이 컴포넌트에서만 쓰이는 타입이기 때문임
interface ErrorMessageProps {
  errorMessage: string;
}
const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return <Alert severity="error">{errorMessage}</Alert>;
};

export default ErrorMessage;
