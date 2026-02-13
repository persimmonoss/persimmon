class TabService {
  constructor() {
    this.tabs = [];
    this.activeIndex = 0;
  }

  addTab(url = 'www.google.com', title = 'New Tab') {
    this.tabs.push({ url, title });
    this.activeIndex = this.tabs.length - 1;
  }

  closeTab(index) {
    if (index < 0 || index >= this.tabs.length) return;
    this.tabs.splice(index, 1);

    if (this.activeIndex >= this.tabs.length) {
      this.activeIndex = this.tabs.length - 1;
    }
  }

  switchTab(index) {
    if (index < 0 || index >= this.tabs.length) return;
    this.activeIndex = index;
  }

  getActiveTab() {
    return this.tabs[this.activeIndex];
  }

  getTabs() {
    return this.tabs;
  }
}

export default new TabService();