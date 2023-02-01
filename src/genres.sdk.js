import SDK from "./sdk";

export default class GenresSDK extends SDK {
  constructor(appId, appUrl) {
    super(appId, appUrl);
  }

  getGenres = async () => {
    try {
      try {
        return await this.get('genres');
      } catch (e) {
        console.error('error while getting genres');
        console.log(e);
      }
    } catch (error) {
      console.log('error while loading genres');
      console.log(error);
    }
  };

}
