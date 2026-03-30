interface iToggleFollowUserResponse {
  success: boolean;
  message: string;
  data: iToggleFollowUserData;
}

interface iToggleFollowUserData {
  following: boolean;
  followersCount: number;
}