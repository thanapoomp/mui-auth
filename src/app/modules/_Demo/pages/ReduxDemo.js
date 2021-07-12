import React from 'react'
import Player from '../../_Demo/components/reduxDemo/Player'
import Room from '../../_Demo/components/reduxDemo/Room'
import GameConfig from '../../_Demo/components/reduxDemo/GameConfig'
import { useSelector, useDispatch } from 'react-redux'
import * as demoRedux from '../_redux/demoRedux'


function ReduxDemo() {
    const dispatch = useDispatch()
    const demoReducer = useSelector(({ demo }) => demo)
    const handleReset = () => {
        dispatch(demoRedux.actions.reset())
    }
    return (
        <div>
            <GameConfig></GameConfig>
            <Room></Room>
            {
                demoReducer.playerList.map((item, index) => (
                    <Player key={index} name={item}></Player>
                ))
            }
            <button onClick={handleReset}>reset</button>
        </div>
    )
}

export default ReduxDemo
