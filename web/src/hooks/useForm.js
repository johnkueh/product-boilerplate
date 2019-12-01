import { useReducer } from "react";

export const useForm = ({ initialValues }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialValues
  });

  return {
    currentValues: state,
    reset: () => {
      dispatch({
        type: "RESET",
        initialValues
      });
    },
    setValue: (key, value) => {
      dispatch({
        type: "SET_VALUE",
        name: key,
        value
      });
    },
    fieldProps: name => {
      return {
        name,
        value: state[name],
        onChange: data => {
          let value = data.target ? data.target.value : data;
          if (data.target.type === "number") value = Number(value);

          dispatch({
            type: "SET_VALUE",
            name,
            value
          });
        }
      };
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        [action.name]: action.value
      };
    case "RESET":
      return {
        ...action.initialValues
      };
    default:
      return state;
  }
};

export default {
  useForm
};
