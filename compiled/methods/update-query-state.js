"use strict";

module.exports = function (e, dateEvent, useDateEvent = false) {
    var query = this.vuex ? JSON.parse(JSON.stringify(this.query)) : this.query; // in case we pass an object manually (mostly used for init-date-filters should refactor

    if (Object.prototype.toString.call(e).slice(8, -1) === 'Object') {
        query = this.vuex ? JSON.parse(JSON.stringify(e)) : e;
        if (!this.vuex) this.query = query;
        var name = dateEvent.target.name;
        var value = dateEvent.target.value;

        if (name) {
            this.dispatch('filter', {
                name: name,
                value: value
            });
            this.dispatch("filter::".concat(name), value);
        } else {
            this.dispatch('filter', value);
        }

        this.updateState('query', query);
    } else if (e || (typeof dateEvent === 'object' && dateEvent.hasOwnProperty(0) && useDateEvent)) {
        if (useDateEvent) {
            e = dateEvent[0]
        }

        var _name = this.getName(e.target.name);
        var _value = e.target.value;

        if (_name) {
            query[_name] = _value;
        } else {
            query = _value;
        }

        if (!this.vuex) this.query = query;

        if (_name) {
            this.dispatch('filter', {
                name: _name,
                value: _value
            });
            this.dispatch("filter::".concat(_name), _value);
        } else {
            this.dispatch('filter', _value);
        }

        this.updateState('query', query);
    }

    return query;
};
