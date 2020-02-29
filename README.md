# This is an utility for parsing text.

# Docs

# listify()
  Takes a string input and converts it into an array.

  First argument: input string

  Second argument: output array

# add()
  Adds a token and a callback function, throws an error if there isn't a function.

  First argument: the token

  Second argument: callback function

  Third argument: description for the token

# parse()
  Parses the input and executes the function if the token is present.\
  If it finds an unknown token it calls the error() function (see below).

  First argument: the input, default is from argv

# error()
  Error function called from parse()

  First argument: callback function called on error,

  the callback function must take 1 argument that the parse() function

  will use to pass the unknown token

# help()
  Function used by user to override the

  default help function.

  First argument: callback function

# getArgs()
  Get arguments from a specified array

  First argument: how many arguments to return

  Second argument: from what array to get the arguments, default is argv

# ignore()
  Ignore errors thrown by parse().

  First argument: how many errors to ignore.

  Putting -1 will suppress all errors

# Changelog
  - Now the add() function can take multiple tokens
  E.g.:
    parse.add('-f --foo' () => console.log('bar'))
    If you type -f or --foo they will do the same thing.

  - Added help commands


# Examples
```

const parse = require('@nonamenpm/text-parser')

var test_string = 'foo bar'

parse.error((token) => {

    console.log('This is an error: ' + token)

})

parse.add('foo', () => {

    console.log('bar')

})

parse.parse(test_string)

```

In this case, the output will be:

  bar

  This is an error: bar
