import { DataSource } from "apollo-datasource";
import { DataSources } from "apollo-server-core/dist/requestPipeline";
import ClassesDataSource from "../datasource/ClassesDataSource";
import DocumentDataSource from "../datasource/DocumentDataSource";
import PowerTypesDataSource from "../datasource/PowerTypesDataSource";
import RacesDataSource from "../datasource/RacesDataSource";
import RealmsDataSource from "../datasource/RealmsDataSource";
import SpecializationsDataSource from "../datasource/SpecializationsDataSource";

export default interface IDataSources extends DataSources<DataSource> {
  document: DocumentDataSource;
  races: RacesDataSource;
  classes: ClassesDataSource;
  realms: RealmsDataSource;
  powerTypes: PowerTypesDataSource;
  specializations: SpecializationsDataSource;
}
