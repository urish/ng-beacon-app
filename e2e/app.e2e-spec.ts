import { NgBeaconAppPage } from './app.po';

describe('ng-beacon-app App', function() {
  let page: NgBeaconAppPage;

  beforeEach(() => {
    page = new NgBeaconAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
