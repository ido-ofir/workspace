module.exports = {
  init(page){
    page.speed('0.4s').ease('ease');
  },
  forward: {
    open(page){
      page.x('100%').enter().x('0').done();
    },
    close(page){
      page.wait(100).x('-100%').wait(600).exit();
    }
  },
  back: {
    open(page){
      page.x('-100%').enter().x('0').done();
    },
    close(page){
      page.wait(100).x('100%').wait(600).exit();
    }
  }
};
