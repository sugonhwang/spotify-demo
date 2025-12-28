import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/userApi";
import { User } from "../models/user";

/** 유저의 프로파일을 항상 가져와야 되나?
 *  유저의 프로파일을 가져오는 조건은?
  - 유저가 로그인을 했을 때, 즉 access_token이 있을때만 프로파일을 보여줘야함 
 */

const useGetCurrentProfile = (): UseQueryResult<User, Error> => {
  // localStorage에서 access_token을 가져오기
  const accessToken = localStorage.getItem("access_token");
  return useQuery({
    queryKey: ["current-user-profile"],
    queryFn: getCurrentUserProfile,
    enabled: !!accessToken, // access_token이 있을때만 함수 실행
  });
};

export default useGetCurrentProfile;
