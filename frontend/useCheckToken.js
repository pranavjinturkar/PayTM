import { useEffect } from "react";
import { api } from "./src/service";

export const useCheckToken = () => {
  useEffect(() => {
    api
      .get("/user/me")
      .then((res) => {
        if (res.status(200) && res.data.success) {
          return true;
        }
      })
      .catch((err) => {
        return false;
      });

    return false;
  }, []);
};
