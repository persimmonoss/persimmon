class PrivacyService {
  constructor() {
    this.settings = {
      adBlock: true,
      trackingProtection: true,
      blockThirdPartyCookies: false,
    };
  }

  toggleSetting(settingName) {
    if (this.settings.hasOwnProperty(settingName)) {
      this.settings[settingName] = !this.settings[settingName];
    }
  }

  getSetting(settingName) {
    return this.settings[settingName];
  }

  getAllSettings() {
    return { ...this.settings };
  }

  setSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
  }
}

export default new PrivacyService();
