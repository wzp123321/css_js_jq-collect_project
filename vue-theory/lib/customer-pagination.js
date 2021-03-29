/**
 * 自定义分页器插件
 */
(function (window) {
  /**
   * 构造函数
   * @param {*} className
   * @param {*} options
   */
  function Pagination(className, options) {
    var defaultOptions = {
      total: 0,
      page: 1,
      pageSize: 10,
      preText: "上一页",
      nextText: "下一页",
      maxBtnCount: 5,
      changeCallBack: function () {},
    };
    this.container = document.getElementsByClassName(className)[0];
    this.options = Object.assign({}, defaultOptions, options);
    this.show();
    this.onPageClick();
  }

  /**
   * 初始化
   */
  Pagination.prototype.show = function () {
    this.init(1);
  };

  /**
   * 初始化
   * @param {*} page
   */
  Pagination.prototype.init = function (page) {
    this.container.innerHTML = "";
    this.options.page = page;
    const { preText, nextText, maxBtnCount } = this.options;
    // 获取最大页码数
    var maxPageTotal = this.getMaxPageTotal();
    // 显示最大页码按钮数
    var pageInnerHtml = "";
    pageInnerHtml += '<div class="pagination-wrapper">';
    var preClassName = page == 1 ? "'disabled pre'" : "pre";
    pageInnerHtml += `<span class=${preClassName}>${preText}</span>`;
    // 页码按钮开始到结束
    var start = page - Math.floor(maxBtnCount / 2);
    start = start < 1 ? 1 : start;
    var end = start + maxBtnCount - 1;
    end = end > maxPageTotal ? maxPageTotal : end;
    for (var i = start; i <= end; i++) {
      var className = i == page ? "'page-item active'" : "page-item";
      var pageEle = `<span data-i=${i} class=${className}>${i}</span>`;
      pageInnerHtml += pageEle;
    }
    var nextClassName = page == maxPageTotal ? "'disabled next'" : "next";
    pageInnerHtml += `<span class=${nextClassName}>${nextText}</span>`;
    pageInnerHtml += " </div>";
    this.container.innerHTML = pageInnerHtml;
  };

  /**
   * 获取最大页码
   */
  Pagination.prototype.getMaxPageTotal = function () {
    return Math.ceil(this.options.total / this.options.pageSize);
  };

  /**
   * 切换页码
   */
  Pagination.prototype.onPageClick = function () {
    var _this = this;
    var maxPageTotal = this.getMaxPageTotal();
    _this.container.onclick = function (e) {
      switch (e.target.className) {
        case "pre":
          _this.toPage(_this.options.page - 1);
          break;
        case "next":
          _this.toPage(_this.options.page + 1);
          break;
        case "page-item":
          var i = $(e.target).attr("data-i");
          _this.toPage(i);
          break;
        default:
          break;
      }
    };
  };
  Pagination.prototype.toPage = function (page) {
    var _this = this;
    _this.options.page = _this.options.page < 1 ? 1 : page;
    _this.init(_this.options.page);
    _this.options.changeCallBack(_this.options.page);
  };
  // 绑定到window
  window.Pagination = Pagination;
})(window);
