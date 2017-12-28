// Now we start parsing. We define a function named parser which accepts our tokens array.
function parser(tokens) {

  var current = 0;

  // Inside it, we define another function called walk() which enables use to do some recursive acrobatics
  function walk() {
    var token = tokens[current];

    /* if the the current token type is equal, then we should check all different possibilities
    such as == and = */
    if (token.type === 'equal') {
      if (tokens[++current].type == 'equal') {
        ++current;
        return {
          type: 'ComparisonE',
          value: token.value + token.value
        };
      } else {
        return {
          type: 'Equal',
          value: token.value
        };
      }
    }

    if (token.type === 'star') {
      current++;
      return {
        type: 'Pointer',
        value: token.value
      };
    }

    if (token.type === 'hash') {
      current++;
      return {
        type: 'Include',
        value: token.value
      };
    }

    // if the token type is 'not' (!), then we check for != too
    if (token.type === 'not') {
        if (tokens[++current].type === 'equal') {
            ++current;
            return {
              type: 'ComaprisonN',
              value: token.value + "="
            };
        } else {
          return {
            type: 'Not',
            value: token.value
          };
        }
    }

    // yawwn, same...
    if (token.type === 'plus') {
        if (tokens[++current].type === 'equal') {
            ++current;
            return {
              type: 'IncByNum',
              value: "+="
            };
        } else if (tokens[current].type === 'plus') {
          ++current;
          return {
            type: 'IncByOne',
            value: "++"
          };
        } else {
          return {
            type: 'Plus',
            value: "+"
          };
        }
    }

    // same but we remember the arrow sign =>
    if (token.type === 'minus') {
      if(tokens[++current].type === 'minus') {
      current++;
        return {
          type: 'DecByOne',
          value: "--"
        };
      } else if (tokens[current].type === 'equal') {
        current++;
        return {
          type: 'DecByNum',
          value: "-="
        };
      } else if (tokens[current].type === 'greater') {
        current++;
        return {
          type: 'Arrow',
          value: "->"
        };
      } else {
        return {
          type: 'Minus',
          value: token.value
        };
      }
    }

    // if it's a name token, we chaning it to Word. Don't ask.. :D
    if (token.type === 'name') {
        current++;
        return {
          type: 'Word',
          value: token.value
        };
    }

    if (token.type === 'less') {
      if(tokens[++current].type === 'equal') {
      current++;
        return {
          type: 'LessOrEqual',
          value: "<="
        };
      } else {
        return {
          type: 'Less',
          value: token.value
        };
      }
    }

    if (token.type === 'greater') {
      if(tokens[++current].type === 'equal') {
      current++;
        return {
          type: 'GreaterOrEqual',
          value: ">="
        };
      } else {
        return {
          type: 'Greater',
          value: token.value
        };
      }
    }

    if (token.type === 'comma') {
      current++;
      return {
        type: 'Delimiter',
        value: token.value
      };
    }

    if (token.type === 'colon') {
      current++;
      return {
        type: 'Colon',
        value: token.value
      };
    }

    /* here we perform some recursive acrobatics. If we encounter an opening bracket, we create a
    new node, call our walk fuction again and push whatever there is inside the bracket,
    inside a child node. When we reach the closing bracket, we stop and push the child node,
    in its parent node */
    if (token.type === 'bracket' &&
        token.value === '['
    ) {
      token = tokens[++current];

      var node = {
        type: 'Arr',
        params: []
      };

      while (
        (token.type !== 'bracket') ||
        (token.type === 'bracket' && token.value !== ']')
      ) {

        node.params.push(walk());
        token = tokens[current];
      }
      current++;
      return node;
    }

    // same story here. This time we call it a 'CodeDomain'.
    if (token.type === 'curly' &&
        token.value === '{'
    ) {
      token = tokens[++current];

      var node = {
        type: 'CodeDomain',
        params: []
      };

      while (
        (token.type !== 'curly') ||
        (token.type === 'curly' && token.value !== '}')
      ) {

        node.params.push(walk());
        token = tokens[current];
      }
      current++;
      return node;
    }

    if (token.type === 'semi') {
      current++;
      return {
        type: 'Terminator',
        value: token.value
      };
    }

    if (token.type === 'number') {
      current++;
      return {
        type: 'NumberLiteral',
        value: token.value
      };
    }

    if (token.type === 'string') {
      current++;
      return {
        type: 'StringLiteral',
        value: token.value
      };
    }

    // same as brackets and curly braces but for paranthesis, we call it 'CodeCave'
    if (
      token.type === 'paren' &&
      token.value === '('
    ) {
      token = tokens[++current];
      let prevToken = tokens[current - 2];
      if (typeof(prevToken) != 'undefined' && prevToken.type === 'name') {
        var node = {
          type: 'CodeCave',
          name: prevToken.value,
          params: []
        };
      } else {
          var node = {
            type: 'CodeCave',
            params: []
          };
      }

      while (
        (token.type !== 'paren') ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        node.params.push(walk());
        token = tokens[current];
      }

      current++;
      return node;
    }

    //if we don't recognize the token, we throw an error.
    throw new TypeError(token.type);
  }

  // we declare this variable named AST, and start our walk() function to parse our tokens.
  let ast = {
    type: 'Program',
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}