import * as I from "../Input/InputAtom";
import * as B from "../Button/ButtonAtom";
import { useState } from "react";

const Input: React.FC<{
  type: string;
  placeholder: string;
  value?: string;
  onChange?: () => void;
}> = ({ type, placeholder, value, onChange = () => {} }) => {
  // const [input, setInput] = useState(value)
  return (
    <>
      <I.Holder>
        <I.InputField
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={}
        />
        <B.PrimaryButton>Cleck me</B.PrimaryButton>
      </I.Holder>
    </>
  );
};
export default Input;
