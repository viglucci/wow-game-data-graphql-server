import RacesDataSource from "../datasource/RacesDataSource";
import ClassesDataSource from "../datasource/ClassesDataSource";
import RealmsDataSource from "../datasource/RealmsDataSource";
import PowerTypesDataSource from "../datasource/PowerTypesDataSource";
import SpecializationsDataSource from "../datasource/SpecializationsDataSource";
import { DataSources } from "apollo-server-core/dist/requestPipeline";
import { DataSource } from "apollo-datasource";

export default interface IDataSources extends DataSources<DataSource> {
  races: RacesDataSource;
  classes: ClassesDataSource;
  realms: RealmsDataSource;
  powerTypes: PowerTypesDataSource;
  specializations: SpecializationsDataSource;
}
