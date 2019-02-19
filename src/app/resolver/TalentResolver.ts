import { inject, injectable } from 'inversify';
import TalentMapper from '../mapper/TalentMapper';

@injectable()
export default class TalentResolver {
  @inject(TalentMapper)
  private talentMapper: TalentMapper;

  public getDefinition() {
    return {
      TalentTier: {
        talents: this.getTalentTierTalents.bind(this)
      },
      Talent: {
        castTime: this.getTalentCastTime.bind(this),
        powerCost: this.getTalentPowerCost.bind(this)
      }
    };
  }

  private getTalentTierTalents(tier: any, args: any, ctx: any) {
    return this.talentMapper.flattenTalentTierTalents(tier.talents);
  }

  private getTalentCastTime(talent: any, args: any, ctx: any) {
    return talent.cast_time;
  }

  private getTalentPowerCost(talent: any, args: any, ctx: any) {
    return talent.power_cost;
  }
}
