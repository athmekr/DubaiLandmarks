export class Landmark {
  objectId: string;
  title: string;
  shortInfo: string;
  description: string;
  location: {
    latitude: Number,
    longitude: Number
  };
  url: string;
  photo: {
      url: string
  };
  photo_thumb: {
      url: string
  };
  latitude: Number;
  longitude: Number;
  image_file: string; //to save photo during multer proccess
}
