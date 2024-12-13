const Handlebars = require('handlebars');

module.exports = {
    index(a,b) { return a+b; },
    sortAble: (feild, sort) => {

        const sortType = feild === sort.column ? sort.type : 'default';

        const icons = {
            default: 'fa-solid fa-sort',
            asc: 'fa-solid fa-arrow-down-short-wide',
            desc: 'fa-solid fa-arrow-down-wide-short',
        };
        const types = {
            default: 'asc',
            asc: 'desc',
            desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sortType];

        const hrefProtect = Handlebars.escapeExpression(`?_sort&column=${feild}&type=${type}`);

        const output = `<a href="${hrefProtect}">
                    <i class="${icon}"></i>
                </a>`;
                
        return new Handlebars.SafeString(output);
    },
  };