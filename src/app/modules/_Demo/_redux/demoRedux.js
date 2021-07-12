import { put, takeLatest } from "redux-saga/effects";

// action type บอกว่า Redux ตัวนี้ สามารถทำอะไรได้บ้าง 
export const actionTypes = {
  RESET: '[Reset demo] Action',
  ADD_PLAYER: '[Add player] Action',
  UPDATE_LIGHTSTATUS: "[Update Light status] Action",
  UPDATE_IMPOSTER: '[Update imposter] Action',
  TURN_SWITCH1: "[Turn switch 1] Action",
  TURN_SWITCH2: "[Turn switch 2] Action",
  TURN_SWITCH3: "[Turn switch 3] Action",
  UPDATE_COUNT: '[Action Count] Action'
};

// state ค่าที่ถูกเก็บไว้
const initialState = {
  imposter: '',
  playerList: ["Ming01", "Cuteful", "Diadora", "KONDEE"],
  lightState: 'OFF',
  switch1: false,
  switch2: false,
  switch3: false,
  count: 0
};

// reducer แต่ละ Action จะไป update State อย่างไร
export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.RESET: {
      return initialState
    }

    case actionTypes.UPDATE_COUNT: {
      let newCount = state.count +1
      return {...state,count:newCount}
    }

    case actionTypes.ADD_PLAYER: {
      return { ...state, playerList: action.payload };
    }

    case actionTypes.UPDATE_LIGHTSTATUS: {
      return { ...state, lightState: action.payload };
    }

    case actionTypes.UPDATE_IMPOSTER: {
      return { ...state, imposter: action.payload };
    }

    case actionTypes.TURN_SWITCH1: {
      return { ...state, switch1: action.payload };
    }

    case actionTypes.TURN_SWITCH2: {
      return { ...state, switch2: action.payload };
    }

    case actionTypes.TURN_SWITCH3: {
      return { ...state, switch3: action.payload };
    }

    default:
      return state;
  }
};

//action เอาไว้เรียกจากข้างนอก เพื่อเปลี่ยน state
export const actions = {
  reset: () => ({type: actionTypes.RESET}),
  updateCount: () => ({type: actionTypes.UPDATE_COUNT}),
  addPlayer: (payload) => ({ type: actionTypes.ADD_PLAYER, payload }),
  updateImposter: (payload) => ({ type: actionTypes.UPDATE_IMPOSTER, payload }),
  updateLightStatus: (payload) => ({ type: actionTypes.UPDATE_LIGHTSTATUS, payload }),
  turnSwitch1: (payload) => ({ type: actionTypes.TURN_SWITCH1, payload }),
  turnSwitch2: (payload) => ({ type: actionTypes.TURN_SWITCH2, payload }),
  turnSwitch3: (payload) => ({ type: actionTypes.TURN_SWITCH3, payload }),
};

export function* saga() {
  // yield takeLatest(actionTypes.ACTIONTYPE, function* actionNameSaga() {
  //   yield put(actions.actionToExecute());
  // });

  yield takeLatest(actionTypes.TURN_SWITCH1, function* turnSwitch1Saga() {
    yield put(actions.updateCount());
  });

  yield takeLatest(actionTypes.TURN_SWITCH2, function* turnSwitch2Saga() {
    yield put(actions.updateCount());
  });

  yield takeLatest(actionTypes.TURN_SWITCH3, function* turnSwitch3Saga() {
    yield put(actions.updateCount());
  });
}