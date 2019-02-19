import { injectable } from 'inversify';

@injectable()
export default class TalentMapper {
  public flattenTalentTierTalents(talents: any) {
    return talents.reduce((reduced: [any], talent: any) => {
      reduced.push({
        ...talent.talent,
        ...talent.spell_tooltip
      });
      return reduced;
    }, []);
  }
}
