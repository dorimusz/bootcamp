import * as I from "../Input/InputAtom";
import * as B from "../Button/ButtonAtom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  setRepository,
  filterLanguage,
} from "../../store/repository/repositorySlice";
import { useDispatch } from "react-redux";
import { Colors } from "../../enums/colorEnums";

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
        <I.InputHolder>
          <I.IconHolder onClick={filterLang}>
            <FontAwesomeIcon
              style={{
                marginRight: ".7rem",
                width: "20px",
                padding: ".1rem",
                height: "20px",
                color: `${Colors.DarkBlue}`,
                position: "absolute",
                top: "50%",
                right: "2px",
                transform: "translateY(-50%)",
              }}
              icon={faMagnifyingGlass}
            />
          </I.IconHolder>
          <I.InputField
            type={type}
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </I.InputHolder>
        {/* <B.PrimaryButton onClick={() => dispatch(filterLanguage(input))}> */}
        {/* <B.PrimaryButton onClick={filterLang}>Search</B.PrimaryButton> */}
      </I.Holder>
    </>
  );
};
export default Input;
