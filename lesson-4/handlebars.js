const handlebars = require('handlebars');

const template = handlebars.compile('<p>{{someVar}}</p>');

const templateIf = handlebars.compile(
    '{{#if bold}} <b>Hello!</b> {{else}} <p>Hello!</p> {{/if}}'
);

const result = template.apply({ someVar: 'Hello!' });

console.log(result);