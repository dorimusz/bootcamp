import * as I from "../Input/InputAtom";
import * as B from "../Button/ButtonAtom";
import { useEffect, useState } from "react";
import {
  setRepository,
  filterLanguage,
} from "../../store/repository/repositorySlice";
import { useDispatch } from "react-redux";

const Input: React.FC<{
  type: string;
  placeholder: string;
  value?: string;
}> = ({ type, placeholder, value = "" }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState(value);

  const filterLang = () => {
    dispatch(filterLanguage(input));
    setInput("");
  };

  useEffect(() => {
    // console.log("@@stat", input);
  }, [input]);

  return (
    <>
      <I.Holder>
        <I.InputField
          type={type}
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {/* <B.PrimaryButton onClick={() => dispatch(filterLanguage(input))}> */}
        <B.PrimaryButton onClick={filterLang}>Cleck me</B.PrimaryButton>
      </I.Holder>
    </>
  );
};
export default Input;
