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
  }
};
