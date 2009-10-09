// $Id$

/**
 * Represents a Solr filter query.
 *
 * @param properties A map of fields to set. Refer to the list of public fields.
 * @class FilterQueryItem
 */
AjaxSolr.FilterQueryItem = AjaxSolr.Class.extend(
  /** @lends AjaxSolr.FilterQueryItem.prototype */
  {
  /**
   * The field name.
   *
   * @field
   * @public
   * @type String
   */
  field: null,

  /**
   * The value.
   *
   * @field
   * @public
   * @type String
   */
  value: null,

  /**
   * Whether the value is publicly viewable.
   *
   * @field
   * @public
   * @type Boolean
   * @default false
   */
  hidden: false,

  /**
   * The widget that manages this item.
   *
   * @field
   * @public
   * @type String
   */
  widgetId: null,

  /**
   * Transforms this item into Solr syntax.
   *
   * @returns {String} Solr Filter Query syntax.
   */
  toSolr: function () {
    return this.field + ':' + encodeURIComponent(this.getValue());
  },

  /**
   * Prepares this item for inclusion in the URL hash.
   *
   * @returns {String} A key-value pair for the URL hash.
   */
  toHash: function () {
    return this.widgetId + ':' + encodeURIComponent(this.getValue());
  },

  /**
   * Parses a key-value pair from the URL hash.
   *
   * @param {String} string A key-value pair from the URL hash.
   */
  parseHash: function (string) {
    var parts = string.split(':');
    this.widgetId = parts[0];
    this.value = decodeURIComponent(parts.slice(1, parts.length).join(':'));
    this.value = this.value.substring(1, this.value.length - 1);

    // Handle multiple values
    var values = this.value.split(' TO ');
    if (values.length == 2) {
      this.value = values;
    }
  },

  /**
   * Flattens the value into a quoted string.
   *
   * @returns {String} A quoted string.
   */
  getValue: function () {
    if (AjaxSolr.isArray(this.value) && this.value.length == 2) {
      return '[' + this.value[0] + ' TO ' + this.value[1] + ']';
    } else {
      return '"' + this.value + '"';
    }
  }
});
