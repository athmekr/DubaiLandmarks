export class Landmark {
  objectId: string;
  title: string;
  shortInfo: string;
  description: string;
  location: {
    lat: Number
    long: Number;
  };
  url: string;
  photo: {
      url: string
  };
  photo_thumb: {
      url: string
  };
  image_file: string;
}
