export function priceTrade(
  state = {
    processing: false,
    error: null,
    priceTrade: null
  },
  action
) {
  switch (action.type) {
    case "PRICE_TRADE_PENDING": {
      return {
        ...state,
        processing: true,
        error: null
      };
    }
    case "PRICE_TRADE_FULFILLED": {
      return {
        ...state,
        processing: false,
        error: null,
        priceTrade: action.payload.data.result
      };
    }
    case "PRICE_TRADE_REJECTED": {
      return {
        ...state,
        processing: false,
        error: action.payload
      };
    }
  }
  return state;
}

export function percentageTrade(
  state = {
    processing: false,
    error: null,
    percentageTrade: null
  },
  action
) {
  switch (action.type) {
    case "PERCENTAGE_TRADE_PENDING": {
      return {
        ...state,
        processing: true,
        error: null
      };
    }
    case "PERCENTAGE_TRADE_FULFILLED": {
      return {
        ...state,
        processing: false,
        error: null,
        percentageTrade: action.payload.data.result
      };
    }
    case "PERCENTAGE_TRADE_REJECTED": {
      return {
        ...state,
        processing: false,
        error: action.payload
      };
    }
  }
  return state;
}

export function conditionalTrade(
  state = {
    processing: false,
    error: null,
    conditionalTrade: null
  },
  action
) {
  switch (action.type) {
    case "CONDITIONAL_TRADE_PENDING": {
      return {
        ...state,
        processing: true,
        error: null
      };
    }
    case "CONDITIONAL_TRADE_FULFILLED": {
      return {
        ...state,
        processing: false,
        error: null,
        conditionalTrade: action.payload.data.result
      };
    }
    case "CONDITIONAL_TRADE_REJECTED": {
      return {
        ...state,
        processing: false,
        error: action.payload
      };
    }
  }
  return state;
}

export function latestPrice(
  state = {
    processing: true,
    error: null,
    latestPrice: null,
    tradeInfo: null
  },
  action
) {
  switch (action.type) {
    case "LATEST_PRICE_PENDING": {
      return {
        ...state,
        processing: true,
        error: null
      };
    }
    case "LATEST_PRICE_FULFILLED": {
      let currencies = Object.keys(action.payload.data.result);
      let BNB = currencies.filter(item => {
        const check = item.substr(item.length - 3, item.length);
        return check === "BNB";
      });
      let BTC = currencies.filter(item => {
        const check = item.substr(item.length - 3, item.length);
        return check === "BTC";
      });
      let ETH = currencies.filter(item => {
        const check = item.substr(item.length - 3, item.length);
        return check === "ETH";
      });
      let USDT = currencies.filter(item => {
        const check = item.substr(item.length - 4, item.length);
        return check === "USDT";
      });
      const tradeInfo = {
        BNB: BNB.map(item => item.slice(0, item.length - 3)),
        BTC: BTC.map(item => item.slice(0, item.length - 3)),
        ETH: ETH.map(item => item.slice(0, item.length - 3)),
        USDT: USDT.map(item => item.slice(0, item.length - 3))
      };
      return {
        ...state,
        processing: false,
        error: null,
        latestPrice: action.payload.data.result,
        tradeInfo
      };
    }
    case "LATEST_PRICE_REJECTED": {
      return {
        ...state,
        processing: false,
        error: action.payload
      };
    }
  }
  return state;
}
