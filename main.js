const process = require('process');
const path = require('path')

tokens = []
descs = []
funs = []

//set function vars
var errorfun
var ignores = 0 //how many errors to ignore, -1 suppresses all errors

//listify a string input,
//returns an array
exports.listify = function(input, array) {

  var ind = 0 //index
  var whitespace = false // current character

  for (j = 0; j < input.length; j++) {

    //checks for whitespace and prevents null spaces in the array
    if (input.charAt(j) === ' ' && whitespace === false) {

      whitespace = true
      ind += 1
      continue
    }

    try {

      whitespace = false
      array[ind] += input.charAt(j)
    }

    catch(e) {
      console.log('\x1b[31m%s\x1b[0m', '[Error]', 'Second Argument for \'listify\' is missing or isn\'t an array.')
    }

    //replace undefined with nothing
    array[ind] = array[ind].replace('undefined', '')

  }
  return array
}

//Adds a token and a function for the parse method
exports.add = function(token, fun, description='Description') {
  var currentToken = ''
  var whiteSpace = 0 //check for whitespace

  for (char = 0; char < (token.length + 1) ; char++) {

    if (whiteSpace !== 0) {

      description = ''
    }

    if (token.charAt(char) !== ' ') {

        currentToken += token.charAt(char)
    }

    else if (token.charAt(char) === ' ' && currentToken !== '') {

      tokens.push(currentToken)
      funs.push(fun)
      descs.push(description)
      currentToken = ''
      whiteSpace += 1

      continue

    }

    if (char === token.length) {

      tokens.push(currentToken)
      funs.push(fun)
      descs.push(description)

      break

    }

  } //for

  //tokens.push(token)
  //funs.push(fun)
  //descs.push(description)
}


//automatic parse, default input is from argv
exports.parse = function(input='process.argv') {
  //argv setting
  var init = 0

  //workaround to skip the node and filename being processed
  if (input === 'process.argv') {
    init = 2
    input = eval(input)
  }
  //automatic listify
  if (!Array.isArray(input)) {
    var array = []
    input = exports.listify(input, array)
  }

  //i know this is horrible to do but without this the error function will not work.
  //i will find another way to fix this
  input.push('')


  var lastInput = ''
  i = init - 1;

  while (i < input.length) {

    i++

    if (lastInput !== '' && ignores === 0) {
          errorfun(input[i - 1])  //if the input token is unrecognized it will call the custom global error function
          break
    }

    if (ignores !== 0) {
      ignores -= 1
    }

    lastInput = input[i]

    for (k = 0; k < tokens.length; k++) {

      if (input[i] === tokens[k]) {

        lastInput = ''
        try {

          funs[k]()    //call the function
        }

        catch(e) {

          if (e instanceof TypeError) {

            //only called if the program has a Syntax Error on the add() function
            console.log('\x1b[31m%s\x1b[0m', '[Error] ', 'The second parameter for \'add\' isn\'t a function.')
            console.log('Token: ' + tokens[k])
          }
        }
      }
    }
  }
} //parse

//Adds a custom error function called by parse
exports.error = function(fun) {
  errorfun = fun
}

//Adds a custom help function, the help section is
//generated by the program automatically,
//use this function if you want to override it.

exports.help = function(fun) {
  phelp = fun
}

exports.ignore = function(n) {
  ignores = n
}

exports.skip = function(nu) {
  i = nu
}

exports.getArgs = function(num, array) {
  var p = i
  var arr = []
  var ind = 0

  exports.ignore(2 + num)

  while (p < (i + num)) {
    p++
    arr.push(array[p])
  }

  return arr

}

//PRIVATE FUNCTIONS
function phelp() {
  console.log('Usage: ' + path.basename(__filename) +' <commands>')
  //bit ugly, but whatever
  for(k = 0; k < tokens.length; k++) {
    console.log('\n' + tokens[k] + ':' + (function() {
      var j = k
      var len = tokens[j].length
      j = 0
      var space = ''
      for(j; j < 16 - len; ++j) {
        space += ' '
      }

      return space
    }()) + '' + descs[k])
  }
}

//Adds a help token
exports.add('-h --help', () => {
  phelp()
}, 'Print this help section.')

//sets default overridable error function
exports.error((token) => {
  console.log('\x1b[31m%s\x1b[0m', '[Error]', 'Unrecognized token \'' + token + '\'')
})
