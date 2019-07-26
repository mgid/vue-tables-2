'use strict';

var dropdownWrapper = require('./dropdown-wrapper');
var dropdownItemWrapper = require('./dropdown-item-wrapper');

module.exports = function (h) {
    var _this = this;

    return function (classes) {
        var cols = _this.columns.map(function (column) {
            var hiddenClassName = _this.opts.hiddenColumns.includes(column) ? classes.columns.hidden : '';

            return dropdownItemWrapper(h, classes, h('a', {
                    'class': classes.dropdown.item + ' ' + hiddenClassName,
                    attrs: {
                        href: '#'
                    },
                    on: {
                        'click': function click() {
                            return _this.toggleColumn(column);
                        }
                    }
                },
                [h('input', {
                    attrs: {
                        type: 'checkbox',
                        disabled: _this._onlyColumn(column)
                    },
                    domProps: {
                        'value': column,
                        'checked': _this.allColumns.includes(column)
                    }
                }), _this.getHeading(column)]
            ));
        });

        if (_this.opts.selectAllColumns) {
            cols.unshift(dropdownItemWrapper(h, classes, h('a', {
                    'class': classes.dropdown.item,
                    attrs: {
                        href: '#'
                    },
                    on: {
                        'click': function () {
                            if (_this.allColumns.length === _this.columns.length) {
                                for (var i = 1; i < _this.columns.length; i++) { // keep first column
                                    _this.toggleColumn(_this.columns[i]);
                                }
                            } else {
                                for (var i in _this.columns) {
                                    if (!_this.allColumns.includes(_this.columns[i])) {
                                        _this.toggleColumn(_this.columns[i]);
                                    }
                                }
                            }
                        }
                    }
                },
                [h('input', {
                    attrs: {
                        type: 'checkbox',
                    },
                    domProps: {
                        'checked': _this.allColumns.length === _this.columns.length
                    }
                }), _this.opts.texts.selectAllColumns]
            )));
        }

        return h(
            'div',
            {
                ref: 'columnsdropdown',
                'class': classes.dropdown.container + ' ' + classes.right + ' VueTables__columns-dropdown'
            },
            [h(
                'button',
                {
                    attrs: { type: 'button' },
                    'class': classes.button + ' ' + classes.dropdown.trigger,
                    on: {
                        'click': _this._toggleColumnsDropdown.bind(_this)
                    }
                },
                [_this.display('columns'), h(
                    'span',
                    { 'class': classes.icon + ' ' + classes.small },
                    [h('i', { 'class': classes.dropdown.caret })]
                )]
            ), dropdownWrapper.call(_this, h, classes, cols)]
        );
    };
};
