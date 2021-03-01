export class Landmark {
  objectId: string;
  order: Number; //not sure if needed
  title: string;
  short_info: string;
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
}
