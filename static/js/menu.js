(function() {
  var mark_active_path;
  if (String.prototype.trim === void 0) {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }
  String.prototype.startswith = function(prefix) {
    return this.indexOf(prefix) === 0;
  };
  String.prototype.endswith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
  mark_active_path = function($container, exact_match) {
    var $active, max_length;
    if (exact_match == null) {
      exact_match = false;
    }
    max_length = 0;
    $active = null;
    $container.find('li').each(function() {
      var $this, href, location, part, parts, _i, _len, _ref, _results;
      $this = $(this);
      href = $this.find('a').attr('href');
      if (href === document.location.pathname) {
        $active = $this;
        return false;
      }
      if (exact_match) {
        return;
      }
      parts = [];
      _ref = document.location.pathname.split('/');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        part = _ref[_i];
        parts.push(part);
        location = parts.join('/');
        if (location === '') {
          location = '/';
        }
        _results.push(location.length > max_length && href.startswith(location) ? (max_length = location.length, $active = $this) : void 0);
      }
      return _results;
    });
    if ($active != null) {
      return $active.addClass('active');
    }
  };
  $(function() {
    return mark_active_path($('.tabs'));
  });
}).call(this);