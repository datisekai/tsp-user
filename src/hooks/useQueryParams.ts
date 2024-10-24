import { useSearchParams } from "react-router-dom";

interface IProps {
  key: string;
  defaultValue?: string;
}
export const useQueryParams = ({ key, defaultValue = "" }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    searchParams.get(key) || defaultValue,
    (value: string) => {
      setSearchParams({ [key]: value }, { replace: true });
    },
  ];
};
