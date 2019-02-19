import { inject, injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';
import IMediaDocument from '../../interfaces/IMediaDocument';
import INamedDocumentLink from '../../interfaces/INamedDocumentLink';
import MediaMapper from '../mapper/MediaMapper';

@injectable()
export default class PlayableClassResolver {
  @inject(MediaMapper)
  private mediaMapper: MediaMapper;

  public getDefinition() {
    return {
      Query: {
        classes: this.classes.bind(this),
        classById: this.getClassById.bind(this)
      },
      PlayableClass: {
        genderName: this.getGenderedName.bind(this),
        powerType: this.getPowerType.bind(this),
        media: this.getMediaForClass.bind(this),
        specializations: this.getSpecializationsForClass.bind(this)
      }
    };
  }

  private async classes(
    root: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.classes.getAllClasses();
  }

  private async getClassById(
    root: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.classes.cassById(id);
  }

  private async getPowerType(
    playableClass: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.powerTypes.powerTypeById(
      playableClass.power_type.id
    );
  }

  private async getMediaForClass(
    playableClass: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    const media: IMediaDocument = await dataSources.document.getDocumentFromDocumentLink(
      playableClass.media
    );
    return this.mediaMapper.reduceMediaArray(media);
  }

  private getGenderedName(playableClass: any) {
    return playableClass.gender_name;
  }

  private async getSpecializationsForClass(
    playableClass: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return playableClass.specializations.map(
      async (specializationLink: INamedDocumentLink) => {
        return dataSources.document.getDocumentFromDocumentLink(
          specializationLink
        );
      }
    );
  }
}
