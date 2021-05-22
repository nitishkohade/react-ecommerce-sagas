1) dispatch call will invoke reducers

  - the dispatch call above can return two forms of response
    a) One is object
    b) Another is fucntion

    1.a) object can be handled normally which will be pushed to reducers
    1.b) function should only be handled by redux-thunk for async operations
    1.c) now the returning object can be interfced by sagas and sagas
         listener will listen to events which are registered on object having
         key = "type", being returned via dispatch

2) reducer