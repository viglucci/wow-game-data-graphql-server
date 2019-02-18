import { injectable } from "inversify";

import IKeyValuePair from "../interfaces/IKeyValuePair";
import IMediaMap from "../interfaces/IMediaMap";

@injectable()
export default class MediaMapper {
  reduceMediaArray(media: any) {
    return media.assets.reduce((assetMap: IMediaMap, asset: IKeyValuePair) => {
      assetMap[asset.key] = {
        url: asset.value
      };
      return assetMap;
    }, {});
  }
}
