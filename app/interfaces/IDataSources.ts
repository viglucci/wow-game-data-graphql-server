import RacesDataSource from "../datasource/RacesDataSource";
import ClassesDataSource from "../datasource/ClassesDataSource";
import RealmsDataSource from "../datasource/RealmsDataSource";

export default interface IDataSources {
  races: RacesDataSource;
  classes: ClassesDataSource;
  realms: RealmsDataSource;
}
