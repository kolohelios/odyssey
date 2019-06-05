import { Machine } from 'xstate'

const userMachine = Machine({
  initial: 'loggedOut',
  states: {
    loggedIn: {
      on: {
        logOut: 'loggedOut'
      }
    },
    loggedOut: {

    }
  }
})
