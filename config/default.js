module.exports = {
  oauth: {
    client_id: "default_client_id",
    client_secret: "default_client_secret",
    auth: {
      tokenHost: "https://us.battle.net",
      tokenPath: "/oauth/token"
    }
  },
  locales: {
    supported: [
      "en_US",
      "es_MX",
      "pt_BR",
      "de_DE",
      "es_ES",
      "fr_FR",
      "it_IT",
      "pt_PT",
      "ru_RU",
      "ko_KR",
      "zh_TW",
      "zh_CN"
    ],
    default: "en_US"
  },
  logging: {
    level: "debug"
  },
  datasources: {
    gdapi: {
      defaultRegion: "us",
      hosts: {
        us: "https://us.api.blizzard.com/",
        eu: "https://eu.api.blizzard.com/",
        kr: "https://kr.api.blizzard.com/",
        tw: "https://tw.api.blizzard.com/",
        cn: "https://gateway.battlenet.com.cn/",
        default: "https://us.api.blizzard.com/"
      },
      namespaces: {
        dynamic: {
          us: "dynamic-us",
          eu: "dynamic-eu",
          kr: "dynamic-kr",
          tw: "dynamic-tw",
          cn: "dynamic-cn"
        },
        static: {
          us: "static-us",
          eu: "static-eu",
          kr: "static-kr",
          tw: "static-tw",
          cn: "static-cn"
        }
      }
    }
  }
};
