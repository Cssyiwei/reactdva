const defaultState = {
    count : 0,
}

export default {
    namespace: 'counter',
    state: {
        ...defaultState
    },
    subscriptions: {
        setup({dispatch,history}){
            return history.listen(({pathname}) => {
                if(pathname.includes('count')) {
                    console.log('dispatch')
                }
            })
        }
    },
    effects: {
        *fetch({payload},{call,put,select}) {

        }
    },
    reducers: {
        save(state,action) {
            return {
                ...state,
                ...action.payload
            }
        },
        reset(state) {
            return {
                ...state,
                ...defaultState
            }
        }
    }
}