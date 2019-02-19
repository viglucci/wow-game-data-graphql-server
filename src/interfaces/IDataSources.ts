import { DataSource } from 'apollo-datasource';
import { DataSources } from 'apollo-server-core/dist/requestPipeline';
import ClassesDataSource from '../app/datasource/ClassesDataSource';
import DocumentDataSource from '../app/datasource/DocumentDataSource';
import MythicKeystoneDataSource from '../app/datasource/MythicKeystoneDataSource';
import MythicKeystoneDungeonDataSource from '../app/datasource/MythicKeystoneDungeonDataSource';
import MythicRaidLeaderboardDataSource from '../app/datasource/MythicRaidLeaderboardDataSource';
import PowerTypesDataSource from '../app/datasource/PowerTypesDataSource';
import RacesDataSource from '../app/datasource/RacesDataSource';
import RealmsDataSource from '../app/datasource/RealmsDataSource';
import SpecializationsDataSource from '../app/datasource/SpecializationsDataSource';
import WoWTokenDataSource from '../app/datasource/WoWTokenDataSource';

export default interface IDataSources extends DataSources<DataSource> {
  document: DocumentDataSource;
  races: RacesDataSource;
  classes: ClassesDataSource;
  realms: RealmsDataSource;
  powerTypes: PowerTypesDataSource;
  specializations: SpecializationsDataSource;
  token: WoWTokenDataSource;
  mythicRaidLeaderboards: MythicRaidLeaderboardDataSource;
  mythicKeystone: MythicKeystoneDataSource;
  mythicKeystoneDungeon: MythicKeystoneDungeonDataSource;
}
