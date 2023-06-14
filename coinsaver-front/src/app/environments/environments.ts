export const environment = {
  api: {
    hostBackend: 'https://coin-saver-production.up.railway.app',

    transactionsControllerBackend: '/transactions',
    transactionsBackendEndpoints: {
      getAllTransactions: '',
      getTransaction: '',
      getTransactionByCategoryType: '/category',
      createTransaction: '',
      getTransactionsInMonth: '/month',
      updateTransaction: '',
      updateTransactionPatch: '/pay',
      deleteByTransactionId: '',
      getTransactionsAmountByCategory: '/chart/category',
      getPerformance: '/month/performance',
    },

    divisionsControllerBackend: '/divisions',
    divisionsBackendEndpoints: {
      getDivisionByCategoryType: '/category',
      getDivisionById: '',
    },

    authenticationControllerBackend: '/auth',
    authenticationBackendEndpoints: {
      register: '/register',
      authenticate: '/authenticate',
    },

    clientsControllerBackend: '/clients',
    clientsBackendEndpoints: {
      recoverPassword: '/recover-password',
      changePassword: '/change-password',
    },
  },
};
