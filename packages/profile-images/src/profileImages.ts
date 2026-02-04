type Picture = {
  url_token: string;
};

type ProfileResponse = {
  pictures: Picture[];
};

export const fetchProfileImages = async (profileSlug: string): Promise<ProfileResponse> => {
  const res = await fetch(`https://hunqz.com/api/opengrid/profiles/${profileSlug}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch profile data for '${profileSlug}'.`);
  }

  return res.json();
};

export const getPictureUrl = (token: string) => `https://hunqz.com/img/usr/original/0x0/${token}.jpg`;
