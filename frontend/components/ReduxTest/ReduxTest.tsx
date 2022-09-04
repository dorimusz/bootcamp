import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../store/user/userSelector";
import { example, exampleAction } from "../../store/user/userSlice";

const ReduxTest = () => {
  const { valueExample } = useSelector(userSelector); //stateket nyeri ki
  const dispatch = useDispatch(); //dispatch metodus inicializalasa, actionoket kuldi el a storenak
  return (
    <>
      <h1>Ola!</h1>

      <a onClick={() => dispatch(example())}>
        <h2>REDUX TEST {valueExample}</h2>
      </a>

      <a onClick={() => dispatch(exampleAction(2))}>
        <h2>REDUX TEST WITH PROP {valueExample}</h2>
      </a>
    </>
  );
};

export default ReduxTest;
