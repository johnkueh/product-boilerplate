import { useApolloClient } from "@apollo/react-hooks";
import Cookies from "js-cookie";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

interface UserData {
  jwt: string;
  user: any;
}

export const useAuthed = () => {
  const userContext = useContext(UserContext);
  const client = useApolloClient();
  const onAuthed = async (data: UserData, redirectTo?: string) => {
    const { jwt, user } = data;

    Cookies.set("jwt", jwt, { expires: 30 });
    await client.cache.reset();
    userContext.setUser!(user);
  };
  return [onAuthed];
};
