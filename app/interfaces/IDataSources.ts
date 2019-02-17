import RacesDataSource from "../datasource/RacesDataSource";
import ClassesDataSource from "../datasource/ClassesDataSource";
import RealmsDataSource from "../datasource/RealmsDataSource";
import PowerTypesDataSource from "../datasource/PowerTypesDataSource";

export default interface IDataSources {
  races: RacesDataSource;
  classes: ClassesDataSource;
  realms: RealmsDataSource;
  powerTypes: PowerTypesDataSource;
}
