import Decimal from "decimal.js";

export function getOrders(
  state = {
    processing: false,
    error: null,
    orders: null,
    count: 0
  },
  action
) {
  switch (action.type) {
    case "GET_ORDERS_PENDING": {
      return {
        ...state,
        processing: true,
        error: null
      };
    }
    case "GET_ORDERS_FULFILLED": {
      return {
        ...state,
        processing: false,
        error: null,
        orders: action.payload.data.result.orders,
        count: action.payload.data.result.count
      };
    }
    case "GET_ORDERS_REJECTED": {
      return {
        ...state,
        processing: false,
        error: action.payload
      };
    }
  }
  return state;
}

export function getBinanceOrders(
  state = {
    processing: false,
    error: null,
    orders: null,
    count: 0
  },
  action
) {
  switch (action.type) {
    case "GET_BINANCE_ORDERS_PENDING": {
      return {
        ...state,
        processing: true,
        error: null
      };
    }
    case "GET_BINANCE_ORDERS_FULFILLED": {
      return {
        ...state,
        processing: false,
        error: null,
        orders: action.payload.data.result,
        count: action.payload.data.result.length
      };
    }
    case "GET_BINANCE_ORDERS_REJECTED": {
      return {
        ...state,
        processing: false,
        error: action.payload
      };
    }
  }
  return state;
}

export function cancelBinanceOrderById(
  state = {
    processing: false,
    error: null,
    data: null
  },
  action
) {
  switch (action.type) {
    case "CANCEL_BINANCE_ORDER_BY_ID_PENDING": {
      return {
        ...state,
        processing: true,
        error: null
      };
    }
    case "CANCEL_BINANCE_ORDER_BY_ID_FULFILLED": {
      return {
        ...state,
        processing: false,
        error: null,
        data: action.payload.data.result
      };
    }
    case "CANCEL_BINANCE_ORDER_BY_ID_REJECTED": {
      return {
        ...state,
        processing: false,
        error: action.payload
      };
    }
  }
  return state;
}

export function getCurrentBalances(
  state = {
    processing: false,
    error: null,
    data: null
  },
  action
) {
  switch (action.type) {
    case "GET_CURRENT_BALANCES_PENDING": {
      return {
        ...state,
        processing: true,
        error: null
      };
    }
    case "GET_CURRENT_BALANCES_FULFILLED": {
      const result = action.payload.data.result;
      // const balances = Object.values(result);
      // let available = new Decimal(0);
      // let onOrder = new Decimal(0);
      // for (let i = 0; i < balances.length; i++) {
      //   available = available.plus(new Decimal(balances[i].available));
      //   onOrder = onOrder.plus(new Decimal(balances[i].onOrder));
      // }
      return {
        ...state,
        processing: false,
        error: null,
        data: { available: result["BTC"].available, onOrder: result["BTC"].onOrder }
      };
    }
    case "GET_CURRENT_BALANCES_REJECTED": {
      return {
        ...state,
        processing: false,
        error: action.payload
      };
    }
  }
  return state;
}